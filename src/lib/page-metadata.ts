import type { Metadata } from "next";
import {
  getAlternateLanguages,
  getCanonicalUrl,
  getPageSeo,
} from "@/config/seo";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { getRequiredPageContent, type PageContentKey } from "@/content/i18n/pages";

export async function createLocalizedPageMetadata(
  locale: Locale,
  pageKey: PageContentKey,
  path = "",
): Promise<Metadata> {
  const { messages } = await getServerTranslation(locale);
  const content = getRequiredPageContent(messages, locale, pageKey);

  return {
    title: { absolute: content.meta.title },
    description: content.meta.description,
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      locale,
      type: "website",
    },
  };
}

export async function createHomeMetadata(locale: Locale): Promise<Metadata> {
  const seo = getPageSeo("home", locale);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateLanguages(),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl(locale),
      siteName: "Buy & Bring Solutions",
      locale,
      type: "website",
    },
  };
}
