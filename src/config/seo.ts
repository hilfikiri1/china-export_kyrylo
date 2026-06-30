/**
 * SEO configuration. Locale-specific titles/descriptions live in the i18n
 * messages (src/i18n/messages/*.json) under the "seo" namespace.
 */

import { company } from "@/config/company";

/**
 * Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in the environment
 * (Vercel project settings) once the production domain is known.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.buybringsolutions.com"
).replace(/\/$/, "");

export const seo = {
  siteName: company.name,
  /** Default social share image stored locally in /public. */
  ogImage: "/brand/og-image.png",
  twitterCard: "summary_large_image" as const,
};
