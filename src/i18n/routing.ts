import { defaultLocale, locales, type Locale } from "@/i18n/config";

export const localePrefixPattern = new RegExp(`^/(${locales.join("|")})(/|$)`);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const match = pathname.match(localePrefixPattern);
  const possibleLocale = match?.[1];
  return possibleLocale && isLocale(possibleLocale) ? possibleLocale : defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(localePrefixPattern, "/");
  return stripped === "" ? "/" : stripped;
}

export function prefixPathWithLocale(pathname: string, locale: Locale): string {
  const cleanPath = stripLocalePrefix(pathname);
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function toLocalePath(currentPathname: string, targetLocale: Locale): string {
  return prefixPathWithLocale(currentPathname, targetLocale);
}
