import Link from "next/link";
import { SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/Wideshot12ChairsBeach.jpeg"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-optimized.webm" type="video/webm" />
        <source src="/videos/hero-optimized.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/70 via-ink-900/40 to-ink-900/80"
        aria-hidden="true"
      />

      <div className="container-x relative flex min-h-[92vh] flex-col items-center justify-center py-32 text-center text-white">
        <p className="eyebrow text-[var(--color-ember-400)]">30A · Destin · Walton County</p>
        <h1 className="mt-5 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          All-Inclusive Beach Bonfire Experiences
          <span className="block text-[var(--color-ember-400)]">Serving 30A &amp; Destin</span>
        </h1>
        <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-sand-100 sm:text-xl">
          Private, professionally hosted bonfires on permitted Walton County beaches.
          We handle permits, setup, cleanup, and hosting - so you can simply
          show up and enjoy the night.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <BookNowButton className="text-base">
            Book Your Bonfire
          </BookNowButton>
          <a href={SITE.phoneHref} className="btn-secondary text-base">
            Call {SITE.phone}
          </a>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4 text-center text-xs uppercase tracking-wider text-sand-100/80 sm:text-sm">
          <div className="flex flex-col items-center gap-2">
            <IconFire />
            <span>Permits included</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconChair />
            <span>Full setup &amp; cleanup</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconSmore />
            <span>Complimentary s’mores</span>
          </div>
        </div>

        <Link
          href="#welcome"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition hover:text-white"
        >
          <span className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/70 p-1.5">
            <span className="h-2 w-0.5 animate-bounce rounded-full bg-white/80" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function IconFire() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-1.5.5-2.5 1-3 0 2 1.5 3 1.5 3S12 8 12 2z" />
      <path d="M8 13c0 4 2 7 4 7s4-3 4-7" />
    </svg>
  );
}
function IconChair() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 10V6a2 2 0 1 1 4 0v4" />
      <path d="M14 10V6a2 2 0 1 1 4 0v4" />
      <path d="M4 10h16v3H4z" />
      <path d="M6 13v5M18 13v5" />
    </svg>
  );
}
function IconSmore() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="8" width="18" height="3" rx="1" />
      <rect x="3" y="13" width="18" height="3" rx="1" />
      <path d="M5 8V6M19 8V6M10 8V6M14 8V6" />
    </svg>
  );
}
