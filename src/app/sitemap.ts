import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routing";
import { siteUrl } from "@/config/seo";
import { CANTON_FAIR_PATH } from "@/content/canton-fair";

const staticPaths = [
  "",
  routes.services,
  routes.process,
  routes.cases,
  routes.about,
  routes.specializations,
  routes.china,
  routes.calculator,
  routes.consultation,
  routes.contact,
  routes.privacy,
  routes.cookies,
  routes.terms,
  routes.calculatorDisclaimer,
  `${routes.services}/wyszukiwanie-dostawcow`,
  `${routes.services}/audyty-fabryk`,
  `${routes.services}/kontrola-jakosci`,
  `${routes.services}/spedycja-i-logistyka`,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: path
          ? `${siteUrl}/${locale}/${path}`
          : `${siteUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              path ? `${siteUrl}/${l}/${path}` : `${siteUrl}/${l}`,
            ]),
          ),
        },
      });
    }
  }

  entries.push({
    url: `${siteUrl}/pl/${CANTON_FAIR_PATH}`,
    lastModified: new Date("2026-08-07"),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  return entries;
}
