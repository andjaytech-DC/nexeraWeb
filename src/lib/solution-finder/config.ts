/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Business Solution Finder â€” rules configuration

   A transparent, deterministic rules engine. No AI service and no network
   calls: each selected challenge maps to real Nexara services, and the
   recommended services contribute phases, capabilities and case studies.

   To change a recommendation, edit this file only. Every `service` slug must
   match an existing route in `src/app/services/`, and every `solution` slug a
   route in `src/app/solutions/`.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export type IndustryId =
  | "financial-services"
  | "healthcare"
  | "retail-ecommerce"
  | "manufacturing"
  | "logistics-supply-chain"
  | "education"
  | "professional-services"
  | "other";

export type ChallengeId =
  | "manual-processes"
  | "disconnected-systems"
  | "customer-relationship"
  | "supply-chain-visibility"
  | "erp-modernization"
  | "data-analytics"
  | "ai-automation"
  | "product-development"
  | "staffing-bpo"
  | "other";

export type OutcomeId =
  | "productivity"
  | "customer-experience"
  | "connect-systems"
  | "process-visibility"
  | "modernize-legacy"
  | "new-digital-product"
  | "decision-making"
  | "scale-operations";

export type CompanySize = "1-50" | "51-200" | "201-1000" | "1000+";
export type Urgency = "exploring" | "planning" | "urgent";
export type Budget = "under-5l" | "5l-15l" | "15l-50l" | "50l-plus" | "not-sure";

export interface Choice {
  id: string;
  label: string;
  /** Optional helper line shown under the label. */
  hint?: string;
}

/* â”€â”€ Step 1: industries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const industries: Choice[] = [
  { id: "financial-services", label: "Financial services", hint: "Banking, lending, insurance, fintech" },
  { id: "healthcare", label: "Healthcare", hint: "Providers, diagnostics, health tech" },
  { id: "retail-ecommerce", label: "Retail and e-commerce", hint: "Online, omnichannel, marketplaces" },
  { id: "manufacturing", label: "Manufacturing", hint: "Discrete and process manufacturing" },
  { id: "logistics-supply-chain", label: "Logistics and supply chain", hint: "Warehousing, distribution, freight" },
  { id: "education", label: "Education", hint: "Institutions, edtech, training" },
  { id: "professional-services", label: "Professional services", hint: "Consulting, legal, accounting" },
  { id: "other", label: "Other", hint: "Public sector, media, energy and more" },
];

/* â”€â”€ Step 2: challenges (multi-select) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const challenges: Choice[] = [
  { id: "manual-processes", label: "Manual processes and operational inefficiency", hint: "Spreadsheets, approvals and repetitive work" },
  { id: "disconnected-systems", label: "Disconnected business systems", hint: "Data trapped in silos, duplicate entry" },
  { id: "customer-relationship", label: "Customer relationship and sales management", hint: "No single customer view, lost follow-ups" },
  { id: "supply-chain-visibility", label: "Supply chain visibility", hint: "Inventory, procurement and shipment tracking" },
  { id: "erp-modernization", label: "ERP and enterprise process modernization", hint: "Legacy ERP that no longer fits" },
  { id: "data-analytics", label: "Data analytics and reporting", hint: "Reporting is slow or untrusted" },
  { id: "ai-automation", label: "AI adoption and intelligent automation", hint: "Document processing, assistants, agents" },
  { id: "product-development", label: "Mobile or web product development", hint: "A new digital product or platform" },
  { id: "staffing-bpo", label: "Staffing and business process outsourcing", hint: "Extra engineering capacity or a managed process" },
  { id: "other", label: "Other business challenges", hint: "Something not listed above" },
];

/* â”€â”€ Step 3: outcomes (single select) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const outcomes: Choice[] = [
  { id: "productivity", label: "Improve productivity" },
  { id: "customer-experience", label: "Improve customer experience" },
  { id: "connect-systems", label: "Connect business systems" },
  { id: "process-visibility", label: "Increase process visibility" },
  { id: "modernize-legacy", label: "Modernize legacy software" },
  { id: "new-digital-product", label: "Launch a new digital product" },
  { id: "decision-making", label: "Improve decision-making" },
  { id: "scale-operations", label: "Scale operations" },
];

/* â”€â”€ Step 4: optional company context â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const companySizes: Choice[] = [
  { id: "1-50", label: "1â€“50 people" },
  { id: "51-200", label: "51â€“200 people" },
  { id: "201-1000", label: "201â€“1,000 people" },
  { id: "1000+", label: "1,000+ people" },
];

export const urgencies: Choice[] = [
  { id: "exploring", label: "Exploring options" },
  { id: "planning", label: "Planning within a few months" },
  { id: "urgent", label: "Urgent â€” needed now" },
];

export const budgets: Choice[] = [
  { id: "under-5l", label: "Under â‚¹5L" },
  { id: "5l-15l", label: "â‚¹5L â€“ â‚¹15L" },
  { id: "15l-50l", label: "â‚¹15L â€“ â‚¹50L" },
  { id: "50l-plus", label: "â‚¹50L+" },
  { id: "not-sure", label: "Not sure yet" },
];


/* â”€â”€ Service catalogue referenced by the rules â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface ServiceDef {
  slug: string;
  title: string;
  short: string;
  /** Why this service exists, in business language. */
  summary: string;
  /** Technology capabilities Nexara actually supports for this service. */
  capabilities: string[];
  /** Related solution slugs (must exist in src/app/solutions). */
  solutions: string[];
}

