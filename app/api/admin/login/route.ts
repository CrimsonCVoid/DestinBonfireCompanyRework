import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, verifyToken } from "@/lib/admin-auth";

// Force Node runtime - we rely on node:crypto's timingSafeEqual.
export const runtime = "nodejs";

// Block any caching of the login response.
export const dynamic = "force-dynamic";

type Body = { token?: unknown };

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    // Fall through to invalid below.
  }
  const candidate = typeof body.token === "string" ? body.token : "";

  if (!verifyToken(candidate)) {
    // Same response shape + ~equal latency whether the token is wrong or
    // ADMIN_TOKEN is unset - don't leak which case it is.
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, candidate, adminCookieOptions());
  return res;
}
