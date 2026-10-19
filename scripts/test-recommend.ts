/** Sanity checks for the Solution Finder recommendation engine. */
import { recommend, canRecommend, emptyResult, type FinderAnswers } from "../src/lib/solution-finder/recommend";
import { caseStudies } from "../src/lib/solution-finder/config";

let failures = 0;

function check(name: string, condition: boolean, detail = "") {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// 1. Empty state
const empty = emptyResult();
check("empty result has no recommendations", empty.recommendations.length === 0);

// 2. Gate requires all three answers
check(
  "canRecommend false without industry",
  !canRecommend({ industry: null, challenges: ["manual-processes"], outcome: "productivity" }),
);
check(
  "canRecommend true with all three",
  canRecommend({ industry: "manufacturing", challenges: ["manual-processes"], outcome: "productivity" }),
);

// 3. Manual processes → enterprise software is the primary match
const manual: FinderAnswers = {
  industry: "manufacturing",
  challenges: ["manual-processes"],
  outcome: "productivity",
};
const r1 = recommend(manual);
check(
  "manual-processes surfaces Enterprise Software",
  r1.recommendations.some((r) => r.service.slug === "enterprise-software"),
  r1.recommendations.map((r) => r.service.slug).join(", "),
);
check("every recommendation has a reason", r1.recommendations.every((r) => r.reasons.length > 0));
check("every recommendation has capabilities", r1.recommendations.every((r) => r.capabilities.length > 0));
check("phases are non-empty", r1.phases.length >= 5, `got ${r1.phases.length}`);
check("industry note is present", Boolean(r1.industryNote));

// 4. Supply chain → SCM, and the roadmap must differ from the manual case
const supply: FinderAnswers = {
  industry: "logistics-supply-chain",
  challenges: ["supply-chain-visibility"],
  outcome: "process-visibility",
};
const r2 = recommend(supply);
check(
  "supply-chain surfaces SCM Development",
  r2.recommendations.some((r) => r.service.slug === "scm-development"),
  r2.recommendations.map((r) => r.service.slug).join(", "),
);
check(
  "roadmap adapts to the recommendation (differs from manual-processes case)",
  r2.phases.join("|") !== r1.phases.join("|"),
);

// 5. Product development → mobile/saas, with a product-specific roadmap
const product: FinderAnswers = {
  industry: "retail-ecommerce",
  challenges: ["product-development"],
  outcome: "new-digital-product",
};
const r3 = recommend(product);
check(
  "product-development surfaces a product engineering service",
  r3.recommendations.some((r) =>
    ["mobile-app-development", "saas-development", "ios-development"].includes(r.service.slug),
  ),
  r3.recommendations.map((r) => r.service.slug).join(", "),
);
check(
  "product roadmap differs from ERP roadmap",
  r3.phases.join("|") !== r2.phases.join("|"),
);

// 6. Multiple challenges combine
const multi: FinderAnswers = {
  industry: "healthcare",
  challenges: ["manual-processes", "disconnected-systems", "data-analytics"],
  outcome: "decision-making",
};
const r4 = recommend(multi);
check("multiple challenges still rank services", r4.recommendations.length > 0);
check(
  "integration surfaces when systems are disconnected",
  r4.recommendations.some((r) => r.service.slug === "cloud-integration"),
  r4.recommendations.map((r) => r.service.slug).join(", "),
);

// 7. Only services that exist as routes are recommended
const VALID = new Set([
  "crm-development", "erp-development", "scm-development", "saas-development",
  "ai-software-development", "mobile-app-development", "ios-development",
  "enterprise-software", "cloud-integration", "bpo", "resource-management",
  "website-development", "web-app-development",
]);
for (const r of [r1, r2, r3, r4]) {
  check(
    "all slugs map to real /services routes",
    r.recommendations.every((x) => VALID.has(x.service.slug)),
  );
  check(
    "all solution slugs are non-empty strings",
    r.solutions.every((s) => typeof s === "string" && s.length > 0),
  );
}

// 8. Case studies are only surfaced when genuinely relevant.
// `caseStudies` on the result are the published CaseStudyRef shape; the
// relevance mapping lives on the config entries, so verify the config instead.
const relevantCaseIds = new Set(
  caseStudies
    .filter((c) => c.linkedServices.some((s) => r1.recommendations.some((x) => x.service.slug === s)))
    .map((c) => c.id),
);
check(
  "case studies surfaced are exactly the relevant ones",
  r1.caseStudies.length === relevantCaseIds.size &&
    r1.caseStudies.every((c) => relevantCaseIds.has(c.id)),
);

// 9. Optional context never blocks results
const noContext: FinderAnswers = {
  industry: "education",
  challenges: ["ai-automation"],
  outcome: "productivity",
};
const r5 = recommend(noContext);
check("results render without optional context", r5.recommendations.length > 0);

// 10. Web product development surfaces a web build service
const webBuild: FinderAnswers = {
  industry: "professional-services",
  challenges: ["product-development"],
  outcome: "productivity",
};
const r6 = recommend(webBuild);
check(
  "product-development surfaces website / web-app services",
  r6.recommendations.some((r) => ["website-development", "web-app-development"].includes(r.service.slug)),
  r6.recommendations.map((r) => r.service.slug).join(", "),
);
for (const r of [r6]) {
  check(
    "web-build slugs map to real /services routes",
    r.recommendations.every((x) => VALID.has(x.service.slug)),
  );
}

console.log(failures === 0 ? "\nAll recommendation engine checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
