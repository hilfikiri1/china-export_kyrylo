import { getServiceNavSlugs } from "@/content/services";

/**
 * All public, locale-independent route paths (no locale prefix).
 * Used to generate the sitemap and locale alternates.
 */
export function getSitemapPaths(): string[] {
  const base = [
    "/",
    "/uslugi",
    "/proces",
    "/realizacje",
    "/o-nas",
    "/zespol-w-chinach",
    "/kalkulator",
    "/konsultacja",
    "/kontakt",
    "/polityka-prywatnosci",
    "/polityka-cookies",
    "/regulamin",
  ];
  const services = getServiceNavSlugs().map((slug) => `/uslugi/${slug}`);
  return [...base, ...services];
}
