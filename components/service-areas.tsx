import Image from "next/image";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/site";

export function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-[var(--color-sand-100)] py-16 sm:py-20">
      <span id="AREASWESERVE" className="sr-only" aria-hidden="true" />
      {/* Hidden h2 for SEO + a11y - the visible section above
          (CommunitiesSection) already provides the "Where We Host"
          framing, so a second visible heading reads as redundant. The
          h2 stays in the DOM so the page still has proper sectioning. */}
      <h2 className="sr-only">Permitted beaches across South Walton</h2>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-ink-900/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ember-500)] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                <div>
                  <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                    {area.name}
                  </h3>
                  {area.address && (
                    <p className="mt-1 text-sm text-sand-100/90">
                      {area.address}
                    </p>
                  )}
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-400)]">
                    View beach details
                    <svg
                      className="h-3 w-3 transition group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
