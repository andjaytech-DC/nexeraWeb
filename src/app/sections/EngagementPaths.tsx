import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — engagement path (three ways to start).

   A compact three-column comparison, deliberately different from the card and
   list patterns used elsewhere.
   ─────────────────────────────────────────────────────────────────────────── */

const PATHS = [
  {
    tag: "Fastest",
    title: "Not sure where to start?",
    desc: "Answer a few questions and see which solutions fit your challenges.",
    cta: "Use the solution finder →",
    href: "/solution-finder",
    featured: true,
  },
  {
    tag: "Exploring",
    title: "Know your goal?",
    desc: "Browse the solution areas we deliver, end to end.",
    cta: "Explore solutions →",
    href: "/solutions",
    featured: false,
  },
  {
    tag: "Direct",
    title: "Ready to talk?",
    desc: "Describe your project and we will respond with a clear next step.",
    cta: "Start a project →",
    href: "/contact?type=new-project",
    featured: false,
  },
];

export function EngagementPaths({
  solutionCount,
}: {
  solutionCount: number;
}) {
  return (
    <Section tone="surface" size="sm">
      <Container>
        <h2 className="max-w-[680px] font-[var(--font-display)] text-[24px] font-[800] leading-[1.2] tracking-[-0.025em] text-ink sm:text-[30px]">
          Three ways to start
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PATHS.map((p) => (
            <FeatureCard key={p.title} tone={p.featured ? "brand" : "surface"}>
              <p
                className={
                  p.featured
                    ? "text-[11px] font-[800] uppercase tracking-[0.14em] text-brand"
                    : "text-[11px] font-[800] uppercase tracking-[0.14em] text-ink-muted"
                }
              >
                {p.tag}
              </p>
              <h3 className="mt-3 text-[17px] font-[800] text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
                {p.href === "/solutions"
                  ? `Browse the ${solutionCount} solution areas we deliver, end to end.`
                  : p.desc}
              </p>
              <Link
                href={p.href}
                className="mt-4 inline-flex text-[14px] font-[700] text-brand hover:text-brand-hover"
              >
                {p.cta}
              </Link>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
