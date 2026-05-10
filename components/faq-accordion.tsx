"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FAQ } from "@/lib/site";

const TOPICS = ["Pricing", "Permits", "Locations", "Booking", "The Night"] as const;

export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(FAQ[0]?.q ?? null);

  const grouped = useMemo(() => {
    const m = new Map<string, typeof FAQ>();
    for (const t of TOPICS) m.set(t, []);
    for (const item of FAQ) {
      const key = item.topic && m.has(item.topic) ? item.topic : "Other";
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(item);
    }
    return m;
  }, []);

  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything guests usually want to know
          </h2>
          <p className="mt-6 max-w-md text-ink-800/75">
            Permit process, pricing, locations, and how the actual bonfire
            night unfolds. Still have a question? Call or text us at{" "}
            <a href="tel:+18507061325" className="font-semibold text-[var(--color-ember-700)] hover:underline">
              (850) 706-1325
            </a>{" "}
            and you’ll hear back from a real person.
          </p>
          <div className="mt-8">
            <Link href="/bonfire-permit-process" className="btn-ghost">
              Read the full permit process
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          {Array.from(grouped.entries())
            .filter(([, items]) => items.length > 0)
            .map(([topic, items]) => (
              <div key={topic}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                  {topic}
                </p>
                <div className="mt-4 divide-y divide-ink-900/10 rounded-3xl bg-[var(--color-sand-50)] p-2">
                  {items.map((item) => {
                    const isOpen = open === item.q;
                    return (
                      <div key={item.q} className="overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : item.q)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left transition hover:bg-white"
                        >
                          <span className="text-base font-semibold text-ink-900 sm:text-[17px]">
                            {item.q}
                          </span>
                          <svg
                            className={`h-5 w-5 flex-none text-[var(--color-ember-600)] transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-800/85">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
