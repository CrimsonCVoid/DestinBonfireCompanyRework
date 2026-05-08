import Image from "next/image";
import { SITE } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

export function WelcomeSection() {
  return (
    <section id="welcome" className="relative bg-[var(--color-sand-50)] py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Welcome to {SITE.name}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Creating Unforgettable Beach Bonfire Experiences on 30A and Florida&apos;s Emerald Coast
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-800/80 sm:text-lg">
            Destin Bonfire Company believes in providing professionally managed,
            all-inclusive local beach bonfire experiences along Scenic Highway
            30A and nearby permitted beaches for visitors staying in Destin and
            surrounding areas. Our goal is to make your beach night simple,
            safe, and unforgettable.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/IMG_0674.jpeg"
              alt="Private beach bonfire at sunset with seating and tiki torches"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-ink-800/90 sm:text-base">
            <p className="text-lg font-semibold text-ink-900">
              We handle every detail, including required permits, full setup,
              on-site hosting, and complete cleanup. Each bonfire includes
              comfortable seating, ambient lighting, games like cornhole, and
              complimentary s’mores — so you can relax and enjoy the evening
              with your group.
            </p>
            <p>
              From bachelorette parties and birthdays to family gatherings and
              romantic proposals, we create custom beach bonfire experiences for
              all kinds of special occasions. We proudly serve guests visiting
              Destin and Miramar Beach as well as 30A communities including
              Seaside, Rosemary Beach, Santa Rosa Beach, Inlet Beach, Grayton
              Beach, and Blue Mountain Beach. Whatever brings you to the beach,
              we&apos;re here to help create an unforgettable night by the fire.
            </p>
            <p>
              Book your beach bonfire experience today and let us take care of
              everything for you! Call or text us at{" "}
              <a href={SITE.phoneHref} className="font-semibold text-[var(--color-ember-600)] underline-offset-4 hover:underline">
                {SITE.phone}
              </a>{" "}
              for more information or to make a reservation.
            </p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <BookNowButton>Book Your Bonfire</BookNowButton>
              <a href="#packages" className="btn-ghost">
                See Packages
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
