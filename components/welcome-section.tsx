import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

export function WelcomeSection() {
  return (
    <section id="welcome" className="relative bg-[var(--color-sand-50)] py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Welcome to {SITE.name}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            30A and Destin&apos;s most-booked private beach bonfire experience
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-800/80 sm:text-lg">
            We&apos;re a fully-permitted, locally operated bonfire team serving
            guests staying in Destin, Miramar Beach, and along 30A. Every
            bonfire we host is run on a Walton County permit pulled in your
            name, set up by hand on the sand by our crew, and tended by an
            on-site attendant from light to last ember.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/Great9SeatBonfirePhoto.jpg"
              alt="Private beach bonfire setup with nine-seat ring on 30A at golden hour"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-ink-800/90 sm:text-base">
            <p className="text-lg font-semibold text-ink-900">
              Every detail handled, every time. Permit, premium chairs, tiki
              torches, ambient lighting, cornhole, complimentary s&rsquo;mores,
              and an on-site attendant — included on every package, no add-ons
              required.
            </p>
            <p>
              We host bonfires across the closest permitted Walton County
              beaches to Destin and along the full length of 30A — including{" "}
              <Link href="/locations/miramar-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">Miramar Beach</Link>,{" "}
              <Link href="/locations/santa-rosa-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">Santa Rosa Beach</Link>,{" "}
              <Link href="/locations/seaside-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">Seaside</Link>,{" "}
              <Link href="/locations/rosemary-beach-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">Rosemary Beach</Link>,
              and the rest of{" "}
              <Link href="/locations/30a-bonfires" className="font-semibold text-[var(--color-ember-700)] underline-offset-4 hover:underline">30A</Link>.
            </p>
            <p>
              Bachelorette weekends, family reunions, proposals, milestone
              birthdays, wedding welcome parties — guests rebook us year after
              year for the moments that matter. Call or text{" "}
              <a href={SITE.phoneHref} className="font-semibold text-[var(--color-ember-600)] underline-offset-4 hover:underline">
                {SITE.phone}
              </a>{" "}
              and you&rsquo;ll hear back from a real person, usually within minutes.
            </p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <BookNowButton>Book Your Bonfire</BookNowButton>
              <a href="/bonfire-permit-process" className="btn-ghost">
                How Permits Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
