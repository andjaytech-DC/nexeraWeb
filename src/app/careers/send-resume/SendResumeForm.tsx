"use client";
import { useState } from "react";

export default function SendResumeForm() {
  const [state, setState] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading"); setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/careers/resume", { method: "POST", body: fd });
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
    <div className="rounded-2xl bg-success-soft border border-success-line p-8 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-success-soft flex items-center justify-center text-success">✓</div>
      <h3 className="mt-3 text-sm font-[700] text-ink">Resume received</h3>
      <p className="mt-1 text-sm text-ink-secondary">Thank you — we&apos;ve received your profile and will consider it for relevant opportunities.</p>
      <button onClick={()=>setState("idle")} className="mt-4 text-xs font-[600] text-success hover:text-brand">Submit another</button>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-[20px] border border-line bg-surface p-6 sm:p-7 space-y-4" encType="multipart/form-data">
      <h3 className="text-sm font-[700] text-ink">Candidate Information</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">FULL NAME *</span><input name="fullName" required placeholder="Your name" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">EMAIL *</span><input name="email" type="email" required placeholder="you@email.com" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">PHONE *</span><input name="phone" required placeholder="+91 ..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">CURRENT LOCATION *</span><input name="location" required placeholder="City, Country" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">LINKEDIN URL</span><input name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">PORTFOLIO URL</span><input name="portfolioUrl" placeholder="https://..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink" /></label>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">YEARS OF EXPERIENCE *</span><select name="yearsExperience" required className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink"><option value="">Select</option><option>0-1</option><option>1-3</option><option>3-5</option><option>5-8</option><option>8+</option></select></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">AREA OF INTEREST *</span><select name="areaOfInterest" required className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink"><option value="">Select</option><option>Software Engineering</option><option>AI & Data</option><option>Mobile Development</option><option>UI/UX</option><option>QA</option><option>Cloud & DevOps</option><option>Business Development</option><option>BPO / Operations</option><option>Other</option></select></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">PREFERRED EMPLOYMENT TYPE *</span><select name="employmentType" required className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label>
      </div>
      <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">RESUME * (PDF/DOC/DOCX, max 5MB)</span><input name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-1 file:text-xs file:font-[700] file:text-brand" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-[600] text-ink-secondary">COVER LETTER / MESSAGE</span><textarea name="message" rows={4} placeholder="Optional — brief message or cover letter..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink resize-none" /></label>
      <label className="flex gap-2 text-xs leading-5 text-ink-secondary"><input type="checkbox" name="consent" required className="mt-1" /> I consent to Nexara Global Solutions using the information provided to consider me for relevant employment opportunities. *</label>
      {state==="error" && <p className="text-xs text-danger">{error}</p>}
      <button disabled={state==="loading"} className="w-full rounded-full bg-brand py-3 text-sm font-[700] text-white hover:bg-brand-hover disabled:opacity-50">{state==="loading"?"Submitting…":"Send Your Resume →"}</button>
      <p className="text-center text-[11px] text-ink-muted">PDF, DOC, DOCX only — 5MB max. File stored securely, not at a public URL. Configure S3/R2 for production.</p>
    </form>
  );
}
