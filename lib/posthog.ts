/**
 * Minimal server-side PostHog client for the /admin dashboard.
 *
 * Uses a Personal API key (POSTHOG_PERSONAL_API_KEY) to call the HogQL
 * query endpoint:  POST /api/projects/{id}/query
 *
 * All functions degrade gracefully — on error or missing config, they
 * return an empty result so the UI can render a "No data yet" card
 * instead of throwing.
 */

const DEFAULT_HOST = "https://us.posthog.com";

function getHost(): string {
  const h = (process.env.POSTHOG_HOST || DEFAULT_HOST).trim();
  return h.replace(/\/$/, "");
}

function getApiKey(): string | null {
  const k = process.env.POSTHOG_PERSONAL_API_KEY;
  return k && k.length > 8 ? k : null;
}

let cachedProjectId: string | null = null;

async function discoverProjectId(): Promise<string | null> {
  if (cachedProjectId) return cachedProjectId;
  const explicit = process.env.POSTHOG_PROJECT_ID;
  if (explicit && explicit.trim()) {
    cachedProjectId = explicit.trim();
    return cachedProjectId;
  }
  const key = getApiKey();
  if (!key) return null;
  try {
    const r = await fetch(`${getHost()}/api/projects/`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const json = (await r.json()) as { results?: Array<{ id: number | string }> };
    const first = json.results?.[0]?.id;
    if (first == null) return null;
    cachedProjectId = String(first);
    return cachedProjectId;
  } catch {
    return null;
  }
}

export type PostHogStatus =
  | { ok: true; projectId: string; host: string }
  | { ok: false; reason: "no_api_key" | "no_project" | "unreachable" };

export async function getStatus(): Promise<PostHogStatus> {
  if (!getApiKey()) return { ok: false, reason: "no_api_key" };
  const pid = await discoverProjectId();
  if (!pid) return { ok: false, reason: "no_project" };
  return { ok: true, projectId: pid, host: getHost() };
}

type HogQLResponse = {
  results?: unknown[][];
  columns?: string[];
  error?: string;
};

async function hogql(query: string): Promise<HogQLResponse | null> {
  const key = getApiKey();
  if (!key) return null;
  const pid = await discoverProjectId();
  if (!pid) return null;
  try {
    const r = await fetch(`${getHost()}/api/projects/${pid}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: { kind: "HogQLQuery", query },
      }),
      cache: "no-store",
    });
    if (!r.ok) {
      return { error: `${r.status} ${r.statusText}` };
    }
    return (await r.json()) as HogQLResponse;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ----------------------- Public query helpers -----------------------

export type Kpis = {
  pageviews: number;
  visitors: number;
  sessions: number;
  windowDays: number;
};

export async function getKpis(days = 30): Promise<Kpis> {
  const out: Kpis = { pageviews: 0, visitors: 0, sessions: 0, windowDays: days };
  const r = await hogql(`
    SELECT
      countIf(event = '$pageview') AS pageviews,
      uniq(person_id) AS visitors,
      uniq(properties.$session_id) AS sessions
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$pageview'
  `);
  const row = r?.results?.[0];
  if (Array.isArray(row)) {
    out.pageviews = Number(row[0] ?? 0);
    out.visitors = Number(row[1] ?? 0);
    out.sessions = Number(row[2] ?? 0);
  }
  return out;
}

export type DailyPoint = { date: string; pageviews: number; visitors: number };

export async function getDailyTrend(days = 30): Promise<DailyPoint[]> {
  const r = await hogql(`
    SELECT
      toDate(timestamp) AS day,
      countIf(event = '$pageview') AS pageviews,
      uniq(person_id) AS visitors
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$pageview'
    GROUP BY day
    ORDER BY day ASC
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      date: String(row[0] ?? ""),
      pageviews: Number(row[1] ?? 0),
      visitors: Number(row[2] ?? 0),
    }));
}

export type TopPage = { path: string; pageviews: number; visitors: number };

export async function getTopPages(days = 30, limit = 10): Promise<TopPage[]> {
  const r = await hogql(`
    SELECT
      properties.$pathname AS path,
      count() AS pageviews,
      uniq(person_id) AS visitors
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$pageview'
      AND properties.$pathname IS NOT NULL
    GROUP BY path
    ORDER BY pageviews DESC
    LIMIT ${limit}
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      path: String(row[0] ?? "/"),
      pageviews: Number(row[1] ?? 0),
      visitors: Number(row[2] ?? 0),
    }));
}

export type Referrer = { source: string; visits: number };

export async function getTopReferrers(days = 30, limit = 8): Promise<Referrer[]> {
  const r = await hogql(`
    SELECT
      coalesce(nullIf(properties.$referring_domain, ''), '(direct)') AS source,
      count() AS visits
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$pageview'
    GROUP BY source
    ORDER BY visits DESC
    LIMIT ${limit}
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      source: String(row[0] ?? "(direct)"),
      visits: Number(row[1] ?? 0),
    }));
}

// ----------------------- Session replays -----------------------

export type Replay = {
  id: string;
  startTime: string;
  durationSec: number;
  pageviewCount: number;
  clickCount: number;
  keypressCount: number;
  startUrl: string;
  personId: string;
  playerUrl: string;
};

