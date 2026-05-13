import Link from "next/link";
import Image from "next/image";
import { COMMUNITIES, SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-sand-100">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/destin-bonfire-company-logo.png"
            alt={SITE.name}
            width={200}
            height={139}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/90">
            Locally owned, professionally hosted beach bonfires across 30A and
            the closest permitted beaches to Destin. We handle permits, setup,
            and cleanup so you can simply enjoy the night.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-500)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.3-1.5 1.5-1.5h1.5V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11h-2.5v3h2.5v7h2.9z"/></svg>
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[var(--color-ember-500)] hover:text-[var(--color-ember-500)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-400)]">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/bonfire-packages">Beach Bonfire Packages</Link></li>
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/bachelorette-bonfire">Bachelorette Bonfires</Link></li>
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/bonfire-permit-process">Permit Process</Link></li>
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/blog">Bonfire Blog</Link></li>
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/#faq">FAQ</Link></li>
            <li><Link className="hover:text-[var(--color-ember-400)]" href="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-400)]">Locations</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {COMMUNITIES.map((c) => (
              <li key={c.slug}>
                <Link className="hover:text-[var(--color-ember-400)]" href={`/locations/${c.slug}`}>
                  {c.pageTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-sand-200/60 hover:text-[var(--color-ember-400)]" href="/#service-areas">
                All 11 beach accesses →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-400)]">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={SITE.phoneHref} className="hover:text-[var(--color-ember-400)]">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="hover:text-[var(--color-ember-400)]">
                {SITE.email}
              </a>
            </li>
            <li className="text-sand-200/80">
              {SITE.address.city}, {SITE.address.region}
            </li>
            <li className="text-sand-200/60">
              Mon–Fri · 9:00 AM – 6:00 PM
            </li>
          </ul>
          <BookNowButton className="mt-6">Book Your Bonfire</BookNowButton>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-sand-200/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Serving Destin, Miramar Beach, Santa Rosa Beach, Seaside, Rosemary
            Beach, Inlet Beach, Grayton Beach & Blue Mountain Beach.
          </p>
        </div>
      </div>
    </footer>
  );
}
