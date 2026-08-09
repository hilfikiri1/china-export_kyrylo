import type { Locale } from "./config";

export type Messages = typeof import("./messages/pl.json");

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  pl: () => import("./messages/pl.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default as Messages),
  uk: () => import("./messages/uk.json").then((m) => m.default),
  ru: () => import("./messages/ru.json").then((m) => m.default),
  de: () => import("./messages/de.json").then((m) => m.default),
  zh: () => import("./messages/zh.json").then((m) => m.default),
};

const OLD_PL_DELIVERY =
  "Czas dostawy zależy od ilości i rodzaju produktów. Zazwyczaj trwa od 7 do 21 dni. Zawsze podajemy dokładne terminy, abyś mógł planować pracę bez opóźnień.";
const NEW_PL_DELIVERY =
  "Orientacyjnie, od odbioru gotowego towaru z fabryki: transport lotniczy 5–12 dni, drogowy 14–24 dni, kolejowy 18–30 dni, a morski 45–75 dni. Czas produkcji nie jest wliczony. Termin zależy od trasy, rodzaju ładunku, Incoterm, sezonu i odprawy celnej — przed zamówieniem potwierdzamy harmonogram dla konkretnej trasy.";

function normalizePolishCopy<T>(value: T): T {
  if (typeof value === "string") {
    let normalized = value
      .replaceAll("Umów konsultację", "Poproś o termin konsultacji")
      .replaceAll("Zarezerwuj termin", "Poproś o termin konsultacji");
    if (normalized === OLD_PL_DELIVERY || normalized.includes("Zazwyczaj trwa od 7 do 21 dni")) {
      normalized = NEW_PL_DELIVERY;
    }
    return normalized as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizePolishCopy(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizePolishCopy(item)]),
    ) as T;
  }

  return value;
}

function normalizeMessages(locale: Locale, messages: Messages): Messages {
  return locale === "pl" ? normalizePolishCopy(messages) : messages;
}

export async function getDictionary(locale: Locale): Promise<Messages> {
  return normalizeMessages(locale, await dictionaries[locale]());
}

/** Synchronous import for client — messages are bundled */
export function getDictionarySync(locale: Locale): Messages {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages = require(`./messages/${locale}.json`) as Messages;
  return normalizeMessages(locale, messages);
}
