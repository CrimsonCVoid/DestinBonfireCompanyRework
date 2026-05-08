import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bonfire Permit Process on 30A",
  description:
    "How bonfire permits work on 30A, Destin, and Walton County beaches. Timing, second-choice beaches, special event permits, and what’s included in our booking.",
  alternates: { canonical: "/bonfire-permit-process" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/bonfire-permit-process`,
    title: "Bonfire Permit Process on 30A | Destin Bonfire Company",
    description:
      "How bonfire permits work on 30A, Destin, and Walton County beaches. Timing, second-choice beaches, special event permits, and what’s included in our booking.",
    images: [
      {
        url: "/images/IMG_0684.jpeg",
        width: 1200,
        height: 630,
        alt: "Permitted 30A beach bonfire at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonfire Permit Process on 30A | Destin Bonfire Company",
    description:
      "How bonfire permits work on 30A, Destin, and Walton County beaches. Timing, second-choice beaches, special event permits, and what’s included in our booking.",
    images: ["/images/IMG_0684.jpeg"],
  },
};

export default function PermitPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bonfire Permit Process",
        item: `${SITE.domain}/bonfire-permit-process`,
      },
    ],
  };

  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="Bonfire Permit Process"
        subtitle="Permits on 30A are issued by Walton County and capped daily. We manage the entire process so your group can focus on the fun."
      />

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <div className="flex flex-col gap-3 pb-12 sm:flex-row sm:justify-center">
            <BookNowButton>Book Your Bonfire</BookNowButton>
            <a href={SITE.phoneHref} className="btn-ghost">
              Call Now {SITE.phone}
            </a>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            How Beach Bonfire Permits Work Near Destin &amp; Along 30A
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              Planning a beach bonfire should feel simple and stress-free — and
              with the right guidance, it is. One of the most common questions
              we receive is about permits, especially for guests staying in
              Destin. Here’s what you need to know:
            </p>
            <p>
              Beach bonfires are{" "}
              <strong>
                not permitted within Destin city limits (Okaloosa County)
              </strong>
              . However, just minutes away, permitted bonfires are allowed on
              select beaches in Walton County, including Miramar Beach, Santa
              Rosa Beach, and along 30A.
            </p>
            <p>
              At Destin Bonfire Company, we host our bonfires exclusively on
              these permitted beaches and handle the entire process for you so
              your experience is fully compliant, professionally managed, and
              easy to enjoy from start to finish.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            How the Walton County Permit Process Works
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Once you reserve your bonfire, our team coordinates all required
            permits behind the scenes.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Here’s how the process works:
          </p>
          <ul className="mt-5 list-disc space-y-4 pl-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <li>
              Standard bonfire permits are released by Walton County{" "}
              <strong>two weeks prior to your scheduled event date</strong>
            </li>
            <li>
              Each beach is limited to a{" "}
              <strong>set number of permits per day</strong>
            </li>
            <li>
              Because availability is limited, we require a{" "}
              <strong>second-choice beach option</strong> in case your first
              choice is unavailable
            </li>
            <li>
              Permits are secured based on availability at the time they are
              released
            </li>
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            This is why booking early is important — while permits are not
            issued until closer to your date, your reservation ensures you are
            in position when they become available.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Limited Availability &amp; Planning Ahead
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              Because Walton County strictly limits the number of bonfires
              allowed each day, certain dates and beaches can fill quickly —
              especially during peak seasons.
            </p>
            <p>
              Providing flexibility with location and booking in advance gives
              you the best chance of securing your preferred setup.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            When a Special Event Permit May Be Recommended
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            If you are planning a larger gathering or would like to include
            additional elements such as catering, lighting, or expanded setups,
            an additional <strong>special event permit</strong> may be required
            by the county in addition to your standard bonfire permit.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            This option can:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <li>Allow for more advanced planning</li>
            <li>
              Provide greater flexibility for larger or more customized events
            </li>
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            We’re happy to guide you through whether this is needed for your
            specific event.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            A Transparent Process
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>We believe in keeping things simple and transparent.</p>
            <p className="font-semibold text-ink-900">
              All permit fees are set by the county and paid directly to them —
              we do not mark up or profit from permit costs in any way. We do
              not add any admin or processing fees to your permit purchase.
            </p>
            <p>
              Our role is to manage the process, handle the logistics, and
              ensure everything is done properly so you don’t have to worry
              about the details.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Ready to plan your beach bonfire experience?
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Book online or contact us to learn more about availability, private
            events, and custom celebrations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-ghost">
              Call Us Today {SITE.phone}
            </a>
            <BookNowButton>Book Your Bonfire</BookNowButton>
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
