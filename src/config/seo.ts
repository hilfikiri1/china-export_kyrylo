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
  /**
   * Default social share image (1200×630).
   * TODO (owner): replace with a branded /brand/og-image.png. Using an existing
   * photo as a temporary placeholder so social cards are not broken.
   */
  ogImage: "/image/cargo_conteiners.jpg",
  twitterCard: "summary_large_image" as const,
};
