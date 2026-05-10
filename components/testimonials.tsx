import { TESTIMONIALS } from "@/lib/site";

type Props = {
  community?: string;
  limit?: number;
  heading?: string;
  eyebrow?: string;
};

export function Testimonials({ community, limit = 6, heading, eyebrow }: Props = {}) {
  const filtered = community
    ? TESTIMONIALS.filter((t) =>
        t.location.toLowerCase().includes(community.toLowerCase()),
      )
    : TESTIMONIALS;
  const list = (filtered.length >= 3 ? filtered : TESTIMONIALS).slice(0, limit);

  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-24 text-white sm:py-32">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/Wideshot12ChairsBeach.jpeg"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        aria-hidden="true"
      >
        <source src="/videos/circular-fire.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/75 via-ink-900/55 to-ink-900/85" aria-hidden="true" />
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[var(--color-ember-400)]">
            {eyebrow ?? "Guest Stories"}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {heading ?? "What our guests say"}
          </h2>
          <p className="mt-5 text-sand-100/80">
            Verified guest reviews from bachelorette weekends, family
            reunions, anniversaries, and proposals across Destin and 30A.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {list.map((t) => (
            <figure
              key={t.name + t.text.slice(0, 20)}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex gap-0.5 text-[var(--color-ember-400)]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-sand-100">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sand-200/70">
                  {t.location}
                  {"occasion" in t && t.occasion ? ` · ${t.occasion}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
