import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

/**
 * Admin auth — a single shared secret (ADMIN_TOKEN, 256-bit hex) gates the
 * /admin route. We never put it in localStorage or expose it client-side;
 * after the user pastes it into /admin/login, the API route sets an
 * HttpOnly Secure SameSite=Strict cookie holding the same token. Server
 * components read the cookie and constant-time-compare against the env
 * value, so a wrong/expired cookie always fails the check in the same
 * amount of time as a correct one (no timing side channel).
 */

export const ADMIN_COOKIE = "dbc_admin";
const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;

function getExpected(): string | null {
  const raw = process.env.ADMIN_TOKEN;
  if (!raw || raw.length < 32) return null;
  return raw;
}

/** Constant-time string compare. Returns false on any length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyToken(candidate: string | undefined | null): boolean {
  if (!candidate) return false;
  const expected = getExpected();
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

/** Read the admin cookie in a server context and verify it. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const c = jar.get(ADMIN_COOKIE)?.value;
  return verifyToken(c);
}

export function adminCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/admin",
    maxAge: SEVEN_DAYS_SEC,
  };
}

/** True if the server has an ADMIN_TOKEN configured. */
export function isAdminConfigured(): boolean {
  return getExpected() !== null;
}
