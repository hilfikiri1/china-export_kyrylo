export const locales = ["pl", "uk", "ru", "de", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const localeCookieName = "bbs_locale";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; htmlLang: string }
> = {
  pl: { label: "Polish", nativeLabel: "Polski", htmlLang: "pl" },
  uk: { label: "Ukrainian", nativeLabel: "Українська", htmlLang: "uk" },
  ru: { label: "Russian", nativeLabel: "Русский", htmlLang: "ru" },
  de: { label: "German", nativeLabel: "Deutsch", htmlLang: "de" },
  zh: { label: "Chinese", nativeLabel: "中文", htmlLang: "zh-CN" },
};
