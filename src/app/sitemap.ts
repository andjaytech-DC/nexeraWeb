import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { safeDb } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const routes = [
    "",
    "/solutions",
    "/solutions/digital-transformation",
    "/solutions/intelligent-automation",
    "/solutions/product-engineering",
    "/solutions/enterprise-technology",
    "/solutions/ai-powered-software",
    "/solutions/digital-platforms",
    "/solutions/business-process-transformation",
    "/solutions/system-integration",
    "/services",
    "/services/website-development",
    "/services/web-app-development",
    "/services/crm-development",
    "/services/erp-development",
    "/services/scm-development",
    "/services/saas-development",
    "/services/ai-software-development",
    "/services/mobile-app-development",
    "/services/android-app-development",
    "/services/ios-development",
    "/services/enterprise-software",
    "/services/cloud-integration",
    "/services/bpo",
    "/services/resource-management",
    "/services/support-growth",
    "/industries",
    "/industries/automotive",
    "/industries/healthcare",
    "/industries/financial-services",
    "/industries/retail",
    "/industries/manufacturing",
    "/industries/logistics",
    "/industries/education",
    "/industries/real-estate",
    "/industries/ecommerce",
    "/industries/travel-hospitality",
    "/industries/professional-services",
    "/technologies",
    "/process",
    "/insights",
    "/insights/ai",
    "/insights/digital-transformation",
    "/insights/enterprise-software",
    "/insights/cloud",
    "/insights/business-automation",
    "/insights/technology-strategy",
    "/insights/workflow-agents",
    "/insights/document-intelligence",
    "/insights/ai-automate-workflows",
    "/insights/when-replace-legacy",
    "/insights/crm-vs-custom-platform",
    "/insights/plan-enterprise-saas",
    "/insights/cloud-transformation",
    "/insights/erp-implementation",
    "/careers",
    "/careers/job-search",
    "/careers/students",
    "/careers/contract-opportunities",
    "/careers/talent-community",
    "/careers/send-resume",
    "/solution-finder",
    "/contact",
    "/about",
    "/case-studies",
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.includes("/careers") ? 0.6 : r.includes("/insights/") || r.includes("/industries/") || r.includes("/services/") || r.includes("/solutions/") ? 0.6 : 0.7,
  }));

  // Published job detail pages are indexable public URLs — enumerate them when
  // the database is reachable. safeDb falls back to an empty list otherwise,
  // so the build never fails on DB availability.
  const jobs = await safeDb(
    async (db) =>
      db.job.findMany({
        where: { isPublished: true, status: "Published" },
        select: { slug: true, updatedAt: true },
      }),
    [] as { slug: string; updatedAt: Date }[],
  );

  const jobEntries = jobs.map((job) => ({
    url: `${base}/careers/job-search/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...jobEntries];
}
