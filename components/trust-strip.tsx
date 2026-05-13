const BADGES = [
  {
    label: "Fully Walton County permitted",
    sub: "Walton County permit handled on every booking",
    icon: "shield" as const,
  },
  {
    label: "Locally owned & operated",
    sub: "Built and run from 30A",
    icon: "pin" as const,
  },
  {
    label: "Verified guest reviews",
    sub: "5★ across Google & Tripadvisor",
    icon: "star" as const,
  },
  {
    label: "Fully insured & professional",
    sub: "Trained on-site attendant on every fire",
    icon: "check" as const,
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-ink-900/10 bg-[var(--color-sand-50)] py-10">
      <div className="container-x">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b) => (
            <li key={b.label} className="flex items-start gap-4">
              <BadgeIcon icon={b.icon} />
              <div>
                <p className="text-sm font-semibold text-ink-900">{b.label}</p>
                <p className="mt-1 text-xs text-ink-800/65">{b.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BadgeIcon({ icon }: { icon: "shield" | "pin" | "star" | "check" }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "mt-0.5 flex-none text-[var(--color-ember-600)]",
  };
  switch (icon) {
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 2 4 5v6c0 5 3.5 9.3 8 11 4.5-1.7 8-6 8-11V5z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 22s-7-7.58-7-13a7 7 0 1 1 14 0c0 5.42-7 13-7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <polygon points="12 2 15 8.6 22 9.3 17 14.1 18.5 21 12 17.6 5.5 21 7 14.1 2 9.3 9 8.6" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="16 9 11 14 8 11" />
        </svg>
      );
  }
}
