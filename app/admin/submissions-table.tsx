"use client";

import { useMemo, useState } from "react";
import type { ContactLogEntry } from "@/lib/contact-logger";

type Filter = "all" | "delivered" | "failed" | "log_only";

export function SubmissionsTable({ rows }: { rows: ContactLogEntry[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "delivered" && !(r.email_sent && r.mode !== "log_only")) return false;
      if (filter === "failed" && (r.email_sent || r.mode === "log_only")) return false;
      if (filter === "log_only" && r.mode !== "log_only") return false;
      if (!q) return true;
      const hay = [r.name, r.email, r.phone, r.details, r.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, filter, query]);

  if (rows.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-ink-900/15 px-4 py-10 text-center text-sm text-ink-800/55">
        No submissions yet. The first inquiry from the contact form will land here.
      </div>
    );
  }

  return (
    <div className="mt-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["delivered", "Delivered"],
              ["failed", "Failed"],
              ["log_only", "Log-only"],
            ] as Array<[Filter, string]>
          ).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition " +
                (filter === f
                  ? "bg-[var(--color-ember-500)] text-white shadow-sm"
                  : "border border-ink-900/15 bg-white text-ink-800/80 hover:border-[var(--color-ember-500)]/50 hover:text-[var(--color-ember-700)]")
              }
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search name, email, message…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-full border border-ink-900/15 bg-[var(--color-sand-50)] px-4 py-2 text-sm text-ink-900 placeholder:text-ink-800/40 focus:border-[var(--color-ember-500)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ember-500)]/30"
        />
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink-900/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-sand-50)] text-xs uppercase tracking-wider text-ink-800/60">
            <tr>
              <th className="px-4 py-3 font-semibold">When</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Group</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-ink-800/50">
                  No matches.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => {
                const idx = i;
                const isOpen = openIdx === idx;
                const status = statusOf(r);
                return (
                  <>
                    <tr
                      key={r.submitted_at + r.email + idx}
                      className="cursor-pointer border-t border-ink-900/5 transition hover:bg-[var(--color-sand-100)]"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                    >
                      <td className="px-4 py-3 align-top text-ink-900">
                        <p className="font-medium">{fmtDate(r.submitted_at)}</p>
                        <p className="text-xs text-ink-800/50">{fmtTime(r.submitted_at)}</p>
                      </td>
                      <td className="px-4 py-3 align-top text-ink-900">{r.name}</td>
                      <td className="px-4 py-3 align-top text-ink-800/85">
                        <a
                          href={`mailto:${r.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block truncate hover:text-[var(--color-ember-600)]"
                        >
                          {r.email}
                        </a>
                        <a
                          href={`tel:${r.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block text-xs text-ink-800/60 hover:text-[var(--color-ember-600)]"
                        >
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 align-top text-ink-800/80">{r.details || "-"}</td>
                      <td className="px-4 py-3 align-top">
                        <span className={pillClass(status)}>{status.label}</span>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={r.submitted_at + r.email + "-detail"} className="border-t border-ink-900/5 bg-[var(--color-sand-50)]">
                        <td colSpan={5} className="px-4 py-5">
                          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-ink-800/55">Message</p>
                              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-ink-800/90">
                                {r.message}
                              </p>
                            </div>
                            <dl className="space-y-2 text-xs text-ink-800/70">
                              <Row k="Mode" v={r.mode} />
                              <Row k="Email sent" v={String(r.email_sent)} />
                              {r.error_message && <Row k="Error" v={r.error_message} mono />}
                              <Row k="IP" v={r.ip || "-"} mono />
                              <Row k="User agent" v={r.user_agent || "-"} mono wrap />
                            </dl>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink-800/50">
        Click any row to see the full message and delivery details.
      </p>
    </div>
  );
}

function Row({ k, v, mono, wrap }: { k: string; v: string; mono?: boolean; wrap?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt className="w-24 flex-none uppercase tracking-wider text-ink-800/50">{k}</dt>
      <dd
        className={
          (mono ? "font-mono " : "") +
          (wrap ? "break-all " : "") +
          "text-ink-800/85"
        }
      >
        {v}
      </dd>
    </div>
  );
}

type StatusKind = { kind: "delivered" | "failed" | "log_only"; label: string };

function statusOf(r: ContactLogEntry): StatusKind {
  if (r.mode === "log_only") return { kind: "log_only", label: "Log-only" };
  if (r.email_sent) return { kind: "delivered", label: "Delivered" };
  return { kind: "failed", label: "Failed" };
}

function pillClass(s: StatusKind) {
  const base = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]";
  if (s.kind === "delivered") return `${base} bg-emerald-50 text-emerald-800 ring-1 ring-emerald-300/70`;
  if (s.kind === "failed") return `${base} bg-red-50 text-red-800 ring-1 ring-red-300/70`;
  return `${base} bg-amber-50 text-amber-800 ring-1 ring-amber-300/70`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function fmtTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
