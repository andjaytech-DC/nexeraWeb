import Link from "next/link";
import { Footer } from "@/components/Footer";

/* 404 — correct 404 status is served automatically for unmatched routes.
   The root layout wraps this, so the site header, fonts and theme apply. */

const suggestions = [
  { href: "/services", label: "Explore services", note: "Websites, web & mobile apps, CRM, ERP, AI software" },
  { href: "/solutions", label: "Browse solutions", note: "Outcomes by business problem" },
  { href: "/careers", label: "Join the team", note: "Open positions and talent community" },
  { href: "/contact", label: "Contact us", note: "Tell us what you were looking for" },
];

export default function NotFound() {
  return (
    <>
      <main id="main" className="relative flex-1 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-brand">404</p>
          <h1 className="mt-3 max-w-[720px] font-[var(--font-display)] text-[34px] font-[800] leading-[1.1] tracking-[-0.03em] text-ink sm:text-[48px]">
            This page has moved or never existed
          </h1>
          <p className="mt-4 max-w-[640px] text-[16px] leading-7 text-ink-secondary sm:text-[17px]">
            The link may be outdated. Pick a starting point below — or use the header navigation.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-line bg-surface p-5 transition hover:border-brand hover:bg-surface-alt"
              >
                <span className="block font-[var(--font-display)] text-[16px] font-[800] tracking-[-0.02em] text-ink group-hover:text-brand">
                  {s.label} <span aria-hidden>→</span>
                </span>
                <span className="mt-2 block text-[13px] leading-5 text-ink-muted">{s.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
