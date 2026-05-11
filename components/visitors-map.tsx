"use client";

import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import {
  geoAlbersUsa,
  geoNaturalEarth1,
  geoPath,
  type GeoProjection,
} from "d3-geo";
import type { CityPoint, CountryVisitors, StateVisitors } from "@/lib/posthog";
import { NUMERIC_TO_ALPHA2 } from "@/lib/iso-country-codes";

type Topology = Parameters<typeof feature>[0];
type GeoFeature = {
  type: "Feature";
  id?: string | number;
  properties?: Record<string, unknown>;
  geometry: unknown;
};
type FeatureCollection = { type: "FeatureCollection"; features: GeoFeature[] };

const WIDTH = 980;
const HEIGHT = 500;

type ViewMode = "world" | "us";

export function VisitorsMap({
  worldTopology,
  usTopology,
  countries,
  states,
  cityPoints,
  windowDays,
}: {
  worldTopology: Topology;
  usTopology: Topology | null;
  countries: CountryVisitors[];
  states: StateVisitors[];
  cityPoints: CityPoint[];
  windowDays: number;
}) {
  const [view, setView] = useState<ViewMode>("us");
  const [selectedState, setSelectedState] = useState<string | null>(null); // full state name
  const [hover, setHover] = useState<{
    title: string;
    sub: string;
    x: number;
    y: number;
  } | null>(null);

  // ----------------------- World view data -----------------------
  const countryByAlpha2 = useMemo(() => {
    const m = new Map<string, CountryVisitors>();
    countries.forEach((c) => m.set(c.code.toUpperCase(), c));
    return m;
  }, [countries]);
  const maxCountry = Math.max(1, ...countries.map((c) => c.visitors));

  const worldGeo = useMemo<FeatureCollection | null>(() => {
    const obj = (worldTopology as { objects: Record<string, unknown> }).objects.countries;
    if (!obj) return null;
    return feature(
      worldTopology,
      obj as Parameters<typeof feature>[1],
    ) as unknown as FeatureCollection;
  }, [worldTopology]);

  // ----------------------- US view data --------------------------
  const stateByName = useMemo(() => {
    const m = new Map<string, StateVisitors>();
    states.forEach((s) => m.set(s.state.toLowerCase(), s));
    return m;
  }, [states]);
  const maxState = Math.max(1, ...states.map((s) => s.visitors));

  const usGeo = useMemo<FeatureCollection | null>(() => {
    if (!usTopology) return null;
    const obj = (usTopology as { objects: Record<string, unknown> }).objects.states;
    if (!obj) return null;
    return feature(
      usTopology,
      obj as Parameters<typeof feature>[1],
    ) as unknown as FeatureCollection;
  }, [usTopology]);

  // ----------------------- Projection ----------------------------
  const projection = useMemo<GeoProjection | null>(() => {
    if (view === "world") {
      if (!worldGeo) return null;
      return geoNaturalEarth1().fitSize(
        [WIDTH, HEIGHT],
        worldGeo as unknown as Parameters<GeoProjection["fitSize"]>[1],
      );
    }
    if (!usGeo) return null;
    if (selectedState) {
      const f = usGeo.features.find(
        (x) =>
          (x.properties as { name?: string } | undefined)?.name?.toLowerCase() ===
          selectedState.toLowerCase(),
      );
      if (f) {
        // fitSize with a small padding so the state isn't flush against edges.
        return geoAlbersUsa().fitExtent(
          [
            [40, 30],
            [WIDTH - 40, HEIGHT - 30],
          ],
          f as unknown as Parameters<GeoProjection["fitExtent"]>[1],
        );
      }
    }
    return geoAlbersUsa().fitSize(
      [WIDTH, HEIGHT],
      usGeo as unknown as Parameters<GeoProjection["fitSize"]>[1],
    );
  }, [view, worldGeo, usGeo, selectedState]);

  const pathGen = useMemo(
    () => (projection ? geoPath(projection) : null),
    [projection],
  );

  // ----------------------- Dots (US view only) -------------------
  const dots = useMemo(() => {
    if (view !== "us") return [];
    if (!projection) return [];
    const filtered = selectedState
      ? cityPoints.filter(
          (c) => c.state.toLowerCase() === selectedState.toLowerCase(),
        )
      : cityPoints.filter((c) =>
          c.country.toLowerCase().startsWith("united states"),
        );
    const maxV = Math.max(1, ...filtered.map((c) => c.visitors));
    return filtered
      .map((c) => {
        const xy = projection([c.lng, c.lat]);
        if (!xy) return null;
        const t = Math.log1p(c.visitors) / Math.log1p(maxV);
        const r = 3 + t * 13; // 3px → 16px radius
        return { ...c, x: xy[0], y: xy[1], r };
      })
      .filter((d): d is NonNullable<typeof d> => d !== null)
      .sort((a, b) => b.r - a.r); // big dots painted first, small dots on top
  }, [view, selectedState, cityPoints, projection]);

  // ----------------------- Right-panel rows ----------------------
  const rightPanel = useMemo(() => {
    if (view === "world") {
      return {
        title: "Top countries",
        total: `${countries.length} ${countries.length === 1 ? "country" : "countries"} · ${countries
          .reduce((s, c) => s + c.visitors, 0)
          .toLocaleString()} visitors`,
        rows: countries.slice(0, 10).map((c) => ({
          key: c.code,
          flag: c.code,
          label: c.name,
          value: c.visitors,
          max: maxCountry,
          onClick: undefined,
        })),
        empty: `No geo-tagged pageviews in the last ${windowDays} days.`,
      };
    }
    if (selectedState) {
      const stateCities = cityPoints
        .filter((c) => c.state.toLowerCase() === selectedState.toLowerCase())
        .sort((a, b) => b.visitors - a.visitors);
      const maxCity = Math.max(1, ...stateCities.map((c) => c.visitors));
      return {
        title: `${selectedState} · top cities`,
        total: `${stateCities.length} ${stateCities.length === 1 ? "city" : "cities"} · ${stateCities
          .reduce((s, c) => s + c.visitors, 0)
          .toLocaleString()} visitors`,
        rows: stateCities.slice(0, 10).map((c, i) => ({
          key: `${c.city}-${i}`,
          flag: "",
          label: c.city,
          value: c.visitors,
          max: maxCity,
          onClick: undefined,
        })),
        empty: `No cities yet for ${selectedState}.`,
      };
    }
    return {
      title: "Top states",
      total: `${states.length} ${states.length === 1 ? "state" : "states"} · ${states
        .reduce((s, c) => s + c.visitors, 0)
        .toLocaleString()} visitors`,
      rows: states.slice(0, 10).map((s) => ({
        key: s.state,
        flag: "",
        label: s.state,
        value: s.visitors,
        max: maxState,
        onClick: () => setSelectedState(s.state),
      })),
      empty: `No US visitors yet in the last ${windowDays} days.`,
    };
  }, [
    view,
    selectedState,
    countries,
    states,
    cityPoints,
    maxCountry,
    maxState,
    windowDays,
  ]);

  // ----------------------- Render --------------------------------
  if (!pathGen) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-white/50">
        Map data failed to load.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1 text-xs font-semibold uppercase tracking-wider">
          <ViewTab active={view === "us"} onClick={() => { setView("us"); setSelectedState(null); }}>
            United States
          </ViewTab>
          <ViewTab active={view === "world"} onClick={() => { setView("world"); setSelectedState(null); }}>
            World
          </ViewTab>
        </div>
        {view === "us" && selectedState && (
          <button
            onClick={() => setSelectedState(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-[#f2a261]/60 hover:text-white"
          >
            ← All states
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Map */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a09]">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={view === "world" ? "World map of visitors" : "US map of visitors"}
            className="block h-auto w-full"
            onMouseLeave={() => setHover(null)}
          >
            {/* World view */}
            {view === "world" && worldGeo &&
              worldGeo.features.map((f, i) => {
                const numericId = String(f.id ?? "");
                const alpha2 = NUMERIC_TO_ALPHA2[numericId];
                const data = alpha2 ? countryByAlpha2.get(alpha2) : undefined;
                const t = data ? Math.log1p(data.visitors) / Math.log1p(maxCountry) : 0;
                const fill = data ? colorFor(t) : "#1a1614";
                const name =
                  (f.properties as { name?: string } | undefined)?.name ?? "Unknown";
                return (
                  <path
                    key={i}
                    d={pathGen(f as never) ?? ""}
                    fill={fill}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={0.4}
                    onMouseMove={(e) =>
                      setHover({
                        title: data?.name ?? name,
                        sub: data
                          ? `${data.visitors.toLocaleString()} visitors · ${data.pageviews.toLocaleString()} pageviews`
                          : "No visitors",
                        ...mousePos(e),
                      })
                    }
                  />
                );
              })}

            {/* US view — state polygons */}
            {view === "us" && usGeo &&
              usGeo.features.map((f, i) => {
                const name =
                  (f.properties as { name?: string } | undefined)?.name ?? "Unknown";
                const data = stateByName.get(name.toLowerCase());
                const t = data ? Math.log1p(data.visitors) / Math.log1p(maxState) : 0;
                const baseFill = data ? colorFor(t) : "#1a1614";
                const isSelected =
                  selectedState && name.toLowerCase() === selectedState.toLowerCase();
                const isDimmed = !!selectedState && !isSelected;
                const stroke = isSelected ? "#f2a261" : "rgba(255,255,255,0.12)";
                const strokeWidth = isSelected ? 1.5 : 0.5;
                const opacity = isDimmed ? 0.35 : 1;
                return (
                  <path
                    key={i}
                    d={pathGen(f as never) ?? ""}
                    fill={baseFill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    className={
                      data
                        ? "cursor-pointer transition-[opacity,stroke-width] duration-150"
                        : "transition-[opacity] duration-150"
                    }
                    onMouseMove={(e) =>
                      setHover({
                        title: name,
                        sub: data
                          ? `${data.visitors.toLocaleString()} visitors · ${data.pageviews.toLocaleString()} pageviews · click for cities`
                          : "No visitors",
                        ...mousePos(e),
                      })
                    }
                    onClick={() => {
                      if (data) setSelectedState((cur) => (cur === name ? null : name));
                    }}
                  />
                );
              })}

            {/* City dots — US view only */}
            {view === "us" &&
              dots.map((d) => (
                <g key={`${d.city}-${d.state}`}>
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.r + 4}
                    fill="rgba(242,162,97,0.18)"
                  />
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.r}
                    fill="rgba(242,162,97,0.95)"
                    stroke="#0b0a09"
                    strokeWidth={1.25}
                    className="cursor-pointer"
                    onMouseMove={(e) =>
                      setHover({
                        title: d.city,
                        sub: [d.state, d.country].filter(Boolean).join(" · "),
                        ...mousePos(e),
                      })
                    }
                  />
                </g>
              ))}
          </svg>

          {/* Tooltip */}
          {hover && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/15 bg-black/85 px-3 py-2 text-xs shadow-xl backdrop-blur"
              style={{ left: hover.x, top: Math.max(40, hover.y - 8) }}
            >
              <p className="font-semibold text-white">{hover.title}</p>
              <p className="mt-0.5 text-white/70">{hover.sub}</p>
            </div>
          )}

          {/* Legend / hint bar */}
          <div className="flex items-center gap-3 border-t border-white/10 bg-black/40 px-4 py-2.5 text-[10px] uppercase tracking-wider text-white/55">
            {view === "us" && !selectedState ? (
              <span>Click a state to see city-level dots</span>
            ) : view === "us" && selectedState ? (
              <span>
                Showing{" "}
                <span className="text-white/85">{dots.length}</span> cit{dots.length === 1 ? "y" : "ies"} in {selectedState}
              </span>
            ) : (
              <span>Hover any country for details</span>
            )}
            <span className="ml-auto flex items-center gap-2">
              <span>0</span>
              <span
                aria-hidden="true"
                className="h-2 w-32 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, rgb(60,36,28), rgb(131,47,8), rgb(184,82,19), rgb(242,162,97))",
                }}
              />
              <span>
                {(view === "world"
                  ? maxCountry
                  : selectedState
                    ? Math.max(
                        1,
                        ...cityPoints
                          .filter(
                            (c) =>
                              c.state.toLowerCase() ===
                              selectedState.toLowerCase(),
                          )
                          .map((c) => c.visitors),
                      )
                    : maxState
                ).toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {rightPanel.title}
          </p>
          <p className="mt-1 text-xs text-white/55">{rightPanel.total}</p>
          {rightPanel.rows.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/50">
              {rightPanel.empty}
            </div>
          ) : (
            <ul className="mt-5 space-y-2">
              {rightPanel.rows.map((r) => {
                const pct = (r.value / r.max) * 100;
                const Item = (
                  <div className="relative overflow-hidden rounded-lg bg-white/[0.04] px-3 py-2">
                    <div
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(to right, rgba(184,82,19,0.55), rgba(242,162,97,0.2))",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center justify-between gap-3 text-sm">
                      <span className="flex min-w-0 items-center gap-2.5">
                        {r.flag ? <Flag code={r.flag} /> : null}
                        <span className="truncate font-medium text-white">{r.label}</span>
                      </span>
                      <span className="flex-none whitespace-nowrap text-white/75">
                        {r.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
                if (r.onClick) {
                  return (
                    <li key={r.key}>
                      <button
                        type="button"
                        onClick={r.onClick}
                        className="block w-full text-left transition hover:brightness-125"
                      >
                        {Item}
                      </button>
                    </li>
                  );
                }
                return <li key={r.key}>{Item}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------- Helpers -----------------------

function mousePos(e: React.MouseEvent<SVGElement>): { x: number; y: number } {
  const svg = e.currentTarget.ownerSVGElement;
  if (!svg) return { x: 0, y: 0 };
  const rect = svg.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function colorFor(t: number): string {
  if (t <= 0) return "#1f1a18";
  const stops = [
    { t: 0.0, c: [60, 36, 28] },
    { t: 0.25, c: [131, 47, 8] },
    { t: 0.55, c: [184, 82, 19] },
    { t: 1.0, c: [242, 162, 97] },
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

function ViewTab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-4 py-1.5 transition " +
        (active ? "bg-[#c45a22] text-white" : "text-white/65 hover:text-white")
      }
    >
      {children}
    </button>
  );
}

function Flag({ code }: { code: string }) {
  if (!code || code.length !== 2) return <span className="text-base" aria-hidden="true">🏳️</span>;
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
