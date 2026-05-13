import Link from "next/link";

/**
 * Slim home-page locations teaser. The full grid of every permitted
 * beach lives on /locations - this section just headlines the offer
 * and points visitors there.
 */
export function CommunitiesSection() {
  return (
    <section
      id="locations"
      className="relative isolate overflow-hidden bg-[var(--color-sand-100)] py-20 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[360px] overflow-hidden">
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
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/40 to-[var(--color-sand-100)]"
          aria-hidden="true"
        />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="eyebrow text-[var(--color-ember-400)]">Where We Host</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Beach bonfires on every permitted 30A and Destin-area beach
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sand-100/90">
            From Scenic Gulf Drive right on the Destin line, through Gulf
            Place, Blue Mountain, Grayton, Seagrove, and out to Inlet Beach -
            we host on every Walton County permitted access.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/locations" className="btn-primary text-base">
              See every beach we serve
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
