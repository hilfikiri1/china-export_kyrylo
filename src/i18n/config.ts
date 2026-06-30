export const locales = ["pl", "uk", "ru", "de", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const htmlLangByLocale: Record<Locale, string> = {
  pl: "pl",
  uk: "uk",
  ru: "ru",
  de: "de",
  zh: "zh-CN",
};

export const languageNames: Record<Locale, string> = {
  pl: "Polski",
  uk: "Українська",
  ru: "Русский",
  de: "Deutsch",
  zh: "中文",
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function splitLocaleFromPathname(pathname: string): {
  locale: Locale;
  pathWithoutLocale: string;
  hasLocale: boolean;
} {
  const parts = pathname.split("/");
  const first = parts[1];

  if (isLocale(first)) {
    const pathWithoutLocale = `/${parts.slice(2).join("/")}`.replace(/\/$/, "") || "/";
    return { locale: first, pathWithoutLocale, hasLocale: true };
  }

  return { locale: defaultLocale, pathWithoutLocale: pathname || "/", hasLocale: false };
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;

  const { pathWithoutLocale } = splitLocaleFromPathname(normalized);
  return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const { pathWithoutLocale } = splitLocaleFromPathname(pathname);
  return localizePath(pathWithoutLocale, locale);
}