export const serviceCatalog: Record<string, ServiceDef> = {
  "enterprise-software": {
    slug: "enterprise-software",
    title: "Enterprise Software",
    short: "Large-scale business applications and operational platforms.",
    summary:
      "Purpose-built operational platforms that encode your process, roles and controls â€” rather than forcing teams into generic tools.",
    capabilities: [
      "Workflow and approvals engine",
      "Role-based access and audit trails",
      "Dashboards and reporting",
      "Integration with existing systems",
    ],
    solutions: ["enterprise-technology", "business-process-transformation"],
  },
  "crm-development": {
    slug: "crm-development",
    title: "CRM Development",
    short: "Custom CRM platforms for sales, customer management and service.",
    summary:
      "A CRM tailored to how your teams sell, serve and retain â€” with a single view of the customer and no lost follow-ups.",
    capabilities: [
      "Lead, account and opportunity management",
      "Sales pipeline and forecasting",
      "Customer service and ticketing",
      "Email, telephony and marketing integration",
    ],
    solutions: ["enterprise-technology", "digital-platforms"],
  },
  "erp-development": {
    slug: "erp-development",
    title: "ERP Development",
    short: "Integrated systems connecting finance, HR, inventory and operations.",
    summary:
      "One operational backbone connecting finance, procurement, inventory and HR â€” with the controls your auditors expect.",
    capabilities: [
      "Finance and procurement workflows",
      "Inventory and warehouse management",
      "HR and payroll integration",
      "Approvals, controls and audit trails",
    ],
    solutions: ["enterprise-technology", "business-process-transformation"],
  },
  "scm-development": {
    slug: "scm-development",
    title: "SCM Development",
    short: "Inventory, procurement, logistics and supply-chain visibility.",
    summary:
      "End-to-end supply-chain visibility â€” from purchase order to warehouse to delivery â€” so exceptions surface early.",
    capabilities: [
      "Inventory and stock visibility",
      "Procurement and vendor management",
      "Logistics and shipment tracking",
      "Demand planning and replenishment",
    ],
    solutions: ["enterprise-technology", "intelligent-automation"],
  },
  "saas-development": {
    slug: "saas-development",
    title: "SaaS Development",
    short: "End-to-end SaaS product engineering from architecture to production.",
    summary:
      "Multi-tenant, subscription-ready platforms engineered for growth â€” architecture, billing, isolation and scale.",
    capabilities: [
      "Multi-tenant architecture and isolation",
      "Subscription and billing",
      "User management and APIs",
      "Cloud deployment and observability",
    ],
    solutions: ["digital-platforms", "product-engineering"],
  },
  "ai-software-development": {
    slug: "ai-software-development",
    title: "AI Software Development",
    short: "AI-powered applications, assistants, automation and data solutions.",
    summary:
      "Practical AI built into real workflows â€” document intelligence, assistants and decision support, with governance.",
    capabilities: [
      "Generative AI and LLM integration",
      "Document intelligence and extraction",
      "AI assistants with human-in-the-loop",
      "Retrieval and knowledge systems",
    ],
    solutions: ["ai-powered-software", "intelligent-automation"],
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short: "Android, cross-platform and enterprise mobile applications.",
    summary:
      "Customer, field and workforce mobile apps that work offline, sync reliably and integrate with your systems.",
    capabilities: [
      "Android and cross-platform apps",
      "Offline-first and background sync",
      "Push notifications and device features",
      "API integration and release pipelines",
    ],
    solutions: ["product-engineering", "digital-platforms"],
  },
  "ios-development": {
    slug: "ios-development",
    title: "iOS Development",
    short: "Native and cross-platform iPhone and iPad applications.",
    summary:
      "Native iOS experiences built to Apple's platform conventions, with the same backend discipline as our web work.",
    capabilities: [
      "Native Swift and SwiftUI",
      "App Store submission and review",
      "Secure storage and biometrics",
      "Cross-platform sharing with React Native",
    ],
    solutions: ["product-engineering"],
  },
  "cloud-integration": {
    slug: "cloud-integration",
    title: "Cloud & Integration",
    short: "Cloud modernization, APIs, integrations and distributed systems.",
    summary:
      "Connect the systems you already run â€” APIs, events and data flows â€” so information moves without manual re-entry.",
    capabilities: [
      "REST and GraphQL APIs",
      "Event-driven and async integration",
      "Legacy system bridging",
      "Cloud deployment on AWS / Azure",
    ],
    solutions: ["system-integration", "digital-transformation"],
  },
  bpo: {
    slug: "bpo",
    title: "BPO Services",
    short: "Technology-enabled business process outsourcing.",
    summary:
      "Managed operations supported by tooling we build and run â€” with measurable quality and clear handoffs.",
    capabilities: [
      "Process design and documentation",
      "Technology-enabled operations",
      "Quality monitoring and reporting",
      "Managed team scaling",
    ],
    solutions: ["business-process-transformation", "intelligent-automation"],
  },
  "resource-management": {
    slug: "resource-management",
    title: "Resource Management",
    short: "Dedicated developers, engineers and technology teams on demand.",
    summary:
      "Dedicated engineers who work inside your process and rituals â€” capacity without a long hiring cycle.",
    capabilities: [
      "Dedicated developers and engineers",
      "Embedded in your sprints and rituals",
      "Architecture and code review",
      "Flexible ramp-up and ramp-down",
    ],
    solutions: ["product-engineering"],
  },
};

