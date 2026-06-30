import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/seo";
import { htmlLangByLocale, locales, localizePath } from "@/i18n/config";
import { getServiceNavSlugs } from "@/content/services";

const staticPaths = [
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
  "/zastrzezenie-kalkulatora",
  ...getServiceNavSlugs().map((slug) => `/uslugi/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizePath(path, locale)}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [
            htmlLangByLocale[item],
            `${siteUrl}${localizePath(path, item)}`,
          ]),
        ),
      },
    })),
  );
}
