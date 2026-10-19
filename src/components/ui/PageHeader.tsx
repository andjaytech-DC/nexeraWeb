import Link from "next/link";
import type { ReactNode } from "react";
import { Container, cx } from "./primitives";
import { siteUrl } from "@/lib/site-url";

/* ───────────────────────────────────────────────────────────────────────────
   Standard interior page header: breadcrumb, H1, optional tagline and
   description, plus a CTA cluster. Replaces the copy-pasted hero block that
   previously appeared at the top of every Services / Industries / Solutions
   detail page.
   ─────────────────────────────────────────────────────────────────────────── */

export function PageHeader({
  breadcrumb,
  title,
  tagline,
  description,
  actions,
}: {
  breadcrumb?: { label: string; href?: string };
  title: string;
  tagline?: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]"
        aria-hidden
      />
      <Container className="relative py-12 sm:py-16">
        {breadcrumb ? (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  // Google's BreadcrumbList example allows omitting the URL of
                  // the final (current-page) element — the parent href is all
                  // PageHeader knows without touching every call site.
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: breadcrumb.label,
                      ...(breadcrumb.href ? { item: `${siteUrl()}${breadcrumb.href}` } : {}),
                    },
                    { "@type": "ListItem", position: 2, name: title },
                  ],
                }),
              }}
            />
            <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-xs font-[700] uppercase tracking-[0.14em]"
          >
            {breadcrumb.href ? (
              <Link href={breadcrumb.href} className="text-ink-muted transition hover:text-brand">
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="text-ink-muted">{breadcrumb.label}</span>
            )}
            <span className="text-line-strong" aria-hidden>
              /
            </span>
            <span className="text-ink-secondary">{title}</span>
          </nav>
          </>
        ) : null}
        <h1 className="max-w-[840px] font-[var(--font-display)] text-[32px] font-[800] leading-[1.1] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[50px]">
          {title}
        </h1>
        {tagline ? (
          <p className="mt-4 max-w-[680px] text-[19px] font-[600] leading-8 tracking-[-0.01em] text-brand sm:text-[21px]">
            {tagline}
          </p>
        ) : null}
        {description ? (
          <div
            className={cx(
              "mt-4 max-w-[680px] text-[16px] leading-7 text-ink-secondary sm:text-[17px]",
              tagline && "mt-3",
            )}
          >
            {description}
          </div>
        ) : null}
        {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Reusable closing CTA band. Consistent across every public page, and swaps
   the previous "blue block + white button" pattern for a navy panel with
   proper contrast.
   ─────────────────────────────────────────────────────────────────────────── */

export function CtaBand({
  eyebrow = "Start a conversation",
  title,
  description,
  primary = { label: "Start a project", href: "/contact?type=new-project" },
  secondary = { label: "Talk to our team", href: "/contact" },
  note,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: ReactNode;
}) {
  return (
    <section className="bg-canvas pb-16 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_10%,rgba(49,94,251,0.30),transparent_60%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_90%,rgba(8,145,178,0.18),transparent_60%)]"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-brand-line sm:text-xs">
                {eyebrow}
              </p>
              <h2 className="mt-3 max-w-[620px] font-[var(--font-display)] text-[26px] font-[800] leading-[1.15] tracking-[-0.025em] text-white sm:text-[34px]">
                {title}
              </h2>
              {description ? (
                <p className="mt-4 max-w-[560px] text-[16px] leading-7 text-white/75">{description}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href={primary.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-[800] text-brand transition hover:bg-brand-soft lg:w-auto"
              >
                {primary.label} <span aria-hidden>→</span>
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-[700] text-white transition hover:border-white/50 hover:bg-white/10 lg:w-auto"
              >
                {secondary.label}
              </Link>
              {note ? (
                <p className="text-center text-xs leading-5 text-white/55 lg:text-right">{note}</p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
