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
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
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
          className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-[#f2a261]/60 focus:outline-none focus:ring-2 focus:ring-[#f2a261]/40"
        />
      </label>
      {err && (
        <p
          role="alert"
          className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200"
        >
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || token.trim().length < 32}
        className="w-full rounded-full bg-[#c45a22] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#c45a22]/30 transition hover:bg-[#a8430f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Verifying…" : "Sign in"}
      </button>
    </form>
  );
}
