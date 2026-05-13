import Image from "next/image";
import Link from "next/link";
import { PACKAGES, SITE, SPECIALTY_PACKAGES, type Package } from "@/lib/site";
import { BookNowButton } from "./book-now-button";
import { CallToBookButton } from "./call-to-book-button";

export function PackagesSection() {
  // Top row: the four "standard" packages (everything except the brand-new
  // 2-person SKU). Sunset for Two gets the larger specialty treatment
  // below alongside Bachelorette - they're both intimate / themed options
  // that benefit from a roomier card.
  const topRow = PACKAGES.filter((p) => p.slug !== "sunset-for-two");
  const sunsetForTwo = PACKAGES.find((p) => p.slug === "sunset-for-two");
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

        {/* Top row - 4 standard packages.
            The `package-row` class adds thin vertical hairlines in the
            gutters between adjacent cards (lg 4-up + sm/md 2-up) via the
            ::after pseudo-element rule in globals.css. */}
        <div className="package-row mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topRow.map((p) => (
            <PackageCard key={p.slug} p={p} />
          ))}
        </div>

        {/* Horizontal hairline between the standard row and the featured
            specialty row. */}
        {(sunsetForTwo || bachelorette) && (
          <div
            className="mx-auto mt-10 h-px max-w-5xl bg-ink-900/10"
            aria-hidden="true"
          />
        )}

        {/* Bottom row - 2 double-wide specialty cards */}
        {(sunsetForTwo || bachelorette) && (
          <div className="package-row mt-10 grid gap-6 lg:grid-cols-2">
            {sunsetForTwo && <FeaturedPackageCard p={sunsetForTwo} />}
            {bachelorette && <FeaturedBacheloretteCard sp={bachelorette} />}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-ink-800/75">
          Pricing includes the $157 Walton County permit fee.
        </p>
      </div>
    </section>
  );
}

/**
 * Top-row package card. Deliberately simple - image, name, tagline,
 * price, capacity line, then a "See more" deep-link into the full
 * package detail on /bonfire-packages#{slug}. No inclusion bullet
 * list at this density; visitors who want every line item click
 * through.
 */
function PackageCard({ p }: { p: Package }) {
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
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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

        <Link
          href={`/bonfire-packages#${p.slug}`}
          aria-label={`See more details for ${p.name} on the packages page`}
          className="mt-6 inline-flex items-center justify-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-600)] transition hover:bg-[var(--color-ember-500)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ember-500)]"
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

        {p.callToBook ? (
          <div className="mt-auto pt-0 mt-7">
            <CallToBookButton
              packageKey={p.slug}
              variant={p.popular ? "primary" : "ghost"}
              fullWidth
            >
              Call to Book
            </CallToBookButton>
            <p className="mt-2 text-center text-xs text-ink-800/70">
              Call{" "}
              <a
                href={SITE.phoneHref}
                className="font-semibold text-[var(--color-ember-600)] underline-offset-2 hover:underline"
              >
                {SITE.phone}
              </a>{" "}
              to book {p.name}
            </p>
          </div>
        ) : (
          <BookNowButton
            item={p.fareHarborKey}
            variant={p.popular ? "primary" : "ghost"}
            fullWidth
            className="mt-auto pt-0 mt-7"
          >
            Book Now
          </BookNowButton>
        )}
      </div>
    </article>
  );
}

/**
 * Double-wide featured card for a Package (used by Sunset for Two).
 * Horizontal image-left / content-right layout so the card visually
 * earns its 2x footprint.
 */
function FeaturedPackageCard({ p }: { p: Package }) {
  return (
    <article className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/5 md:grid-cols-[1fr_1.2fr]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
        <Image
          src={p.image}
          alt={`${p.name} - intimate beach bonfire for two`}
          fill
          sizes="(min-width: 768px) 35vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
          Specialty
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-ink-800/70">{p.tagline}</p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-4xl font-bold tracking-tight text-[var(--color-ember-600)]">
            ${p.price}
          </span>
          <span className="text-xs uppercase tracking-wider text-ink-800/75">
            {p.groupSize} · {p.duration}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {p.callToBook ? (
            <CallToBookButton packageKey={p.slug}>
              Call to Book
            </CallToBookButton>
          ) : (
            <BookNowButton item={p.fareHarborKey}>
              Book Now
            </BookNowButton>
          )}
          <Link
            href={`/bonfire-packages#${p.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-600)] transition hover:text-[var(--color-ember-700)]"
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
        </div>
      </div>
    </article>
  );
}

/**
 * Double-wide featured card for the Bachelorette specialty package.
 * data-theme="pink" wraps the card so the ember palette flips to
 * pink inside the card while the rest of the page stays ember.
 */
function FeaturedBacheloretteCard({
  sp,
}: {
  sp: (typeof SPECIALTY_PACKAGES)[number];
}) {
  return (
    <article
      data-theme="pink"
      className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/5 md:grid-cols-[1fr_1.2fr]"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
        <Image
          src={sp.image}
          alt={`${sp.name} - styled bachelorette beach bonfire`}
          fill
          sizes="(min-width: 768px) 35vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
          Specialty
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">
          {sp.name}
        </h3>
        <p className="mt-2 text-sm text-ink-800/70">
          Pink chairs, glow rings, and a styled selfie station for the bride tribe.
        </p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-4xl font-bold tracking-tight text-[var(--color-ember-600)]">
            {sp.price ?? "From $595"}
          </span>
          <span className="text-xs uppercase tracking-wider text-ink-800/75">
            {sp.groupSize}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BookNowButton item="bacheloretteBash">
            Book Now
          </BookNowButton>
          <Link
            href={sp.ctaHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-600)] transition hover:text-[var(--color-ember-700)]"
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
        </div>
      </div>
    </article>
  );
}
