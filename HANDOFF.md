# Destin Bonfire Company - Engineering Handoff

Project: marketing + booking site for **Destin Bonfire Company** with a private
admin dashboard for form submissions and PostHog analytics.

Live domain: `https://www.destinbonfirecompany.com`
GitHub: `git@github.com:CrimsonCVoid/DestinBonfireCompanyRework.git` (branch: `main`)
Local working copy: `/Users/carterbrady/Downloads/DestinBonfireCompanyRework`

---

## TL;DR for the next AI / engineer

1. `cd /Users/carterbrady/Downloads/DestinBonfireCompanyRework && npm run dev`
2. Public site at `http://localhost:3000`, admin at `/admin/login`
3. Admin token is in `.env.local` line 14 (env var `ADMIN_TOKEN`). The current
   local value is the 64-char hex string committed to that file.
4. **NEVER commit `.env.local`** - it's gitignored. The keys in it (PostHog
   Personal API key, Supabase service role, admin token) are sensitive.
5. **Rotate the PostHog Personal API key before going to prod** - it has
   been shared in chat logs.

---

## Stack

- **Next.js 15.5.15** App Router, React 19, TypeScript strict
- **Tailwind v4** (CSS variables in `app/globals.css` under `@theme`)
- **FareHarbor** Lightframe booking modal (loaded lazyOnload from layout)
- **Supabase** (`@supabase/supabase-js`) - service-role server client for
  contact-form persistence into `public.leads`
- **PostHog** - posthog-js client (autocapture + session replay) +
  posthog-node server, Personal API key used server-side for the admin
  analytics queries
- **Resend** - contact-form email (currently log-only in dev; prod swap
  pending DNS verification)
- **d3-geo + topojson-client** - admin world/US map (no React-19-broken
  react-simple-maps)
- **Vercel** target for deployment

---

## Routes (every page in production)

```
/                          home (Hero, TrustStrip, Welcome, Packages, Testimonials,
                            Communities teaser, FAQ, Gallery, Contact)
/destin                    SEO-optimized "owning the Destin search intent" page
                            (explains Okaloosa vs Walton, Scenic Gulf Drive, drive times)
/locations                 NEW - index of every permitted beach grouped west->east
/locations/[community]     5 community hubs (miramar-beach-bonfires, 30a-bonfires,
                            santa-rosa-beach-bonfires, rosemary-beach-bonfires,
                            seaside-bonfires)
/service-areas/[slug]      11 individual beach-access pages with satellite map
/bonfire-packages          full 5-package detail + specialty + add-ons CTA
/add-ons                   NEW - categorized add-on / upgrade menu (8 categories,
                            ~30 items, anchor-pill nav)
/bachelorette-bonfire      bachelorette page (pink theme via data-theme="pink")
/bonfire-permit-process    permit deep-dive (still routed, just not in primary nav)
/refund-policy             verbatim Walton County refund + weather + permits policy
/blog + /blog/[slug]       5 SEO blog posts
/contact/thank-you         post-submit page
/admin                     dashboard (form submissions + analytics + visitors map)
/admin/login               token-gated sign-in
/api/contact               POST: validate + send (Resend) + log (Supabase, JSON fallback)
/api/admin/login           POST: set HttpOnly session cookie
/api/admin/logout          POST: clear cookie
```

Nav surface in primary `<SiteHeader />`:
`Packages · Locations We Serve · Bachelorette · Destin · Refund Policy · Blog`
(separator hairlines between each item, color adapts to scroll state)

---

## Environment variables

All live in `/Users/carterbrady/Downloads/DestinBonfireCompanyRework/.env.local`
(gitignored). `.env.example` is the template.

