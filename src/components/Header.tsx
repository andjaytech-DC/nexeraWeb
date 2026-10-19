"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cx } from "./ui";
import { CareersMenu, MobileMenu } from "./HeaderMenus";
import { primaryNav, NAV_LINK } from "@/lib/nav-data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isCareersActive = pathname === "/careers" || pathname?.startsWith("/careers");

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setCareersOpen(false); setMobileCareersOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setCareersOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`) === true;

  return (
    <header
      className={cx(
        "sticky top-0 z-50 h-[72px] border-b backdrop-blur-[20px] transition duration-300",
        "bg-[#080A12]/85 border-white/[0.08]",
        scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-8">
        <Logo onDark />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {primaryNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cx(
                NAV_LINK,
                isActive(n.href) ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              {n.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCareersOpen(true)}
            onMouseLeave={() => setCareersOpen(false)}
            onFocus={() => setCareersOpen(true)}
          >
            <Link
              href="/careers"
              aria-current={isCareersActive ? "page" : undefined}
              aria-expanded={careersOpen}
              className={cx(
                NAV_LINK,
                "inline-flex items-center gap-1",
                isCareersActive ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              Careers
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {careersOpen && <CareersMenu />}
          </div>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/contact" className={cx(NAV_LINK, "text-white/70 hover:text-white")}>
            Contact
          </Link>
          <Link
            href="/contact?type=new-project"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-[700] text-black transition hover:scale-[1.02]"
          >
            Start a Project <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <MobileMenu open={open} careersOpen={mobileCareersOpen} onToggleCareers={() => setMobileCareersOpen((v) => !v)} />
    </header>
  );
}