/* â”€â”€ The rules â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface Rule {
  /** Challenge this rule responds to. */
  challenge: ChallengeId;
  /** Services surfaced, in priority order. */
  services: string[];
  /** Plain-language reason shown to the user. */
  reason: string;
  /** Industries where this rule carries extra weight. */
  industries?: IndustryId[];
}

export const rules: Rule[] = [
  {
    challenge: "manual-processes",
    services: ["enterprise-software", "ai-software-development", "bpo"],
    reason:
      "Manual handoffs and repetitive work are best addressed by encoding the process in software, then automating the parts that are genuinely rule-based.",
  },
  {
    challenge: "disconnected-systems",
    services: ["cloud-integration", "enterprise-software", "scm-development"],
    reason:
      "Disconnected systems are usually an integration problem before they are a replacement problem â€” an API and event layer often removes duplicate entry without a rewrite.",
  },
  {
    challenge: "customer-relationship",
    services: ["crm-development", "ai-software-development", "cloud-integration"],
    reason:
      "A single customer view with enforced follow-up is what turns scattered interactions into a pipeline you can forecast.",
  },
  {
    challenge: "supply-chain-visibility",
    services: ["scm-development", "erp-development", "cloud-integration"],
    reason:
      "Supply-chain visibility needs inventory, procurement and logistics data unified, with exceptions raised rather than discovered.",
  },
  {
    challenge: "erp-modernization",
    services: ["erp-development", "cloud-integration", "enterprise-software"],
    reason:
      "ERP modernization succeeds when scope, data and adoption are planned together â€” phased replacement instead of a risky big-bang cutover.",
    industries: ["manufacturing", "retail-ecommerce", "logistics-supply-chain"],
  },
  {
    challenge: "data-analytics",
    services: ["ai-software-development", "cloud-integration", "enterprise-software"],
    reason:
      "Reporting problems are usually data-model problems. Fixing the source of truth matters more than adding another dashboard.",
  },
  {
    challenge: "ai-automation",
    services: ["ai-software-development", "enterprise-software", "bpo"],
    reason:
      "AI pays back fastest on high-volume, pattern-based work â€” with a human in the loop until accuracy is proven.",
  },
  {
    challenge: "product-development",
    services: ["mobile-app-development", "saas-development", "ios-development"],
    reason:
      "A new product needs architecture, scope and release discipline from the start â€” that is where most builds succeed or stall.",
  },
  {
    challenge: "staffing-bpo",
    services: ["resource-management", "bpo", "enterprise-software"],
    reason:
      "Capacity problems can be solved with dedicated engineers, a managed process, or both â€” depending on how stable the work is.",
  },
  {
    challenge: "other",
    services: ["enterprise-software", "cloud-integration", "ai-software-development"],
    reason:
      "For challenges outside these categories, a short discovery conversation is the fastest way to identify where technology creates leverage.",
  },
];

