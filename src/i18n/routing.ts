import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

/**
 * Prefix an internal href with a locale segment.
 * `localeHref("pl", "/uslugi")` -> "/pl/uslugi"
 * Hash fragments and absolute/external URLs are passed through untouched.
 */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // external, mailto:, tel:, #hash
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/** Strip a leading locale segment from a pathname, returning the rest. */
export function stripLocale(pathname: string): {
  locale: Locale;
  rest: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: maybeLocale, rest: rest === "/" ? "/" : rest };
  }
  return { locale: defaultLocale, rest: pathname || "/" };
}

/** Build the equivalent path in a different locale, preserving the route. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { rest } = stripLocale(pathname);
  return localeHref(target, rest);
}

export { locales, defaultLocale };
export type { Locale };
