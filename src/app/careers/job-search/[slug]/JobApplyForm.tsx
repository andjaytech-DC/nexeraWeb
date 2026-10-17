"use client";
import { useState } from "react";

export default function JobApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, setState] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading"); setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("jobId", jobId);
    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
      const j = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(j.error || "Submission failed");
      setState("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
      setState("error");
    }
  }

  if (state==="sent") return (
    <div className="rounded-2xl bg-success-soft border border-success-line p-6 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-success-soft flex items-center justify-center text-success">✓</div>
      <h3 className="mt-3 text-sm font-[700] text-ink">Application received</h3>
      <p className="mt-1 text-sm text-ink-secondary">We&apos;ve received your application for {jobTitle}. We&apos;ll review and reach out if there&apos;s a fit.</p>
      <button onClick={()=>setState("idle")} className="mt-4 text-xs font-[600] text-success hover:text-brand">Submit another</button>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 space-y-4" encType="multipart/form-data">
      <h3 className="text-sm font-[700] text-ink">Apply for this position</h3>
      <p className="text-xs text-ink-secondary">For {jobTitle} — all fields with * are required.</p>
      <input type="hidden" name="jobId" value={jobId} />
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">FULL NAME *</span><input name="fullName" required placeholder="Your name" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">EMAIL *</span><input name="email" type="email" required placeholder="you@email.com" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PHONE</span><input name="phone" placeholder="+91 ..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">LOCATION</span><input name="location" placeholder="City, Country" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">LINKEDIN URL</span><input name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PORTFOLIO URL</span><input name="portfolioUrl" placeholder="https://..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      </div>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">RESUME * (PDF/DOC/DOCX, max 5MB)</span><input name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-1 file:text-xs file:font-[700] file:text-brand" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">COVER LETTER</span><textarea name="coverLetter" rows={4} placeholder="Briefly describe your relevant experience..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink resize-none" /></label>
      <label className="flex gap-2 text-xs leading-5 text-ink-secondary"><input type="checkbox" name="consent" required className="mt-1" /> I consent to Nexara Global Solutions using the information provided to consider me for this and related employment opportunities. *</label>
      {state==="error" && <p className="text-xs text-danger">{error}</p>}
      <button disabled={state==="loading"} className="w-full rounded-full bg-brand py-3 text-sm font-[700] text-white hover:bg-brand-hover disabled:opacity-50">{state==="loading"?"Submitting…":"Apply Now →"}</button>
    </form>
  );
}
