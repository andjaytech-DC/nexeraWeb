import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — technology capabilities.

   Presented as a compact capability map rather than a grid of equal cards,
   so it reads as a stack overview instead of repeating the services rhythm.
   ─────────────────────────────────────────────────────────────────────────── */

const LAYERS = [
  {
    layer: "Frontend",
    detail: "Interfaces that are fast, accessible and maintainable.",
    items: ["React", "Next.js", "Angular", "Vue", "TypeScript"],
  },
  {
    layer: "Backend & APIs",
    detail: "Services and APIs that scale and evolve.",
    items: ["Node.js", "NestJS", "Python", "Java", ".NET"],
  },
  {
    layer: "Mobile",
    detail: "Customer, field and enterprise mobile.",
    items: ["Android / Kotlin", "iOS / Swift", "Flutter", "React Native"],
  },
  {
    layer: "AI & data",
    detail: "Intelligence grounded in workflows and governed data.",
    items: ["Machine learning", "Generative AI", "LLM integration", "Data analytics"],
  },
  {
    layer: "Data & cloud",
    detail: "Reliable data, and cloud that is observable and cost-aware.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS", "Azure"],
  },
  {
    layer: "Integration & DevOps",
    detail: "Systems that share data, and pipelines that ship safely.",
    items: ["REST & GraphQL", "Event-driven", "Docker", "Kubernetes", "CI/CD"],
  },
];

export function CapabilitiesSection() {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Technology"
              title="Built with the right technology"
              description="We select technology based on your requirements, scale and maintainability — not trends. Only technologies we genuinely support are shown."
            />
            <p className="mt-5 text-[14px] leading-6 text-ink-muted">
              This reflects actual delivery capability — not simply the stack used to build this
              website.
            </p>
            <Link
              href="/technologies"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-[700] text-ink transition hover:border-brand hover:text-brand"
            >
              Full technology stack →
            </Link>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {LAYERS.map((l) => (
              <li key={l.layer} className="grid gap-2 py-5 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
                <div>
                  <h3 className="text-[15px] font-[700] text-ink">{l.layer}</h3>
                  <p className="mt-1 text-[14px] leading-6 text-ink-secondary">{l.detail}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-1.5">
                  {l.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-[13px] font-[600] text-ink-secondary"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
