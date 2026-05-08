import type { Metadata } from "next";
import { BookNowButton } from "@/components/book-now-button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Review our cancellation & refund policy for wedding bonfire events. Contact us for details on fees, weather, & custom service charges.",
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/refund-policy`,
    title: "Refund Policy | Destin Bonfire Company",
    description:
      "Review our cancellation & refund policy for wedding bonfire events. Contact us for details on fees, weather, & custom service charges.",
    images: [
      {
        url: "/images/IMG_0684.jpeg",
        width: 1200,
        height: 630,
        alt: "Private beach bonfire on 30A",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | Destin Bonfire Company",
    description:
      "Review our cancellation & refund policy for wedding bonfire events. Contact us for details on fees, weather, & custom service charges.",
    images: ["/images/IMG_0684.jpeg"],
  },
};

export default function RefundPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Refund Policy",
        item: `${SITE.domain}/refund-policy`,
      },
    ],
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-900 pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h1 id="cancellations" className="scroll-mt-24 text-4xl font-semibold tracking-tight sm:text-5xl">
            Cancellations, Refunds &amp; Fees
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookNowButton>Book Your Bonfire</BookNowButton>
            <a href={SITE.phoneHref} className="btn-secondary">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-[15px] leading-relaxed text-ink-800/90 sm:text-base">
          <h3 className="text-center text-3xl font-semibold text-ink-900 sm:text-4xl">
            Guest Cancelation Policy
          </h3>

          <h3 className="mt-12 text-3xl font-semibold text-ink-900 sm:text-4xl">
            Permits
          </h3>

          <p className="mt-6">
            Walton County requires permits for all beach bonfires, and these
            permits must be purchased in advance for your event.
          </p>

          <p className="mt-5">
            Guests must understand that beach access, times and requested dates
            cannot be guaranteed upon booking, since permits are subject to
            county availability and are typically purchased about two weeks in
            advance. Guests will receive confirmation as soon as a permit has
            been secured.
          </p>

          <p className="mt-5">
            If permits <strong>have not yet been purchased</strong>, you will
            receive a <strong>full refund</strong> if you cancel.
          </p>

          <p className="mt-5">
            General bonfire permits are purchased{" "}
            <strong>about 14 days before your event</strong>, while special
            event permits are usually purchased{" "}
            <strong>30 days in advance</strong>. Once a permit has been
            purchased, the{" "}
            <strong>permit fee itself cannot be refunded</strong>, as the
            county does not allow refunds on issued permits.
          </p>

          <p className="mt-5">
            If you cancel{" "}
            <strong>after permits have been purchased</strong>:
          </p>

          <ul className="mt-5 list-disc space-y-4 pl-6">
            <li>
              <strong>
                More than 48 hours before your scheduled start time:
              </strong>{" "}
              You will receive a{" "}
              <strong>full refund minus the permit fee(s).</strong>
            </li>
            <li>
              <strong>
                Less than 48 hours before your scheduled start time:
              </strong>{" "}
              You will receive a{" "}
              <strong>
                booking credit for the amount paid minus the permit fee(s)
              </strong>
              . Because county permits are purchased in advance and cannot be
              refunded, permit fees are not included in credits. If you
              reschedule to a new date,{" "}
              <strong>new permit fees will apply</strong>.
            </li>
            <li>
              For{" "}
              <strong>
                same-day cancellations within 6 hours of your scheduled start
                time
              </strong>
              , we are unable to offer refunds or booking credits.  We do our
              best to keep our policies fair while also covering the permits
              and preparation required to host your bonfire.
            </li>
            <li>
              <strong>Special events and groups of 30 or more</strong> may
              cancel for any reason up to 60 days prior to their event unless
              otherwise noted upon your bookng.  Cancellations made within 60
              days of the event may still be eligible for a refund; however,
              any refund issued will exclude the 50% deposit and any permit
              fees.
            </li>
          </ul>

          <p className="mt-10 text-2xl font-bold text-ink-900">
            Permit &amp; Processing Fee Refunds
          </p>

          <p className="mt-5">
            As mentioned, county permit fees are non-refundable once purchased
            because those fees are paid to Walton County and are not reimbursed
            to us. Processing fees charged by our booking partner, FareHarbor,
            are also non-refundable because those fees are retained by
            FareHarbor and are not returned to us. We do not keep, receive, or
            profit from either of these fees. Guests are always welcome to book
            and pay directly with us by phone at no additional charge. If you
            choose to book through our website, any applicable processing fees
            will not be refunded.
          </p>

          <h3 className="mt-14 text-3xl font-semibold text-ink-900 sm:text-4xl">
            Beach Conditions
          </h3>

          <p className="mt-6">
            Rain alone does not automatically cancel a bonfire. If you choose
            to cancel due to weather and the county has{" "}
            <strong>not cancelled bonfires</strong>, the cancellation will be
            handled under the Guest Cancellation Policy above.
          </p>

          <p className="mt-5">
            If the weather looks uncertain, we’re always happy to work with
            you. We can often <strong>adjust the start time</strong> if times
            are available. Requests to move your bonfire time due to weather
            must be made{" "}
            <strong>before noon on the day of your event</strong>, and we’ll
            do our best to accommodate.
          </p>

          <p className="mt-5">
            If you choose to{" "}
            <strong>reschedule for another day</strong>, you will need to
            purchase a new permit and we will gladly work with you to find a
            new date that fits your schedule.above.
          </p>

          <p className="mt-5">
            If the county cancels your bonfire due to regulations, burn bans,
            sea turtle-related beach restrictions, environmental conditions,
            or emergency orders, we will refund all amounts paid minus the
            permit fees that were paid to the county. Any reschedule is
            subject to availability and requires a new $157 county permit. We
            do not charge a rescheduling fee or do not markup required permit
            fees.
          </p>

          <p className="mt-5">
            For{" "}
            <strong>
              same-day cancellations within 6 hours of your scheduled start
              time
            </strong>
            , we are unable to offer refunds or booking credits.
          </p>

          <h3 className="mt-14 text-3xl font-semibold text-ink-900 sm:text-4xl">
            Turtle Nesting
          </h3>

          <p className="mt-6">
            We operate with care and respect for the beautiful beaches and
            wildlife that make the Emerald Coast so special.
          </p>

          <p className="mt-5">
            In rare cases,{" "}
            <strong>
              protected turtle nesting areas or changing beach conditions
            </strong>{" "}
            may require adjustments to approved bonfire locations. If this
            happens, we will coordinate a{" "}
            <strong>nearby alternative location</strong> in advance so your
            experience remains smooth and enjoyable.
          </p>

          <p className="mt-5">
            Our goal is always to make sure your bonfire experience is
            memorable for all the right reasons.
          </p>

          <p className="mt-10 text-2xl font-bold text-ink-900">
            Beach Safety Rules
          </p>

          <p className="mt-5">
            To help keep the beach safe and follow county regulations, glass
            is strictly prohibited at all bonfires. Any glass brought to the
            event may result in a $250 fee per item and could require the
            bonfire to be canceled or shut down. Balloons are also not
            allowed because of their impact on the environment and local
            wildlife.
          </p>
        </div>
      </section>

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
