"use client";

import { OptionCard } from "./OptionCard";
import { budgets, challenges, companySizes, industries, outcomes, urgencies } from "@/lib/solution-finder";
import type {
  Budget,
  ChallengeId,
  CompanySize,
  IndustryId,
  OutcomeId,
} from "@/lib/solution-finder";

/* ─────────────────────────────────────────────────────────────────────────────
   Solution Finder — question steps 1–4.

   Each question group is a <fieldset>/<legend> so its purpose is announced by
   assistive technology, and every choice is a real radio/checkbox input (see
   OptionCard) so the whole flow is keyboard operable.
   ───────────────────────────────────────────────────────────────────────────── */

export interface StepState {
  industry: IndustryId | null;
  selected: ChallengeId[];
  outcome: OutcomeId | null;
  companySize: CompanySize | null;
  urgency: string | null;
  budget: Budget | null;
}

export interface StepHandlers {
  setIndustry: (id: IndustryId) => void;
  toggleChallenge: (id: ChallengeId) => void;
  setOutcome: (id: OutcomeId) => void;
  setCompanySize: (id: CompanySize) => void;
  setUrgency: (id: string) => void;
  setBudget: (id: Budget) => void;
}

/** Shared heading style for step legends and the optional-step title. */
const STEP_TITLE =
  "font-[var(--font-display)] text-[24px] font-[800] tracking-[-0.02em] text-ink sm:text-[28px]";

export function IndustryStep({ state, handlers }: { state: StepState; handlers: StepHandlers }) {
  return (
    <fieldset>
      <legend className={STEP_TITLE}>Which industry are you in?</legend>
      <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
        This helps us point to the solution patterns that fit your operating context.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {industries.map((i) => (
          <OptionCard
            key={i.id}
            type="radio"
            name="industry"
            value={i.id}
            label={i.label}
            hint={i.hint}
            checked={state.industry === i.id}
            onChange={() => handlers.setIndustry(i.id as IndustryId)}
            describedById={`industry-hint-${i.id}`}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function ChallengeStep({ state, handlers }: { state: StepState; handlers: StepHandlers }) {
  return (
    <fieldset>
      <legend className={STEP_TITLE}>What challenges are you facing?</legend>
      <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
        Select everything that applies. More than one is fine — recommendations combine them.
      </p>
      <div className="mt-6 grid gap-3">
        {challenges.map((c) => (
          <OptionCard
            key={c.id}
            type="checkbox"
            name="challenge"
            value={c.id}
            label={c.label}
            hint={c.hint}
            checked={state.selected.includes(c.id as ChallengeId)}
            onChange={() => handlers.toggleChallenge(c.id as ChallengeId)}
            describedById={`challenge-hint-${c.id}`}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function OutcomeStep({ state, handlers }: { state: StepState; handlers: StepHandlers }) {
  return (
    <fieldset>
      <legend className={STEP_TITLE}>What outcome matters most?</legend>
      <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
        Pick the single result you would judge this work on.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {outcomes.map((o) => (
          <OptionCard
            key={o.id}
            type="radio"
            name="outcome"
            value={o.id}
            label={o.label}
            checked={state.outcome === o.id}
            onChange={() => handlers.setOutcome(o.id as OutcomeId)}
          />
        ))}
      </div>
    </fieldset>
  );
}


/** Step 4 — optional company context. Nothing here blocks the results. */
export function ContextStep({ state, handlers }: { state: StepState; handlers: StepHandlers }) {
  return (
    <div>
      <h2 className={STEP_TITLE}>Tell us a little about your company</h2>
      <p className="mt-2 text-[15px] leading-7 text-ink-secondary">
        All optional. Your recommendations are already ready — this only helps shape the
        conversation.
      </p>
      <div className="mt-6 space-y-7">
        <fieldset>
          <legend className="text-[13px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
            Company size
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {companySizes.map((s) => (
              <OptionCard
                key={s.id}
                type="radio"
                name="companySize"
                value={s.id}
                label={s.label}
                checked={state.companySize === s.id}
                onChange={() => handlers.setCompanySize(s.id as CompanySize)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[13px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
            Project urgency
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {urgencies.map((u) => (
              <OptionCard
                key={u.id}
                type="radio"
                name="urgency"
                value={u.id}
                label={u.label}
                checked={state.urgency === u.id}
                onChange={() => handlers.setUrgency(u.id)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[13px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
            Approximate budget range
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {budgets.map((b) => (
              <OptionCard
                key={b.id}
                type="radio"
                name="budget"
                value={b.id}
                label={b.label}
                checked={state.budget === b.id}
                onChange={() => handlers.setBudget(b.id as Budget)}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
