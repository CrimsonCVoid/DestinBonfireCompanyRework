import Image from "next/image";
import Link from "next/link";

export function BacheloretteCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-sand-100)] py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="relative order-last aspect-[5/6] overflow-hidden rounded-[2rem] shadow-xl lg:order-first">
          <Image
            src="/images/BatchloretteLandFacing.jpg"
            alt="Bachelorette beach bonfire on 30A - bride and bridal party"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">Bachelorette Bonfire Experience</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            The perfect night for the bride-to-be
          </h2>
          <p className="mt-5 text-lg text-ink-800/80">
            Experiences start at <strong className="text-ink-900">$595 for groups up to 12 guests</strong>.
            Add custom décor, welcome signs, a photographer, florals, and more.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-ink-800">
            {[
              "Private permitted beach setup with seating",
              "Custom bachelorette welcome sign",
              "Bluetooth speaker for your playlist",
              "Cornhole + games for the group",
              "Optional photographer, florals, and champagne",
              "Full setup and cleanup by our team",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <svg className="mt-1 h-4 w-4 flex-none text-[var(--color-ember-600)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/bachelorette-bonfire" className="btn-primary">
              View Bachelorette Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
