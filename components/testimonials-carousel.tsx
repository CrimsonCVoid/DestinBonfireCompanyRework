"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL, type GoogleReview } from "@/lib/site";

/**
 * Horizontal scroll-snap carousel of live Google reviews.
 *
 * - Single row, snap-mandatory so each card aligns to the start.
 * - Auto-advances every 6 seconds, looping back to the start when it
 *   reaches the end. Paused while the section is hovered or focused
 *   (desktop) and for 12s after any manual scroll, wheel, touch, or
 *   arrow-button interaction (so guests can actually finish reading
 *   a review). Honors prefers-reduced-motion - completely opts out.
 * - Arrow buttons scroll by one card width at a time (rounded down so the
 *   next card is fully revealed, never half-clipped).
 * - The native scrollbar is hidden visually; users can still scroll with
 *   trackpad / touch / keyboard / mouse-wheel-shift.
 * - Arrows fade/disable at the boundaries so it's obvious when you've
 *   reached the start or end.
 * - "See all reviews on Google" deep-links to the live GBP feed so anyone
 *   who wants the unfiltered set (including critical reviews) can read
 *   them on Google.
 */
const AUTO_ADVANCE_MS = 6000;
const USER_PAUSE_MS = 12000;

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLOListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  // Hover / focus pause - controlled by the section-level handlers.
  const [isPaused, setIsPaused] = useState(false);
  // Set on every user-initiated scroll/touch/wheel/click so the auto
  // advancer holds off for USER_PAUSE_MS, giving readers time to finish.
  const userInteractedAtRef = useRef(0);

  const updateBoundaries = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateBoundaries();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateBoundaries, { passive: true });
    window.addEventListener("resize", updateBoundaries);
    return () => {
      el.removeEventListener("scroll", updateBoundaries);
      window.removeEventListener("resize", updateBoundaries);
    };
  }, [updateBoundaries]);

  // Auto-advance loop. Skips when the section is hovered/focused, when
  // the user just interacted, when the tab isn't visible, or when the
  // user prefers reduced motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      if (isPaused) return;
      if (document.hidden) return;
      if (Date.now() - userInteractedAtRef.current < USER_PAUSE_MS) return;

      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        // Loop back to the first card.
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const distance = Math.floor(el.clientWidth * 0.9);
        el.scrollBy({ left: distance, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [isPaused]);

  function markUserInteraction() {
    userInteractedAtRef.current = Date.now();
  }

  function step(direction: 1 | -1) {
    markUserInteraction();
    const el = trackRef.current;
    if (!el) return;
    // Scroll by ~90% of viewport so a partially-visible card slides fully
    // into view rather than being skipped.
    const distance = Math.floor(el.clientWidth * 0.9) * direction;
    el.scrollBy({ left: distance, behavior: "smooth" });
  }

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative isolate overflow-hidden bg-ink-900 py-24 text-white sm:py-32"
    >
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
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/75 via-ink-900/55 to-ink-900/85"
        aria-hidden="true"
      />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[var(--color-ember-400)]">Guest Stories</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            What our guests say
          </h2>
          <p className="mt-5 text-sand-100/80">
            Verified Google reviews from bachelorette weekends, family
            reunions, proposals, and wedding receptions across Destin and 30A.
          </p>
        </div>

        {/* Arrow controls */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sand-100/70">
            <GoogleGlyph />
            <span>Live from Google</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="prev" disabled={!canPrev} onClick={() => step(-1)} />
            <ArrowButton direction="next" disabled={!canNext} onClick={() => step(1)} />
          </div>
        </div>

        {/* Carousel track. The pointer/wheel/touch handlers defer the
            auto-advance for USER_PAUSE_MS so a guest mid-swipe doesn't
            get yanked to the next card. */}
        <ol
          ref={trackRef}
          aria-label="Guest reviews from Google"
          onPointerDown={markUserInteraction}
          onWheel={markUserInteraction}
          onTouchStart={markUserInteraction}
          className="testimonials-track mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5"
        >
          {GOOGLE_REVIEWS.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} />
          ))}
          {/* Final card: deep-link to the full Google review list */}
          <li className="flex-none snap-start" style={{ width: "var(--card-w, 340px)" }}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/25 bg-white/5 p-8 text-center backdrop-blur transition hover:border-[var(--color-ember-400)] hover:bg-white/10"
            >
              <GoogleGlyph large />
              <p className="mt-5 text-xl font-semibold text-white">See every review</p>
              <p className="mt-2 text-sm text-sand-100/75">
                Open the full Destin Bonfire Company review feed on Google.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ember-400)] transition group-hover:translate-x-0.5">
                Visit Google
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H9M17 7v8" />
                </svg>
              </span>
            </a>
          </li>
        </ol>
      </div>

      {/* Hide native scrollbar (Webkit + Firefox) while keeping scroll
          functionality. Pinned card width via CSS var so we can tweak in
          one place. */}
      <style jsx>{`
        :global(.testimonials-track) {
          scrollbar-width: none;
          --card-w: 340px;
        }
        @media (min-width: 640px) {
          :global(.testimonials-track) {
            --card-w: 380px;
          }
        }
        :global(.testimonials-track::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "·";
  const subline =
    review.occasion && review.dateLabel
      ? `${review.dateLabel} · ${review.occasion}`
      : review.dateLabel;

  return (
    <li
      className="flex flex-none snap-start flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
      style={{ width: "var(--card-w, 340px)" }}
    >
      {/* Star rating */}
      <div className="flex items-center justify-between">
        <div
          className="flex gap-0.5 text-[var(--color-ember-400)]"
          role="img"
          aria-label="Rated 5 out of 5 stars"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-sand-100/55">
          Google
        </span>
      </div>

      {/* Body */}
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-sand-100/95">
        &ldquo;{review.text}{review.truncated ? "…" : ""}&rdquo;
      </blockquote>

      {/* Author footer */}
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-ember-500)]/25 text-sm font-semibold text-[var(--color-ember-400)]"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{review.name}</p>
          <p className="truncate text-xs text-sand-100/65">{subline}</p>
        </div>
      </figcaption>
    </li>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next reviews" : "Previous reviews"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition hover:border-[var(--color-ember-400)] hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-white/5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isNext ? <polyline points="9 6 15 12 9 18" /> : <polyline points="15 6 9 12 15 18" />}
      </svg>
    </button>
  );
}

function GoogleGlyph({ large = false }: { large?: boolean }) {
  const size = large ? 36 : 16;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.7 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
