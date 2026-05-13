import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { SITE } from "@/lib/site";

const TITLE = "Beach Bonfire Add-Ons & Upgrades | Destin Bonfire Company";
const DESCRIPTION =
  "Market lights, lounge seating, giant games, themed décor, proposal setups, photography coordination, extended fire time, and more. Every Destin Bonfire Company package is already all-inclusive - these are the extras guests sometimes add.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/add-ons" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/add-ons`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/BigCircleBonfireSetupNight.jpg",
        width: 1200,
        height: 630,
        alt: "Premium beach bonfire setup with market lights and lounge seating",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/BigCircleBonfireSetupNight.jpg"],
  },
};

type AddOn = {
  name: string;
  price: string; // string so we can mix "$40", "$100/hr", "Request a quote"
  detail: string;
};

type Category = {
  label: string;
  eyebrow: string;
  body: string;
  items: AddOn[];
};

const CATEGORIES: Category[] = [
  {
    label: "Time & Capacity",
    eyebrow: "Make the night a little longer",
    body:
      "Most bookings end about the time you wish there were another hour. These are the easiest extensions to add - decide on the spot the night of, or pre-arrange when you book.",
    items: [
      { name: "Extra hour of fire", price: "$100", detail: "Add a full hour onto the back of your booking - same setup, same attendant." },
      { name: "Additional fire attendant", price: "Request a quote", detail: "For groups over 30 or extended events. Lets us run a second pit or split attention across a wider group." },
      { name: "Earlier setup / late breakdown", price: "Request a quote", detail: "Some groups want the setup ready an hour early for photos, or breakdown after the venue closes. We can arrange." },
    ],
  },
  {
    label: "Lighting & Ambiance",
    eyebrow: "Soften the sand after sundown",
    body:
      "Tiki torches are already in every package. These are the extras that turn the setup into a proper photo backdrop once the sun drops.",
    items: [
      { name: "Market / bistro string lights", price: "Request a quote", detail: "Warm-white festoon strung along the perimeter of your seating circle. Hands-down the most popular add-on for evening events." },
      { name: "Glow-in-the-dark rings", price: "Included in Bachelorette", detail: "Free with the Bachelorette Bonfire. Add à la carte to any other package for a bachelorette-style touch." },
      { name: "LED pillar candles", price: "Request a quote", detail: "Battery-powered, flicker like the real thing, beach-safe. Cluster them on the food table for a wedding-reception feel." },
      { name: "Additional tiki torches", price: "Request a quote", detail: "We light a standard set on every fire. Add extras to mark a path, frame a proposal, or extend the lit area for larger groups." },
    ],
  },
  {
    label: "Furniture & Comfort",
    eyebrow: "Lounge it up",
    body:
      "Standard beach chairs and a 6-foot food table come with every package. These are the upgrades for guests who want to sink in and stay a while.",
    items: [
      { name: "Extra beach chair", price: "$20 each", detail: "Add seats for guests beyond your package's standard count." },
      { name: "Low beach lounge seating", price: "Request a quote", detail: "Wider, lower-to-the-sand seating with cushions. Reads as a styled lounge area for proposal or bachelorette setups." },
      { name: "Extra blankets & throw pillows", price: "Request a quote", detail: "Layered textiles that survive the wind and look great in photos." },
      { name: "Additional 6-foot food table", price: "Request a quote", detail: "For groups bringing catering or hosting a sit-down meal beside the fire." },
      { name: "32\" round high-top tables", price: "Included in Bonfire Bash", detail: "Two come standard with the Bonfire Bash. Add à la carte for cocktail-style mingling around any other package." },
    ],
  },
  {
    label: "Food & Drink",
    eyebrow: "More than s'mores",
    body:
      "S'mores are included on every package - of course. These are the bring-your-own-friendly upgrades that round out the night.",
    items: [
      { name: "Cooler with ice", price: "$40", detail: "Ready when you arrive. Bring your own drinks - we just supply the cold." },
      { name: "Extra s'mores kit", price: "Request a quote", detail: "Bigger group, bigger appetite, or you just love a roast. We'll stock more graham crackers, marshmallows, and chocolate." },
      { name: "Drink station setup", price: "Request a quote", detail: "Cocktail-friendly cups, a serving table, and ice. Great for bachelorette and birthday events." },
      { name: "Local catering coordination", price: "Free coordination", detail: "We don't cater - but we know who's good. We'll connect you with vetted local caterers and confirm the timing matches your fire window." },
    ],
  },
  {
    label: "Games & Entertainment",
    eyebrow: "Keep the kids busy, keep the adults laughing",
    body:
      "Cornhole and a Bluetooth speaker are in every package. Add these when you've got more than one group at the fire or want to make a real evening of it.",
    items: [
      { name: "Themed cornhole boards", price: "Included (Bachelorette: pink)", detail: "Standard cornhole comes with every fire. Bachelorette gets the pink boards by default. Custom themes available on request." },
      { name: "Giant Jenga / jumbo block tower", price: "Request a quote", detail: "The night's favorite drinking game without anyone drinking. Always a hit with mixed-age groups." },
      { name: "Bocce ball set", price: "Request a quote", detail: "Quiet, low-skill, perfect for the older crowd while the kids run the cornhole." },
    ],
  },
  {
    label: "Styling & Décor",
    eyebrow: "Make it look like the photo you have in mind",
    body:
      "A welcome sign is in every package. These are the upgrades for events where the setup IS the moment - weddings, proposals, milestone birthdays, bachelorette weekends.",
    items: [
      { name: "Personalized welcome sign", price: "Included", detail: "We custom-letter every welcome sign for your event. Names, dates, monograms - just tell us what to write." },
      { name: "Floral accents", price: "Request a quote", detail: "Color-matched arrangements on the food table and chairs. We source from local Destin / 30A florists." },
      { name: "Themed décor package", price: "Request a quote", detail: "Pink for bachelorette, navy for nautical, gold for milestone birthdays, etc. We assemble; you arrive to a finished setup." },
      { name: "Bachelorette extras", price: "Add to any package", detail: "Bride sash, sunglasses, custom prop signs, glow rings, pink cornhole. Pull pieces à la carte even if you didn't book the full bachelorette." },
    ],
  },
  {
    label: "Special Occasions",
    eyebrow: "Once-in-a-lifetime setups",
    body:
      "We've done proposals, vow renewals, gender reveals, milestone birthdays, baby showers, and corporate retreats. These are the touches we've added for those nights.",
    items: [
      { name: "Marriage proposal setup", price: "Request a quote", detail: "Tiki torches arranged in a heart, hidden welcome sign, candle path through the sand. We coordinate with your photographer if you want photos." },
      { name: "Photographer coordination", price: "Free coordination", detail: "We don't shoot, but we know the local photographers who specialize in golden-hour and sunset beach work. We'll handle introductions and confirm the timing." },
      { name: "Vow renewal / ceremony setup", price: "Request a quote", detail: "Small bonfire ceremony for a couple or a tight group. Includes seating arc, signage, and an officiant referral if you need one." },
      { name: "Birthday banners & cake table", price: "Request a quote", detail: "Birthday signage, a dedicated cake table, and candles. Bring the cake, we set the table." },
    ],
  },
  {
    label: "Memory & Logistics",
    eyebrow: "The boring-but-helpful stuff",
    body:
      "Last-minute extras that make the night easier or come up after the booking is already on the calendar.",
    items: [
      { name: "Polaroid camera + film", price: "Request a quote", detail: "Real instant prints for the bride tribe or family scrapbook. Comes with film for ~25 shots." },
      { name: "Beach permit additional days", price: "$157 per day", detail: "Want the bonfire two nights in a row? We pull a permit per day - the county doesn't allow rollovers." },
      { name: "Last-minute date change", price: "Free if permit not yet pulled", detail: "Reschedule any time before your Walton County permit is purchased ($157 fee then becomes non-refundable per county rules)." },
      { name: "Travel fee (west of Miramar)", price: "Request a quote", detail: "For setups noticeably west of our 30A / Miramar corridor (e.g. Holiday Isle in Destin proper), a small travel fee may apply." },
    ],
  },
];

export default function AddOnsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Add-Ons & Upgrades", item: `${SITE.domain}/add-ons` },
    ],
  };

  return (
    <>
      <PageHeader
        eyebrow="Add-Ons & Upgrades"
        title="Build your perfect beach bonfire night"
        subtitle="Every package is already all-inclusive - permit, premium seating, tiki torches, s'mores, cornhole, Bluetooth speaker, on-site attendant, and full cleanup. These are the extras guests sometimes add to push a great night into an unforgettable one."
        image="/images/BigCircleBonfireSetupNight.jpg"
      />

      {/* Quick anchor nav */}
      <section className="border-b border-ink-900/10 bg-white py-6">
        <div className="container-x">
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((c) => {
              const anchor = c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <li key={c.label}>
                  <a
                    href={`#${anchor}`}
                    className="inline-flex items-center rounded-full border border-ink-900/10 bg-[var(--color-sand-50)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-800/85 transition hover:border-[var(--color-ember-500)]/50 hover:bg-white hover:text-[var(--color-ember-700)]"
                  >
                    {c.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Categories */}
      {CATEGORIES.map((c, idx) => {
        const anchor = c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <section
            key={c.label}
            id={anchor}
            className={`scroll-mt-24 ${idx % 2 === 0 ? "bg-[var(--color-sand-50)]" : "bg-white"} py-20 sm:py-24`}
          >
            <div className="container-x mx-auto max-w-5xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">{c.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                  {c.label}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-800/80">
                  {c.body}
                </p>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5 transition hover:-translate-y-0.5 hover:shadow"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-base font-semibold text-ink-900 sm:text-lg">
                        {item.name}
                      </h3>
                      <span className="flex-none whitespace-nowrap rounded-full bg-[var(--color-ember-500)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-ember-700)]">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-800/80">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-center">
          <p className="eyebrow">Don&rsquo;t see what you need?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            We&rsquo;ll quote almost anything you can imagine
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            The list above is the most common upgrades guests ask for. We&rsquo;ve
            done much more - custom décor, drone footage, surprise reveal
            setups, multi-day events. Call or text and tell us what
            you&rsquo;re picturing.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookNowButton>Start Your Booking</BookNowButton>
            <a href={SITE.phoneHref} className="btn-ghost">
              Call {SITE.phone}
            </a>
            <Link href="/bonfire-packages" className="btn-ghost">
              Back to Packages
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
