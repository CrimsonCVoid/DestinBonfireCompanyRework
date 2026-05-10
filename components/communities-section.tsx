import Image from "next/image";
import Link from "next/link";
import { COMMUNITIES } from "@/lib/site";

export function CommunitiesSection() {
  return (
    <section id="locations" className="relative isolate overflow-hidden bg-[var(--color-sand-100)] py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/40 to-[var(--color-sand-100)]" aria-hidden="true" />
      </div>
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="eyebrow text-[var(--color-ember-400)]">Where We Host</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Beach bonfires near every 30A and Destin community
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand-100/90 sm:text-lg">
            Pick the area you&rsquo;re staying in — we&rsquo;ll match you with
            the right permitted access, the right vibe, and the right parking
            for your group. Each guide is written from local experience, not
            scraped from somewhere else.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${c.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-ink-900 shadow-md ring-1 ring-ink-900/10 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={c.image}
                  alt={`Beach bonfires in ${c.name}, FL`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-ember-300)]">
                  {c.beaches.length} permitted access{c.beaches.length === 1 ? "" : "es"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight">
                  {c.pageTitle}
                </h3>
                <p className="mt-3 text-sm text-sand-100/85 line-clamp-3">
                  {c.vibe}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ember-300)]">
                  See the {c.name} guide
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
