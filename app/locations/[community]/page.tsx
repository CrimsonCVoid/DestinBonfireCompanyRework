import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { Testimonials } from "@/components/testimonials";
import { getBeach } from "@/lib/beaches";
import { COMMUNITIES, getCommunity, SITE } from "@/lib/site";

type Props = { params: Promise<{ community: string }> };

export async function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ community: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { community } = await params;
  const c = getCommunity(community);
  if (!c) return {};
  const title = `${c.pageTitle} | Permitted Walton County Beaches`;
  const description = `${c.intro.slice(0, 155)}`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${c.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.domain}/locations/${c.slug}`,
      images: [`${SITE.domain}${c.image}`],
    },
  };
}

export default async function CommunityPage({ params }: Props) {
  const { community } = await params;
  const c = getCommunity(community);
  if (!c) notFound();

  const accesses = c.beaches.map((slug) => getBeach(slug)).filter(Boolean) as NonNullable<ReturnType<typeof getBeach>>[];
  const siblings = COMMUNITIES.filter((x) => x.slug !== c.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE.domain}/#locations` },
      { "@type": "ListItem", position: 3, name: c.pageTitle, item: `${SITE.domain}/locations/${c.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
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
    areaServed: { "@type": "Place", name: `${c.name}, FL` },
    url: `${SITE.domain}/locations/${c.slug}`,
    description: c.intro,
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src={c.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/70 via-ink-900/55 to-ink-900/85" aria-hidden="true" />
        <div className="container-x flex min-h-[68vh] flex-col justify-end py-32 text-white">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.25em] text-sand-100/80">
              <Link href="/" className="hover:text-[var(--color-ember-400)]">Home</Link>
              <span className="mx-2 opacity-50">/</span>
              <Link href="/#locations" className="hover:text-[var(--color-ember-400)]">Locations</Link>
              <span className="mx-2 opacity-50">/</span>
              <span className="text-white">{c.name}</span>
            </nav>
            <p className="eyebrow text-[var(--color-ember-400)]">{c.name} · Walton County, FL</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {c.pageTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-sand-100/90 sm:text-lg">
              {c.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookNowButton>Book a Bonfire in {c.name}</BookNowButton>
              <Link href="/bonfire-permit-process" className="btn-secondary">
                How Permits Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">The Vibe</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What makes a {c.name} bonfire different
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-800/90 sm:text-base">
              {c.vibe}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/90 sm:text-base">
              {c.permitNote}
            </p>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-800/60">
                Best For
              </p>
              <ul className="mt-3 space-y-2 text-[15px] text-ink-800/90">
                {c.bestFor.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-ember-500)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="eyebrow">Parking & Access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Local parking notes
            </h2>
            <ul className="mt-6 space-y-4">
              {c.parkingTips.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white p-5 text-[15px] text-ink-800/90 shadow-sm ring-1 ring-ink-900/5">
                  <svg className="mt-1 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Permitted Beach Accesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Beaches we host bonfires on for {c.name} guests
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80 sm:text-base">
              We&rsquo;ll recommend the right beach for your group size, vibe,
              and parking needs. Tap into any access page for parking address,
              restrooms, satellite view, and what to know before you arrive.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accesses.map((b) => (
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
                    className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
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
        </div>
      </section>

      <Testimonials community={c.name} />

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-center">FAQs</p>
            <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.name} bonfire questions, answered
            </h2>
            <dl className="mt-10 divide-y divide-ink-900/10 rounded-3xl bg-white px-8 py-2 shadow-sm ring-1 ring-ink-900/5">
              {c.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-lg font-semibold text-ink-900">{f.q}</dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-ink-800/85">{f.a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 text-center">
              <Link href="/bonfire-permit-process" className="btn-ghost">
                Read the full permit process
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Other Communities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Staying somewhere else? We&rsquo;ve got you.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-ink-900"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.image}
                    alt={s.pageTitle}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-wider text-sand-100/80">
                    {s.beaches.length} access{s.beaches.length === 1 ? "" : "es"}
                  </p>
                  <p className="mt-1 font-semibold">{s.pageTitle}</p>
                </div>
              </Link>
            ))}
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
