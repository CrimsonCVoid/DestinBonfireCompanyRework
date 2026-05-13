import { PostHog } from "posthog-node";

/**
 * Server-side PostHog client for capturing events from API routes.
 * Uses the same public api_token the browser uses (NEXT_PUBLIC_POSTHOG_KEY)
 * - this is intentional and correct; the Personal API key is reserved for
 * the admin dashboard queries.
 *
 * Singleton - re-use the same client across requests. flushAt: 1 means we
 * don't batch on a long-running server, which suits Vercel's short-lived
 * function lifecycle.
 */

let client: PostHog | null = null;

function getClient(): PostHog | null {
  if (client) return client;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";
  client = new PostHog(key, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

/**
 * Capture a server-side event. Fire-and-forget; never throws into the
 * caller. PII (email/phone/name/message text) MUST be stripped at the
 * call site - this helper does not sanitize.
 */
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  const c = getClient();
  if (!c) return;
  try {
    c.capture({ distinctId, event, properties });
    await c.flush();
  } catch {
    // Swallow - analytics is never allowed to fail a customer submission.
  }
}
