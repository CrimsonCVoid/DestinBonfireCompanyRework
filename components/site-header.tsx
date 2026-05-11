"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

const NAV = [
  { href: "/bonfire-packages", label: "Packages" },
  { href: "/#AREASWESERVE", label: "Locations We Serve" },
  { href: "/bachelorette-bonfire", label: "Bachelorette" },
  { href: "/bonfire-permit-process", label: "Permits" },
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
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" aria-label={SITE.name} className="flex items-center gap-3">
          <Image
            src="/images/destin-bonfire-company-logo.png"
            alt={SITE.name}
            width={180}
            height={125}
            priority
            className={`h-14 w-auto transition ${scrolled ? "" : "drop-shadow-lg"}`}
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-semibold uppercase tracking-wider transition ${
                scrolled
                  ? "text-ink-900 hover:text-[var(--color-ember-600)]"
                  : "text-white hover:text-[var(--color-sand-100)]"
              }`}
            >
              {item.label}
            </Link>
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
        className={`fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-[var(--color-sand-50)] shadow-2xl transition-transform lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Image src="/images/destin-bonfire-company-logo.png" alt={SITE.name} width={140} height={97} className="h-12 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pb-8 pt-2" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-ink-900 hover:bg-[var(--color-sand-100)]"
            >
              {item.label}
            </Link>
          ))}
          <BookNowButton className="mt-6" onClick={() => setOpen(false)}>
            Book Your Bonfire
          </BookNowButton>
          <a href={SITE.phoneHref} className="btn-ghost mt-3">
            Call {SITE.phone}
          </a>
        </nav>
      </aside>
    </header>
  );
}
