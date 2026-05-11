"use client";

import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { CountryVisitors } from "@/lib/posthog";
import { NUMERIC_TO_ALPHA2 } from "@/lib/iso-country-codes";

type Topology = Parameters<typeof feature>[0];
type FeatureCollection = ReturnType<typeof feature>;

const WIDTH = 980;
const HEIGHT = 460;

function logScale(v: number, max: number): number {
  // log1p so a single visitor still gets a visible color, but the top
  // countries don't completely swamp the gradient.
  if (max <= 0) return 0;
  return Math.log1p(v) / Math.log1p(max);
}

/** Interpolate ember-700 → ember-400 by t ∈ [0,1]. */
function colorFor(t: number): string {
  if (t <= 0) return "#1f1a18"; // no-data: near ink-900
  // ember-700 #832f08 → ember-500 #b85213 → ember-400 #f2a261
  const stops = [
    { t: 0.0, c: [60, 36, 28] }, // softer base for "1 visitor" — still distinct from no-data
    { t: 0.25, c: [131, 47, 8] }, // ember-700
    { t: 0.55, c: [184, 82, 19] }, // ember-500
    { t: 1.0, c: [242, 162, 97] }, // ember-400
  ];
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    if (t <= b.t) {
      const local = (t - a.t) / (b.t - a.t);
      const r = Math.round(a.c[0] + (b.c[0] - a.c[0]) * local);
      const g = Math.round(a.c[1] + (b.c[1] - a.c[1]) * local);
      const blu = Math.round(a.c[2] + (b.c[2] - a.c[2]) * local);
      return `rgb(${r},${g},${blu})`;
    }
  }
  return "rgb(242,162,97)";
}

export function VisitorsMap({
  topology,
  countries,
  windowDays,
}: {
  topology: Topology;
  countries: CountryVisitors[];
  windowDays: number;
}) {
  const [hover, setHover] = useState<{
    name: string;
    visitors: number;
    pageviews: number;
    x: number;
    y: number;
  } | null>(null);

  const byAlpha2 = useMemo(() => {
    const m = new Map<string, CountryVisitors>();
    countries.forEach((c) => m.set(c.code.toUpperCase(), c));
    return m;
  }, [countries]);

  const maxVisitors = Math.max(1, ...countries.map((c) => c.visitors));

  // Convert TopoJSON → GeoJSON FeatureCollection (one-time).
  const geo = useMemo(() => {
    // The world-atlas object is named "countries".
    const obj = (topology as { objects: Record<string, unknown> }).objects.countries;
    if (!obj) return null;
    return feature(topology, obj as Parameters<typeof feature>[1]) as FeatureCollection;
  }, [topology]);

  // Equal-area-ish projection that looks good for a global view.
  const projection = useMemo(
    () => geoNaturalEarth1().fitSize([WIDTH, HEIGHT], geo ?? { type: "Sphere" } as unknown as never),
    [geo],
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  if (!geo || !("features" in geo)) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-white/50">
        Map data failed to load.
      </div>
    );
  }

  const totalVisitors = countries.reduce((sum, c) => sum + c.visitors, 0);
  const topCountries = countries.slice(0, 8);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
      {/* Map */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a09]">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="World map of visitors by country"
          className="block h-auto w-full"
          onMouseLeave={() => setHover(null)}
        >
          {/* Sphere outline */}
          <path
            d={pathGen({ type: "Sphere" }) ?? undefined}
            fill="#0b0a09"
            stroke="rgba(255,255,255,0.06)"
          />
          {geo.features.map((f, i) => {
            const numericId = typeof f.id === "string" ? f.id : String(f.id ?? "");
            const alpha2 = NUMERIC_TO_ALPHA2[numericId];
            const data = alpha2 ? byAlpha2.get(alpha2) : undefined;
            const t = data ? logScale(data.visitors, maxVisitors) : 0;
            const fill = data ? colorFor(t) : "#1a1614"; // ink-900
            const d = pathGen(f) ?? "";
            const name =
              (f.properties as { name?: string } | undefined)?.name ?? "Unknown";
            return (
              <path
                key={i}
                d={d}
                fill={fill}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.4}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setHover({
                    name: data?.name ?? name,
                    visitors: data?.visitors ?? 0,
                    pageviews: data?.pageviews ?? 0,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/15 bg-black/85 px-3 py-2 text-xs shadow-xl backdrop-blur"
            style={{ left: hover.x, top: Math.max(34, hover.y - 8) }}
          >
            <p className="font-semibold text-white">{hover.name}</p>
            <p className="mt-0.5 text-white/70">
              {hover.visitors.toLocaleString()} visitors · {hover.pageviews.toLocaleString()} pageviews
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-3 border-t border-white/10 bg-black/40 px-4 py-2.5 text-[10px] uppercase tracking-wider text-white/55">
          <span>0</span>
          <div
            className="h-2 flex-1 rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgb(60,36,28), rgb(131,47,8), rgb(184,82,19), rgb(242,162,97))",
            }}
            aria-hidden="true"
          />
          <span>{maxVisitors.toLocaleString()}</span>
        </div>
      </div>

      {/* Right panel: top countries */}
      <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Top countries
        </p>
        <p className="mt-1 text-lg font-semibold text-white">
          {countries.length} {countries.length === 1 ? "country" : "countries"}
          <span className="ml-2 text-white/45">
            · {totalVisitors.toLocaleString()} visitors total
          </span>
        </p>
        {topCountries.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/50">
            No geo-tagged pageviews in the last {windowDays} days.
          </div>
        ) : (
          <ul className="mt-5 space-y-2">
            {topCountries.map((c) => {
              const pct = (c.visitors / maxVisitors) * 100;
              return (
                <li
                  key={c.code}
                  className="relative overflow-hidden rounded-lg bg-white/[0.04] px-3 py-2"
                >
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(to right, rgba(184,82,19,0.55), rgba(242,162,97,0.2))",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Flag code={c.code} />
                      <span className="truncate font-medium text-white">{c.name}</span>
                    </span>
                    <span className="flex-none whitespace-nowrap text-white/75">
                      {c.visitors.toLocaleString()}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {countries.length > topCountries.length && (
          <p className="mt-4 text-xs text-white/40">
            +{countries.length - topCountries.length} more on the map →
          </p>
        )}
      </div>
    </div>
  );
}

/** Twemoji-style emoji flag from alpha-2 code. */
function Flag({ code }: { code: string }) {
  if (!code || code.length !== 2) {
    return <span className="text-base" aria-hidden="true">🏳️</span>;
  }
  const emoji = code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
  return (
    <span className="text-base" aria-hidden="true">
      {emoji}
    </span>
  );
}
