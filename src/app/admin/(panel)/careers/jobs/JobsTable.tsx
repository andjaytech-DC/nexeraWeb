"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@prisma/client";

/* Admin job lifecycle: edit, publish, unpublish and close. Only rows whose
   status is "Published" AND isPublished=true appear on the public job search. */

type Status = "Draft" | "Published" | "Closed";

const STATUSES: Status[] = ["Draft", "Published", "Closed"];

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<Job | null>(null);

  async function patch(id: string, data: Record<string, unknown>, note: string) {
    setBusyId(id);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/careers/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setMsg(json?.error || "Update failed");
      } else {
        setMsg(note);
        router.refresh();
      }
    } catch {
      setMsg("Network error");
    } finally {
      setBusyId(null);
    }
  }

  const btn = "rounded-full border border-white/10 px-3 py-1.5 text-xs font-[600] text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40 disabled:hover:border-white/10";

  return (
    <>
      {msg && <p className="mt-3 text-xs text-amber-300">{msg}</p>}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0F141E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs tracking-[0.08em] font-[700] text-white/40">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Department</th>
                <th className="text-left px-4 py-3">Location</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Public</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-sm text-white/60">No jobs yet — honest empty state (no fake jobs created).</p>
                    <p className="mt-2 text-xs text-white/30">Use “Create job”, or seed the seven proposed listings with `npm run db:seed` once PostgreSQL is configured.</p>
                  </td>
                </tr>
              ) : (
                jobs.map((j) => (
                  <tr key={j.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">
                      {j.title}
                      <div className="text-xs text-white/40">/{j.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-white/60">{j.department}</td>
                    <td className="px-4 py-3 text-white/60">{j.location}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">{j.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs">{j.isPublished ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={btn}
                          disabled={busyId === j.id}
                          onClick={() => patch(j.id, { status: "Published", isPublished: true }, `Published ${j.title}.`)}
                        >
                          Publish
                        </button>
                        <button
                          className={btn}
                          disabled={busyId === j.id}
                          onClick={() => patch(j.id, { isPublished: false }, `Unpublished ${j.title} — hidden until re-published.`)}
                        >
                          Unpublish
                        </button>
                        <button
                          className={btn}
                          disabled={busyId === j.id}
                          onClick={() => patch(j.id, { status: "Closed" }, `Closed ${j.title} — application flow stops.`)}
                        >
                          Close
                        </button>
                        <button className={btn} onClick={() => setEditing(j)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <EditJobModal
          job={editing}
          onClose={() => setEditing(null)}
          onSaved={(note) => {
            setEditing(null);
            setMsg(note);
            router.refresh();
          }}
        />
      )}
    </>
  );
}

/* ── Edit modal — same field set as creation, PATCHes by id. ─────────────── */

function EditJobModal({ job, onClose, onSaved }: { job: Job; onClose: () => void; onSaved: (note: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: job.title,
    slug: job.slug,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    experienceLevel: job.experienceLevel ?? "",
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    preferredSkills: job.preferredSkills ?? "",
    applyEmail: job.applyEmail ?? "",
    workMode: job.workMode ?? "",
    shiftInfo: job.shiftInfo ?? "",
    status: job.status as Status,
    isPublished: job.isPublished,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/careers/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: job.id, ...form }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setErr(json?.error || "Update failed");
        return;
      }
      onSaved(`Saved changes to ${form.title}.`);
    } catch {
      setErr("Network error");
    } finally {
      setBusy(false);
    }
  }

  const field = (key: keyof typeof form, label: string) => (
    <label className="block">
      <span className="text-xs font-[700] text-white/40">{label}</span>
      <input
        value={String(form[key] ?? "")}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none"
      />
    </label>
  );

  const area = (key: keyof typeof form, label: string, rows = 3) => (
    <label className="block">
      <span className="text-xs font-[700] text-white/40">{label}</span>
      <textarea
        value={String(form[key] ?? "")}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        rows={rows}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={submit} className="max-h-[85vh] w-full max-w-[760px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0F141E] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-[800] text-white">Edit job</h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("title", "Title")}
          {field("slug", "Slug (lowercase, hyphens)")}
          {field("department", "Department")}
          {field("location", "Location")}
          {field("employmentType", "Employment type")}
          {field("experienceLevel", "Experience level")}
        </div>
        {area("description", "Description")}
        {area("responsibilities", "Responsibilities")}
        {area("requirements", "Requirements")}
        {area("preferredSkills", "Preferred skills (optional)", 2)}
        <div className="grid gap-4 sm:grid-cols-3">
          {field("applyEmail", "Apply-by email (optional)")}
          {field("workMode", "Work mode (optional)")}
          {field("shiftInfo", "Shift info (optional)")}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <label className="block">
            <span className="text-xs font-[700] text-white/40">Status</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              className="mt-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
            Publicly listed
          </label>
        </div>
        {err && <p className="text-xs text-amber-300">{err}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 hover:text-white">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="rounded-full bg-brand px-5 py-2 text-sm font-[700] text-white hover:bg-brand-hover disabled:opacity-50">
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
