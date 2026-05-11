import fs from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { computeStats, readSubmissions } from "@/lib/form-submissions";
import {
  getBookingFunnel,
  getCityPoints,
  getCityVisitors,
  getCountryVisitors,
  getDailyTrend,
  getDeviceBreakdown,
  getKpis,
  getRecentErrors,
  getRecentEvents,
  getRecentReplays,
  getStatus,
  getTopPages,
  getTopReferrers,
  getUsStateVisitors,
} from "@/lib/posthog";
import { LogoutButton } from "./logout-button";
import { SubmissionsTable } from "./submissions-table";
import { VisitorsMap } from "@/components/visitors-map";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const WINDOW_DAYS = 30;

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [submissions, status] = await Promise.all([
    readSubmissions(),
    getStatus(),
  ]);
  const stats = computeStats(submissions);

  // Only hit PostHog if it's actually configured — otherwise show empty cards.
  const phReady = status.ok;
  const [
    kpis,
    daily,
    topPages,
    referrers,
    devices,
    funnel,
    replays,
    errors,
    eventsFeed,
    countries,
    cities,
    usStates,
    cityPoints,
  ] = phReady
    ? await Promise.all([
        getKpis(WINDOW_DAYS),
        getDailyTrend(WINDOW_DAYS),
        getTopPages(WINDOW_DAYS, 10),
        getTopReferrers(WINDOW_DAYS, 8),
        getDeviceBreakdown(WINDOW_DAYS),
        getBookingFunnel(WINDOW_DAYS),
        getRecentReplays(7, 12),
        getRecentErrors(7, 10),
        getRecentEvents(40),
        getCountryVisitors(WINDOW_DAYS),
        getCityVisitors(WINDOW_DAYS, 12),
        getUsStateVisitors(WINDOW_DAYS),
        getCityPoints(WINDOW_DAYS, 500),
      ])
    : [
        { pageviews: 0, visitors: 0, sessions: 0, windowDays: WINDOW_DAYS },
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];

  // Load both topologies server-side — parsed once per request, NOT shipped
  // in the page chunk. The world atlas (~100KB) and the US states atlas
  // (~115KB) get passed as serialized JSON into the client map component.
  async function readJson(rel: string): Promise<unknown> {
    try {
      const raw = await fs.readFile(path.join(process.cwd(), "public", "data", rel), "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  const [worldTopology, usTopology] = await Promise.all([
    readJson("countries-110m.json"),
    readJson("us-states-10m.json"),
  ]);

  const maxDaily = Math.max(1, ...daily.map((d) => d.pageviews));
  const totalDeviceVisits = Math.max(1, devices.reduce((a, d) => a + d.visits, 0));

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f2a261]">
            Destin Bonfire Company
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Admin dashboard
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Form submissions and website analytics — last {WINDOW_DAYS} days.
          </p>
        </div>
        <LogoutButton />
      </header>

      {/* KPI grid */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Submissions (24h)" value={stats.last24h.toLocaleString()} sub={`${stats.last7d} this week · ${stats.total} all-time`} accent />
        <Kpi label="Pageviews" value={kpis.pageviews.toLocaleString()} sub={phReady ? `over ${WINDOW_DAYS} days` : "PostHog not connected"} />
        <Kpi label="Unique visitors" value={kpis.visitors.toLocaleString()} sub={phReady ? `${kpis.sessions.toLocaleString()} sessions` : "—"} />
        <Kpi
          label="Email delivery"
          value={`${stats.delivered}/${stats.total}`}
          sub={
            stats.failed > 0
              ? `${stats.failed} failed · ${stats.logOnly} log-only`
              : `${stats.logOnly} log-only`
          }
          warning={stats.failed > 0}
        />
      </section>

      {/* PostHog connection banner */}
      {!phReady && (
        <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
          <p className="font-semibold">PostHog isn&rsquo;t connected.</p>
          <p className="mt-1 text-amber-100/80">
            {status.reason === "no_api_key" &&
              "Set POSTHOG_PERSONAL_API_KEY in your environment to load analytics."}
            {status.reason === "no_project" &&
              "API key is set but no project was returned. Set POSTHOG_PROJECT_ID explicitly."}
            {status.reason === "unreachable" &&
              "PostHog endpoint unreachable. Check POSTHOG_HOST."}
          </p>
        </div>
      )}

      {/* Booking funnel */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Conversion</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Booking funnel</h2>
            <p className="mt-1 text-xs text-white/50">
              Visited → clicked a Book button → submitted the contact form. Last {WINDOW_DAYS} days, unique people.
            </p>
          </div>
        </div>
        {funnel.length === 0 ? (
          <Empty>Funnel data will appear once visitors start hitting Book buttons.</Empty>
        ) : (
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {funnel.map((s, i) => {
              const fromStart = s.conversionFromStart.toFixed(1);
              const fromPrev = s.conversionFromPrev.toFixed(1);
              const widthPct = funnel[0]?.count
                ? Math.max(8, (s.count / Math.max(1, funnel[0].count)) * 100)
                : 8;
              return (
                <li
                  key={s.name}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c45a22]/40 to-[#f2a261]/15"
                    style={{ width: `${widthPct}%` }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                      Step {i + 1}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">{s.name}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                      {s.count.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-white/55">
                      {i === 0 ? "Top of funnel" : `${fromPrev}% from previous · ${fromStart}% from start`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {/* Pageviews trend */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Trend</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Daily pageviews</h2>
          </div>
          <p className="text-xs text-white/40">{daily.length} day{daily.length === 1 ? "" : "s"} of data</p>
        </div>
        {daily.length === 0 ? (
          <Empty>No pageview events recorded in this window.</Empty>
        ) : (
          <div className="mt-6 flex h-44 items-end gap-1.5">
            {daily.map((d) => (
              <div
                key={d.date}
                className="group relative flex-1"
                title={`${d.date} · ${d.pageviews} pageviews · ${d.visitors} visitors`}
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#c45a22] to-[#f2a261] transition group-hover:from-[#a8430f] group-hover:to-[#e89055]"
                  style={{ height: `${Math.max(4, (d.pageviews / maxDaily) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top pages + Referrers side by side */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Top pages" eyebrow="Where they land">
          {topPages.length === 0 ? (
            <Empty>No pageviews tracked yet.</Empty>
          ) : (
            <BarList
              rows={topPages.map((p) => ({
                label: p.path || "/",
                value: p.pageviews,
                sub: `${p.visitors.toLocaleString()} visitors`,
              }))}
            />
          )}
        </Card>

        <Card title="Top referrers" eyebrow="How they got here">
          {referrers.length === 0 ? (
            <Empty>No referrer data yet.</Empty>
          ) : (
            <BarList
              rows={referrers.map((r) => ({
                label: r.source,
                value: r.visits,
              }))}
            />
          )}
        </Card>
      </section>

      {/* Devices */}
      <section className="mt-8">
        <Card title="Device mix" eyebrow="Mobile / desktop / tablet">
          {devices.length === 0 ? (
            <Empty>No device data yet.</Empty>
          ) : (
            <div className="space-y-3">
              {devices.map((d) => {
                const pct = (d.visits / totalDeviceVisits) * 100;
                return (
                  <div key={d.device}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white">{d.device}</span>
                      <span className="text-white/60">
                        {d.visits.toLocaleString()} · {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#c45a22] to-[#f2a261]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </section>

      {/* Geo — where visitors come from */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Geo</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Where visitors come from</h2>
            <p className="mt-1 text-xs text-white/50">
              Country and city breakdown for the last {WINDOW_DAYS} days. Hover the map for details.
            </p>
          </div>
        </div>
        {worldTopology && (countries.length > 0 || usStates.length > 0) ? (
          <div className="mt-6">
            <VisitorsMap
              worldTopology={worldTopology as Parameters<typeof VisitorsMap>[0]["worldTopology"]}
              usTopology={usTopology as Parameters<typeof VisitorsMap>[0]["usTopology"]}
              countries={countries}
              states={usStates}
              cityPoints={cityPoints}
              windowDays={WINDOW_DAYS}
            />
          </div>
        ) : (
          <Empty>
            {worldTopology
              ? "No geo-tagged pageviews yet. Once visitors land on the site, they'll appear here."
              : "World map data failed to load (public/data/countries-110m.json missing)."}
          </Empty>
        )}

        {/* Top cities row */}
        {cities.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Top cities
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cities.map((c, i) => (
                <li
                  key={`${c.city}-${c.region}-${c.country}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{c.city}</p>
                    <p className="truncate text-xs text-white/45">
                      {[c.region, c.country].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <span className="flex-none whitespace-nowrap text-white/70">
                    {c.visitors.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Session replays */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Replays
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">Session recordings</h2>
            <p className="mt-1 text-xs text-white/50">
              Last 7 days of recorded sessions. Click a row to open the full PostHog player.
            </p>
          </div>
          {phReady && (
            <a
              href={`${status.host}/project/${status.projectId}/replay/home`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-white/40 hover:text-white"
            >
              All replays ↗
            </a>
          )}
        </div>
        {replays.length === 0 ? (
          <Empty>
            No replays yet. Once visitors land on the site, recordings appear here within a few minutes.
          </Empty>
        ) : (
          <ul className="mt-6 grid gap-3 lg:grid-cols-2">
            {replays.map((r) => (
              <li key={r.id}>
                <a
                  href={r.playerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[#f2a261]/40 hover:bg-black/40"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#c45a22]/20 text-[#f2a261] transition group-hover:bg-[#c45a22]/40"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span>{fmtDuration(r.durationSec)}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/65">
                        {r.clickCount} clicks · {r.keypressCount} keys
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-white/55" title={r.startUrl}>
                      {pathFromUrl(r.startUrl) || "/"}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
                      {fmtDateTime(r.startTime)}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex-none text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#f2a261]"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Errors */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Recent errors" eyebrow="JavaScript exceptions">
          {errors.length === 0 ? (
            <Empty>No errors captured in the last 7 days. 🎉</Empty>
          ) : (
            <ul className="space-y-2">
              {errors.map((e, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs"
                >
                  <p className="font-mono text-red-200 break-words">{e.message}</p>
                  <p className="mt-1 text-white/50">
                    {e.pathname || "/"} · {fmtDateTime(e.timestamp)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Recent events" eyebrow="Live feed">
          {eventsFeed.length === 0 ? (
            <Empty>No events yet.</Empty>
          ) : (
            <ul className="max-h-96 space-y-1.5 overflow-y-auto pr-1">
              {eventsFeed.map((e, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-xs"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      <EventChip name={e.event} /> {e.pathname || "—"}
                    </p>
                    <p className="text-white/45">{fmtDateTime(e.timestamp)}</p>
                  </div>
                  <span className="flex-none text-white/40">{e.device || "—"}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      {/* Submissions table */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Inbox</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Contact-form submissions</h2>
          </div>
          <p className="text-xs text-white/40">
            {stats.total} total · {stats.last7d} in last 7 days
          </p>
        </div>
        <SubmissionsTable rows={[...submissions].reverse()} />
      </section>

      <footer className="mt-12 text-center text-xs text-white/30">
        Build {process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local"} · session ends after 7 days of inactivity.
      </footer>
    </main>
  );
}

// ----------------------- Local presentational helpers -----------------------

function Kpi(props: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  warning?: boolean;
}) {
  const border = props.warning
    ? "border-red-400/30"
    : props.accent
      ? "border-[#f2a261]/40"
      : "border-white/10";
  return (
    <div className={`rounded-2xl border ${border} bg-white/[0.03] p-5`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{props.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{props.value}</p>
      {props.sub && <p className="mt-1 text-xs text-white/50">{props.sub}</p>}
    </div>
  );
}

function Card(props: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{props.eyebrow}</p>
      <h3 className="mt-1 text-xl font-semibold text-white">{props.title}</h3>
      <div className="mt-5">{props.children}</div>
    </div>
  );
}

function BarList(props: { rows: Array<{ label: string; value: number; sub?: string }> }) {
  const max = Math.max(1, ...props.rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {props.rows.map((r) => {
        const pct = (r.value / max) * 100;
        return (
          <li key={r.label} className="relative overflow-hidden rounded-lg bg-white/[0.04] px-3 py-2">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c45a22]/60 to-[#f2a261]/30"
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-3 text-sm">
              <span className="truncate font-medium text-white" title={r.label}>
                {r.label}
              </span>
              <span className="flex-none whitespace-nowrap text-white/70">
                {r.value.toLocaleString()}
                {r.sub ? <span className="ml-2 text-white/40">· {r.sub}</span> : null}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Empty(props: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/50">
      {props.children}
    </div>
  );
}

function EventChip({ name }: { name: string }) {
  const tone =
    name === "book_button_clicked"
      ? "bg-[#c45a22]/20 text-[#f2a261]"
      : name === "contact_form_submitted"
        ? "bg-emerald-400/15 text-emerald-200"
        : name === "$pageview"
          ? "bg-white/10 text-white/75"
          : name === "$exception"
            ? "bg-red-400/15 text-red-200"
            : "bg-white/[0.06] text-white/65";
  return (
    <span className={`mr-2 inline-block rounded px-1.5 py-0.5 font-mono text-[10px] ${tone}`}>
      {name}
    </span>
  );
}

function fmtDuration(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function fmtDateTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function pathFromUrl(u: string): string {
  if (!u) return "";
  try {
    return new URL(u).pathname;
  } catch {
    return u;
  }
}
