/**
 * i18n configuration — single source of truth for supported locales.
 *
 * To add a sixth language later, see CONTENT_EDITING_GUIDE.md.
 */

export const locales = ["pl", "uk", "ru", "de", "zh"] as const;

export type Locale = (typeof locales)[number];

/** Polish is the default and master locale. */
export const defaultLocale: Locale = "pl";

/**
 * Locales shown in the public language switcher. An internally-available
 * locale (e.g. "en") could exist in routing without appearing here.
 */
export const publicLocales: readonly Locale[] = locales;

/** Native display names for the language switcher (never flag-only). */
export const localeNames: Record<Locale, string> = {
  pl: "Polski",
  uk: "Українська",
  ru: "Русский",
  de: "Deutsch",
  zh: "中文",
};

/** Value for the HTML `lang` attribute. */
export const htmlLang: Record<Locale, string> = {
  pl: "pl",
  uk: "uk",
  ru: "ru",
  de: "de",
  zh: "zh-CN",
};

/** `hreflang` value per locale (BCP-47). */
export const hreflang: Record<Locale, string> = {
  pl: "pl-PL",
  uk: "uk-UA",
  ru: "ru-RU",
  de: "de-DE",
  zh: "zh-CN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cookie used to remember the visitor's last chosen locale. */
export const LOCALE_COOKIE = "bbs_locale";
