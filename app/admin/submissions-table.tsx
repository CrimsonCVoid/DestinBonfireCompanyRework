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
      <div className="mt-6 rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-white/50">
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
                  ? "bg-[#c45a22] text-white"
                  : "border border-white/15 text-white/70 hover:border-white/35 hover:text-white")
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
          className="w-full max-w-xs rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#f2a261]/60 focus:outline-none focus:ring-1 focus:ring-[#f2a261]/40"
        />
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/55">
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
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-white/45">
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
                      className="cursor-pointer border-t border-white/5 transition hover:bg-white/[0.03]"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                    >
                      <td className="px-4 py-3 align-top text-white/85">
                        <p className="font-medium">{fmtDate(r.submitted_at)}</p>
                        <p className="text-xs text-white/45">{fmtTime(r.submitted_at)}</p>
                      </td>
                      <td className="px-4 py-3 align-top text-white">{r.name}</td>
                      <td className="px-4 py-3 align-top text-white/80">
                        <a
                          href={`mailto:${r.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block truncate hover:text-[#f2a261]"
                        >
                          {r.email}
                        </a>
                        <a
                          href={`tel:${r.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block text-xs text-white/55 hover:text-[#f2a261]"
                        >
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 align-top text-white/75">{r.details || "—"}</td>
                      <td className="px-4 py-3 align-top">
                        <span className={pillClass(status)}>{status.label}</span>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={r.submitted_at + r.email + "-detail"} className="border-t border-white/5 bg-black/30">
                        <td colSpan={5} className="px-4 py-5">
                          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Message</p>
                              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-white/90">
                                {r.message}
                              </p>
                            </div>
                            <dl className="space-y-2 text-xs text-white/65">
                              <Row k="Mode" v={r.mode} />
                              <Row k="Email sent" v={String(r.email_sent)} />
                              {r.error_message && <Row k="Error" v={r.error_message} mono />}
                              <Row k="IP" v={r.ip || "—"} mono />
                              <Row k="User agent" v={r.user_agent || "—"} mono wrap />
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

      <p className="mt-3 text-xs text-white/40">
        Click any row to see the full message and delivery details.
      </p>
    </div>
  );
}

function Row({ k, v, mono, wrap }: { k: string; v: string; mono?: boolean; wrap?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt className="w-24 flex-none uppercase tracking-wider text-white/45">{k}</dt>
      <dd
        className={
          (mono ? "font-mono " : "") +
          (wrap ? "break-all " : "") +
          "text-white/80"
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
  if (s.kind === "delivered") return `${base} bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30`;
  if (s.kind === "failed") return `${base} bg-red-400/15 text-red-200 ring-1 ring-red-400/30`;
  return `${base} bg-amber-400/15 text-amber-100 ring-1 ring-amber-400/30`;
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
