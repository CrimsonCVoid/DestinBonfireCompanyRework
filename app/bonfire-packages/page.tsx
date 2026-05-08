import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import Link from "next/link";
import { FAREHARBOR, PACKAGES, SITE, SPECIALTY_PACKAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Beach Bonfire Packages & Pricing on 30A",
  description:
    "Compare our four all-inclusive beach bonfire packages near Destin and 30A. Permit, setup, seating, tiki torches, s’mores, fire attendant, and cleanup included.",
  alternates: { canonical: "/bonfire-packages" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/bonfire-packages`,
    title: "Beach Bonfire Packages & Pricing on 30A | Destin Bonfire Company",
    description:
      "Compare our four all-inclusive beach bonfire packages near Destin and 30A. Permit, setup, seating, tiki torches, s’mores, fire attendant, and cleanup included.",
    images: [
      {
        url: "/images/IMG_0684.jpeg",
        width: 1200,
        height: 630,
        alt: "Private beach bonfire package setup on 30A",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach Bonfire Packages & Pricing on 30A | Destin Bonfire Company",
    description:
      "Compare our four all-inclusive beach bonfire packages near Destin and 30A. Permit, setup, seating, tiki torches, s’mores, fire attendant, and cleanup included.",
    images: ["/images/IMG_0684.jpeg"],
  },
};

export default function PackagesPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Beach Bonfire Packages",
        item: `${SITE.domain}/bonfire-packages`,
      },
    ],
  };

  const offersLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PACKAGES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: `${p.tagline}. ${p.groupSize}. ${p.duration}.`,
        image: `${SITE.domain}${p.image}`,
        brand: { "@type": "Brand", name: SITE.name },
        offers: {
          "@type": "Offer",
          price: p.price.toString(),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${FAREHARBOR.fallbackUrl}items/${FAREHARBOR.items[p.fareHarborKey]}/`,
        },
      },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="All-Inclusive Packages"
        title="Beach Bonfire Packages on 30A"
        subtitle="Four fully hosted packages for every group size — from quiet couples' nights to large family celebrations. Permit, setup, and cleanup always included."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Why Choose Destin Bonfire Company</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Transparent pricing, no surprises
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "No permit fee mark-ups",
              "Flexible rescheduling before permit purchase",
              "Everything included with no surprise add-on fees for bluetooth speaker, food table, cornhole, or s’mores",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl bg-[var(--color-sand-50)] p-5 text-[15px] text-ink-800/90"
              >
                <span
                  className="mt-0.5 text-lg leading-none"
                  aria-hidden="true"
                >
                  🔥
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x space-y-24">
          {PACKAGES.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className="scroll-mt-24 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]"
            >
              <span
                id={
                  p.slug === "cozy-fire"
                    ? "TheCozyFire"
                    : p.slug === "sunset-circle"
                      ? "TheSunsetCircle"
                      : p.slug === "shoreline-social"
                        ? "TheShorelineSocial"
                        : "TheBonfireBash"
                }
                className="sr-only"
                aria-hidden="true"
              />
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl ${
                  i % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} beach bonfire package`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {p.popular && (
                  <div className="absolute left-6 top-6 rounded-full bg-[var(--color-ember-500)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg">
                    Most Popular
                  </div>
                )}
              </div>
              <div>
                <p className="eyebrow">Package {i + 1} of {PACKAGES.length}</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {p.name}
                </h2>
                <p className="mt-3 text-lg text-ink-800/80">{p.tagline}</p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="text-5xl font-bold text-[var(--color-ember-600)]">${p.price}</span>
                  <span className="text-sm uppercase tracking-wider text-ink-800/70">
                    {p.groupSize} · {p.duration}
                  </span>
                </div>
                <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-800/90">
                      <svg className="mt-0.5 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <BookNowButton item={p.fareHarborKey} className="mt-10">
                  Book {p.name}
                </BookNowButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">More Options</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Larger groups &amp; bachelorette parties
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {SPECIALTY_PACKAGES.map((sp) => {
              const isInternal = sp.ctaHref.startsWith("/");
              return (
                <article
                  key={sp.slug}
                  id={sp.slug}
                  className="scroll-mt-24 overflow-hidden rounded-3xl bg-[var(--color-sand-50)] shadow-sm ring-1 ring-ink-900/5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={sp.image}
                      alt={`${sp.name} — beach bonfire`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold">{sp.name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-wider text-ink-800/70">
                      {sp.groupSize}
                      {sp.price ? ` · ${sp.price}` : ""}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-800/85">
                      {sp.description}
                    </p>
                    {isInternal ? (
                      <Link href={sp.ctaHref} className="btn-ghost mt-6">
                        {sp.ctaLabel}
                      </Link>
                    ) : (
                      <a href={sp.ctaHref} className="btn-ghost mt-6">
                        {sp.ctaLabel}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Enhancements</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Add-ons
            </h2>
            <p className="mt-4 text-ink-800/80">
              Looking for something special? We&apos;re happy to customize your
              setup. Our celebration coordinator personalizes events for
              birthdays, anniversaries, girls&apos; trips, women&apos;s
              retreats, and more occasions.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Extra hour", price: "$100", detail: "Extend the fire for a longer evening." },
              { name: "Cooler with ice", price: "$40", detail: "Ice cooler ready for your drinks." },
              { name: "Extra beach chair", price: "$20", detail: "Add additional seating per guest." },
              { name: "S’mores", price: "ALWAYS included", detail: "Every bonfire comes with complimentary s’mores." },
            ].map((e) => (
              <div
                key={e.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5"
              >
                <h3 className="text-lg font-semibold">{e.name}</h3>
                <p className="mt-1 text-2xl font-bold text-[var(--color-ember-600)]">{e.price}</p>
                <p className="mt-2 text-sm text-ink-800/75">{e.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink-800/70">
            Hosting 30 or more guests? Call{" "}
            <a href={SITE.phoneHref} className="font-semibold text-[var(--color-ember-600)] underline-offset-4 hover:underline">
              {SITE.phone}
            </a>{" "}
            to speak with our event planner about custom bonfires for larger groups.
          </p>
        </div>
      </section>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersLd) }}
      />
    </>
  );
}
