import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import {
  BEACHES,
  getBeach,
  googleMapsDirectionsLink,
  googleMapsSatelliteEmbed,
  googleMapsSatelliteLink,
} from "@/lib/beaches";
import { COMMUNITIES, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BEACHES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const beach = getBeach(slug);
  if (!beach) return {};
  const title = `${beach.fullName} Bonfires | ${beach.community}`;
  const description = `Private beach bonfires at ${beach.fullName} in ${beach.community}. ${beach.bestFor} Parking, restrooms, facilities, and what to know before your Walton County bonfire.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${beach.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.domain}/service-areas/${beach.slug}`,
      images: [`${SITE.domain}${beach.image}`],
    },
  };
}

export default async function BeachPage({ params }: Props) {
  const { slug } = await params;
  const beach = getBeach(slug);
  if (!beach) notFound();

  const parentCommunities = COMMUNITIES.filter((c) =>
    c.beaches.includes(beach.slug),
  );

  const mapEmbed = googleMapsSatelliteEmbed(beach.lat, beach.lng);
  const mapLink = googleMapsSatelliteLink(beach.lat, beach.lng);
  const directions = googleMapsDirectionsLink(beach.lat, beach.lng, beach.fullName);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE.domain}/#service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: beach.fullName,
        item: `${SITE.domain}/service-areas/${beach.slug}`,
      },
    ],
  };

  const placeLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: beach.fullName,
    description: beach.vibe,
    url: `${SITE.domain}/service-areas/${beach.slug}`,
    image: `${SITE.domain}${beach.image}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: beach.parkingAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: beach.lat,
      longitude: beach.lng,
    },
    isAccessibleForFree: true,
    publicAccess: true,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Restrooms", value: beach.restrooms },
      { "@type": "LocationFeatureSpecification", name: "Outdoor showers", value: beach.outdoorShowers },
      { "@type": "LocationFeatureSpecification", name: "Lifeguards", value: beach.lifeguards },
      { "@type": "LocationFeatureSpecification", name: "Accessibility", value: beach.accessibility },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: beach.parkingSpots },
    ],
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src={beach.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/70 via-ink-900/55 to-ink-900/85" aria-hidden="true" />
        <div className="container-x flex min-h-[72vh] flex-col justify-end py-32 text-white">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.25em] text-sand-100/80">
              <Link href="/" className="hover:text-[var(--color-ember-400)]">Home</Link>
              <span className="mx-2 opacity-50">/</span>
              <Link href="/#service-areas" className="hover:text-[var(--color-ember-400)]">Service Areas</Link>
              <span className="mx-2 opacity-50">/</span>
              <span className="text-white">{beach.shortName}</span>
            </nav>
            <p className="eyebrow text-[var(--color-ember-400)]">{beach.community}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Bonfires at {beach.fullName}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-sand-100/90 sm:text-lg">
              {beach.vibe}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookNowButton>Book a Bonfire at {beach.shortName}</BookNowButton>
              <a href={directions} target="_blank" rel="noreferrer" className="btn-secondary">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x grid items-stretch gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-ink-900/10 lg:min-h-0">
            <div className="flex flex-none items-center justify-between gap-3 border-b border-ink-900/10 bg-white px-5 py-4">
              <div>
                <p className="eyebrow">Satellite View</p>
                <p className="mt-1 text-sm font-semibold text-ink-900">Parking lot at {beach.shortName}</p>
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-900 hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-600)]"
              >
                Open in Google Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg>
              </a>
            </div>
            <div className="relative flex-1 bg-ink-900/5">
              <iframe
                title={`Satellite view of ${beach.fullName} parking`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex-none border-t border-ink-900/10 bg-white px-5 py-4 text-xs text-ink-800/70">
              <strong className="text-ink-900">Parking address:</strong> {beach.parkingAddress} · <span>{beach.lat.toFixed(5)}, {beach.lng.toFixed(5)}</span>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-ink-900/5">
            <p className="eyebrow">Best For</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink-900">{beach.bestFor}</h2>
            <dl className="mt-8 divide-y divide-ink-900/10 text-sm">
              <Row label="Parking" value={beach.parkingSpots} />
              <Row label="Parking cost" value={beach.parkingCost} />
              <Row label="Restrooms" value={beach.restrooms} />
              <Row label="Outdoor showers" value={beach.outdoorShowers} />
              <Row label="Lifeguards" value={beach.lifeguards} />
              <Row label="Accessibility" value={beach.accessibility} />
              <Row label="Pet policy" value={beach.petPolicy} />
              <Row label="Crowd level" value={beach.crowdLevel} />
              <Row label="Distance to water" value={beach.distanceToWater} />
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Driving &amp; Parking Notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What to know before you arrive
            </h2>
            <ul className="mt-6 space-y-3">
              {beach.drivingNotes.map((note) => (
                <li key={note} className="flex gap-3 text-[15px] text-ink-800/90">
                  <svg className="mt-1 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Dinner Before the Bonfire</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Where locals eat nearby
            </h2>
            <ul className="mt-6 space-y-4">
              {beach.nearbyFood.map((f) => (
                <li key={f.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-900/5">
                  <p className="font-semibold text-ink-900">{f.name}</p>
                  {f.note && <p className="mt-1 text-sm text-ink-800/70">{f.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Other Beaches We Serve</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Browse more permitted accesses
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BEACHES.filter((b) => b.slug !== beach.slug)
              .slice(0, 6)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/service-areas/${b.slug}`}
                  className="group relative block overflow-hidden rounded-2xl bg-ink-900"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={b.image}
                      alt={b.fullName}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs uppercase tracking-wider text-sand-100/80">{b.community}</p>
                    <p className="mt-1 font-semibold">{b.shortName}</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/#service-areas" className="btn-ghost">
              See All 11 Beaches
            </Link>
          </div>
        </div>
      </section>

      {parentCommunities.length > 0 && (
        <section className="bg-[var(--color-ember-500)]/10 py-16">
          <div className="container-x">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink-900/5 sm:p-10">
              <p className="eyebrow">Part Of</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Bonfires for {parentCommunities.map((c) => c.name).join(" & ")} guests
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-800/85">
                {beach.shortName} is one of the permitted accesses we serve for
                guests staying in these communities. Read the full local guide
                for parking, dining, and how this beach compares to the others
                nearby.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {parentCommunities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/locations/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ember-500)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-ember-600)]"
                  >
                    {c.pageTitle}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
                <Link href="/bonfire-permit-process" className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-semibold text-ink-900 hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-700)]">
                  How permits work
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--color-sand-50)] py-12">
        <div className="container-x">
          <p className="text-xs uppercase tracking-wider text-ink-800/75">Sources</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-800/70">
            {beach.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }}
      />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_1.6fr] gap-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-800/75">{label}</dt>
      <dd className="text-sm leading-relaxed text-ink-800/95">{value}</dd>
    </div>
  );
}