/* â”€â”€ Outcome emphasis â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

/** Outcomes nudge which services rank highest. */
export const outcomeEmphasis: Record<OutcomeId, string[]> = {
  productivity: ["enterprise-software", "ai-software-development"],
  "customer-experience": ["crm-development", "mobile-app-development"],
  "connect-systems": ["cloud-integration"],
  "process-visibility": ["erp-development", "scm-development"],
  "modernize-legacy": ["cloud-integration", "erp-development"],
  "new-digital-product": ["saas-development", "mobile-app-development"],
  "decision-making": ["ai-software-development", "cloud-integration"],
  "scale-operations": ["resource-management", "bpo", "saas-development"],
};

/* â”€â”€ Implementation phases â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface PhaseSet {
  /** Services this phase set applies to. */
  services: string[];
  phases: string[];
}

export const phaseSets: PhaseSet[] = [
  {
    // ERP / SCM work is dominated by data continuity and a phased cutover.
    services: ["erp-development", "scm-development"],
    phases: [
      "Operations discovery - process mapping across finance, inventory and procurement",
      "Data readiness - sources, quality, migration and reconciliation strategy",
      "Solution architecture - data model, controls and integration plan",
      "Implementation - build and migrate in increments, not a big-bang cutover",
      "Testing, cutover and support - parallel run, training, then phased switch",
    ],
  },
  {
    services: ["crm-development"],
    phases: [
      "Sales and service discovery - how your teams actually sell, serve and retain",
      "Data model and permissions - accounts, contacts, opportunities and roles",
      "Build and integration - connect email, telephony, ERP and support tooling",
      "Adoption and migration - move existing data and train the teams who use it",
      "Optimization - pipeline visibility, automation and reporting",
    ],
  },
  {
    services: ["enterprise-software"],
    phases: [
      "Process discovery - map the workflow, roles and approvals to encode",
      "Solution architecture - workflow engine, data model and controls",
      "Implementation - deliver the highest-friction workflow first",
      "Testing and rollout - UAT with the teams who own the process",
      "Extension and support - add adjacent processes, monitor adoption",
    ],
  },
  {
    services: ["ai-software-development"],
    phases: [
      "Use-case selection â€” rank candidates by volume, value and risk",
      "Data and evaluation readiness â€” sources, quality and success criteria",
      "Prototype and pilot â€” human-in-the-loop on a contained workflow",
      "Production integration â€” guardrails, monitoring and fallbacks",
      "Optimization and support â€” measure accuracy, expand scope",
    ],
  },
  {
    services: ["mobile-app-development", "ios-development", "saas-development"],
    phases: [
      "Product discovery â€” users, journeys and success measures",
      "Architecture and MVP â€” a thin slice that ships and gets used",
      "Build and integration â€” APIs, offline behaviour, release pipeline",
      "Testing and launch â€” device and load testing, store submission",
      "Iteration and growth â€” analytics, retention, feature depth",
    ],
  },
  {
    services: ["cloud-integration"],
    phases: [
      "Systems assessment â€” inventory, contracts, data flows and constraints",
      "Integration architecture â€” API strategy, events and data model",
      "Implementation â€” build, bridge legacy, migrate incrementally",
      "Testing and cutover â€” reconciliation, rollback plan, phased switch",
      "Operations and observability â€” monitoring, security, cost control",
    ],
  },
  {
    services: ["resource-management", "bpo"],
    phases: [
      "Capability definition â€” skills, process scope and success measures",
      "Team assembly and onboarding â€” ramp up into your rituals",
      "Delivery and review â€” sprints, architecture review, quality checks",
      "Scale and adjust â€” change the mix as priorities shift",
      "Ongoing support â€” continuity, documentation and handover readiness",
    ],
  },
];

