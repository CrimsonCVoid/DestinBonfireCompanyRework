import Image from "next/image";
import Link from "next/link";
import { PACKAGES, SPECIALTY_PACKAGES, type Package } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

const VISIBLE = 6;

export function PackagesSection() {
  const bachelorette = SPECIALTY_PACKAGES.find((s) => s.slug === "bachelorette-bash");

  return (
    <section id="packages" className="relative bg-[var(--color-sand-50)] py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Book a Bonfire</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bonfire Packages
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-800/80">
            Every package is fully hosted and all-inclusive. Permit, setup,
            chairs, tiki torches, s’mores, and cleanup - all handled by our
            team so your group can relax from the first spark to the last ember.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PACKAGES.map((p) => (
            <PackageCard key={p.slug} p={p} />
          ))}
        </div>

        {bachelorette && (
          <div className="mt-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Specialty</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Hosting a bachelorette?
              </h3>
            </div>
            <article
              data-theme="pink"
              className="mx-auto mt-8 grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/5 md:grid-cols-[1.1fr_1.3fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
                <Image
                  src={bachelorette.image}
                  alt={`${bachelorette.name} - styled bachelorette beach bonfire`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                  Bachelorette Bonfire
                </p>
                <h4 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">
                  {bachelorette.name}
                </h4>
                <p className="mt-2 text-sm uppercase tracking-wider text-ink-800/70">
                  {bachelorette.groupSize}
                  {bachelorette.price ? ` · ${bachelorette.price}` : ""}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-800/85">
                  Pink chairs, blankets, glow-in-the-dark rings, a styled
                  selfie station, s’mores, and a dedicated fire attendant -
                  built for the bride tribe and the photos that will outlive
                  the trip.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={bachelorette.ctaHref} className="btn-primary">
                    {bachelorette.ctaLabel}
                  </Link>
                  <BookNowButton item="bacheloretteBash" variant="ghost">
                    Book Bachelorette
                  </BookNowButton>
                </div>
              </div>
            </article>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-ink-800/75">
          Pricing includes the $157 Walton County permit fee. 18% gratuity
          applies to The Bonfire Bash.
        </p>
      </div>
    </section>
  );
}

function PackageCard({ p }: { p: Package }) {
  // Home-page cards stay compact: always cap inclusions at VISIBLE so each
  // card is the same height regardless of how loaded the package is. The
  // "See more" link sends visitors to the full package detail on
  // /bonfire-packages#{slug} - the article there has scroll-mt-24 set, so
  // the browser lands flush below the sticky header.
  const visible = p.includes.slice(0, VISIBLE);
  const hasMore = p.includes.length > VISIBLE;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/5 transition hover:-translate-y-1 hover:shadow-xl ${
        p.popular ? "ring-2 ring-[var(--color-ember-500)]" : ""
      }`}
    >
      {p.popular && (
        <div className="absolute right-5 top-5 z-10 rounded-full bg-[var(--color-ember-500)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow">
          Most Popular
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand-200)]">
        <Image
          src={p.image}
          alt={`${p.name} - beach bonfire package`}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold">{p.name}</h3>
        <p className="mt-1 text-sm text-ink-800/70">{p.tagline}</p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-[var(--color-ember-600)]">
            ${p.price}
          </span>
        </div>
        <p className="text-xs uppercase tracking-wider text-ink-800/75">
          {p.groupSize} · {p.duration}
        </p>

        <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-800/90">
          {visible.map((item) => (
            <li key={item} className="flex gap-2.5">
              <svg className="mt-0.5 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {hasMore && (
          <Link
            href={`/bonfire-packages#${p.slug}`}
            aria-label={`See more details for ${p.name} on the packages page`}
            className="mt-3 inline-flex items-center justify-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-600)] transition hover:bg-[var(--color-ember-500)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ember-500)]"
          >
            See more
            <svg
              className="h-3.5 w-3.5"
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
          </Link>
        )}

        <BookNowButton
          item={p.fareHarborKey}
          variant={p.popular ? "primary" : "ghost"}
          fullWidth
          className="mt-7"
        >
          Book {p.name}
        </BookNowButton>
      </div>
    </article>
  );
}
