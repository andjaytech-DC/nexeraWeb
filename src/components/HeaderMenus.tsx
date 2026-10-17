"use client";

import Link from "next/link";
import { contactInfo } from "@/lib/site-data";
import { careersItems, primaryNav, NAV_IDLE, NAV_LINK } from "@/lib/nav-data";
import { cx } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Header sub-navigation: the desktop Careers dropdown and the mobile menu.
   Extracted so the Header component stays readable.
   ─────────────────────────────────────────────────────────────────────────── */

export function CareersColumn({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; href: string; desc: string }>;
}) {
  return (
    <div className="p-3">
      <p className="px-2 text-[11px] font-[800] uppercase tracking-[0.12em] text-ink-muted">{label}</p>
      <div className="mt-2 space-y-0.5">
        {items.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-xl px-3 py-2 transition hover:bg-surface-alt"
          >
            <span className="block text-[14px] font-[600] text-ink">{c.label}</span>
            <span className="block text-[12px] text-ink-muted">{c.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Desktop Careers dropdown panel. */
export function CareersMenu() {
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
      <div className="w-[480px] overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
        <div className="grid grid-cols-2 gap-0">
          <CareersColumn label="Careers at Nexara" items={careersItems.slice(0, 3)} />
          <CareersColumn label="Get in touch" items={careersItems.slice(3)} />
        </div>
        <Link
          href="/careers"
          className="mt-2 mx-1 flex items-center justify-center rounded-full bg-brand px-4 py-2 text-[13px] font-[700] text-white transition hover:bg-brand-hover"
        >
          Explore Careers →
        </Link>
      </div>
    </div>
  );
}

/** Mobile navigation drawer contents. */
export function MobileMenu({
  open,
  careersOpen,
  onToggleCareers,
}: {
  open: boolean;
  careersOpen: boolean;
  onToggleCareers: () => void;
}) {
  if (!open) return null;

  return (
    <div className="max-h-[80vh] overflow-y-auto border-t border-line bg-surface px-5 py-6 lg:hidden">
      <nav className="flex flex-col gap-1 text-[15px] font-[600]" aria-label="Mobile primary">
        {primaryNav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="border-b border-line py-3 text-ink-secondary transition hover:text-brand"
          >
            {n.label}
          </Link>
        ))}

        <div className="border-b border-line">
          <button
            onClick={onToggleCareers}
            aria-expanded={careersOpen}
            className="flex w-full items-center justify-between py-3 text-ink-secondary"
          >
            <span>Careers</span>
            <span className={cx("transition", careersOpen && "rotate-180")} aria-hidden>
              ▾
            </span>
          </button>
          {careersOpen && (
            <div className="space-y-1 pb-3 pl-3">
              <Link href="/careers" className={cx(NAV_LINK, "block py-2", NAV_IDLE)}>
                Careers Overview
              </Link>
              {careersItems.map((c) => (
                <Link key={c.href} href={c.href} className={cx(NAV_LINK, "block py-2", NAV_IDLE)}>
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/contact" className="border-b border-line py-3 text-ink-secondary">
          Contact
        </Link>
      </nav>

      <Link
        href="/contact?type=new-project"
        className="mt-5 flex items-center justify-center rounded-full bg-brand py-3 font-[700] text-white"
      >
        Start a Project →
      </Link>

      <p className="mt-4 text-center text-xs leading-5 text-ink-muted">
        3rd Floor, D23 Building, S3V Business Park, Sector-59, Noida
        <br />
        <a href={contactInfo.phoneHref} className="hover:text-brand">
          {contactInfo.phoneDisplay}
        </a>{" "}
        ·{" "}
        <a href={contactInfo.emailHref} className="hover:text-brand">
          {contactInfo.email}
        </a>
      </p>
    </div>
  );
}
