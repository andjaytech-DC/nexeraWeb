/**
 * Canonical site URL used for metadata, the sitemap and robots.txt.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this to pin the canonical domain (e.g. to
 *     force the www or non-www form, or to work against a staging domain).
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected at build time by Vercel. It is
 *     the project's shortest production custom domain, or its vercel.app
 *     domain when no custom domain is attached.
 *  3. VERCEL_URL — the per-deployment URL, so preview builds stay correct.
 *  4. localhost for local development.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalize(explicit);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return normalize(productionHost);

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) return normalize(deploymentHost);

  return "http://localhost:3000";
}

function normalize(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}
