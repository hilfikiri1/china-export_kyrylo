import { defineRouting } from "next-intl/routing";

export const locales = ["pl", "uk", "ru", "de", "zh"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "pl",
});
