import fs from "node:fs/promises";
import path from "node:path";
import type { ContactLogEntry } from "./contact-logger";

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

export async function readSubmissions(): Promise<ContactLogEntry[]> {
  try {
    const raw = await fs.readFile(LOG_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ContactLogEntry[]) : [];
  } catch {
    return [];
  }
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
