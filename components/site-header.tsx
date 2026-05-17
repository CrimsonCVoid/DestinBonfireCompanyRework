"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

const NAV = [
  { href: "/bonfire-packages", label: "Packages" },
  { href: "/locations", label: "Locations We Serve" },
  { href: "/bachelorette-bonfire", label: "Bachelorette" },
  { href: "/destin", label: "Destin" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-24 items-center justify-between sm:h-28">
        <Link href="/" aria-label={SITE.name} className="flex items-center gap-3">
          <Image
            src="/images/destin-bonfire-company-logo.png"
            alt={SITE.name}
            width={240}
            height={167}
            priority
            className={`h-16 w-auto transition sm:h-20 ${scrolled ? "" : "drop-shadow-lg"}`}
          />
        </Link>

        <nav className="hidden items-center gap-3 xl:gap-5 lg:flex" aria-label="Primary">
          {NAV.map((item, idx) => (
            <Fragment key={item.href}>
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className={`h-3 w-px ${
                    scrolled ? "bg-ink-900/15" : "bg-white/30"
                  }`}
                />
              )}
              <Link
                href={item.href}
                className={`text-[13px] font-semibold uppercase tracking-wider transition ${
                  scrolled
                    ? "text-ink-900 hover:text-[var(--color-ember-600)]"
                    : "text-white hover:text-[var(--color-sand-100)]"
                }`}
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className={`text-sm font-semibold tracking-wide transition ${
              scrolled
                ? "text-ink-900 hover:text-[var(--color-ember-600)]"
                : "text-white hover:text-[var(--color-sand-100)]"
            }`}
          >
            {SITE.phone}
          </a>
          <BookNowButton>Book Now</BookNowButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${
            scrolled
              ? "border-ink-900/15 text-ink-900"
              : "border-white/60 text-white"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-ink-900/40 backdrop-blur transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-[var(--color-sand-50)] shadow-2xl transition-transform lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
      >
        {/* Header: logo + close. Sticky so it stays visible if the nav
            list ever grows past the viewport height. */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-900/10 bg-[var(--color-sand-50)]/95 px-6 py-5 backdrop-blur">
          <Image
            src="/images/destin-bonfire-company-logo.png"
            alt={SITE.name}
            width={160}
            height={111}
            className="h-14 w-auto"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-900 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-600)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body. */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Primary CTAs - phone first since it's the highest-intent
              action a guest can take from a mobile context. */}
          <div className="grid gap-3 px-6 pt-6">
            <a
              href={SITE.phoneHref}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-[var(--color-ember-500)] px-5 py-4 text-white shadow-lg shadow-ember-500/20 transition hover:bg-[var(--color-ember-600)]"
            >
              <span className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.37 1.94.71 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.92.34 1.88.58 2.86.71A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">Call us</p>
                  <p className="text-base font-semibold leading-tight">{SITE.phone}</p>
                </div>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 group-hover:text-white">
                Tap to call →
              </span>
            </a>
            <BookNowButton
              fullWidth
              className="text-base"
              onClick={() => setOpen(false)}
            >
              Book a Bonfire
            </BookNowButton>
          </div>

          {/* Primary nav */}
          <nav className="mt-7 flex flex-col px-3 pb-2" aria-label="Mobile">
            <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-800/55">
              Explore
            </p>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-ink-900 transition hover:bg-[var(--color-sand-100)]"
              >
                <span>{item.label}</span>
                <svg
                  className="h-4 w-4 text-ink-800/40 transition group-hover:translate-x-0.5 group-hover:text-[var(--color-ember-600)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Secondary helpers */}
          <div className="mt-6 border-t border-ink-900/10 px-3 py-4">
            <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-800/55">
              Quick Links
            </p>
            <Link
              href="/add-ons"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-[var(--color-sand-100)]"
            >
              Add-ons & upgrades
            </Link>
            <Link
              href="/bonfire-permit-process"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-[var(--color-sand-100)]"
            >
              How the permit process works
            </Link>
            <a
              href={SITE.emailHref}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-[var(--color-sand-100)]"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Footer: socials. */}
        <div className="border-t border-ink-900/10 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-800/55">
            Follow along
          </p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-800 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-600)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.3-1.5 1.5-1.5h1.5V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11h-2.5v3h2.5v7h2.9z"/></svg>
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-800 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-600)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a
              href={SITE.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-800 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-600)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.6 7.7a6 6 0 0 1-3.6-1.2v8.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 1.9 2.7V2h2.8a4 4 0 0 0 3.7 3.7v2z" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
}