export async function getRecentReplays(days = 7, limit = 12): Promise<Replay[]> {
  const key = getApiKey();
  if (!key) return [];
  const pid = await discoverProjectId();
  if (!pid) return [];
  try {
    const fromIso = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const url = `${getHost()}/api/projects/${pid}/session_recordings/?limit=${limit}&date_from=${encodeURIComponent(
      fromIso,
    )}`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!r.ok) return [];
    type RawReplay = {
      id: string;
      start_time?: string;
      recording_duration?: number;
      click_count?: number;
      keypress_count?: number;
      start_url?: string;
      person?: { id?: number | string; distinct_ids?: string[] };
    };
    const json = (await r.json()) as { results?: RawReplay[] };
    return (json.results ?? []).map((rec) => ({
      id: rec.id,
      startTime: rec.start_time ?? "",
      durationSec: Math.round(rec.recording_duration ?? 0),
      pageviewCount: 0,
      clickCount: rec.click_count ?? 0,
      keypressCount: rec.keypress_count ?? 0,
      startUrl: rec.start_url ?? "",
      personId: String(rec.person?.id ?? rec.person?.distinct_ids?.[0] ?? ""),
      playerUrl: `${getHost()}/project/${pid}/replay/${rec.id}`,
    }));
  } catch {
    return [];
  }
}

// ----------------------- Booking funnel -----------------------

export type FunnelStep = {
  name: string;
  count: number;
  conversionFromPrev: number;
  conversionFromStart: number;
};

export async function getBookingFunnel(days = 30): Promise<FunnelStep[]> {
  const r = await hogql(`
    SELECT
      uniqIf(person_id, event = '$pageview') AS visited,
      uniqIf(person_id, event = 'book_button_clicked') AS clicked_book,
      uniqIf(person_id, event = 'contact_form_submitted') AS submitted_contact
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
  `);
  const row = r?.results?.[0];
  if (!Array.isArray(row)) {
    return [
      { name: "Visited site", count: 0, conversionFromPrev: 0, conversionFromStart: 0 },
      { name: "Clicked Book", count: 0, conversionFromPrev: 0, conversionFromStart: 0 },
      { name: "Submitted contact form", count: 0, conversionFromPrev: 0, conversionFromStart: 0 },
    ];
  }
  const visited = Number(row[0] ?? 0);
  const clicked = Number(row[1] ?? 0);
  const submitted = Number(row[2] ?? 0);
  const pct = (n: number, d: number) => (d > 0 ? (n / d) * 100 : 0);
  return [
    {
      name: "Visited site",
      count: visited,
      conversionFromPrev: 100,
      conversionFromStart: 100,
    },
    {
      name: "Clicked Book",
      count: clicked,
      conversionFromPrev: pct(clicked, visited),
      conversionFromStart: pct(clicked, visited),
    },
    {
      name: "Submitted contact form",
      count: submitted,
      conversionFromPrev: pct(submitted, clicked),
      conversionFromStart: pct(submitted, visited),
    },
  ];
}

// ----------------------- Errors -----------------------

export type ErrorRow = {
  timestamp: string;
  message: string;
  type: string;
  pathname: string;
};

export async function getRecentErrors(days = 7, limit = 12): Promise<ErrorRow[]> {
  const r = await hogql(`
    SELECT
      timestamp,
      coalesce(properties.$exception_message, properties.$exception_type, '(unknown)') AS message,
      coalesce(properties.$exception_type, '') AS type,
      coalesce(properties.$pathname, '') AS pathname
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$exception'
    ORDER BY timestamp DESC
    LIMIT ${limit}
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      timestamp: String(row[0] ?? ""),
      message: String(row[1] ?? ""),
      type: String(row[2] ?? ""),
      pathname: String(row[3] ?? ""),
    }));
}

// ----------------------- Recent events feed -----------------------

export type EventRow = {
  timestamp: string;
  event: string;
  pathname: string;
  device: string;
};

export async function getRecentEvents(limit = 40): Promise<EventRow[]> {
  const r = await hogql(`
    SELECT
      timestamp,
      event,
      coalesce(properties.$pathname, '') AS pathname,
      coalesce(properties.$device_type, '') AS device
    FROM events
    WHERE event NOT IN ('$pageleave', '$autocapture', '$feature_flag_called')
    ORDER BY timestamp DESC
    LIMIT ${limit}
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      timestamp: String(row[0] ?? ""),
      event: String(row[1] ?? ""),
      pathname: String(row[2] ?? ""),
      device: String(row[3] ?? ""),
    }));
}

// ----------------------- Devices (existing) -----------------------

export type DeviceSlice = { device: string; visits: number };

export async function getDeviceBreakdown(days = 30): Promise<DeviceSlice[]> {
  const r = await hogql(`
    SELECT
      coalesce(nullIf(properties.$device_type, ''), 'Unknown') AS device,
      count() AS visits
    FROM events
    WHERE timestamp >= now() - INTERVAL ${days} DAY
      AND event = '$pageview'
    GROUP BY device
    ORDER BY visits DESC
  `);
  if (!r?.results) return [];
  return r.results
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => ({
      device: String(row[0] ?? "Unknown"),
      visits: Number(row[1] ?? 0),
    }));
}
