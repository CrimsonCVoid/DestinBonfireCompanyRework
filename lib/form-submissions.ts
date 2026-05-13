import fs from "node:fs/promises";
import path from "node:path";
import type { ContactLogEntry } from "./contact-logger";
import { BRAND_TAG, getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const LOG_PATH = path.join(process.cwd(), "logs", "contact-submissions.json");

export type SubmissionStats = {
  total: number;
  last24h: number;
  last7d: number;
  last30d: number;
  delivered: number;
  failed: number;
  logOnly: number;
};

export type SubmissionsSource = "supabase" | "json" | "unconfigured";

// ----------------------- JSON fallback -----------------------------

async function readJsonLog(): Promise<ContactLogEntry[]> {
  try {
    const raw = await fs.readFile(LOG_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ContactLogEntry[]) : [];
  } catch {
    return [];
  }
}

// ----------------------- Supabase read -----------------------------

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source_page: string | null;
  status: string | null;
  metadata: Record<string, unknown> | null;
};

async function readFromSupabase(): Promise<ContactLogEntry[] | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  // Pull only leads tagged with our brand so this admin doesn't show
  // submissions from any other brand running on the same schema.
  const { data, error } = await sb
    .from("leads")
    .select("id, created_at, name, email, phone, message, source_page, status, metadata")
    .eq("metadata->>brand", BRAND_TAG)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error || !data) return null;
  return (data as LeadRow[]).map(rowToEntry);
}

function rowToEntry(row: LeadRow): ContactLogEntry {
  const m = (row.metadata ?? {}) as Record<string, unknown>;
  const detailsRaw = m.details;
  const userAgent = m.user_agent;
  const ip = m.ip;
  const errorMessage = m.error_message;
  return {
    submitted_at: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    details: typeof detailsRaw === "string" && detailsRaw.length > 0 ? detailsRaw : undefined,
    message: row.message ?? "",
    email_sent: Boolean(m.email_sent),
    mode: typeof m.delivery_mode === "string" ? m.delivery_mode : "unknown",
    error_message:
      typeof errorMessage === "string" && errorMessage.length > 0 ? errorMessage : null,
    user_agent: typeof userAgent === "string" ? userAgent : undefined,
    ip: typeof ip === "string" ? ip : undefined,
  };
}

// ----------------------- Public API --------------------------------

export async function readSubmissions(): Promise<{
  entries: ContactLogEntry[];
  source: SubmissionsSource;
}> {
  if (isSupabaseConfigured()) {
    const rows = await readFromSupabase();
    if (rows) return { entries: rows, source: "supabase" };
    // Configured but query failed - show JSON if we have it, but flag it.
    const fallback = await readJsonLog();
    return { entries: fallback.reverse(), source: "json" };
  }
  const local = await readJsonLog();
  return { entries: local.reverse(), source: "unconfigured" };
}

export function computeStats(entries: ContactLogEntry[]): SubmissionStats {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const stats: SubmissionStats = {
    total: entries.length,
    last24h: 0,
    last7d: 0,
    last30d: 0,
    delivered: 0,
    failed: 0,
    logOnly: 0,
  };
  for (const e of entries) {
    const t = new Date(e.submitted_at).getTime();
    if (!Number.isFinite(t)) continue;
    const age = now - t;
    if (age <= day) stats.last24h++;
    if (age <= 7 * day) stats.last7d++;
    if (age <= 30 * day) stats.last30d++;
    if (e.mode === "log_only") stats.logOnly++;
    else if (e.email_sent) stats.delivered++;
    else stats.failed++;
  }
  return stats;
}
