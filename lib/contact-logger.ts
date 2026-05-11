import fs from "node:fs/promises";
import path from "node:path";
import type { ContactPayload } from "./email";
import { BRAND_TAG, getSupabaseAdmin } from "./supabase";

export type ContactLogEntry = {
  submitted_at: string;
  name: string;
  email: string;
  phone: string;
  details?: string;
  message: string;
  email_sent: boolean;
  mode: string;
  error_message: string | null;
  user_agent?: string;
  ip?: string;
};

const LOG_PATH = path.join(process.cwd(), "logs", "contact-submissions.json");

// ----------------------- Local JSON fallback -----------------------

async function ensureLogFile(): Promise<void> {
  const dir = path.dirname(LOG_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(LOG_PATH);
  } catch {
    await fs.writeFile(LOG_PATH, "[]\n", "utf8");
  }
}

async function readLog(): Promise<ContactLogEntry[]> {
  try {
    const raw = await fs.readFile(LOG_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToJson(entry: ContactLogEntry): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await ensureLogFile();
    const entries = await readLog();
    entries.push(entry);
    await fs.writeFile(LOG_PATH, JSON.stringify(entries, null, 2) + "\n", "utf8");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ----------------------- Supabase write ----------------------------

/**
 * Insert into public.leads using the shared schema. The contact-form
 * "details" field doesn't have a perfect column match (it's a free-form
 * blend of group size + date), so we keep it inside metadata.details
 * rather than mis-mapping to preferred_town or date_requested.
 *
 * metadata.brand = "destin_bonfire" so the existing multi-brand dashboard
 * can filter our submissions out of any other brand's leads.
 */
async function writeToSupabase(
  payload: ContactPayload,
  meta: {
    email_sent: boolean;
    mode: string;
    error_message: string | null;
    user_agent?: string;
    ip?: string;
    source_page?: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "supabase_not_configured" };
  const { error } = await sb.from("leads").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    source_page: meta.source_page ?? null,
    status: "new",
    metadata: {
      brand: BRAND_TAG,
      details: payload.details ?? null,
      email_sent: meta.email_sent,
      delivery_mode: meta.mode,
      error_message: meta.error_message,
      user_agent: meta.user_agent ?? null,
      ip: meta.ip ?? null,
    },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ----------------------- Public API --------------------------------

export async function logContactSubmission(
  payload: ContactPayload,
  meta: {
    email_sent: boolean;
    mode: string;
    error_message: string | null;
    user_agent?: string;
    ip?: string;
    source_page?: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Try Supabase first; fall back to local JSON only if Supabase isn't
  // configured or the write failed. Belt-and-suspenders: we never want
  // to drop a real customer inquiry.
  const sbResult = await writeToSupabase(payload, meta);
  if (sbResult.ok) return { ok: true };

  const entry: ContactLogEntry = {
    submitted_at: new Date().toISOString(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    details: payload.details,
    message: payload.message,
    email_sent: meta.email_sent,
    mode: meta.mode,
    error_message: meta.error_message,
    user_agent: meta.user_agent,
    ip: meta.ip,
  };
  const jsonResult = await writeToJson(entry);
  if (jsonResult.ok) return { ok: true };

  // Both failed — surface the original Supabase error for visibility.
  return { ok: false, error: `supabase: ${sbResult.error}; json: ${jsonResult.error}` };
}
