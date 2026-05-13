import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { getBeach } from "@/lib/beaches";
import { COMMUNITIES, SITE } from "@/lib/site";

const SLUG = "destin";
const URL = `${SITE.domain}/${SLUG}`;
const TITLE = "Destin Beach Bonfires | Closest Permitted Beaches to Destin, FL";
const DESCRIPTION =
  "Looking for a beach bonfire in Destin? Bonfires aren't legal inside Destin city limits, but the closest permitted beach is just 10 minutes east. We handle the Walton County permit, setup, hosting, and cleanup for every Destin visitor.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/${SLUG}` },
  keywords: [
    "Destin beach bonfire",
    "beach bonfire Destin",
    "bonfire in Destin FL",
    "Destin bonfire rental",
    "private bonfire Destin",
    "Destin Florida beach bonfire",
    "closest beach bonfire to Destin",
    "Miramar Beach bonfire near Destin",
    "Scenic Gulf Drive bonfire",
    "beach bonfire near Destin Harbor",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/scenicbeach.jpg",
        width: 1200,
        height: 630,
        alt: "Scenic Gulf Drive beach access in Miramar - the closest permitted bonfire beach to Destin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/scenicbeach.jpg"],
  },
};

// Drive times to the closest permitted beach (Scenic Gulf Drive in
// Miramar) from popular Destin landmarks. Times are approximate and
// based on typical traffic on US-98 East.
const DESTIN_DRIVE_TIMES: Array<{ from: string; mins: string; note?: string }> = [
  { from: "HarborWalk Village", mins: "~12 min", note: "via Hwy 98 E" },
  { from: "Destin Harbor / Marler Bridge", mins: "~10 min" },
  { from: "Crystal Beach", mins: "~8 min" },
  { from: "Holiday Isle", mins: "~15 min", note: "double-back via Marler Bridge" },
  { from: "Henderson Park Inn", mins: "~10 min" },
  { from: "Sandestin / Hilton Sandestin", mins: "~6 min", note: "literally next door" },
  { from: "Silver Shells Resort", mins: "~9 min" },
  { from: "Emerald Grande", mins: "~12 min" },
  { from: "Sterling Shores", mins: "~8 min" },
  { from: "Pelican Beach Resort", mins: "~7 min" },
];

const DESTIN_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Can I have a beach bonfire in Destin, FL?",
    a: "Not directly inside Destin city limits. The City of Destin sits in Okaloosa County, which does not issue beach bonfire permits. Every legal beach bonfire near Destin actually takes place on a permitted Walton County beach access just east of Destin - the closest is Scenic Gulf Drive in Miramar Beach, about 10 minutes east on Highway 98.",
  },
  {
    q: "What's the closest permitted beach to Destin for a bonfire?",
    a: "Scenic Gulf Drive Regional Beach Access in Miramar Beach is the closest permitted bonfire beach to Destin. It's on the Walton County side of the line, has paved parking, restrooms, and a brand-new walkover pavilion. From most Destin condos and resorts it's a 6 to 15 minute drive depending on traffic on Highway 98.",
  },
  {
    q: "Why doesn't Destin allow beach bonfires?",
    a: "Destin is an incorporated city in Okaloosa County. Beach fires require a county-issued permit and Okaloosa County does not currently offer a permit pathway for private beach bonfires. Unincorporated Walton County, which begins just east of Sandestin, runs an established permit program for private bonfires - which is where every legal Destin-area bonfire actually happens.",
  },
  {
    q: "How long is the drive from a Destin rental to the bonfire?",
    a: "For most Destin condos, resorts, and short-term rentals, the drive to the closest permitted bonfire beach is between 6 and 15 minutes east on Highway 98. Sandestin and the eastern Destin properties are closest (under 10 minutes). Holiday Isle and HarborWalk Village are the farthest in the standard Destin footprint, around 12-15 minutes.",
  },
  {
    q: "Do I need to handle the permit myself?",
    a: "No. We pull the Walton County beach bonfire permit on your behalf for every booking. The $157 county permit fee is included in every package price - we never mark it up. You don't fill out any paperwork, don't visit the county office, and don't pay anything at the beach.",
  },
  {
    q: "Can you set up a bonfire directly on the beach in front of my Destin condo?",
    a: "Only if your condo happens to sit on a permitted Walton County access (most Destin properties do not). For every other Destin rental we set up at the closest permitted Regional Beach Access - usually Scenic Gulf Drive or another Miramar Beach access - and you walk or drive over for the evening.",
  },
  {
    q: "Is the bonfire experience any different because we're driving from Destin?",
    a: "Not at all. The setup, the seating, the s'mores, the permit, the cleanup, and the on-site attendant are identical whether you're staying in Destin, on 30A, or anywhere in between. The only difference is where you park - and we send detailed directions once your permit is confirmed.",
  },
  {
    q: "What about Holiday Isle in Destin - any closer beaches there?",
    a: "Holiday Isle is the westernmost end of Destin and doesn't sit near a permitted beach. Guests staying on Holiday Isle drive east through Destin proper (about 15 minutes) to reach Scenic Gulf Drive. We've hosted plenty of Holiday Isle guests - the drive is short and your evening is fully set up by the time you arrive.",
  },
];

