import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { sendContactEmail, getEmailMode, type ContactPayload } from "@/lib/email";
import { logContactSubmission } from "@/lib/contact-logger";
import { captureServerEvent } from "@/lib/posthog-server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  details: 500,
  message: 5000,
} as const;

type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string };

function str(input: unknown): string {
  return typeof input === "string" ? input.trim() : "";
}

function looksLikeSpam(p: ContactPayload): boolean {
  const haystack = `${p.name} ${p.email} ${p.message} ${p.details ?? ""}`.toLowerCase();
  // URLs in name, multiple URLs in message, BB-code, common spam tokens
  if (/https?:\/\//.test(p.name)) return true;
  const urlCount = (haystack.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) return true;
  if (/\[url=|\[link=|<a\s+href/i.test(haystack)) return true;
  if (/\b(viagra|cialis|casino|bitcoin giveaway|loan offer|crypto signals)\b/i.test(haystack))
    return true;
  return false;
}

function validate(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const r = raw as Record<string, unknown>;

  // Honeypot: if any non-expected field called "website" or "url" is filled, treat as spam.
  const honeypot = str(r.website) || str(r.url);
  if (honeypot) return { ok: false, error: "Invalid submission." };

  const name = str(r.name);
  const email = str(r.email).toLowerCase();
  const phone = str(r.phone);
  const details = str(r.details) || undefined;
  const message = str(r.message);

  if (!name) return { ok: false, error: "Name is required." };
  if (name.length > LIMITS.name) return { ok: false, error: "Name is too long." };
  if (!email) return { ok: false, error: "Email is required." };
  if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    return { ok: false, error: "Please provide a valid email address." };
  if (!phone) return { ok: false, error: "Phone is required." };
  if (phone.length > LIMITS.phone) return { ok: false, error: "Phone is too long." };
  if (!message) return { ok: false, error: "Message is required." };
  if (message.length > LIMITS.message)
    return { ok: false, error: "Message is too long." };
  if (details && details.length > LIMITS.details)
    return { ok: false, error: "Details field is too long." };

  const payload: ContactPayload = { name, email, phone, details, message };
  if (looksLikeSpam(payload)) return { ok: false, error: "Invalid submission." };

  return { ok: true, value: payload };
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed JSON." }, { status: 400 });
  }

  const result = validate(raw);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const payload = result.value;
  const userAgent = req.headers.get("user-agent") || undefined;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    undefined;

  const send = await sendContactEmail(payload);
  // In log_only mode no email is dispatched - record that truthfully.
  const actuallySent = send.ok && send.mode !== "log_only";

  // Capture which page the form was submitted from (Referer header on the
  // POST). Helps the admin see whether inquiries are coming from /contact,
  // homepage, package pages, etc. Optional - never blocks the submission.
  let sourcePage: string | undefined;
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      sourcePage = new URL(referer).pathname;
    } catch {
      sourcePage = undefined;
    }
  }

  const logResult = await logContactSubmission(payload, {
    email_sent: actuallySent,
    mode: send.mode,
    error_message: send.ok ? null : send.error,
    user_agent: userAgent,
    ip,
    source_page: sourcePage,
  });

  // PostHog event - fire-and-forget, PII-free. Use a one-way hash of the
  // email as the distinct_id so funnel stitching works across sessions
  // without storing the raw email in PostHog.
  const distinctId = "anon_" + createHash("sha256").update(payload.email).digest("hex").slice(0, 16);
  void captureServerEvent(distinctId, "contact_form_submitted", {
    email_sent: actuallySent,
    delivery_mode: send.mode,
    group_size_provided: Boolean(payload.details),
    message_length: payload.message.length,
    failed: !send.ok,
  });

  // User-facing response: if either email or log succeeded, tell the user we got it.
  if (send.ok || logResult.ok) {
    return NextResponse.json({
      ok: true,
      message:
        "Thank you for reaching out - we will get back to you as soon as possible.",
    });
  }

  // Both email delivery and logging failed - surface a 500 so the client retries or shows an error.
  console.error(
    "[contact] Both email send and logging failed.",
    "send:",
    send.ok ? "ok" : send.error,
    "log:",
    logResult.ok ? "ok" : logResult.error,
    "mode:",
    getEmailMode(),
  );
  return NextResponse.json(
    { ok: false, error: "Submission could not be processed. Please call us directly." },
    { status: 500 },
  );
}
