import type { Metadata } from "next";
import Link from "next/link";
import { BookNowButton } from "@/components/book-now-button";
import { SITE } from "@/lib/site";

// VDX Marketing — conversion thank-you page.
// Per VDX brief: this page exists so GTM can fire a conversion when the URL
// changes after a contact form submission. Must remain noindex to keep
// organic traffic from inflating conversion counts.
export const metadata: Metadata = {
  title: "Thank You — We’ll Be In Touch",
  description:
    "Thanks for reaching out to Destin Bonfire Company. We’ll be in touch shortly to plan your beach bonfire.",
  alternates: { canonical: "/contact/thank-you" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

export default function ContactThankYouPage() {
  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-[var(--color-sand-50)] pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ember-500)]/15 text-[var(--color-ember-600)]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="eyebrow mt-8">Message Received</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Thanks — we’ll be in touch shortly
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-800/80 sm:text-lg">
            We received your inquiry and a real person from our team will reply
            usually within a few hours (and always within one business day).
            If your bonfire date is soon and you’d rather not wait, give us a
            call.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary">
              Call {SITE.phone}
            </a>
            <BookNowButton>Book Online Instead</BookNowButton>
          </div>

          <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
            <Link
              href="/bonfire-permit-process"
              className="rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-ember-400)]/60 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                While you wait
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-900">
                How the Walton County permit process works
              </p>
            </Link>
            <Link
              href="/#locations"
              className="rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-ember-400)]/60 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                While you wait
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-900">
                Browse permitted beaches by community
              </p>
            </Link>
            <Link
              href="/blog"
              className="rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-ember-400)]/60 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                While you wait
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-900">
                Read the local bonfire blog
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
