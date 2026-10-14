"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { contactInfo } from "@/lib/site-data";

const nav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technologies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
];

const careersItems = [
  { label: "Job Search", href: "/careers/job-search", desc: "Find your next role" },
  { label: "Students & Entry Level", href: "/careers/students", desc: "Early career" },
  { label: "Contract Opportunities", href: "/careers/contract-opportunities", desc: "Flexible engagements" },
  { label: "Talent Community", href: "/careers/talent-community", desc: "Stay connected" },
  { label: "Send Your Resume", href: "/careers/send-resume", desc: "Share your profile" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const pathname = usePathname();
  const isCareersActive = pathname === "/careers" || pathname?.startsWith("/careers");

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // Close the menus when the route changes (adjusting state during render
  // rather than in an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setCareersOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070A0F]/80 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-6">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[-0.01em] font-[500]" aria-label="Primary">
          {nav.map((n) => {
            const active = pathname === n.href || pathname?.startsWith(n.href + "/");
            return (
              <Link key={n.href} href={n.href} className={active ? "text-white" : "text-white/70 hover:text-white transition"} aria-current={active ? "page" : undefined}>
                {n.label}
              </Link>
            );
          })}
          <div className="relative" onMouseEnter={() => setCareersOpen(true)} onMouseLeave={() => setCareersOpen(false)}>
            <Link href="/careers" className={`inline-flex items-center gap-1 ${isCareersActive ? "text-white" : "text-white/70 hover:text-white"} transition`}>
              Careers
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            {careersOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <div className="w-[480px] rounded-2xl border border-white/10 bg-[#0F141E] shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden p-2">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="p-3">
                      <div className="text-[11px] tracking-[0.12em] font-[700] text-white/40 px-3 py-1">Explore</div>
                      <Link href="/careers/job-search" className="mt-1 flex flex-col rounded-xl px-3 py-2 hover:bg-white/[0.06] transition">
                        <span className="text-sm font-[600] text-white">Job Search</span><span className="text-xs text-white/50">Find your next role</span>
                      </Link>
                      <Link href="/careers/students" className="flex flex-col rounded-xl px-3 py-2 hover:bg-white/[0.06] transition">
                        <span className="text-sm font-[600] text-white">Students & Entry Level</span><span className="text-xs text-white/50">Early career</span>
                      </Link>
                      <div className="mt-3 text-[11px] tracking-[0.12em] font-[700] text-white/40 px-3 py-1">Candidate</div>
                      <Link href="/careers/send-resume" className="flex flex-col rounded-xl px-3 py-2 hover:bg-white/[0.06] transition">
                        <span className="text-sm font-[600] text-white">Send Your Resume</span><span className="text-xs text-white/50">Share your profile</span>
                      </Link>
                    </div>
                    <div className="p-3 border-l border-white/5">
                      <div className="text-[11px] tracking-[0.12em] font-[700] text-white/40 px-3 py-1">Opportunities</div>
                      <Link href="/careers/contract-opportunities" className="mt-1 flex flex-col rounded-xl px-3 py-2 hover:bg-white/[0.06] transition">
                        <span className="text-sm font-[600] text-white">Contract Opportunities</span><span className="text-xs text-white/50">Flexible engagements</span>
                      </Link>
                      <Link href="/careers/talent-community" className="flex flex-col rounded-xl px-3 py-2 hover:bg-white/[0.06] transition">
                        <span className="text-sm font-[600] text-white">Talent Community</span><span className="text-xs text-white/50">Stay connected</span>
                      </Link>
                      <Link href="/careers" className="mt-4 mx-3 flex items-center justify-center rounded-full bg-[#4F7EFF] px-4 py-2 text-xs font-[700] text-white hover:bg-[#3E6AF0] transition">Explore Careers →</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="text-[13px] font-[600] text-white/80 hover:text-white px-4 py-2 transition">Talk to our team</Link>
          <Link href="/contact?type=new-project" className="inline-flex items-center gap-2 rounded-full bg-white text-[#070A0F] text-[13px] font-[700] px-5 py-[9px] hover:bg-white/90 transition">
            Start a Project <span aria-hidden>→</span>
          </Link>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0F141E] px-5 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-3 text-[15px] font-[500]" aria-label="Mobile primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="py-2 text-white/80 hover:text-white border-b border-white/5 last:border-0">
                {n.label}
              </Link>
            ))}
            <div className="border-b border-white/5">
              <button onClick={() => setMobileCareersOpen((v) => !v)} className="flex w-full items-center justify-between py-2 text-white/80 hover:text-white">
                <span>Careers</span><span className={`transition ${mobileCareersOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {mobileCareersOpen && (
                <div className="pb-3 pl-3 space-y-1">
                  <Link href="/careers" className="block py-2 text-sm text-white/70 hover:text-white">Careers Overview</Link>
                  {careersItems.map((c) => (
                    <Link key={c.href} href={c.href} className="block py-2 text-sm text-white/70 hover:text-white">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact" className="py-2 text-white/80 hover:text-white border-b border-white/5">Contact</Link>
          </nav>
          <Link href="/contact?type=new-project" className="flex items-center justify-center rounded-full bg-white text-[#070A0F] font-[700] py-3">Start a Project →</Link>
          <p className="text-center text-xs text-white/40">3rd Floor, D23 Building, S3V Business Park, Sector-59, Noida<br />
            <a href={contactInfo.phoneHref} className="hover:text-white/70">{contactInfo.phoneDisplay}</a> · <a href={contactInfo.emailHref} className="hover:text-white/70">{contactInfo.email}</a>
          </p>
        </div>
      )}
    </header>
  );
}
