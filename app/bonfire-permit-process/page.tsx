import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { COMMUNITIES, FAQ, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bonfire Permit Process: Walton County, Destin & 30A",
  description:
    "How beach bonfire permits work near Destin and along 30A — Walton County process, $157 fee, 2-week timing, second-choice beaches, special-event permits, and what the permit does and doesn’t cover.",
  alternates: { canonical: "/bonfire-permit-process" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: `${SITE.domain}/bonfire-permit-process`,
    title: "Bonfire Permit Process | Destin Bonfire Company",
    description:
      "Walton County beach bonfire permit process — timing, fees, second-choice beaches, special-event permits, and what’s included.",
    images: [
      {
        url: "/images/BigCircleBonfireSetupNight.jpg",
        width: 1200,
        height: 630,
        alt: "Permitted 30A beach bonfire at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonfire Permit Process | Destin Bonfire Company",
    description:
      "Walton County beach bonfire permit process — timing, fees, second-choice beaches, special-event permits, and what’s included.",
    images: ["/images/BigCircleBonfireSetupNight.jpg"],
  },
};

const STEPS = [
  {
    n: "1",
    title: "You book a date",
    body: "Pick your package and date. We lock you into our schedule and confirm group size, vibe, and your second-choice beach.",
  },
  {
    n: "2",
    title: "We submit your permit application",
    body: "Walton County opens the permit window about two weeks before your date. We submit your application on the first available day.",
  },
  {
    n: "3",
    title: "Beach is confirmed",
    body: "Once the permit is issued, we lock in your specific beach access — first choice if available, second choice if not — and send you the address, parking notes, and arrival window.",
  },
  {
    n: "4",
    title: "You show up — we’ve done everything else",
    body: "Setup, fire, attendant, s’mores, cleanup. The permit is on file for any beach patrol or fire-rescue check. You just enjoy the night.",
  },
];

const COVERED = [
  "Walton County beach bonfire permit ($157 fee)",
  "Application, submission, and beach assignment",
  "On-site permit display for any patrol check",
  "Setup on a permitted regional beach access",
  "Trained on-site attendant managing the fire",
];

const NOT_COVERED = [
  "Bonfires inside Destin city limits (Okaloosa County) — not legal, period",
  "Bonfires on private community beaches (Seaside, Rosemary, deeded condos)",
  "Personal alcohol or open-container violations on public beach",
  "Driving on the sand or unauthorized vehicle access",
  "Fireworks, pyrotechnics, or amplified sound after county quiet hours",
];

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

  const permitFaqs = FAQ.filter((f) => f.topic === "Permits");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: permitFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="Bonfire Permit Process"
        subtitle="How beach bonfire permits work near Destin and along 30A. Bonfires aren’t allowed inside Destin city limits, but they are permitted on select Walton County beaches including Miramar Beach, Santa Rosa Beach, and along 30A — and we handle the entire permit coordination for you."
      />

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <div className="flex flex-col gap-3 pb-12 sm:flex-row sm:justify-center">
            <BookNowButton>Book Your Bonfire</BookNowButton>
            <a href={SITE.phoneHref} className="btn-ghost">
              Call {SITE.phone}
            </a>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            How Beach Bonfire Permits Work Near Destin &amp; Along 30A
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              Beach bonfires are{" "}
              <strong>not legal within Destin city limits (Okaloosa County)</strong>
              . Every legal bonfire near Destin actually takes place on a
              permitted Walton County beach access — the closest of which is{" "}
              <Link href="/locations/miramar-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                Miramar Beach
              </Link>
              , 10–15 minutes east of most Destin condos.
            </p>
            <p>
              Walton County issues a fixed number of bonfire permits per beach
              per day, with a $157 permit fee. We host bonfires exclusively on
              permitted accesses — including across{" "}
              <Link href="/locations/30a-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                30A
              </Link>
              ,{" "}
              <Link href="/locations/santa-rosa-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                Santa Rosa Beach
              </Link>
              , and the accesses serving{" "}
              <Link href="/locations/rosemary-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                Rosemary Beach
              </Link>{" "}
              and{" "}
              <Link href="/locations/seaside-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">
                Seaside
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow">The Permit Timeline</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              From booking to bonfire, in four steps
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-3xl border border-ink-900/10 bg-[var(--color-sand-50)] p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ember-500)] text-base font-semibold text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-800/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink-900/5">
            <p className="eyebrow text-[var(--color-ember-700)]">What the permit covers</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Included in every package
            </h2>
            <ul className="mt-6 space-y-3">
              {COVERED.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-ink-800/90">
                  <svg className="mt-1 h-4 w-4 flex-none text-[var(--color-ember-600)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink-900/5">
            <p className="eyebrow text-ink-800/75">What the permit does NOT cover</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              The permit is for a bonfire — that’s it
            </h2>
            <ul className="mt-6 space-y-3">
              {NOT_COVERED.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-ink-800/90">
                  <svg className="mt-1 h-4 w-4 flex-none text-ink-800/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow">A Transparent Process</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            All permit fees are paid directly to the county
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            <p>
              All permit fees are set by the county and paid directly to them
              — we do not mark up or profit from permit costs in any way. The
              current Walton County beach bonfire permit fee is{" "}
              <strong>$157</strong>, and it&rsquo;s built into every package
              price transparently.
            </p>
            <p>
              For bonfires that need a special-event permit (typically 30+
              guests, expanded lighting, catering, or amplified sound),
              we&rsquo;ll quote the additional county fee separately during
              booking and walk you through the application requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow text-center">Permit FAQs</p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Permit-specific questions
          </h2>
          <dl className="mt-10 divide-y divide-ink-900/10 rounded-3xl bg-white px-8 py-2 shadow-sm ring-1 ring-ink-900/5">
            {permitFaqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-lg font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ink-800/85">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Where Permits Apply</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              Browse permitted accesses by community
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80">
              Each guide lists the specific permitted beach accesses we host
              for guests in that area, plus parking and dining notes.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {COMMUNITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] p-5 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-ember-400)]/60 hover:shadow"
              >
                <p className="font-semibold text-ink-900">{c.name}</p>
                <p className="mt-1 text-xs text-ink-800/75">
                  {c.beaches.length} access{c.beaches.length === 1 ? "" : "es"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-sand-50)] py-20 sm:py-28">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Ready to plan your bonfire?
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-800/85 sm:text-base">
            Book online or call us — we’ll handle the permit, the setup, and
            every detail in between.
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
    </>
  );
}
