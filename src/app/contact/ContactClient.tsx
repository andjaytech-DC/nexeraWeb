"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { serviceOptions, projectTypeOptions } from "@/lib/inquiry-store";
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
  // Honeypot — rendered off-screen via CSS; humans never fill it.
  const [website, setWebsite] = useState("");
  // Idempotency key minted once per mount so a retry replays the same record
  // instead of creating a duplicate. Regenerated after a confirmed success.
  const [idempotencyKey, setIdempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  );
  // Server confirmation id (not the form payload id).
  const [submissionId, setSubmissionId] = useState<string | null>(null);

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
    if (formState === "loading") return; // prevent duplicate submissions
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setFormState("loading");
    try {
      // Repository is swappable â€” local (demo) today, API tomorrow. No UI change needed.
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
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
          website,
          idempotencyKey,
          source: searchParams.get("source") || undefined,
          industry: searchParams.get("industry") || undefined,
          goal: searchParams.get("goal") || undefined,
          challenges: searchParams.getAll("challenge").length
            ? searchParams.getAll("challenge")
            : undefined,
          solution: searchParams.get("solution") || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        field?: string;
        id?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        const message = data?.error || "Submission failed. Please try again.";
        // Field-scoped errors render inline; values are preserved either way.
        setErrors((prev) => (data?.field ? { ...prev, [data.field]: message } : prev));
        if (!data?.field) setErrors({ form: message });
        setFormState(data?.field ? "idle" : "error");
        return;
      }
      // Success renders only on server confirmation (202 + id).
      setSubmissionId(typeof data.id === "string" ? data.id : null);
      setIdempotencyKey(
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
      );
      setFormState("sent");
    } catch {
      // Network failure — recoverable, values preserved.
      setErrors({ form: "Network error. Check your connection and try again — nothing was sent." });
      setFormState("error");
    }
  }

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.16em] font-[700] text-ink-muted">
            <Link href="/" className="hover:text-brand">HOME</Link><span>/</span><span className="text-ink-secondary">CONTACT</span>
            {isNewProject && <span className="ml-2 rounded-full bg-brand px-2.5 py-1 text-[10px] tracking-[0.08em] text-white">NEW PROJECT</span>}
          </div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">
            {isNewProject ? "Start a Project" : "Talk to Our Team"}
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">
            {isNewProject
              ? "Tell us about your project â€” goals, scope and timeline. We'll respond with a clear next step, not a generic sales pitch."
              : "Whether you need a new product, modernization or additional engineering capacity â€” let's talk about the right approach."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/process" className="text-xs font-[600] text-ink-secondary hover:text-brand">How we deliver â†’</Link>
            <span className="text-line-strong" aria-hidden>•</span>
            <Link href="/services" className="text-xs font-[600] text-ink-secondary hover:text-brand">View services â†’</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
        {/* Left â€” credibility + address */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">Nexara Global Solutions</h2>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">
              3rd Floor, D23 Building, S3V Business Park<br />
              Sector-59, Noida, Gautambuddha Nagar<br />
              Uttar Pradesh â€“ 201301, India
            </p>
            <p className="mt-4 text-sm font-[600] text-ink">Phone: <a href={contactInfo.phoneHref} className="text-brand hover:text-brand">{contactInfo.phoneDisplay}</a></p>
            <p className="mt-1.5 text-sm font-[600] text-ink">Email: <a href={contactInfo.emailHref} className="text-brand hover:text-brand">{contactInfo.email}</a></p>
            <div className="mt-6 rounded-xl overflow-hidden border border-line bg-surface-alt h-[180px] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-xs tracking-[0.12em] font-[700] text-ink-muted">MAP</div>
                <p className="mt-2 text-sm font-[600] text-ink">Sector-59, Noida</p>
                <p className="text-xs text-ink-muted">S3V Business Park, D23 Building</p>
                <a href="https://maps.google.com/?q=S3V+Business+Park+Sector+59+Noida" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full bg-brand text-white px-4 py-1.5 text-xs font-[700]">Open in Maps â†’</a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-ink-secondary">WHAT HAPPENS NEXT</h3>
            <ol className="mt-4 space-y-2 text-sm text-ink-secondary">
              <li className="flex gap-2"><span className="text-brand">1.</span> We review your inquiry</li>
              <li className="flex gap-2"><span className="text-brand">2.</span> We respond with a clear next step</li>
              <li className="flex gap-2"><span className="text-brand">3.</span> Discovery workshop if there is a fit</li>
            </ol>
            <p className="mt-4 text-xs text-ink-muted">We do not share your information. Submissions are stored server-side and reviewed in the <Link href="/admin" className="underline hover:text-brand">Admin</Link> area.</p>
          </div>
        </div>

        {/* Right â€” form */}
        <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
          {formState === "sent" ? (
            <div className="py-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-success-soft border border-success-line flex items-center justify-center text-success text-xl">âœ“</div>
              <h3 className="mt-4 text-lg font-[700] text-ink">Thank you. Your project inquiry has been received.</h3>
              <p className="mt-2 text-sm text-ink-secondary">Our team will review your request and be in touch.{submissionId ? ` Reference: ${submissionId}.` : ""}</p>
              <button onClick={() => { setFormState("idle"); setName(""); setEmail(""); setCompany(""); setPhone(""); setService(""); setProjectType(isNewProject ? "New Product" : ""); setBudget(""); setTimeline(""); setDescription(""); setPreferredContact("Email"); setErrors({}); }} className="mt-6 rounded-full border border-line bg-surface-alt px-5 py-2 text-sm font-[600] text-ink hover:bg-surface-alt transition">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              {isNewProject && <div className="rounded-xl border border-brand-line bg-brand-soft px-4 py-3 text-sm text-white/90"><span className="font-[700]">New Project mode</span> â€” we&apos;ll emphasize scoping, roadmap and delivery approach in our response.</div>}
              {formState === "error" && errors.form && <div role="alert" className="rounded-xl border border-danger-line bg-danger-soft px-4 py-3 text-sm text-danger">{errors.form}</div>}
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">FULL NAME *</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none ${errors.name ? "border-danger bg-danger-soft" : "border-line bg-canvas focus:border-brand"}`} aria-invalid={!!errors.name} />
                  {errors.name && <span className="text-xs text-danger">{errors.name}</span>}
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">WORK EMAIL *</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none ${errors.email ? "border-danger bg-danger-soft" : "border-line bg-canvas focus:border-brand"}`} aria-invalid={!!errors.email} />
                  {errors.email && <span className="text-xs text-danger">{errors.email}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">COMPANY</span>
                  <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none" />
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PHONE</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">SERVICE</span>
                  <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none">
                    <option value="">Select a service</option>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PROJECT TYPE</span>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none">
                    <option value="">Select project type</option>
                    {projectTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">BUDGET RANGE</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none">
                    <option value="">Select budget</option>
                    <option>Under â‚¹5L</option><option>â‚¹5L â€“ â‚¹15L</option><option>â‚¹15L â€“ â‚¹50L</option><option>â‚¹50L+</option><option>Not sure yet</option>
                  </select>
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">TIMELINE</span>
                  <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none">
                    <option value="">Select timeline</option>
                    <option>ASAP</option><option>1â€“3 months</option><option>3â€“6 months</option><option>6+ months</option>
                  </select>
                </label>
              </div>
              <label className="space-y-1.5 block">
                <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PREFERRED CONTACT METHOD</span>
                <select value={preferredContact} onChange={(e) => setPreferredContact(e.target.value)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none">
                  <option>Email</option><option>Phone</option><option>Either</option>
                </select>
              </label>
              <label className="space-y-1.5 block">
                <span className="text-xs font-[600] tracking-[0.06em] text-ink-secondary">PROJECT DESCRIPTION *</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe your business challenge, goals and what you want to build..." className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none resize-none ${errors.description ? "border-danger bg-danger-soft focus:border-danger" : "border-line bg-canvas focus:border-brand"}`} aria-invalid={!!errors.description} />
                {errors.description && <span className="text-xs text-danger">{errors.description}</span>}
                <span className="text-xs text-ink-muted">{description.length} characters</span>
              </label>
              {/* Honeypot — off-screen, never filled by humans. Sent as `website`. */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label>Leave blank<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" /></label>
              </div>
              <button type="submit" disabled={formState === "loading"} className="w-full rounded-full bg-brand py-3.5 text-sm font-[700] text-white hover:bg-brand-hover transition shadow-[0_6px_20px_rgba(49,94,251,0.26)] disabled:opacity-50 disabled:cursor-not-allowed">
                {formState === "loading" ? "Sendingâ€¦" : isNewProject ? "Send Project Inquiry â†’" : "Talk to Our Team â†’"}
              </button>
              <p className="text-center text-[11px] leading-4 text-ink-muted">By submitting, you agree to be contacted about your inquiry. Submissions are stored securely on our servers.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

