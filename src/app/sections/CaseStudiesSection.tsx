import Link from "next/link";
import { Container, Section, SectionHeading, FeatureCard } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — selected customer stories.

   Only engagement patterns already published on /case-studies are shown, and
   they are explicitly labelled as patterns rather than named clients. No
   invented logos, metrics, testimonials or awards.
   ─────────────────────────────────────────────────────────────────────────── */

const STORIES = [
  {
    title: "Enterprise platform",
    desc: "Unified CRM, ERP and SCM integration for operations at scale.",
    tags: ["System integration", "APIs", "Cloud"],
  },
  {
    title: "AI-powered product",
    desc: "Document intelligence and workflow automation for enterprise teams.",
    tags: ["Generative AI", "Automation", "SaaS"],
  },
  {
    title: "Digital transformation",
    desc: "Legacy modernization to cloud-native, multi-tenant architecture.",
    tags: ["Modernization", "SaaS", "Mobile"],
  },
];

export function CaseStudiesSection() {
  return (
    <Section tone="alt">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Case studies"
            title="Proof in delivery"
            description="Real case studies are published with client permission. The patterns below show how we structure this kind of work — no invented clients or statistics."
          />
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-[700] text-ink transition hover:border-brand hover:text-brand"
          >
            View case studies →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {STORIES.map((s) => (
            <FeatureCard key={s.title} tone="surface">
              <p className="text-[11px] font-[800] uppercase tracking-[0.14em] text-ink-muted">
                Engagement pattern
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-[18px] font-[800] tracking-[-0.015em] text-ink">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-7 text-ink-secondary">{s.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line bg-surface-alt px-2.5 py-1 text-[12px] font-[600] text-ink-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/case-studies"
                className="mt-5 inline-flex text-[14px] font-[700] text-brand hover:text-brand-hover"
              >
                Learn more →
              </Link>
            </FeatureCard>
          ))}
        </div>

        <p className="mt-6 text-[13px] leading-6 text-ink-secondary">
          Detailed narratives and measurable outcomes are added when clients approve publication.
        </p>
      </Container>
    </Section>
  );
}