| Variable | Server / Client | Purpose | Required |
|---|---|---|---|
| `ADMIN_TOKEN` | server | 256-bit hex token for /admin login | **yes** for admin |
| `CONTACT_EMAIL_MODE` | server | `log_only` / `resend` / `fallback_sender` | yes |
| `RESEND_API_KEY` | server | primary Resend sender (DBC domain) | when CONTACT_EMAIL_MODE=resend |
| `RESEND_API_KEY_FALLBACK` | server | fallback Resend (30aflame.com) | when fallback_sender |
| `CONTACT_EMAIL_FROM` | server | `Destin Bonfire Company <bookings@destinbonfirecompany.com>` | yes |
| `CONTACT_EMAIL_FROM_FALLBACK` | server | fallback From address | when fallback_sender |
| `CONTACT_EMAIL_TO` | server | inbox that receives inquiries | yes |
| `POSTHOG_PERSONAL_API_KEY` | server | `phx_*` admin-only analytics queries | for admin analytics |
| `POSTHOG_HOST` | server + client | `https://us.posthog.com` | yes |
| `POSTHOG_PROJECT_ID` | server | numeric project ID (auto-discovered if blank) | optional |
| `NEXT_PUBLIC_POSTHOG_KEY` | client | `phc_*` for tracking script | for client tracking |
| `NEXT_PUBLIC_POSTHOG_HOST` | client | duplicate of POSTHOG_HOST for client | for client tracking |
| `SUPABASE_URL` | server | `https://<ref>.supabase.co` | for Supabase persistence |
| `SUPABASE_SERVICE_ROLE_KEY` | server | service role JWT, bypasses RLS | for Supabase persistence |

Auto-discover PostHog `phc_*` key + project ID from the Personal API key:

```bash
node scripts/posthog-discover.mjs
```