export default function DestinPage() {
  const scenic = getBeach("scenic-gulf-drive");
  const miramarCommunity = COMMUNITIES.find((c) => c.slug === "miramar-beach-bonfires");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Destin Beach Bonfires", item: URL },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DESTIN_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Beach Bonfire Experience",
    provider: { "@id": `${SITE.domain}/#business` },
    areaServed: [
      { "@type": "City", name: "Destin", containedInPlace: { "@type": "AdministrativeArea", name: "Okaloosa County, Florida" } },
      { "@type": "Place", name: "Miramar Beach, FL" },
      { "@type": "Place", name: "Scenic Gulf Drive Regional Beach Access" },
      { "@type": "Place", name: "Sandestin, FL" },
    ],
    url: URL,
    description:
      "Private beach bonfire experiences for visitors staying in Destin, Florida. Hosted on the closest permitted Walton County beach accesses just east of Destin city limits.",
  };

  return (
    <>
      <PageHeader
        eyebrow="Destin Beach Bonfires"
        title="Private Beach Bonfires for Destin Visitors"
        subtitle="Bonfires aren't allowed inside Destin city limits, but the closest permitted beach is just minutes east. We handle the Walton County permit, the setup, the hosting, and the cleanup - your group simply shows up and enjoys the night."
        image="/images/scenicbeach.jpg"
      />

      {/* Intro / honest explainer */}
      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:justify-center">
            <BookNowButton>Book Your Bonfire</BookNowButton>
            <a href={SITE.phoneHref} className="btn-ghost">
              Call {SITE.phone}
            </a>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            The truth about beach bonfires in Destin, FL
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              If you&rsquo;ve searched for a <strong>Destin beach bonfire</strong>, you&rsquo;ve
              probably noticed the same answer keeps coming up: every operator
              you find is technically setting up on a beach <em>east</em> of
              Destin. That&rsquo;s not a marketing trick - it&rsquo;s a permit
              rule. The City of Destin sits in <strong>Okaloosa County</strong>,
              which doesn&rsquo;t currently issue beach bonfire permits. The
              moment you cross into <strong>Walton County</strong> - which
              begins right at Sandestin - bonfires are not only legal,
              they&rsquo;re a long-standing local tradition.
            </p>
            <p>
              The good news: that border is <strong>10 minutes east</strong> of
              most Destin rentals. We&rsquo;ve hosted hundreds of guests staying
              in Destin proper - HarborWalk Village, Holiday Isle, Crystal
              Beach, Sandestin - at the closest permitted Walton County beach,{" "}
              <Link
                href="/service-areas/scenic-gulf-drive"
                className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline"
              >
                Scenic Gulf Drive Regional Access
              </Link>
              {" "}in Miramar Beach. Same sugar sand, same sunset, same
              experience - just on the correct side of the county line for the
              permit.
            </p>
            <p>
              We&rsquo;re a locally owned, veteran-led team that&rsquo;s been
              running permitted beach bonfires for Destin and{" "}
              <Link href="/locations/30a-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                30A
              </Link>{" "}
              visitors for over five years. Every package includes the $157
              Walton County permit, full setup with premium seating and tiki
              torches, complimentary s&rsquo;mores, cornhole, a Bluetooth
              speaker, an on-site attendant, and complete cleanup. No
              firewood to haul, no permits to pull, no setup or breakdown to
              worry about.
            </p>
          </div>
        </div>
      </section>

      {/* Scenic Gulf Drive highlight */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src="/images/scenicbeach.jpg"
                alt="Scenic Gulf Drive Regional Beach Access in Miramar Beach - the closest permitted beach to Destin, FL"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">Closest Beach to Destin</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                Scenic Gulf Drive - right on the Destin line
              </h2>
              <p className="mt-5 text-lg text-ink-800/85">
                Scenic Gulf Drive Regional Beach Access is the first permitted
                Walton County beach you reach when you drive east from Destin
                on Highway 98. It opened in 2022 with paved parking, ADA
                restrooms, a coastal-cottage walkover pavilion, and a wide
                stretch of sugar sand that backs up to the residential
                Miramar Beach neighborhoods.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-800/80">
                For a guest staying in Destin, it&rsquo;s the practical answer
                to &ldquo;where&rsquo;s the closest bonfire-friendly beach?&rdquo;
                Most properties in Destin proper are 6 to 15 minutes away, the
                lot is rarely crowded after sunset, and the access itself is
                brand-new, clean, and well-lit. We handle the Walton County
                permit, you handle showing up.
              </p>
              {scenic && (
                <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-800/55">Parking</dt>
                    <dd className="mt-1 font-medium text-ink-900">{scenic.parkingCost}</dd>
                    <dd className="text-xs text-ink-800/70">{scenic.parkingSpots}</dd>
                  </div>
                  <div className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-800/55">Restrooms</dt>
                    <dd className="mt-1 font-medium text-ink-900">Yes</dd>
                    <dd className="text-xs text-ink-800/70">ADA-accessible in the new pavilion</dd>
                  </div>
                  <div className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-800/55">Address</dt>
                    <dd className="mt-1 text-xs text-ink-800/85">{scenic.parkingAddress}</dd>
                  </div>
                  <div className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-800/55">From Destin</dt>
                    <dd className="mt-1 font-medium text-ink-900">~10 min east</dd>
                    <dd className="text-xs text-ink-800/70">via Hwy 98</dd>
                  </div>
                </dl>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/service-areas/scenic-gulf-drive" className="btn-ghost">
                  Scenic Gulf Drive details
                </Link>
                <BookNowButton>Book This Beach</BookNowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driving times from Destin landmarks */}
      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Drive Times from Destin</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              The closest permitted beach from your Destin rental
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80">
              Approximate driving time from popular Destin condos, resorts,
              and landmarks to Scenic Gulf Drive Regional Beach Access in
              Miramar Beach, the closest permitted bonfire beach east of
              Destin city limits.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
            {DESTIN_DRIVE_TIMES.map((d) => (
              <li
                key={d.from}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-ink-900/5"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{d.from}</p>
                  {d.note && (
                    <p className="text-xs text-ink-800/65">{d.note}</p>
                  )}
                </div>
                <span className="flex-none whitespace-nowrap rounded-full bg-[var(--color-ember-500)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-ember-700)]">
                  {d.mins}
                </span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-ink-800/60">
            Times are typical drive estimates - your actual time will vary with
            Hwy 98 traffic and the time of day. We send precise directions
            once your permit is confirmed.
          </p>
        </div>
      </section>

      {/* Beyond Scenic Gulf - the full Walton County permitted set */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow">Beyond the Destin Line</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              Every permitted beach we serve, from Destin out to Inlet
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80">
              If you&rsquo;d rather make an evening of the drive, every
              permitted access along 30A is open to Destin guests. Same permit
              process, same all-inclusive package, just a longer pre-dinner
              cruise down Scenic 30A.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-ember-500)]/50 hover:shadow"
              >
                <p className="text-base font-semibold text-ink-900 group-hover:text-[var(--color-ember-700)]">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-ink-800/70">
                  {c.beaches.length} permitted access{c.beaches.length === 1 ? "" : "es"}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-ink-800/75">
                  {c.intro.split(".")[0]}.
                </p>
              </Link>
            ))}
          </div>
          {miramarCommunity && (
            <p className="mt-8 text-center text-sm text-ink-800/70">
              Most Destin guests choose Miramar Beach for proximity -{" "}
              <Link
                href={`/locations/${miramarCommunity.slug}`}
                className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline"
              >
                read the full Miramar Beach guide
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Destin-specific FAQ */}
      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow text-center">Destin Bonfire FAQs</p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Questions Destin visitors ask us
          </h2>
          <div className="mt-10 divide-y divide-ink-900/10 rounded-3xl bg-white px-2 shadow-sm ring-1 ring-ink-900/5 sm:px-6">
            {DESTIN_FAQ.map((f) => (
              <details key={f.q} className="group px-4 py-5 sm:px-2">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex-none rounded-full border border-ink-900/15 p-1.5 text-ink-800/70 transition group-open:rotate-45 group-open:border-[var(--color-ember-500)]/50 group-open:text-[var(--color-ember-600)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-800/85">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-800/70">
            Want the full permit deep-dive?{" "}
            <Link
              href="/bonfire-permit-process"
              className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline"
            >
              See how the Walton County process works
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Ready to plan your Destin beach bonfire?
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Pick a date, pick a package, and we&rsquo;ll meet you at the
            closest permitted beach to your Destin rental. Permit, premium
            setup, s&rsquo;mores, and cleanup all included.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </>
  );
}
