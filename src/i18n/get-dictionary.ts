import type { Locale } from "./config";

export type Messages = typeof import("./messages/pl.json");

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  pl: () => import("./messages/pl.json").then((m) => m.default),
  uk: () => import("./messages/uk.json").then((m) => m.default),
  ru: () => import("./messages/ru.json").then((m) => m.default),
  de: () => import("./messages/de.json").then((m) => m.default),
  zh: () => import("./messages/zh.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
}

/** Synchronous import for client — messages are bundled */
export function getDictionarySync(locale: Locale): Messages {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`./messages/${locale}.json`) as Messages;
}