(writes back into `.env.local`, idempotent, doesn't print the full key to stdout)

---

## Admin dashboard

URL: `/admin/login` → paste `ADMIN_TOKEN` → 7-day HttpOnly Secure SameSite=Strict
cookie scoped to `/admin`.

Constant-time token compare via `node:crypto.timingSafeEqual` in
`lib/admin-auth.ts`. The admin layout suppresses the public SiteHeader/SiteFooter
and applies a light theme.

### Sections rendered on `/admin`

1. **4 KPI cards** - Submissions 24h, Pageviews 30d, Unique visitors 30d,
   Email delivery (red if any failed)
2. **PostHog connection banner** (amber pill when key missing)
3. **Booking funnel** - 3-step: $pageview -> book_button_clicked ->
   contact_form_submitted, with conversion %
4. **Daily pageviews** bar chart (last 30 days)
5. **Top pages + Top referrers** side-by-side bar lists
6. **Device mix** progress bars
7. **Visitors map** - tabbed World (Natural Earth) / United States
   (Albers USA). Click a US state -> projection re-fits, dots plot at
   each city's lat/lng with a cool->hot heatmap palette (cyan -> yellow).
   Bundled `lib/us-cities.ts` provides a 270-city coord fallback for
   when PostHog's GeoIP enricher omits lat/lng.
8. **Session replays** - last 7 days, 12 cards, each opens the full
   replay in PostHog's player
9. **Recent errors** + **Recent events feed** side-by-side
10. **Contact-form submissions table** - source badge ("Supabase · live"
    when configured, else "Local JSON · Supabase not configured"),
    filter pills (All / Delivered / Failed / Log-only), search,
    click-to-expand rows with full message + delivery audit trail

### Custom events captured by PostHog

- `book_button_clicked` - fires on every BookNowButton click, props:
  `{ package_key, variant, location }`
- `contact_form_submitted` - fires server-side from /api/contact, props
  PII-stripped: `{ email_sent, delivery_mode, group_size_provided,
  message_length, failed }`. distinct_id = sha256(email).slice(16) so
  funnels stitch across sessions without storing raw email.

### Path display quirk

`displayPath()` in `app/admin/page.tsx` renders `/` as `/home` in admin
list UIs only. The actual route is still `/` everywhere else.

---

## Supabase contact-form storage

Reuses an existing `public.leads` table from another internal dashboard
schema (NOT created by us; just written to). Fields used:

```sql
public.leads (
  id uuid pk default gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NULL,
  message text NULL,
  source_page text NULL,    -- derived from Referer header
  status text DEFAULT 'new',
  metadata jsonb,            -- { brand: 'destin_bonfire', details, email_sent,
                             --   delivery_mode, error_message, user_agent, ip }
  created_at timestamptz default now(),
  ...
);
```

Every insert tags `metadata.brand = 'destin_bonfire'` so this site's
submissions can be filtered out of other brands' on shared dashboards.
`lib/form-submissions.ts` only returns rows where
`metadata->>brand = 'destin_bonfire'`.

`lib/contact-logger.ts` is a dual-write: Supabase first, falls back to
`logs/contact-submissions.json` if Supabase isn't configured or the
insert fails. Never drops a real customer inquiry.

---

## Recently shipped (last ~30 commits, newest first)

- Featured-card packages layout (4 standard + 2 wide specialty), Bachelorette
  CTA section removed from home (the Featured Bachelorette card replaces it)
- New `/add-ons` page with 8 categories, anchor nav, deep-link
  `#lighting-ambiance`. "Browse add-ons & upgrades" button next to the
  Bonfire Bash CTA on `/bonfire-packages`.
- FAQ enhancements: `FaqItem.links` field + button pills under answers,
  new bistro/market-lights Q linking into /add-ons#lighting-ambiance,
  new "max group size" Q (no upper limit), removed "Which beach is best"
- New `/locations` page (region groupings west->east), home Communities
  section slimmed to a single CTA into it
- New `/destin` page - owns the Destin search intent; explains Okaloosa
  permitting reality, highlights Scenic Gulf Drive, lists drive times
  from 10 popular Destin landmarks, 8-question Destin FAQ with JSON-LD
- New 2-person package "The Sunset for Two" ($329, placeholder image
  MarryMeProposalCouple.jpg, optional fareHarborKey)
- Trust strip: "Proud military family" badge with waving-flag SVG icon
- Header nav: hairline separator lines between items
- Footer: literal street address removed (still in schema PostalAddress)
- Hero H1: "Serving 30A & Destin" with eyebrow 30A first
- Welcome H2: "Professionally managed beach bonfires on 30A beaches"
- Em dashes purged everywhere ("—" -> " - ")
- 80-review verified Google reviews carousel on home (horizontal scroll-
  snap, prev/next arrows, deep-link to Google review feed)
- Full /admin dashboard + token auth + Supabase + PostHog + map
- Two-commit SEO + Lighthouse rectifications (color contrast, a11y,
  Emerald Coast -> Walton County, live-site copy parity)

---

## Outstanding TODOs / known gaps

| Priority | Item |
|---|---|
| **High** | Rotate the PostHog Personal API key currently in `.env.local` - it was pasted in chat. PostHog -> My Settings -> Personal API Keys -> revoke, then create scoped read-only (Query + Project read) replacement. |
| **High** | Set Supabase credentials (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) in `.env.local` AND Vercel. Until then admin shows "Supabase not configured" pill and writes to local JSON. |
| **High** | When new owner publishes "Sunset for Two" as a FareHarbor item, add its ID to `lib/site.ts` `FAREHARBOR.items` and set `fareHarborKey: "sunsetForTwo"` on the package. Until then Book CTA opens generic FareHarbor picker. |
| Med | Get a real 2-person photo. Currently uses `MarryMeProposalCouple.jpg` as placeholder for The Sunset for Two card and detail. |
| Med | Build a Tripadvisor reviews proof point - the trust strip now claims "5★ across Google & Tripadvisor" but no public TA widget is embedded. Either set up the listing + embed a TA badge somewhere or downgrade the claim. |
| Med | Resend domain `destinbonfirecompany.com` needs DNS verification, then flip `CONTACT_EMAIL_MODE` from `log_only` to `resend`. Until then the contact form does not send email; Supabase / JSON persistence still works. |
| Low | Add `BlogPosting` JSON-LD per blog detail page (currently just descriptions in metadata). |
| Low | Replace `Date.now()` sitemap `lastModified` with real per-page timestamps (currently bumps on every build). |
| Low | Add `/about` page to lift E-E-A-T signals - founder/team bios, "founded 2020" claim, etc. |
| Low | Drive-times on `/destin` are estimates - validate against current US-98 conditions when possible. |
| Low | Lighthouse audit was run in `next dev`; re-run against `next build && next start` to get the real production Performance score (likely jumps from 70 -> ~88). |

---

## File map (where the load-bearing logic lives)

```
app/
  layout.tsx                Root layout, GTM, FareHarbor (lazyOnload), PostHog provider, schema LocalBusiness JSON-LD
  page.tsx                   Home page composition
  globals.css                Tailwind v4 theme + FareHarbor modal restyle
  destin/page.tsx            /destin SEO landing
  add-ons/page.tsx           /add-ons categorized menu
  locations/page.tsx         /locations index
  locations/[community]/     5 community hub pages
  service-areas/[slug]/      11 individual beach access pages
  bonfire-packages/          packages detail page (specialty rows + add-ons link)
  bachelorette-bonfire/      pink-themed bachelorette landing
  bonfire-permit-process/    permit deep-dive (still indexable, not in nav)
  refund-policy/             verbatim policy
  blog/                      blog index + 5 [slug] posts
  admin/                     dashboard + login + submissions table + layout
  api/contact/route.ts       form handler: validate, send, log (Supabase + JSON)
  api/admin/login,logout     cookie session for /admin

components/
  hero.tsx, welcome-section.tsx, trust-strip.tsx, packages-section.tsx (NEW
    4+2 layout), testimonials-carousel.tsx (Google reviews),
    communities-section.tsx (slimmed), faq-accordion.tsx (with link pills),
    service-areas.tsx, gallery.tsx, contact-section.tsx, contact-form.tsx,
    site-header.tsx, site-footer.tsx
  book-now-button.tsx        FareHarbor click interceptor + PostHog capture
  posthog-provider.tsx       client-side init (autocapture + replay + skip-on-admin)
  visitors-map.tsx           admin world/US map with state drill-down
  page-header.tsx            reusable hero used by /destin, /add-ons, /locations, etc.

lib/
  site.ts                    PACKAGES, SPECIALTY_PACKAGES, COMMUNITIES, FAQ,
                              GOOGLE_REVIEWS, SITE constants, FareHarbor mapping
  beaches.ts                 11 BEACHES with parking, restrooms, GeoJSON, vibe
  blog.ts                    5 blog posts
  email.ts                   Resend sender (multi-mode)
  contact-logger.ts          Supabase write + JSON fallback
  form-submissions.ts        Supabase read (DESC) + JSON fallback, source badge
  supabase.ts                singleton service-role client
  admin-auth.ts              constant-time token verify + cookie helpers
  posthog.ts                 server-side HogQL queries for the admin dashboard
  posthog-server.ts          posthog-node singleton for server-side capture
  us-cities.ts               270-city {lat,lng} fallback for the visitors map
  iso-country-codes.ts       alpha-2 <-> M49 numeric for world atlas mapping

scripts/
  posthog-discover.mjs       fetches phc_* + project ID via the personal API
                              key and writes to .env.local

public/
  data/countries-110m.json   world-atlas TopoJSON (admin map)
  data/us-states-10m.json    us-atlas TopoJSON (admin map)
  images/, videos/           media assets
  llms.txt                   AI crawler signal file
```

---

## Commands

```bash
# Local dev (with hot reload)
npm run dev

# Production build (run before deploying or rerun Lighthouse)
npm run build && npm start

# TypeScript check (no emit)
npm run typecheck

# Lint
npm run lint

# Discover PostHog phc_ key + project ID via Personal API key
node scripts/posthog-discover.mjs
```

---

## Conventions / house rules

- **No em dashes anywhere.** They were globally swept to ` - ` (hyphen +
  spaces). Don't introduce new ones in code or copy.
- **30A first, then Destin** in geographic ordering (eyebrows, lists). Never
  say "near Destin" - say "Serving Destin" or "for Destin guests".
- **`/` displays as `/home`** in admin list UIs only; the route is still `/`.
- **Footer omits street address** but schema PostalAddress in
  `app/layout.tsx` keeps it for GBP / NAP consistency.
- **Brand tag on every lead insert** - `metadata.brand = 'destin_bonfire'`
  so submissions can be filtered on a shared dashboard.
- **FareHarbor script is `lazyOnload`** - never `afterInteractive`. It carries
  legacy bundles, unload handlers, and third-party cookies that wreck
  Core Web Vitals and bf-cache.
- **Never reintroduce a hardcoded review count.** GOOGLE_REVIEWS.length is
  bound to schema aggregateRating.reviewCount; visible copy says
  "Verified Google reviews" without a number.
- **Contact submissions** always try Supabase first, fall back to JSON.
  Never drop a customer inquiry silently.

---

## Deploying to Vercel

1. Push `main` to GitHub (the CI / Vercel integration deploys on push).
2. In Vercel project Settings -> Environment Variables (Production), set
   every variable from the table above. Use a **different** ADMIN_TOKEN
   than the local one (`openssl rand -hex 32`).
3. First deploy: leave `CONTACT_EMAIL_MODE=log_only` so submissions go
   to the per-instance JSON (ephemeral on Vercel) + Supabase. Flip to
   `resend` once DNS for `destinbonfirecompany.com` is verified in Resend.
4. Test `/admin/login` with the prod token. Sanity-check the dashboard
   shows "Supabase · live" pill and PostHog data populates.

---

*Generated 2026-05-13. If you're an AI agent picking this up, read this
file end-to-end before making structural changes; many of the
conventions encode owner decisions that wouldn't be obvious from code
alone.*
