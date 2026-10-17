import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — compact services overview.

   Deliberately a compact two-column list rather than a card grid, so the
   rhythm differs from the sections around it. Icons are simple monograms to
   avoid decorative clutter.
   ─────────────────────────────────────────────────────────────────────────── */

type Service = {
  slug: string;
  title: string;
  short: string;
};

export function ServicesOverview({ services }: { services: readonly Service[] }) {
  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="Technology capabilities, one partner"
            description="Comprehensive execution across the modern enterprise stack — each capability is a dedicated destination."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-[700] text-ink transition hover:border-brand hover:text-brand"
          >
            All services →
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link
                href={`/services/${s.slug}`}
                className="group flex items-start gap-4 py-4 transition"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-line bg-brand-soft text-[12px] font-[800] text-brand transition group-hover:bg-brand group-hover:text-white"
                  aria-hidden
                >
                  {s.title.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[15px] font-[700] text-ink transition group-hover:text-brand">
                      {s.title}
                    </span>
                    <span
                      className="text-brand opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-1 block text-[14px] leading-6 text-ink-secondary">
                    {s.short}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
