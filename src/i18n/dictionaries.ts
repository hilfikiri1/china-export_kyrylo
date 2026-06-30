import "server-only";

import { defaultLocale, type Locale } from "@/i18n/config";

export type Messages = Record<string, unknown>;

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  pl: () => import("./messages/pl.json"),
  uk: () => import("./messages/uk.json"),
  ru: () => import("./messages/ru.json"),
  de: () => import("./messages/de.json"),
  zh: () => import("./messages/zh.json"),
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merge `override` onto `base`. Used so any missing translation key
 *  transparently falls back to the Polish master copy. */
function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];
    if (isObject(existing) && isObject(value)) {
      result[key] = deepMerge(existing, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Load fully-resolved messages for a locale. The Polish master is always used
 * as the base, so untranslated keys never break rendering.
 */
export async function getDictionary(locale: Locale): Promise<Messages> {
  const base = (await loaders[defaultLocale]()).default;
  if (locale === defaultLocale) return base;
  const override = (await loaders[locale]()).default;
  return deepMerge(base, override);
}
