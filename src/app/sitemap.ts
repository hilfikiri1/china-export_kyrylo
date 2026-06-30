import type { MetadataRoute } from "next";
import { hreflang, locales } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { getSitemapPaths } from "@/config/routes";
import { siteUrl } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getSitemapPaths();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[hreflang[alt]] = `${siteUrl}${localeHref(alt, path)}`;
      }
      entries.push({
        url: `${siteUrl}${localeHref(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
