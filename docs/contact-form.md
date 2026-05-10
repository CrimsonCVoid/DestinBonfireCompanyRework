# Contact Form — operations guide

The contact form at the bottom of `/` (and on sub-pages via `ContactSection`) posts to `POST /api/contact`. Submissions are delivered via Resend and simultaneously appended to a local JSON backup so nothing is ever lost.

---

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables) and in `.env.local` for local dev. See `.env.example` for the canonical list.

| Variable | Required | Purpose |
|----------|----------|---------|
| `CONTACT_EMAIL_MODE` | no (default `resend`) | `resend`, `log_only`, or `fallback_sender`. See modes below. |
| `RESEND_API_KEY` | yes (when `mode=resend`) | API key from https://resend.com/api-keys |
| `CONTACT_EMAIL_FROM` | no (default `Destin Bonfire Company <bookings@destinbonfirecompany.com>`) | Must be on a Resend-verified domain |
| `RESEND_API_KEY_FALLBACK` | yes (when `mode=fallback_sender`) | API key for the fallback sender account |
| `CONTACT_EMAIL_FROM_FALLBACK` | no (default `Destin Bonfire Company <bookings@30aflame.com>`) | Fallback sender — e.g. the 30aflame.com-verified domain |
| `CONTACT_EMAIL_TO` | no (default `bookings@destinbonfirecompany.com`) | Recipient inbox |
| `CONTACT_EMAIL_REPLY_TO` | no (default: submitter's email) | Override if replies should go to a different inbox |
| `CONTACT_EMAIL_UNSUBSCRIBE_MAILTO` | no (default: `CONTACT_EMAIL_TO`) | Address Gmail's one-click unsubscribe will mailto: when the recipient clicks "Unsubscribe" |
| `CONTACT_EMAIL_UNSUBSCRIBE_URL` | no (default `${SITE.domain}/refund-policy#contact`) | URL the `List-Unsubscribe` header points at |

> **Deliverability note — recommended sender setup.**
> Default `CONTACT_EMAIL_FROM` and `CONTACT_EMAIL_TO` are both `bookings@destinbonfirecompany.com` so it works out-of-the-box. Self-send (From == To) is a yellow flag with some inbox providers. For best deliverability, verify a second non-mailbox sender like `forms@destinbonfirecompany.com` in Resend and set:
> ```
> CONTACT_EMAIL_FROM="Destin Bonfire Company Website <forms@destinbonfirecompany.com>"
> CONTACT_EMAIL_TO=bookings@destinbonfirecompany.com
> ```
> Reply-To is already wired to the submitter's email, so replies still go to the customer.

---

## Modes

### `resend` (default — use after DNS is verified)
Sends via Resend using `RESEND_API_KEY` + `CONTACT_EMAIL_FROM`. Requires that the domain in `CONTACT_EMAIL_FROM` is verified in the Resend dashboard. See DNS setup below.

### `log_only` (use before DNS is ready)
Skips email delivery entirely. Every submission is written to `logs/contact-submissions.json`. The customer sees the success message; you can access submissions from the log file. **Use this mode the first day after launch if DNS is still propagating** — no customer inquiry will be lost.

Switch in Vercel:
```
CONTACT_EMAIL_MODE=log_only
```

### `fallback_sender` (bridge mode)
Sends via Resend using the fallback API key + From address. This is the "we have another verified domain we can send from while we wait for our domain's DNS" mode. Submissions still get delivered to `CONTACT_EMAIL_TO` (inbound address); only the outbound From changes.

Switch in Vercel:
```
CONTACT_EMAIL_MODE=fallback_sender
RESEND_API_KEY_FALLBACK=re_xxx_from_fallback_project
CONTACT_EMAIL_FROM_FALLBACK="Destin Bonfire Company <bookings@30aflame.com>"
```

---

## Resend DNS setup (one-time, when you have access to the domain)

1. In Resend dashboard, click **Add Domain** → enter `destinbonfirecompany.com`.
2. Resend will show 3 DNS records:
   - `TXT` at `_resend` — domain verification
   - `TXT` at `resend._domainkey` — DKIM signing key
   - `MX` at `send` — for bounce handling (optional but recommended)
3. Add those records in whatever DNS provider the domain uses (Vercel DNS, Cloudflare, GoDaddy, etc.).
4. Wait for Resend to mark the domain **Verified** (usually under 30 min).
5. Create an API key scoped to this domain, set `RESEND_API_KEY` in Vercel, and flip `CONTACT_EMAIL_MODE=resend`.

---

## Backup submission log

Every submission — regardless of email delivery success — is appended to:

```
logs/contact-submissions.json
```

Each entry:

```json
{
  "submitted_at": "2026-04-23T16:12:45.123Z",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(850) 555-1234",
  "details": "12 guests, May 24",
  "message": "Hi! We'd love to book...",
  "email_sent": true,
  "mode": "resend",
  "error_message": null,
  "user_agent": "...",
  "ip": "203.0.113.42"
}
```

### Accessing the log in production

On Vercel, the file system is **ephemeral** — files written at runtime do not persist across deployments. This means the JSON log works as a short-term safety net (within a single deployment), but is not a durable record.

Practical implications:
- **Development & staging:** works great. `logs/contact-submissions.json` persists on your local machine.
- **Production on Vercel:** use the log as a per-deployment safety net, but treat **email delivery** as the durable channel. If a customer inquiry doesn't land in Gmail within 5 minutes, check Resend's dashboard → Logs (https://resend.com/emails) for the delivery status.
- **For durable long-term storage**, swap `lib/contact-logger.ts` to write to a managed store (Supabase, Airtable, Google Sheets via webhook, etc.) — the route calls one function; swapping the implementation is a small change.

### Reading the log

On the Vercel deployment:
```bash
# via Vercel CLI (if installed)
vercel logs --since=1h | grep '\[contact\]'
```

Or locally during dev:
```bash
cat logs/contact-submissions.json | jq '.[-10:]'   # last 10 submissions
```

The `.gitignore` already excludes `logs/` — submissions are not committed to git.

---

## Validation and anti-spam

The API route applies:
- **Required fields:** name, email, phone, message
- **Length caps:** name 120, email 254, phone 40, details 500, message 5000 chars
- **Email format check:** `name@domain.tld`
- **Honeypot field:** `website` / `url` — if present and filled, submission is silently rejected
- **Soft spam filter:** URLs in name, >2 URLs in message, embedded `<a href>` / BBCode links, or known spam tokens (`viagra`, `casino`, `bitcoin giveaway`, etc.)

Validation failures return `400` with a user-friendly error message.

---

## User-facing behavior

- On success → `200 { ok: true, message: "..." }` → form shows the green "Thank you" state
- On validation error → `400 { ok: false, error: "..." }` → form shows a red error (currently generic, can be customized)
- On email delivery failure **if logging succeeded** → the route still returns `200` — the user sees success; you see an entry with `email_sent: false` in the log. Check Resend logs for the failure reason.
- On both email AND logging failure → `500` — the form shows "Something went wrong. Please call us directly." (defined in `components/contact-form.tsx`)

This matches the "never let a form submission fail silently from the user's perspective" requirement.

---

## Testing locally

```bash
# 1. Install deps
bun install

# 2. Copy env template
cp .env.example .env.local

# 3. (Option A) Test without email — set CONTACT_EMAIL_MODE=log_only in .env.local
# 3. (Option B) Test with real Resend — add your RESEND_API_KEY and flip mode to resend

# 4. Start dev server
bun run dev

# 5. Submit the form on http://localhost:3000/#contact
# 6. Inspect the result
cat logs/contact-submissions.json
```

Or curl:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"(555) 123-4567","details":"4 guests","message":"This is a test"}'
```
