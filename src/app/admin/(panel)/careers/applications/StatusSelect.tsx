"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["New", "Reviewing", "Shortlisted", "Interview", "Offer", "Hired", "Rejected", "Archived"];

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [busy, setBusy] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setValue(next);
    setBusy(true);
    try {
      await fetch(`/api/admin/careers/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={busy}
      className="rounded-xl border border-white/10 bg-[#0F141E] px-2.5 py-1 text-xs text-white disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}