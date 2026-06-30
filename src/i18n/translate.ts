import type { Messages } from "@/i18n/dictionaries";

/**
 * Resolve a dot-path key (e.g. "nav.proces") against a messages object.
 * Returns the key itself when missing so problems are visible but never throw.
 */
export function resolve(messages: Messages, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as object)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, messages);
}

export type Translator = {
  /** Translate a key to a string. */
  (key: string, fallback?: string): string;
  /** Get a raw (possibly structured) value by key, e.g. an array. */
  raw: (key: string) => unknown;
};

export function createTranslator(messages: Messages): Translator {
  const t = ((key: string, fallback?: string): string => {
    const value = resolve(messages, key);
    if (typeof value === "string") return value;
    return fallback ?? key;
  }) as Translator;
  t.raw = (key: string) => resolve(messages, key);
  return t;
}
