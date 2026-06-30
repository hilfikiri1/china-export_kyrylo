import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/config/seo";

const routePaths = [
  "",
  "/o-nas",
  "/proces",
  "/realizacje",
  "/uslugi",
  "/uslugi/wyszukiwanie-dostawcow",
  "/uslugi/audyty-fabryk",
  "/uslugi/kontrola-jakosci",
  "/uslugi/spedycja-i-logistyka",
  "/dzialamy-w-chinach",
  "/kalkulator",
  "/konsultacja",
  "/kontakt",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routePaths.map((routePath) => {
      const localizedPath = routePath ? `/${locale}${routePath}` : `/${locale}`;
      return {
        url: `${siteUrl}${localizedPath}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((item) => [
              item,
              `${siteUrl}${routePath ? `/${item}${routePath}` : `/${item}`}`,
            ]),
          ),
        },
      };
    }),
  );
}
