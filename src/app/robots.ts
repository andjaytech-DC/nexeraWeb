import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
      // AI crawlers — explicit allow with the same /admin restriction.
      // These directives do not guarantee AI search indexing; they only
      // clarify crawling policy for these agents.
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
