import type { Locale } from "@/i18n/config";

export const marketingLocales = ["pl", "ru"] as const satisfies readonly Locale[];

export type MarketingLocale = (typeof marketingLocales)[number];

export function isMarketingLocale(locale: string): locale is MarketingLocale {
  return (marketingLocales as readonly string[]).includes(locale);
}
