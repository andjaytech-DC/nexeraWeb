"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { inquiryRepository, serviceOptions, projectTypeOptions } from "@/lib/inquiry-store";
import { contactInfo } from "@/lib/site-data";

export default function ContactClient({ initialType }: { initialType?: string }) {
  const searchParams = useSearchParams();
  const isNewProject = (searchParams.get("type") === "new-project") || initialType === "new-project";
  const [formState, setFormState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [projectType, setProjectType] = useState(isNewProject ? "New Product" : "");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [preferredContact, setPreferredContact] = useState("Email");

  // Adjust state during render when the prop changes (React's recommended
  // alternative to syncing state inside an effect).
  const [prevIsNewProject, setPrevIsNewProject] = useState(isNewProject);
  if (prevIsNewProject !== isNewProject) {
    setPrevIsNewProject(isNewProject);
    if (isNewProject && !projectType) setProjectType("New Product");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid work email is required";
    if (!description.trim() || description.trim().length < 20) e.description = "Please describe your project (min 20 characters)";
    if (email && /@(gmail|yahoo|hotmail|outlook)\./i.test(email)) e.email = "Please use your work email";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setFormState("loading");
    try {
      // Repository is swappable — local (demo) today, API tomorrow. No UI change needed.
      await inquiryRepository.create({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        phone: phone.trim(),
        service: service || "Other",
        projectType: projectType || "Other",
        budget: budget || "Not specified",
        timeline: timeline || "Not specified",
        description: description.trim(),
        preferredContact,
      });
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.16em] font-[700] text-white/40">
            <Link href="/" className="hover:text-white">HOME</Link><span>/</span><span className="text-white/60">CONTACT</span>
            {isNewProject && <span className="ml-2 rounded-full bg-[#4F7EFF] px-2.5 py-1 text-[10px] tracking-[0.08em] text-white">NEW PROJECT</span>}
          </div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">
            {isNewProject ? "Start a Project" : "Talk to Our Team"}
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">
            {isNewProject
              ? "Tell us about your project — goals, scope and timeline. We'll respond with a clear next step, not a generic sales pitch."
              : "Whether you need a new product, modernization or additional engineering capacity — let's talk about the right approach."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/process" className="text-xs font-[600] text-white/50 hover:text-white">How we deliver →</Link>
            <span className="text-white/20">•</span>
            <Link href="/services" className="text-xs font-[600] text-white/50 hover:text-white">View services →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
        {/* Left — credibility + address */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-sm font-[700] text-white">Nexara Global Solutions</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              3rd Floor, D23 Building, S3V Business Park<br />
              Sector-59, Noida, Gautambuddha Nagar<br />
              Uttar Pradesh – 201301, India
            </p>
            <p className="mt-4 text-sm font-[600] text-white">Phone: <a href={contactInfo.phoneHref} className="text-[#4F7EFF] hover:text-white">{contactInfo.phoneDisplay}</a></p>
            <p className="mt-1.5 text-sm font-[600] text-white">Email: <a href={contactInfo.emailHref} className="text-[#4F7EFF] hover:text-white">{contactInfo.email}</a></p>
            <div className="mt-6 rounded-xl overflow-hidden border border-white/5 bg-white/[0.03] h-[180px] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-xs tracking-[0.12em] font-[700] text-white/30">MAP</div>
                <p className="mt-2 text-sm font-[600] text-white">Sector-59, Noida</p>
                <p className="text-xs text-white/40">S3V Business Park, D23 Building</p>
                <a href="https://maps.google.com/?q=S3V+Business+Park+Sector+59+Noida" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full bg-white text-[#070A0F] px-4 py-1.5 text-xs font-[700]">Open in Maps →</a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-white/60">WHAT HAPPENS NEXT</h3>
            <ol className="mt-4 space-y-2 text-sm text-white/60">
              <li className="flex gap-2"><span className="text-[#4F7EFF]">1.</span> We review your inquiry</li>
              <li className="flex gap-2"><span className="text-[#4F7EFF]">2.</span> We respond with a clear next step</li>
              <li className="flex gap-2"><span className="text-[#4F7EFF]">3.</span> Discovery workshop if there is a fit</li>
            </ol>
            <p className="mt-4 text-xs text-white/30">We do not share your information. For demo phase, inquiries are stored locally in your browser (see <Link href="/admin" className="underline hover:text-white">Admin</Link>). In production this will be a secure database.</p>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-[20px] border border-white/10 bg-[#0F141E] p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
          {formState === "sent" ? (
            <div className="py-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">✓</div>
              <h3 className="mt-4 text-lg font-[700] text-white">Thank you. Your project inquiry has been received.</h3>
              <p className="mt-2 text-sm text-white/50">Our team will review your request and be in touch. You can view it in the <Link href="/admin" className="text-[#4F7EFF] hover:text-white underline">admin inquiries</Link> (demo storage).</p>
              <button onClick={() => { setFormState("idle"); setName(""); setEmail(""); setCompany(""); setPhone(""); setService(""); setProjectType(isNewProject ? "New Product" : ""); setBudget(""); setTimeline(""); setDescription(""); setPreferredContact("Email"); setErrors({}); }} className="mt-6 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-[600] text-white hover:bg-white/10 transition">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              {isNewProject && <div className="rounded-xl border border-[#4F7EFF]/20 bg-[#4F7EFF]/10 px-4 py-3 text-sm text-white/90"><span className="font-[700]">New Project mode</span> — we&apos;ll emphasize scoping, roadmap and delivery approach in our response.</div>}
              {formState === "error" && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">Something went wrong. Please try again.</div>}
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">FULL NAME *</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none ${errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-[#070A0F] focus:border-[#4F7EFF]/50"}`} aria-invalid={!!errors.name} />
                  {errors.name && <span className="text-xs text-red-300">{errors.name}</span>}
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">WORK EMAIL *</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none ${errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-[#070A0F] focus:border-[#4F7EFF]/50"}`} aria-invalid={!!errors.email} />
                  {errors.email && <span className="text-xs text-red-300">{errors.email}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">COMPANY</span>
                  <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#4F7EFF]/50 focus:outline-none" />
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">PHONE</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#4F7EFF]/50 focus:outline-none" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">SERVICE</span>
                  <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none">
                    <option value="">Select a service</option>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">PROJECT TYPE</span>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none">
                    <option value="">Select project type</option>
                    {projectTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">BUDGET RANGE</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none">
                    <option value="">Select budget</option>
                    <option>Under ₹5L</option><option>₹5L – ₹15L</option><option>₹15L – ₹50L</option><option>₹50L+</option><option>Not sure yet</option>
                  </select>
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-white/60">TIMELINE</span>
                  <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none">
                    <option value="">Select timeline</option>
                    <option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option>
                  </select>
                </label>
              </div>
              <label className="space-y-1.5 block">
                <span className="text-xs font-[600] tracking-[0.06em] text-white/60">PREFERRED CONTACT METHOD</span>
                <select value={preferredContact} onChange={(e) => setPreferredContact(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white focus:border-[#4F7EFF]/50 focus:outline-none">
                  <option>Email</option><option>Phone</option><option>Either</option>
                </select>
              </label>
              <label className="space-y-1.5 block">
                <span className="text-xs font-[600] tracking-[0.06em] text-white/60">PROJECT DESCRIPTION *</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe your business challenge, goals and what you want to build..." className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none resize-none ${errors.description ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50" : "border-white/10 bg-[#070A0F] focus:border-[#4F7EFF]/50"}`} aria-invalid={!!errors.description} />
                {errors.description && <span className="text-xs text-red-300">{errors.description}</span>}
                <span className="text-xs text-white/30">{description.length} characters</span>
              </label>
              {/* honeypot */}
              <div className="hidden" aria-hidden>
                <label>Leave blank<input tabIndex={-1} autoComplete="off" /></label>
              </div>
              <button type="submit" disabled={formState === "loading"} className="w-full rounded-full bg-[#4F7EFF] py-3.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition shadow-[0_8px_24px_rgba(79,126,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                {formState === "loading" ? "Sending…" : isNewProject ? "Send Project Inquiry →" : "Talk to Our Team →"}
              </button>
              <p className="text-center text-[11px] leading-4 text-white/30">By submitting, you agree to be contacted about your inquiry. Demo storage only — not a shared production database.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
