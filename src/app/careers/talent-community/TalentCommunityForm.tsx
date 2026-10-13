"use client";
import { useState } from "react";

export default function TalentCommunityForm() {
  const [state, setState] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading"); setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/careers/talent", { method: "POST", body: fd });
      const j = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(j.error || "Failed");
      setState("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
      setState("error");
    }
  }

  if (state==="sent") return (
    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-8 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">✓</div>
      <h3 className="mt-3 text-sm font-[700] text-white">You’re in our talent community</h3>
      <p className="mt-1 text-sm text-white/60">We&apos;ll consider your profile for relevant future opportunities.</p>
      <button onClick={()=>setState("idle")} className="mt-4 text-xs font-[600] text-emerald-300 hover:text-white">Submit another</button>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-[20px] border border-white/10 bg-[#0F141E] p-6 sm:p-7 space-y-4">
      <h3 className="text-sm font-[700] text-white">Join the Talent Community</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">FULL NAME *</span><input name="fullName" required className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="Your name" /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">EMAIL *</span><input name="email" type="email" required className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="you@email.com" /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">PHONE</span><input name="phone" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="+91 ..." /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">CURRENT LOCATION</span><input name="location" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="City, Country" /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">LINKEDIN URL</span><input name="linkedinUrl" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="https://linkedin.com/in/..." /></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">PORTFOLIO URL</span><input name="portfolioUrl" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white" placeholder="https://..." /></label>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">YEARS OF EXPERIENCE</span><select name="yearsExperience" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white"><option value="">Select</option><option>0-1</option><option>1-3</option><option>3-5</option><option>5-8</option><option>8+</option></select></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">AREA OF INTEREST *</span><select name="areaOfInterest" required className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white"><option value="">Select</option><option>Software Engineering</option><option>AI & Data</option><option>Mobile Development</option><option>UI/UX</option><option>QA</option><option>Cloud & DevOps</option><option>Business Development</option><option>BPO / Operations</option><option>Other</option></select></label>
        <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">EMPLOYMENT TYPE</span><select name="employmentType" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label>
      </div>
      <label className="block space-y-1.5"><span className="text-xs font-[600] text-white/60">MESSAGE (optional)</span><textarea name="message" rows={3} placeholder="Tell us about your skills and interests..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white resize-none" /></label>
      <label className="flex gap-2 text-xs leading-5 text-white/60"><input type="checkbox" name="consent" required className="mt-1" /> I consent to Nexara Global Solutions using the information provided to consider me for relevant employment opportunities. *</label>
      {state==="error" && <p className="text-xs text-red-300">{error}</p>}
      <button disabled={state==="loading"} className="w-full rounded-full bg-[#4F7EFF] py-3 text-sm font-[700] text-white hover:bg-[#3E6AF0] disabled:opacity-50">{state==="loading"?"Submitting…":"Join the Talent Community →"}</button>
    </form>
  );
}
