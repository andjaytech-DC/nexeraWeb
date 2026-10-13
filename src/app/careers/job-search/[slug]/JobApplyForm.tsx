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
    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">✓</div>
      <h3 className="mt-3 text-sm font-[700] text-white">Application received</h3>
      <p className="mt-1 text-sm text-white/60">We&apos;ve received your application for {jobTitle}. We&apos;ll review and reach out if there&apos;s a fit.</p>
      <button onClick={()=>setState("idle")} className="mt-4 text-xs font-[600] text-emerald-300 hover:text-white">Submit another</button>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/5 bg-[#0F141E] p-6 space-y-4" encType="multipart/form-data">
      <h3 className="text-sm font-[700] text-white">Apply for this position</h3>
      <p className="text-xs text-white/50">For {jobTitle} — all fields with * are required.</p>
      <input type="hidden" name="jobId" value={jobId} />
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">FULL NAME *</span><input name="fullName" required placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">EMAIL *</span><input name="email" type="email" required placeholder="you@email.com" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">PHONE</span><input name="phone" placeholder="+91 ..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">LOCATION</span><input name="location" placeholder="City, Country" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">LINKEDIN URL</span><input name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">PORTFOLIO URL</span><input name="portfolioUrl" placeholder="https://..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" /></label>
      </div>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">RESUME * (PDF/DOC/DOCX, max 5MB)</span><input name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-1 file:text-xs file:font-[700] file:text-[#070A0F]" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-[600] tracking-[0.06em] text-white/60">COVER LETTER</span><textarea name="coverLetter" rows={4} placeholder="Briefly describe your relevant experience..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white resize-none" /></label>
      <label className="flex gap-2 text-xs leading-5 text-white/60"><input type="checkbox" name="consent" required className="mt-1" /> I consent to Nexara Global Solutions using the information provided to consider me for this and related employment opportunities. *</label>
      {state==="error" && <p className="text-xs text-red-300">{error}</p>}
      <button disabled={state==="loading"} className="w-full rounded-full bg-[#4F7EFF] py-3 text-sm font-[700] text-white hover:bg-[#3E6AF0] disabled:opacity-50">{state==="loading"?"Submitting…":"Apply Now →"}</button>
    </form>
  );
}
