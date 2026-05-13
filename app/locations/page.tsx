import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { BEACHES, getBeach } from "@/lib/beaches";
import { COMMUNITIES, SITE } from "@/lib/site";

const TITLE = "Beach Bonfire Locations | Permitted Beaches on 30A & Near Destin";
const DESCRIPTION =
  "Every Walton County permitted beach we host private beach bonfires on - organized west to east from Destin out to Inlet Beach, with parking, restrooms, and access notes for each location.";
const URL = `${SITE.domain}/locations`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/locations" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/edwallenbeach.jpg",
        width: 1200,
        height: 630,
        alt: "30A and Destin permitted beach bonfire locations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/edwallenbeach.jpg"],
  },
};

/**
 * Regional groupings - west to east - that match how a visitor
 * actually thinks about the coast (closest-to-Destin first, then
 * progressively east along 30A). Each region holds the beach slugs
 * that fall inside it; the page resolves these to full beach data
 * via getBeach() so this stays the single source of grouping truth.
 */
const REGIONS: Array<{
  label: string;
  sub: string;
  slugs: string[];
  anchor: string;
}> = [
  {
    label: "Closest to Destin",
    sub: "Miramar Beach - minutes east of Destin city limits",
    slugs: ["scenic-gulf-drive"],
    anchor: "closest-to-destin",
  },
  {
    label: "West 30A",
    sub: "Dune Allen, Gulf Place, Santa Rosa Beach, Blue Mountain",
    slugs: ["ed-walline", "gulfview-heights", "dune-allen", "fort-panic", "blue-mountain"],
    anchor: "west-30a",
  },
  {
    label: "Central 30A",
    sub: "Grayton, Seagrove, Seaside-adjacent",
    slugs: ["santa-clara", "walton-dunes", "one-seagrove", "grayton-dunes"],
    anchor: "central-30a",
  },
  {
    label: "East 30A",
    sub: "Inlet Beach, Rosemary, Seacrest",
    slugs: ["inlet-beach"],
    anchor: "east-30a",
  },
];

export default function LocationsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Beach Bonfire Locations", item: URL },
    ],
  };

  // ItemList of every beach for crawlers - flat list, not nested by
  // region (regions are a visual grouping, not a true taxonomy).
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Permitted beach bonfire locations on 30A and near Destin",
    itemListElement: BEACHES.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.fullName,
      url: `${SITE.domain}/service-areas/${b.slug}`,
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="Where We Host"
        title="Permitted Beach Bonfire Locations"
        subtitle="Every Walton County permitted beach we host beach bonfires on - organized west to east from Destin out to Inlet Beach. Tap any access for parking, restrooms, satellite map, and the local notes that don't live anywhere else online."
        image="/images/edwallenbeach.jpg"
      />

      {/* Quick jump nav - sticky-ish anchor pills */}
      <section className="border-b border-ink-900/10 bg-white py-6">
        <div className="container-x">
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {REGIONS.map((r) => (
              <li key={r.anchor}>
                <a
                  href={`#${r.anchor}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-[var(--color-sand-50)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-800/85 transition hover:border-[var(--color-ember-500)]/50 hover:bg-white hover:text-[var(--color-ember-700)]"
                >
                  {r.label}
                  <span className="text-ink-800/40">·</span>
                  <span className="text-ink-800/60 normal-case tracking-normal">
                    {r.slugs.length} access{r.slugs.length === 1 ? "" : "es"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Regional sections */}
      {REGIONS.map((r, i) => (
        <section
          key={r.anchor}
          id={r.anchor}
          className={`scroll-mt-24 ${i % 2 === 0 ? "bg-[var(--color-sand-50)]" : "bg-white"} py-20 sm:py-24`}
        >
          <div className="container-x mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Region · {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                  {r.label}
                </h2>
                <p className="mt-2 text-sm text-ink-800/70 sm:text-base">{r.sub}</p>
              </div>
              <p className="text-xs uppercase tracking-wider text-ink-800/55">
                {r.slugs.length} permitted access{r.slugs.length === 1 ? "" : "es"}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {r.slugs.map((slug) => {
                const b = getBeach(slug);
                if (!b) return null;
                return (
                  <Link
                    key={slug}
                    href={`/service-areas/${slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand-200)]">
                      <Image
                        src={b.image}
                        alt={`${b.fullName} - permitted beach bonfire access in ${b.community}`}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ember-700)]">
                        {b.community}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold text-ink-900">
                        {b.shortName}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-800/75">
                        {b.bestFor}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-ink-800/65">
                        <span>{b.parkingSpots.split(".")[0]}.</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-ember-700)] transition group-hover:translate-x-0.5">
                          Details
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Community guides */}
      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow">Community Guides</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              Staying somewhere specific? Read the local guide
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80">
              The pages above are the individual beach accesses. The community
              guides below pull each area together - parking patterns, dinner
              spots, second-choice beaches, what locals know.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group rounded-2xl border border-ink-900/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-ember-500)]/50 hover:shadow"
              >
                <p className="text-base font-semibold text-ink-900 group-hover:text-[var(--color-ember-700)]">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-ink-800/65">
                  {c.beaches.length} permitted access{c.beaches.length === 1 ? "" : "es"}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-ink-800/75">
                  {c.intro.split(".")[0]}.
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-700)] transition group-hover:translate-x-0.5">
                  Read guide
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Not sure which beach is right for your group?
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Tell us where you&rsquo;re staying and what kind of evening
            you&rsquo;re after. We&rsquo;ll match you with the right permitted
            access, the right parking situation, and the right vibe - same
            all-inclusive package, just on the beach that fits your night best.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookNowButton>Book Your Bonfire</BookNowButton>
            <a href={SITE.phoneHref} className="btn-ghost">
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
