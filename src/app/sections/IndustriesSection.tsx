import Link from "next/link";
import { Container, Section, SectionHeading, FeatureCard } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — industry-specific solutions.

   A comparison-style two-column split (industry column list + framing copy)
   rather than another uniform card grid.
   ─────────────────────────────────────────────────────────────────────────── */

type Industry = { slug: string; title: string };

const FEATURED = [
  "financial-services",
  "healthcare",
  "manufacturing",
  "retail",
  "logistics",
  "professional-services",
];

export function IndustriesSection({ industries }: { industries: readonly Industry[] }) {
  const featured = FEATURED.map((slug) => industries.find((i) => i.slug === slug)).filter(
    (i): i is Industry => Boolean(i),
  );
  const rest = industries.filter((i) => !FEATURED.includes(i.slug));

  const featuredCards = featured.map((i) => (
    <FeatureCard key={i.slug} tone="surface">
      <Link href={`/industries/${i.slug}`} className="block">
        <span className="text-[16px] font-[700] text-ink transition group-hover:text-brand">
          {i.title}
        </span>
        <span
          className="text-brand opacity-0 group-hover:opacity-100 transition group-hover:translate-x-0.5"
          aria-hidden
        >
          →
        </span>
        <span className="mt-2 block text-[14px] leading-6 text-ink-secondary">
          Industry context, common challenges, digital opportunities and the Nexara
          capabilities that apply.
        </span>
      </Link>
    </FeatureCard>
  ));

  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Industries"
              title="Built for how your industry works"
              description="Each industry has distinct operations, regulation and customer expectations. We adapt technology to your domain — not the reverse."
            />
            <Link
              href="/industries"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-[700] text-ink transition hover:border-brand hover:text-brand"
            >
              All industries →
            </Link>

            {rest.length > 0 ? (
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-[11px] font-[800] uppercase tracking-[0.14em] text-ink-muted">
                  Also served
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {rest.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-[13px] font-[600] text-ink-secondary transition hover:border-brand hover:text-brand"
                    >
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Featured industries using the shared FeatureCard primitive */}
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredCards}
          </div>
        </div>
      </Container>
    </Section>
  );
}
