import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (service role). Bypasses RLS — never import
 * this in a "use client" file or expose the key to the browser. The key
 * lives in SUPABASE_SERVICE_ROLE_KEY in .env.local / Vercel encrypted env.
 *
 * The shared dashboard schema (provided by the user) already ships a
 * public.leads table that fits the contact form perfectly. This module
 * is a thin singleton over that.
 */

let cached: SupabaseClient | null = null;

function getUrl(): string | null {
  return (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    null
  );
}

function getKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = getUrl();
  const key = getKey();
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    db: { schema: "public" },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return getUrl() !== null && getKey() !== null;
}

/**
 * Brand tag we set on every lead we insert. Lets the existing dashboard
 * (which already filters by brand via metadata) separate this site's
 * submissions from 30A Flame's or any other brand's.
 */
export const BRAND_TAG = "destin_bonfire" as const;
