"use client";

import Link from "next/link";
import { Badge, Button, ButtonLink, Card, CardTitle, Eyebrow } from "@/components/ui";
import {
  industryLabel,
  outcomeLabel,
  type FinderAnswers,
  type RecommendationResult,
} from "@/lib/solution-finder";

/* ─────────────────────────────────────────────────────────────────────────────
   Solution Finder — step 5 results panel.

   Renders ranked recommendations with transparent reasons, a roadmap adapted
   to the top match, relevant capabilities, related solutions, and only
   genuinely relevant case-study patterns.
   ───────────────────────────────────────────────────────────────────────────── */

export function Results({
  result,
  answers,
}: {
  result: RecommendationResult;
  answers: FinderAnswers;
}) {
  if (result.recommendations.length === 0) {
    return (
      <Card className="text-center">
        <h2 className="font-[var(--font-display)] text-[22px] font-[800] text-ink">
          No recommendation yet
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-7 text-ink-secondary">
          Go back and select an industry, at least one challenge and your desired outcome — we will
          map them to relevant Nexara services.
        </p>
        <Link
          href="/solutions"
          className="mt-5 inline-flex text-[15px] font-[700] text-brand hover:text-brand-hover"
        >
          Or browse all solutions →
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Step 5 — Your recommendations</Eyebrow>
        <h2 className="mt-3 font-[var(--font-display)] text-[26px] font-[800] tracking-[-0.02em] text-ink sm:text-[32px]">
          Solutions matched to your answers
        </h2>
        <p className="mt-3 max-w-[680px] text-[15px] leading-7 text-ink-secondary">
          {result.recommendations.length > 1
            ? `${result.recommendations.length} services address`
            : "One service addresses"}{" "}
          the challenges you chose
          {answers.outcome ? `, in support of ${outcomeLabel(answers.outcome).toLowerCase()}` : ""}.
        </p>
      </div>

      {/* ── Recommendation cards ── */}
      <div className="grid gap-5">
        {result.recommendations.map((r, index) => (
          <Card key={r.service.slug} className="nx-print-break">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-[13px] font-[800] text-brand">
                    {index + 1}
                  </span>
                  <CardTitle>{r.service.title}</CardTitle>
                </div>
                <p className="mt-2 max-w-[620px] text-[15px] leading-7 text-ink-secondary">
                  {r.service.summary}
                </p>
              </div>
              <Badge tone={index === 0 ? "brand" : "neutral"}>
                {index === 0 ? "Best match" : "Also relevant"}
              </Badge>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[12px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
                  Why this matches
                </p>
                <ul className="mt-2 space-y-2">
                  {r.reasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex gap-2 text-[14px] leading-6 text-ink-secondary"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        aria-hidden
                      />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
                  Technology capabilities
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {r.capabilities.map((c) => (
                    <Badge key={c} tone="accent">
                      {c}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/services/${r.service.slug}`}
                  className="mt-4 inline-flex text-[14px] font-[700] text-brand hover:text-brand-hover"
                >
                  View {r.service.title} details →
                </Link>
              </div>
            </div>

            {r.matchedChallenges.length > 0 ? (
              <p className="mt-4 text-[13px] leading-6 text-ink-muted">
                Addresses: {r.matchedChallenges.join(" · ")}
              </p>
            ) : null}
          </Card>
        ))}
      </div>


      {/* ── Suggested roadmap ── */}
      <Card className="nx-print-break">
        <h3 className="font-[var(--font-display)] text-[18px] font-[800] text-ink">
          Suggested implementation phases
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
          Adapted to the recommended solution above. A real engagement plan follows discovery.
        </p>
        <ol className="mt-5 grid gap-3">
          {result.phases.map((phase, i) => (
            <li
              key={phase}
              className="flex gap-3 rounded-xl border border-line bg-surface-alt px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand text-[12px] font-[800] text-white">
                {i + 1}
              </span>
              <span className="text-[15px] leading-6 text-ink-secondary">{phase}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* ── Related solutions + industry considerations ── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {result.solutions.length > 0 ? (
          <Card className="nx-print-break">
            <h3 className="font-[var(--font-display)] text-[18px] font-[800] text-ink">
              Related solutions
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.solutions.map((s) => (
                <Link
                  key={s}
                  href={`/solutions/${s}`}
                  className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-[13px] font-[600] capitalize text-ink-secondary transition hover:border-brand hover:text-brand"
                >
                  {s.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </Card>
        ) : null}

        {result.industryNote ? (
          <Card className="nx-print-break">
            <h3 className="font-[var(--font-display)] text-[18px] font-[800] text-ink">
              {industryLabel(answers.industry)} considerations
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-ink-secondary">{result.industryNote}</p>
          </Card>
        ) : null}
      </div>


      {/* ── Case studies — only relevant, already-published patterns ── */}
      {result.caseStudies.length > 0 ? (
        <Card className="nx-print-break">
          <h3 className="font-[var(--font-display)] text-[18px] font-[800] text-ink">
            Related engagement patterns
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {result.caseStudies.map((c) => (
              <div key={c.id} className="rounded-xl border border-line bg-surface-alt p-4">
                <p className="text-[15px] font-[700] text-ink">{c.title}</p>
                <p className="mt-1 text-[14px] leading-6 text-ink-secondary">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-[600] text-ink-muted"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <Link
                  href={c.href}
                  className="mt-3 inline-flex text-[13px] font-[700] text-brand hover:text-brand-hover"
                >
                  View engagement patterns →
                </Link>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {/* ── Disclaimer ── */}
      <Card className="border-warning-line bg-warning-soft nx-print-break">
        <p className="text-[12px] font-[800] uppercase tracking-[0.12em] text-warning">
          Preliminary guidance
        </p>
        <p className="mt-2 text-[15px] leading-7 text-ink-secondary">{result.disclaimer}</p>
      </Card>

      {/* ── Actions ── */}
      <div className="nx-no-print flex flex-wrap gap-3">
        <PrintButton />
        <ButtonLink href="/solutions" variant="secondary">
          Browse all solutions
        </ButtonLink>
        <ButtonLink href="/contact?type=new-project" variant="primary">
          Request a consultation →
        </ButtonLink>
      </div>
    </div>
  );
}

/** Isolated so Results stays a pure renderer and the print call stays guarded. */
function PrintButton() {
  return (
    <Button variant="secondary" onClick={() => window.print()}>
      Print solution brief
    </Button>
  );
}
