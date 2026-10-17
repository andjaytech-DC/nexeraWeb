"use client";

import { useCallback, useMemo, useState } from "react";
import { Button, Container, Section } from "@/components/ui";
import {
  challengeLabel,
  emptyResult,
  industryLabel,
  outcomeLabel,
  recommend,
  type Budget,
  type ChallengeId,
  type CompanySize,
  type FinderAnswers,
  type IndustryId,
  type OutcomeId,
} from "@/lib/solution-finder";
import {
  ChallengeStep,
  ContextStep,
  IndustryStep,
  OutcomeStep,
  type StepHandlers,
  type StepState,
} from "./steps";
import { Results } from "./Results";
import { ConsultationPanel } from "./ConsultationPanel";
import { ProgressBar, type StepMeta } from "./ProgressBar";

/* ─────────────────────────────────────────────────────────────────────────────
   Business Solution Finder — guided multi-step experience.

   Accessibility:
   • question steps are <fieldset>/<legend> groups of real radio/checkbox
     inputs, so the flow is fully keyboard operable
   • progress exposed via role="progressbar" with aria-valuetext, plus an
     aria-live region announcing the current step
   • inline validation surfaced through role="alert"
   • selections persist across Back / Continue / Start over
   ───────────────────────────────────────────────────────────────────────────── */

const TOTAL_STEPS = 6;

const STEP_META: StepMeta[] = [
  { label: "Industry", short: "Industry" },
  { label: "Business challenge", short: "Challenges" },
  { label: "Desired outcome", short: "Outcome" },
  { label: "Company context", short: "Context" },
  { label: "Recommendations", short: "Results" },
  { label: "Consultation", short: "Consult" },
];

export default function SolutionFinderClient() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [selected, setSelected] = useState<ChallengeId[]>([]);
  const [outcome, setOutcome] = useState<OutcomeId | null>(null);
  const [companySize, setCompanySize] = useState<CompanySize | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [error, setError] = useState<string | null>(null);

  const state: StepState = { industry, selected, outcome, companySize, urgency, budget };

  const answers: FinderAnswers = useMemo(
    () => ({ industry, challenges: selected, outcome, companySize, urgency, budget }),
    [industry, selected, outcome, companySize, urgency, budget],
  );

  const hasRequired = Boolean(industry) && selected.length > 0 && Boolean(outcome);

  const result = useMemo(
    () => (hasRequired ? recommend(answers) : emptyResult()),
    // Answers is derived from the primitives below; listing them is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasRequired, industry, outcome, selected, companySize, urgency, budget],
  );

  const reset = useCallback(() => {
    setStep(1);
    setIndustry(null);
    setSelected([]);
    setOutcome(null);
    setCompanySize(null);
    setUrgency(null);
    setBudget(null);
    setError(null);
  }, []);

  const toggleChallenge = useCallback((id: ChallengeId) => {
    setError(null);
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }, []);

  const handlers: StepHandlers = useMemo(
    () => ({
      setIndustry: (id) => {
        setError(null);
        setIndustry(id);
      },
      toggleChallenge,
      setOutcome: (id) => {
        setError(null);
        setOutcome(id);
      },
      setCompanySize,
      setUrgency,
      setBudget,
    }),
    [toggleChallenge],
  );

  function validate(current: number): string | null {
    if (current === 1 && !industry) return "Select your industry to continue.";
    if (current === 2 && selected.length === 0) return "Select at least one business challenge.";
    if (current === 3 && !outcome) return "Choose the outcome that matters most.";
    return null;
  }

  function next() {
    const problem = validate(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  /**
   * Consultation deep-link into the existing contact route, carrying the
   * user's selections. The contact form has no server-side backend today, so
   * nothing here claims a request has been sent.
   */
  const consultHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("type", "new-project");
    params.set("source", "solution-finder");
    if (industry) params.set("industry", industry);
    if (outcome) params.set("goal", outcome);
    selected.forEach((c) => params.append("challenge", c));
    const top = result.recommendations[0]?.service.slug;
    if (top) params.set("solution", top);
    return `/contact?${params.toString()}`;
  }, [industry, outcome, selected, result.recommendations]);

  return (
    <div className="bg-canvas">
      <ProgressBar step={step} totalSteps={TOTAL_STEPS} steps={STEP_META} />

      <Section tone="canvas" size="sm">
        <Container width="narrow">
          {step === 1 && <IndustryStep state={state} handlers={handlers} />}
          {step === 2 && <ChallengeStep state={state} handlers={handlers} />}
          {step === 3 && <OutcomeStep state={state} handlers={handlers} />}
          {step === 4 && <ContextStep state={state} handlers={handlers} />}
          {step === 5 && <Results result={result} answers={answers} />}
          {step === 6 && (
            <ConsultationPanel
              summary={{
                industry: industryLabel(industry),
                goal: outcomeLabel(outcome),
                challenges: selected.map((c) => challengeLabel(c)).join(", "),
                direction: result.recommendations[0]?.service.title ?? "",
              }}
              consultHref={consultHref}
              onBackToResults={() => setStep(5)}
            />
          )}

          {/* Inline validation */}
          {error ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-danger-line bg-danger-soft px-4 py-3 text-[14px] font-[600] text-danger"
            >
              {error}
            </p>
          ) : null}

          {/* Navigation */}
          <div className="nx-no-print mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <Button variant="ghost" onClick={back} disabled={step === 1}>
              ← Back
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={reset}>
                Start over
              </Button>
              {step < TOTAL_STEPS ? (
                <Button variant="primary" onClick={next}>
                  Continue →
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

