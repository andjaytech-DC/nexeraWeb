import {
  challenges as challengeChoices,
  caseStudies,
  defaultPhases,
  DISCLAIMER,
  industryNotes,
  industries as industryChoices,
  outcomeEmphasis,
  outcomes as outcomeChoices,
  phaseSets,
  rules,
  serviceCatalog,
  type CaseStudyRef,
  type ChallengeId,
  type CompanySize,
  type IndustryId,
  type OutcomeId,
  type ServiceDef,
} from "./config";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Solution Finder â€” recommendation engine

   Pure functions: no React, no I/O. Deterministic, so the same answers always
   produce the same recommendations and the logic is straightforward to test.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface FinderAnswers {
  industry: IndustryId | null;
  challenges: ChallengeId[];
  outcome: OutcomeId | null;
  /** Optional context â€” never required to see results. */
  companySize?: CompanySize | null;
  urgency?: string | null;
  budget?: string | null;
}

export interface Recommendation {
  service: ServiceDef;
  /** Matched challenge labels, in the order the user selected them. */
  matchedChallenges: string[];
  /** Plain-language explanation of why this service was recommended. */
  reasons: string[];
  /** Related solution slugs to link to. */
  solutions: string[];
  /** Technology capabilities for this service. */
  capabilities: string[];
}

export interface RecommendationResult {
  recommendations: Recommendation[];
  /** Implementation phases, adapted to the top recommendation. */
  phases: string[];
  /** Aggregated, de-duplicated technology capabilities. */
  capabilities: string[];
  /** Related solution slugs across all recommendations. */
  solutions: string[];
  /** Case studies relevant to the recommended services. */
  caseStudies: CaseStudyRef[];
  /** Industry-specific note, when an industry was selected. */
  industryNote: string | null;
  disclaimer: string;
}

/** Generic label lookup for rendering summaries. */
export function labelFor<T extends string>(
  choices: Array<{ id: string; label: string }>,
  id: T | null,
): string {
  if (!id) return "";
  return choices.find((c) => c.id === id)?.label ?? "";
}

export function challengeLabel(id: ChallengeId): string {
  return labelFor(challengeChoices, id);
}

export function industryLabel(id: IndustryId | null): string {
  return labelFor(industryChoices, id);
}

export function outcomeLabel(id: OutcomeId | null): string {
  return labelFor(outcomeChoices, id);
}

/**
 * True when the user has made the selections needed for a recommendation:
 * an industry, at least one challenge, and a desired outcome.
 */
export function canRecommend(answers: FinderAnswers): boolean {
  return Boolean(answers.industry) && answers.challenges.length > 0 && Boolean(answers.outcome);
}

/**
 * Scores every service and returns ranked, de-duplicated recommendations.
 *
 * Scoring:
 *   +3  service is the primary match for a selected challenge
 *   +2  service is a secondary match for a selected challenge
 *   +1  per additional selected challenge it addresses
 *   +2  service is emphasised by the selected outcome
 *   +2  rule targets the selected industry (+1 for its secondary services)
 */
export function recommend(answers: FinderAnswers): RecommendationResult {
  const scores = new Map<string, number>();
  const reasons = new Map<string, Set<string>>();
  const matched = new Map<string, Set<string>>();

  const bump = (slug: string, points: number) => {
    scores.set(slug, (scores.get(slug) ?? 0) + points);
  };

  for (const rule of rules) {
    if (!answers.challenges.includes(rule.challenge)) continue;

    rule.services.forEach((slug, index) => {
      bump(slug, index === 0 ? 3 : 2);
      bump(slug, 1); // addresses an additional selected challenge
      if (!reasons.has(slug)) reasons.set(slug, new Set());
      reasons.get(slug)!.add(rule.reason);
      if (!matched.has(slug)) matched.set(slug, new Set());
      matched.get(slug)!.add(challengeLabel(rule.challenge));
    });

    // Industry relevance bonus
    if (answers.industry && rule.industries?.includes(answers.industry)) {
      rule.services.forEach((slug, index) => bump(slug, index === 0 ? 2 : 1));
    }
  }

  // Outcome emphasis
  if (answers.outcome) {
    for (const slug of outcomeEmphasis[answers.outcome] ?? []) {
      if (scores.has(slug)) {
        bump(slug, 2);
        reasons.get(slug)!.add(
          `This directly supports your goal to ${outcomeLabel(answers.outcome).toLowerCase()}.`,
        );
      }
    }
  }

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .filter(([, score]) => score > 0)
    .slice(0, 4)
    .map(([slug]) => slug)
    .filter((slug) => serviceCatalog[slug]);

  const recommendations: Recommendation[] = ranked.map((slug) => ({
    service: serviceCatalog[slug],
    matchedChallenges: [...(matched.get(slug) ?? [])],
    reasons: [...(reasons.get(slug) ?? [])],
    solutions: serviceCatalog[slug].solutions,
    capabilities: serviceCatalog[slug].capabilities,
  }));

  // Phases come from the highest-ranked matching set, so the roadmap adapts.
  const topSlugs = recommendations.map((r) => r.service.slug);
  const phaseSet = phaseSets.find((p) => p.services.some((s) => topSlugs.includes(s)));

  const capabilitySet = new Set<string>();
  for (const r of recommendations) r.capabilities.forEach((c) => capabilitySet.add(c));

  const solutionSet = new Set<string>();
  for (const r of recommendations) r.solutions.forEach((s) => solutionSet.add(s));

  const relevantCases = caseStudies.filter((c) => c.linkedServices.some((s) => topSlugs.includes(s)));

  return {
    recommendations,
    phases: phaseSet?.phases ?? defaultPhases,
    capabilities: [...capabilitySet],
    solutions: [...solutionSet],
    caseStudies: relevantCases,
    industryNote: answers.industry ? (industryNotes[answers.industry] ?? null) : null,
    disclaimer: DISCLAIMER,
  };
}

/** Empty result â€” used for the empty state before any selection is made. */
export function emptyResult(): RecommendationResult {
  return {
    recommendations: [],
    phases: [],
    capabilities: [],
    solutions: [],
    caseStudies: [],
    industryNote: null,
    disclaimer: DISCLAIMER,
  };
}
