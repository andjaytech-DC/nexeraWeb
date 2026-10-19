"use client";
import { useState } from "react";

export function CreateJobForm() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", department: "", location: "", employmentType: "Full-time",
    experienceLevel: "", description: "", responsibilities: "", requirements: "",
    preferredSkills: "", status: "Draft", isPublished: false,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/careers/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) { setMsg(data?.error || "Failed to create job"); return; }
      setMsg("Job created. Refresh to see it.");
      setOpen(false);
    } catch {
      setMsg("Network error");
    } finally {
      setBusy(false);
    }
  }

  const field = (key: keyof typeof form, label: string, type = "text") => (
    <label className="block">
      <span className="text-xs font-[700] text-white/40">{label}</span>
      <input
        type={type}
        value={String(form[key])}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none"
      />
    </label>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-brand px-5 py-2 text-sm font-[700] text-white hover:bg-brand-hover"
      >
        + Create job
      </button>
      {msg && <p className="mt-2 text-xs text-amber-300">{msg}</p>}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={submit} className="max-h-[85vh] w-full max-w-[720px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0F141E] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-[800] text-white">Create job</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            {field("title", "Title")}
            {field("slug", "Slug (lowercase, hyphens)")}
            {field("department", "Department")}
            {field("location", "Location")}
            {field("employmentType", "Employment type")}
            {field("experienceLevel", "Experience level")}
            <label className="block">
              <span className="text-xs font-[700] text-white/40">Description</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-[700] text-white/40">Responsibilities</span>
              <textarea value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-[700] text-white/40">Requirements</span>
              <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none" />
            </label>
            {field("preferredSkills", "Preferred skills")}
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              Published
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 hover:text-white">Cancel</button>
              <button type="submit" disabled={busy} className="rounded-full bg-brand px-5 py-2 text-sm font-[700] text-white hover:bg-brand-hover disabled:opacity-50">
                {busy ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}