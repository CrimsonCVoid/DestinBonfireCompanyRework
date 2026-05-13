import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * Cinematic locations teaser. Full-bleed background flyover video runs
 * the entire section height; the headline + community chip list + CTAs
 * sit centered on top of a dark overlay. The full grid of every
 * permitted beach lives on /locations - this section just headlines
 * the offer and points visitors there.
 */
export function CommunitiesSection() {
  const COMMUNITY_PINS = [
    "Miramar Beach",
    "Dune Allen",
    "Gulf Place",
    "Santa Rosa Beach",
    "Blue Mountain",
    "Grayton",
    "Seagrove",
    "Seaside",
    "Rosemary",
    "Inlet Beach",
  ];

  return (
    <section
      id="locations"
      className="relative isolate overflow-hidden py-32 sm:py-40 lg:py-48"
    >
      {/* Full-bleed background flyover video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/flyover-water.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink-900/55" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900/55 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900/55 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="eyebrow text-[var(--color-ember-400)]">Where We Host</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Beach bonfires on every permitted 30A and Destin-area beach
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand-100/90 sm:text-lg">
            From Scenic Gulf Drive right on the Destin line, through Gulf
            Place, Blue Mountain, Grayton, Seagrove, and out to Inlet Beach -
            we host on every Walton County permitted access along 30A.
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-sand-100/90 sm:text-xs">
            {COMMUNITY_PINS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
              >
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/locations" className="btn-primary text-base">
              See every beach we serve
            </Link>
            <a
              href={SITE.phoneHref}
              className="text-sm font-semibold uppercase tracking-wider text-white/90 underline-offset-4 transition hover:text-white hover:underline"
            >
              Or call {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
