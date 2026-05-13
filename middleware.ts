import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sets `x-pathname` on the request headers so server components (the root
 * layout in particular) can read the current pathname via `headers()`.
 *
 * Used to gate the GTM scripts off on `/admin/*` so admin pageviews don't
 * pollute Google Ads / GA4 audiences and bidding signals. PostHog already
 * skips admin via its client-side provider; this brings GTM into parity.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Match everything except Next internals and static assets - we only need
  // the pathname header on page requests, not on every image fetch.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|data/|.*\\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico|mp4|webm|woff2?|ttf)$).*)",
  ],
};
