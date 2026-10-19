"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error || "Sign-in failed. Try again.");
        return;
      }
      // Read the redirect target from the URL at submit time so the page does
      // not need a Suspense boundary for useSearchParams.
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[420px] items-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-2xl border border-white/10 bg-[#0F141E] p-8"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F7EFF] text-xs font-[800] text-white">
            N
          </span>
          <span className="font-[700] tracking-[-0.02em]">NEXARA ADMIN</span>
        </div>
        <h1 className="mt-6 text-[22px] font-[800] tracking-[-0.03em]">
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/50">
          This area contains candidate data. Access requires the admin password.
        </p>

        <label
          htmlFor="admin-password"
          className="mt-6 block text-xs font-[700] tracking-[0.08em] text-white/40"
        >
          PASSWORD
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#4F7EFF]"
        />

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-white px-4 py-3 text-sm font-[700] text-[#070A0F] disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
