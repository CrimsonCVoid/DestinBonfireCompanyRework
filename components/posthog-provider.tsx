"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

/**
 * Client-side PostHog bootstrap.
 *
 * Initialized once on mount with autocapture, session replay, web vitals,
 * heatmaps, and exception tracking ON. Inputs and form data are masked by
 * default - replay won't capture what guests type into the contact form.
 *
 * Skipped entirely on /admin routes so the dashboard view of replays
 * doesn't pollute the recording stream with admin sessions.
 */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

let started = false;

function startPostHog() {
  if (started || typeof window === "undefined") return;
  if (!KEY) return;
  if (window.location.pathname.startsWith("/admin")) return;

  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false, // we send pageviews manually below to include search params
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
    session_recording: {
      // Mask all text inputs (name/email/phone/message) and any element with
      // [data-private]. Buttons, links, images, layout all still record.
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    persistence: "localStorage+cookie",
    person_profiles: "identified_only",
    loaded: () => {
      if (process.env.NODE_ENV === "development") {
        // Helpful in dev - don't ship to console in prod.
        // eslint-disable-next-line no-console
        console.debug("[posthog] ready", HOST);
      }
    },
  });
  started = true;
}

function PostHogPageviews() {
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (!started || !KEY) return;
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/admin")) return;
    const url = window.location.origin + pathname + (params?.toString() ? `?${params.toString()}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, params]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startPostHog();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageviews />
      </Suspense>
      {children}
    </>
  );
}

/**
 * Server-safe wrapper for the rare client component that wants to send
 * an event without importing posthog-js directly. Silent no-op if PH
 * isn't initialized (e.g. on /admin or pre-mount).
 */
export function captureEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!started) return;
  posthog.capture(event, props);
}
