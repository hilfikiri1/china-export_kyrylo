import type { Locale } from "@/i18n/config";

export type BrandTheme = "light" | "dark";

const bridgePath =
  "M2 22V14l3-1.5 5 3 5-3 5 3 5-3 3 1.5v8H2zm4-6.5l4 2.5 4-2.5 4 2.5 4-2.5";

export function getBrandLogo(locale: Locale, theme: BrandTheme): string {
  const isPoland = locale === "pl";
  if (theme === "light") {
    return isPoland ? "/brand/logo-pl-on-light.svg" : "/brand/logo-global-on-light.svg";
  }
  return isPoland ? "/brand/logo-pl.svg" : "/brand/logo-global.svg";
}

export function getBrandLogoAlt(locale: Locale): string {
  return locale === "pl" ? "B&BS Poland" : "B&B Solutions";
}

/** Shared bridge mark used inside logo SVGs */
export const brandBridgePath = bridgePath;
