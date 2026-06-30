export const locales = ["pl", "uk", "ru", "de", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const localeLabels: Record<Locale, string> = {
  pl: "Polski",
  uk: "Українська",
  ru: "Русский",
  de: "Deutsch",
  zh: "中文",
};

/** HTML lang attribute — zh uses zh-CN for Simplified Chinese */
export const htmlLang: Record<Locale, string> = {
  pl: "pl",
  uk: "uk",
  ru: "ru",
  de: "de",
  zh: "zh-CN",
};

export const LOCALE_COOKIE = "bbs_locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
