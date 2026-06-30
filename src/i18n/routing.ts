import { defaultLocale, isLocale, type Locale } from "./config";

/** Internal route slugs shared across locales */
export const routes = {
  home: "",
  services: "uslugi",
  process: "proces",
  cases: "realizacje",
  about: "o-nas",
  specializations: "specjalizacje",
  china: "zespol-w-chinach",
  calculator: "kalkulator",
  consultation: "konsultacja",
  contact: "kontakt",
  privacy: "polityka-prywatnosci",
  cookies: "polityka-cookies",
  terms: "regulamin",
  calculatorDisclaimer: "zastrzezenie-kalkulatora",
} as const;

export type RouteKey = keyof typeof routes;

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path.replace(/^\//, "");
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function stripLocaleFromPath(pathname: string): {
  locale: Locale | null;
  pathWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, pathWithoutLocale: rest ? `/${rest}` : "" };
  }

  return { locale: null, pathWithoutLocale: pathname === "/" ? "" : pathname };
}

export function switchLocalePath(
  currentPathname: string,
  targetLocale: Locale,
): string {
  const { pathWithoutLocale } = stripLocaleFromPath(currentPathname);
  return localizedPath(targetLocale, pathWithoutLocale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const { locale } = stripLocaleFromPath(pathname);
  return locale ?? defaultLocale;
}
