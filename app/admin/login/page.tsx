import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  const configured = isAdminConfigured();

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f2a261]">
            Destin Bonfire Company
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Admin sign-in
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Paste the admin token to continue.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
          {configured ? (
            <LoginForm />
          ) : (
            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-200">
              <p className="font-semibold">ADMIN_TOKEN not configured</p>
              <p className="mt-2 leading-relaxed">
                Set <code className="rounded bg-black/30 px-1.5 py-0.5">ADMIN_TOKEN</code> in
                {" "}<code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code> (and in
                your Vercel project) before logging in. Generate one with:
              </p>
              <pre className="mt-3 overflow-x-auto rounded bg-black/40 p-3 text-xs">
                openssl rand -hex 32
              </pre>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          This page is not indexed by search engines.
        </p>
      </div>
    </main>
  );
}
