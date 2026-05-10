import { WHY_REASONS, STATS, type WhyReason } from "@/lib/site";
import { BookNowButton } from "./book-now-button";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Why guests choose Destin Bonfire Company
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-800/80 sm:text-lg">
            Plenty of operators will sell you a fire ring and a bag of
            firewood. We&rsquo;re not that. We&rsquo;re a fully-permitted,
            professionally hosted experience designed so your only job is to
            walk up and enjoy the night.
          </p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-900/10 bg-[var(--color-sand-50)] px-5 py-6 text-center"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-ink-800/60">
                {s.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-ember-600)] sm:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_REASONS.map((r) => (
            <li
              key={r.title}
              className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-[var(--color-sand-50)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-ember-400)]/60 hover:shadow-md"
            >
              <ReasonIcon icon={r.icon} />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">
                {r.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-800/80">
                {r.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <BookNowButton>Book Your Bonfire</BookNowButton>
          <p className="text-xs text-ink-800/60">
            Or call us at{" "}
            <a href="tel:+18507061325" className="font-semibold text-ink-900 hover:text-[var(--color-ember-600)]">
              (850) 706-1325
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function ReasonIcon({ icon }: { icon: WhyReason["icon"] }) {
  const props = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-[var(--color-ember-600)]",
  };
  switch (icon) {
    case "permit":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
    case "host":
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
        </svg>
      );
    case "setup":
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 1 0 0 5.7l5.3 5.3-2.8 2.8L11.9 14.7a4 4 0 0 1-5.6-5.6" />
          <path d="M3 21l4-4" />
        </svg>
      );
    case "premium":
      return (
        <svg {...props}>
          <path d="M12 2 4 7l8 5 8-5-8-5z" />
          <path d="M4 12l8 5 8-5" />
          <path d="M4 17l8 5 8-5" />
        </svg>
      );
    case "stress":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case "local":
      return (
        <svg {...props}>
          <path d="M12 22s-7-7.58-7-13a7 7 0 1 1 14 0c0 5.42-7 13-7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "comms":
      return (
        <svg {...props}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
        </svg>
      );
    case "trust":
      return (
        <svg {...props}>
          <path d="M12 2l3 6 7 1-5 4 1 7-6-3-6 3 1-7-5-4 7-1z" />
        </svg>
      );
  }
}
