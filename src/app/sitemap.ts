import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routing";
import { siteUrl } from "@/config/seo";
import { CANTON_FAIR_PATH } from "@/content/canton-fair";
import { caseStudies } from "@/content/cases";
import { getCasesForLocale } from "@/lib/cases/notion";
import { getPublishedBlogPosts } from "@/lib/blog/posts";

export const revalidate = 300;

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

const staticCaseSlugs = new Set(caseStudies.map((item) => item.slug));

function safeDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function alternateMap(path: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        locale,
        path ? `${siteUrl}/${locale}/${path}` : `${siteUrl}/${locale}`,
      ]),
    ),
    "x-default": path ? `${siteUrl}/pl/${path}` : `${siteUrl}/pl`,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: path ? `${siteUrl}/${locale}/${path}` : `${siteUrl}/${locale}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages: alternateMap(path) },
      });
    }

    const localizedCases = await getCasesForLocale(locale);
    for (const item of localizedCases) {
      const isStaticCase = staticCaseSlugs.has(item.slug);
      entries.push({
        url: `${siteUrl}/${locale}/${routes.cases}/${item.slug}`,
        lastModified: safeDate(item.date),
        changeFrequency: "monthly",
        priority: 0.7,
        ...(isStaticCase
          ? { alternates: { languages: alternateMap(`${routes.cases}/${item.slug}`) } }
          : {}),
      });
    }
  }

  const blogPosts = await getPublishedBlogPosts("pl");
  entries.push({
    url: `${siteUrl}/pl/blog`,
    lastModified: blogPosts.map((post) => safeDate(post.date)?.getTime() ?? 0).reduce((max, value) => Math.max(max, value), 0)
      ? new Date(Math.max(...blogPosts.map((post) => safeDate(post.date)?.getTime() ?? 0)))
      : undefined,
    changeFrequency: "weekly",
    priority: 0.85,
  });
  for (const post of blogPosts) {
    entries.push({
      url: `${siteUrl}/pl/blog/${post.slug}`,
      lastModified: safeDate(post.date),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  entries.push({
    url: `${siteUrl}/pl/${CANTON_FAIR_PATH}`,
    lastModified: new Date("2026-08-07"),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  return entries;
}
