import type { Messages } from "@/i18n/get-dictionary";
import { getMessageObject } from "@/i18n/translate";
import type { DedicatedPageContent } from "@/content/pages/types";
import { localizedPath } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

export type PageContentKey =
  | "proces"
  | "about"
  | "contact"
  | "consultation"
  | "calculator"
  | "cases"
  | "services"
  | "china"
  | "servicesSourcing"
  | "servicesAudit"
  | "servicesQc"
  | "servicesFreight";

type PageMessage = DedicatedPageContent;

function localizeHref(locale: Locale, href: string): string {
  if (!href || href.startsWith("http") || href.startsWith("#")) return href;
  return localizedPath(locale, href.replace(/^\//, ""));
}

export function getPageContent(
  messages: Messages,
  locale: Locale,
  pageKey: PageContentKey,
): DedicatedPageContent | undefined {
  const raw = getMessageObject<PageMessage>(messages, `pages.${pageKey}`);
  if (!raw) return undefined;

  return {
    ...raw,
    id: pageKey,
    cta: {
      primary: {
        ...raw.cta.primary,
        href: localizeHref(locale, raw.cta.primary.href),
      },
      secondary: raw.cta.secondary
        ? {
            ...raw.cta.secondary,
            href: localizeHref(locale, raw.cta.secondary.href),
          }
        : undefined,
    },
  };
}

export function getRequiredPageContent(
  messages: Messages,
  locale: Locale,
  pageKey: PageContentKey,
): DedicatedPageContent {
  const page = getPageContent(messages, locale, pageKey);
  if (!page) {
    throw new Error(`Missing page content: pages.${pageKey}`);
  }
  return page;
}

const serviceSlugToPageKey: Record<string, PageContentKey> = {
  "wyszukiwanie-dostawcow": "servicesSourcing",
  "audyty-fabryk": "servicesAudit",
  "kontrola-jakosci": "servicesQc",
  "spedycja-i-logistyka": "servicesFreight",
};

export function getPageContentByServiceSlug(
  messages: Messages,
  locale: Locale,
  slug: string,
): DedicatedPageContent | undefined {
  const pageKey = serviceSlugToPageKey[slug];
  return pageKey ? getPageContent(messages, locale, pageKey) : undefined;
}

export function getRequiredPageContentByServiceSlug(
  messages: Messages,
  locale: Locale,
  slug: string,
): DedicatedPageContent {
  const page = getPageContentByServiceSlug(messages, locale, slug);
  if (!page) {
    throw new Error(`Missing page content for service slug: ${slug}`);
  }
  return page;
}
