"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cx } from "./ui";
import { CareersMenu, MobileMenu } from "./HeaderMenus";
import { primaryNav, NAV_ACTIVE, NAV_IDLE, NAV_LINK } from "@/lib/nav-data";

/* ───────────────────────────────────────────────────────────────────────────
   Primary site navigation — light enterprise theme.

   The Careers dropdown and mobile drawer live in HeaderMenus.tsx; navigation
   data in @/lib/nav-data (shared with the Footer).
   ─────────────────────────────────────────────────────────────────────────── */

export function Header() {
  const [open, setOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isCareersActive = pathname === "/careers" || pathname?.startsWith("/careers");

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setCareersOpen(false);
        setMobileCareersOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close the menus when the route changes (adjusting state during render
  // rather than in an effect, per React guidance).
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
        "sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-xl transition duration-300",
        scrolled ? "shadow-[0_4px_20px_rgba(15,23,42,0.06)] border-line-strong" : "",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-6">
        <Logo />

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
          {primaryNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cx(NAV_LINK, isActive(n.href) ? NAV_ACTIVE : NAV_IDLE)}
            >
              {n.label}
            </Link>
          ))}

          {/* Careers grouped menu */}
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
                isCareersActive ? NAV_ACTIVE : NAV_IDLE,
              )}
            >
              Careers
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {careersOpen && <CareersMenu />}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className={cx(NAV_LINK, NAV_IDLE)}>
            Contact
          </Link>
          <Link
            href="/contact?type=new-project"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-[700] text-white transition hover:bg-brand-hover"
          >
            Start a Project <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-alt text-ink transition focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <MobileMenu
        open={open}
        careersOpen={mobileCareersOpen}
        onToggleCareers={() => setMobileCareersOpen((v) => !v)}
      />
    </header>
  );
}
