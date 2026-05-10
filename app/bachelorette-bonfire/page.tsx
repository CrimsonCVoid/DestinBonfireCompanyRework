import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "30A & Destin Bachelorette Bonfires",
  description:
    "Host a fun, private bachelorette beach bonfire near Destin and along 30A. Pink themes, seating, s’mores, fire attendant, and full cleanup included. Book your unforgettable night.",
  alternates: { canonical: "/bachelorette-bonfire" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/bachelorette-bonfire`,
    title: "30A & Destin Bachelorette Bonfires | Destin Bonfire Company",
    description:
      "Host a fun, private bachelorette beach bonfire near Destin and along 30A. Pink themes, seating, s’mores, fire attendant, and full cleanup included. Book your unforgettable night.",
    images: [
      {
        url: "/images/BatchloretteLandFacing.jpg",
        width: 1200,
        height: 630,
        alt: "Bachelorette party celebrating at a private beach bonfire on 30A",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30A & Destin Bachelorette Bonfires | Destin Bonfire Company",
    description:
      "Host a fun, private bachelorette beach bonfire near Destin and along 30A. Pink themes, seating, s’mores, fire attendant, and full cleanup included. Book your unforgettable night.",
    images: ["/images/BatchloretteLandFacing.jpg"],
  },
};

const INCLUDED = [
  "12 pink beach chairs",
  "2-hour private bonfire",
  "Full setup with dedicated fire attendant",
  "Pink blankets",
  "Complete cleanup",
  "Permit fees included",
  "Welcome signage",
  "Tiki torches",
  "Two 6 ft tables with pink tablecloths",
  "Glow-in-the-dark rings",
  "Bluetooth speaker",
  "Pink cornhole boards",
  "S’mores",
];

const PHOTO_READY_EXTRAS = [
  "Cocktail cups",
  "Selfie station",
  "Pink flower décor",
  "Bride-to-be sunglasses",
  "Sash",
];

const ADDONS = [
  { name: "Themed décor", detail: "Custom themes beyond pink — coordinated to your party." },
  { name: "Custom accessories", detail: "Personalized signs, sashes, and group merchandise." },
  { name: "Food add-ons", detail: "Curated spreads from our favorite local vendors." },
  { name: "Upgraded seating layouts", detail: "Lounge-style or extended seating for larger parties." },
];

export default function BachelorettePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bachelorette Bonfires",
        item: `${SITE.domain}/bachelorette-bonfire`,
      },
    ],
  };

  return (
    <div data-theme="pink">
      <PageHeader
        eyebrow="Bachelorette Bonfires"
        title="Bachelorette Bonfire"
        subtitle="Private, fully hosted bonfires on 30A starting at $595 for up to 12 guests. We bring the sign, the chairs, the fire, and the vibes — you bring the bridal party."
        video="/videos/bachelorette-setup.mp4"
        image="/images/WideShotFarBatchlorettePhoto.jpg"
      />

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28" id="BacheloretteBonfire">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/BatchloretteFirePristinePhoto.jpg"
              alt="Bachelorette beach bonfire with bride and bridal party"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Experiences from $595</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The perfect beach night for the bride-to-be
            </h2>
            <p className="mt-5 text-lg text-ink-800/80">
              Bachelorette bonfires include a custom welcome sign, premium
              seating, tiki torches, a Bluetooth speaker, games, and
              complimentary s’mores — on a private permitted beach along 30A.
            </p>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
              Everything Included
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-ink-800/90">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <BookNowButton item="bacheloretteBash" className="mt-10">
              Book Your Bachelorette Bonfire
            </BookNowButton>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow text-center">Photo-Ready Extras</p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Every detail dialed in for the perfect shot
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {PHOTO_READY_EXTRAS.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 rounded-2xl bg-[var(--color-sand-50)] p-4 text-[15px] text-ink-800/90"
              >
                <svg className="mt-0.5 h-4 w-4 flex-none text-[var(--color-ember-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Customization Options</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Make it yours
            </h2>
            <p className="mt-5 text-ink-800/80">
              Personalize the experience with themed décor, custom accessories,
              food add-ons from local vendors, and upgraded seating layouts.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((a) => (
              <div key={a.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5">
                <h3 className="text-lg font-semibold">{a.name}</h3>
                <p className="mt-2 text-sm text-ink-800/75">{a.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white px-6 py-4 text-center text-sm font-semibold text-ink-900 ring-1 ring-ink-900/10">
            A 15% gratuity will be added to all bookings.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow text-center">Destin &amp; 30A Bachelorette</p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Plan the perfect 30A bachelorette weekend
          </h2>
          <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              Planning a bachelorette trip to Destin or 30A? Celebrate with a
              styled beach bonfire experience that goes beyond the traditional
              setup. Designed for groups visiting Destin and 30A, this
              all-inclusive experience transforms a classic beach bonfire into
              a photo-ready celebration with coordinated décor, thoughtful
              details, and a memorable atmosphere for your bride tribe.
            </p>
            <p>
              Our bachelorette beach bonfires are hosted on permitted South
              Walton beaches — Santa Rosa Beach, Rosemary Beach, Seaside, and
              along 30A. After a day exploring Rosemary Beach, Seaside, or
              Santa Rosa Beach, gathering around the fire for s’mores, music,
              and sunset views creates the perfect ending to the night.
            </p>
            <p>
              Our team handles everything — permits, setup, styling, hosting,
              and cleanup — so your group can simply arrive, relax, and enjoy
              the night together. Spring and summer 30A bachelorette weekends
              book quickly, so we recommend reserving your date early.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </div>
  );
}