/** Fallback when no phase set matches. */
export const defaultPhases: string[] = [
  "Discovery and requirements",
  "Solution architecture and planning",
  "Implementation and integration",
  "Testing and deployment",
  "Optimization and support",
];

/* â”€â”€ Industry-specific notes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const industryNotes: Record<IndustryId, string> = {
  "financial-services":
    "Financial services work carries audit, compliance and accuracy requirements â€” controls and traceability are designed in, not added later.",
  healthcare:
    "Healthcare projects need careful handling of patient data, role-based access and integrations with existing clinical systems.",
  "retail-ecommerce":
    "Retail and e-commerce depends on catalogue, inventory and order data staying consistent across channels in near real time.",
  manufacturing:
    "Manufacturing engagements usually start with shop-floor and inventory data before any customer-facing layer.",
  "logistics-supply-chain":
    "Supply-chain work is driven by exception handling â€” surfacing the delay or shortage early is where the value sits.",
  education:
    "Education platforms centre on enrolment, scheduling and engagement data across students, faculty and administration.",
  "professional-services":
    "Professional services firms typically need utilisation, billing and knowledge management to work from one source.",
  other:
    "We adapt proven solution patterns to your domain â€” the discovery conversation confirms fit before anything is proposed.",
};

/* â”€â”€ Case studies â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface CaseStudyRef {
  id: string;
  title: string;
  /** Verified engagement pattern â€” mirrors src/app/case-studies/page.tsx. */
  description: string;
  capabilities: string[];
  href: string;
}

/**
 * Only engagement patterns already published on /case-studies are referenced.
 * No invented clients, metrics or logos. `linkedServices` controls when a case
 * study is genuinely relevant to a recommendation.
 */
export const caseStudies: Array<CaseStudyRef & { linkedServices: string[] }> = [
  {
    id: "enterprise-platform",
    title: "Enterprise platform",
    description: "Unified CRM, ERP and SCM integration for operations at scale.",
    capabilities: ["System integration", "APIs", "Cloud"],
    href: "/case-studies",
    linkedServices: [
      "cloud-integration",
      "enterprise-software",
      "crm-development",
      "erp-development",
      "scm-development",
    ],
  },
  {
    id: "ai-powered-product",
    title: "AI-powered product",
    description: "Document intelligence and workflow automation for enterprise teams.",
    capabilities: ["Generative AI", "Automation", "SaaS"],
    href: "/case-studies",
    linkedServices: ["ai-software-development", "saas-development"],
  },
  {
    id: "digital-transformation",
    title: "Digital transformation",
    description: "Legacy modernization to cloud-native, multi-tenant architecture.",
    capabilities: ["Modernization", "SaaS", "Mobile"],
    href: "/case-studies",
    linkedServices: ["cloud-integration", "saas-development", "mobile-app-development"],
  },
];

/* â”€â”€ Disclaimer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const DISCLAIMER =
  "These recommendations are preliminary guidance based on the answers you selected. They are not a technical assessment, fixed scope or quotation. A consultation confirms fit, effort and approach.";

