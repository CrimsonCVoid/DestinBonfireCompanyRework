"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      });
      if (r.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setErr("Invalid token.");
      }
    } catch {
      setErr("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-800/70">
          Admin token
        </span>
        <input
          type="password"
          autoComplete="off"
          required
          minLength={32}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="64-character hex string"
          className="mt-2 w-full rounded-xl border border-ink-900/15 bg-[var(--color-sand-50)] px-4 py-3 font-mono text-sm text-ink-900 placeholder:text-ink-800/35 focus:border-[var(--color-ember-500)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-ember-500)]/30"
        />
      </label>
      {err && (
        <p
          role="alert"
          className="rounded-lg border border-red-300/70 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || token.trim().length < 32}
        className="w-full rounded-full bg-[var(--color-ember-500)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md shadow-[var(--color-ember-500)]/20 transition hover:bg-[var(--color-ember-600)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Verifying…" : "Sign in"}
      </button>
    </form>
  );
}
