import Link from "next/link";
import { Container, Section, SectionHeading, FeatureCard } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — delivery methodology.

   Rendered as a horizontal numbered rail, a different shape from the card
   and list patterns used elsewhere.
   ─────────────────────────────────────────────────────────────────────────── */

const PHASES = [
  {
    n: "01",
    title: "Discover",
    desc: "Process, constraints, data and success measures — before any technology is proposed.",
  },
  {
    n: "02",
    title: "Define",
    desc: "Scope, architecture and delivery plan, with trade-offs explained so you can decide.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Data model, integration approach and interface design, reviewed with your team.",
  },
  {
    n: "04",
    title: "Build",
    desc: "Incremental delivery in transparent sprints, against your real data.",
  },
  {
    n: "05",
    title: "Launch",
    desc: "Testing, migration, training and a phased go-live with a rollback plan.",
  },
  {
    n: "06",
    title: "Evolve",
    desc: "Observability, documentation, optimisation and long-term support.",
  },
];

export function ProcessSection() {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeading
          eyebrow="How we deliver"
          title="A methodology built for real businesses"
          description="Transparent sprints, architecture reviews and documentation — so the system your team inherits is one they can actually operate."
          align="center"
          className="mx-auto"
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((p) => (
            <FeatureCard key={p.n} tone="surface">
              <span className="font-[var(--font-display)] text-[13px] font-[800] tracking-[0.1em] text-brand">
                {p.n}
              </span>
              <h3 className="mt-2 font-[var(--font-display)] text-[19px] font-[800] tracking-[-0.015em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-ink-secondary">{p.desc}</p>
            </FeatureCard>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[15px] font-[700] text-white transition hover:bg-navy-soft"
          >
            Read the full process →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
