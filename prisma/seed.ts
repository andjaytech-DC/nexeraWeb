/**
 * Careers seed — the seven proposed job listings (HR, US-process BPO, IT).
 *
 * Idempotent and admin-edit-safe:
 *  - rows are matched on the unique slug;
 *  - a row that already exists keeps ALL content as it is (so edits made in
 *    the admin panel survive re-seeds) and only refreshes the public flag;
 *  - nothing is deleted — there is no fabricated data beyond these seven
 *    approved listings.
 *
 * Usage (needs a real DATABASE_URL):  npm run db:seed
 * Apply-by-email override:            JOBS_APPLY_EMAIL=... npm run db:seed
 * Location "Noida, India (Sector-59)" reflects the published office address
 * on the site; HR should confirm per-role work modes and shifts before going
 * live — unpublish anything not confirmed from the admin panel.
 * See docs/deployment.md §4.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 connects through a driver adapter, mirroring src/lib/prisma.ts.
// The client is created only after the DATABASE_URL guard passes.
let prisma: PrismaClient | null = null;

const APPLY_EMAIL = process.env.JOBS_APPLY_EMAIL ?? "jay.nexara@gmail.com";

const NOIDA_ONSITE = "Noida, India (Sector-59) · On-site";

const jobs = [
  {
    slug: "hr-executive-recruiter",
    title: "HR Executive / Recruiter",
    department: "HR",
    location: NOIDA_ONSITE,
    employmentType: "Full-time",
    experienceLevel: "Entry level–Experienced",
    description:
      "Own the front door of Nexara's hiring — sourcing, screening and coordinating candidates across IT and BPO roles, plus the HR documentation that keeps the process clean and auditable. You will work closely with delivery leads who know exactly what a strong hire looks like.",
    responsibilities:
      "• Source and screen candidates for IT and BPO openings\n• Coordinate and schedule interviews with panelists\n• Run onboarding and maintain HR documentation and records\n• Keep candidate pipelines and hiring trackers up to date",
    requirements:
      "• Freshers and experienced candidates may apply\n• Clear spoken and written English\n• Familiarity with resume sourcing and screening workflows\n• Organized, detail-oriented, comfortable coordinating multiple pipelines",
    preferredSkills: "Previous recruiting, HR operations or interview-coordination experience.",
    workMode: "On-site (Noida)",
    shiftInfo: "Day shift",
  },
  {
    slug: "us-inbound-customer-support-executive",
    title: "US Inbound Customer Support Executive",
    department: "BPO",
    location: NOIDA_ONSITE,
    employmentType: "Full-time",
    experienceLevel: "Entry level–Experienced",
    description:
      "Be the voice of the US inbound process: answer incoming customer calls, resolve queries, document every case accurately and deliver professional support under US-aligned shifts.",
    responsibilities:
      "• Handle incoming customer calls professionally\n• Resolve customer queries using approved processes\n• Document cases accurately in the CRM/ticketing system\n• Escalate edge cases with complete, structured notes",
    requirements:
      "• Strong spoken English with clear pronunciation\n• Willingness to work US-aligned shifts\n• Freshers welcome; experienced candidates preferred\n• Reliable, professional phone presence",
    preferredSkills: "Prior inbound voice process, customer service or support-desk experience.",
    workMode: "On-site (Noida)",
    shiftInfo: "US-aligned shifts",
  },
  {
    slug: "us-outbound-process-executive",
    title: "US Outbound Process Executive",
    department: "BPO",
    location: NOIDA_ONSITE,
    employmentType: "Full-time",
    experienceLevel: "Entry level–Experienced",
    description:
      "Make customer and business calls on defined outbound processes — communicate clearly, follow approved scripts and keep every call record accurate.",
    responsibilities:
      "• Make customer or business calls as per campaign\n• Communicate clearly and follow approved scripts\n• Maintain accurate call records\n• Meet quality and productivity expectations",
    requirements:
      "• Strong English communication\n• Confidence on calls\n• US-shift flexibility\n• Freshers welcome; experienced candidates preferred",
    preferredSkills: "Prior outbound voice or telesales experience.",
    workMode: "On-site (Noida)",
    shiftInfo: "US-aligned shifts",
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "IT",
    location: NOIDA_ONSITE,
    employmentType: "Full-time",
    experienceLevel: "Minimum 4 years",
    description:
      "Build responsive web applications with React, Next.js and TypeScript — modern UI patterns, accessibility and increasingly AI-assisted development tools as part of the daily workflow.",
    responsibilities:
      "• Build responsive, accessible web applications\n• Implement modern UI patterns with React, Next.js and TypeScript\n• Collaborate with design and backend on component systems\n• Use AI-assisted development tooling responsibly",
    requirements:
      "• Minimum 4 years building production web frontends\n• Strong React, Next.js and TypeScript\n• Modern UI patterns: state, routing, forms, accessibility\n• Comfortable with Git, code review and CI pipelines",
    preferredSkills: "Tailwind CSS, Next.js App Router, unit/E2E testing, performance tuning.",
    workMode: "On-site or hybrid (Noida)",
    shiftInfo: "Day shift",
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    department: "IT",
    location: NOIDA_ONSITE,
    employmentType: "Full-time",
    experienceLevel: "Minimum 4 years",
    description:
      "Develop the APIs, authentication, database integrations and secure backend services behind Nexara's client and internal platforms — architecture that stays reliable as workloads scale.",
    responsibilities:
      "• Design and develop REST APIs and service layers\n• Implement authentication and authorization\n• Build and tune database integrations (SQL/PostgreSQL)\n• Write tests; deploy securely to cloud environments",
    requirements:
      "• Minimum 4 years of backend development experience\n• Node.js and NestJS (or comparable framework)\n• REST API design, SQL/PostgreSQL and testing practice\n• Secure coding and data-protection awareness",
    preferredSkills: "Prisma ORM, Redis/caching, message queues, Docker, cloud deployment (Vercel/AWS/Azure).",
    workMode: "On-site or hybrid (Noida)",
    shiftInfo: "Day shift",
  },
  {
    slug: "full-stack-developer-ai-applications",
    title: "Full-Stack Developer — AI Applications",
    department: "IT",
    location: "Remote within India · hybrid/office in Noida optional",
    employmentType: "Full-time",
    experienceLevel: "Minimum 4 years",
    description:
      "Build end-to-end web applications and integrate LLM APIs, AI agents and retrieval-augmented generation (RAG) into real business workflows — production systems, not demos.",
    responsibilities:
      "• Build end-to-end web applications (frontend + backend)\n• Integrate LLM APIs and AI agents into product workflows\n• Implement retrieval-augmented generation (RAG) pipelines\n• Ship automation workflows with measurable reliability",
    requirements:
      "• Minimum 4 years full-stack development (React/Next.js + Node.js)\n• Hands-on LLM API integration experience\n• Practical knowledge of RAG, embeddings and vector stores\n• Solid API design and data modeling",
    preferredSkills: "TypeScript end-to-end, LangChain/LlamaIndex or equivalent, prompt evaluation, Prisma.",
    workMode: "Remote (India) or hybrid (Noida)",
    shiftInfo: "Day shift; overlap hours may apply for US clients",
  },
  {
    slug: "ai-enabled-software-engineer",
    title: "AI-Enabled Software Engineer",
    department: "IT",
    location: "Remote within India · hybrid/office in Noida optional",
    employmentType: "Full-time",
    experienceLevel: "Minimum 4 years",
    description:
      "Develop AI-powered features, integrate external models and services, evaluate outputs and build reliable software using modern AI engineering practices.",
    responsibilities:
      "• Develop AI-powered product features\n• Integrate and evaluate external models and services\n• Build evaluation suites and guardrails for model output\n• Ship dependable software around ML components",
    requirements:
      "• Minimum 4 years software engineering experience\n• Experience integrating external AI models/services in production\n• Output evaluation, guardrails and fallback design\n• Strong software engineering fundamentals",
    preferredSkills: "Python or TypeScript ML integration, monitoring/observability, eval frameworks.",
    workMode: "Remote (India) or hybrid (Noida)",
    shiftInfo: "Day shift",
  },
];

async function main() {
  // Truthful guard: never "seed" without a real database — a placeholder URL
  // would silently write nowhere or fail confusingly.
  const url = process.env.DATABASE_URL ?? "";
  if (!url || url.includes("user:password")) {
    console.error(
      "DATABASE_URL is missing or still the scaffold placeholder (user:password@…). " +
        "Provision PostgreSQL and set a real DATABASE_URL first — see docs/deployment.md §4.",
    );
    process.exitCode = 1;
    return;
  }
  prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

  let created = 0;
  let refreshed = 0;
  for (const job of jobs) {
    const existing = await prisma.job.findUnique({ where: { slug: job.slug } });
    if (existing) {
      // Idempotent + edit-safe: keep all admin-edited content, only ensure the
      // listing is publicly visible (Publish), matching the seed intent.
      await prisma.job.update({
        where: { slug: job.slug },
        data: { isPublished: true, status: "Published" },
      });
      refreshed += 1;
      console.log(`  refreshed ${existing.slug} (content preserved as edited in admin)`);
    } else {
      await prisma.job.create({
        data: {
          ...job,
          applyEmail: APPLY_EMAIL,
          isPublished: true,
          status: "Published",
        },
      });
      created += 1;
      console.log(`  created ${job.slug}`);
    }
  }
  console.log(`Seed complete (7 listings): ${created} created, ${refreshed} refreshed. Apply-by-email: ${APPLY_EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma?.$disconnect();
  });
