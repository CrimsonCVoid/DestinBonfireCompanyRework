"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "sending" | "error";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data.entries())),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed");
      // GTM dataLayer event - VDX uses the /contact/thank-you URL change as
      // the primary conversion trigger; this event is a belt-and-suspenders
      // signal in case they want to fire on the event instead.
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submit",
          form_id: "contact",
        });
      }
      form.reset();
      router.push("/contact/thank-you");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-sand-100/40 focus:border-[var(--color-ember-400)] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-ember-400)]/40";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10 backdrop-blur sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            Name
          </span>
          <input
            required
            name="name"
            type="text"
            placeholder="Your full name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            Phone
          </span>
          <input
            required
            name="phone"
            type="tel"
            placeholder="(###) ###-####"
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            Group size &amp; preferred date
          </span>
          <input
            name="details"
            type="text"
            placeholder="e.g. 10 guests, Friday May 24"
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sand-100/70">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Tell us about your bonfire plans…"
            className={fieldClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
          Something went wrong. Please call us directly or try again.
        </p>
      )}
    </form>
  );
}
