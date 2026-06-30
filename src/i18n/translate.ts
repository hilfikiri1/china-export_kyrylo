import type { Messages } from "./get-dictionary";

type Primitive = string | number | boolean | null | undefined;

type NestedMessages = {
  [key: string]: Primitive | NestedMessages | readonly unknown[];
};

function getByPath(obj: NestedMessages, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as NestedMessages)[part];
  }

  return current;
}

export type Translator = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function createTranslator(messages: Messages): Translator {
  return function t(key, params) {
    const value = getByPath(messages as NestedMessages, key);

    if (typeof value !== "string") {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Missing translation: ${key}`);
      }
      return key;
    }

    if (!params) return value;

    return Object.entries(params).reduce(
      (result, [paramKey, paramValue]) =>
        result.replaceAll(`{${paramKey}}`, String(paramValue)),
      value,
    );
  };
}

export function getMessageArray<T extends Record<string, unknown>>(
  messages: Messages,
  key: string,
): T[] {
  const value = getByPath(messages as NestedMessages, key);
  return Array.isArray(value) ? (value as T[]) : [];
}

export function getMessageObject<T extends Record<string, unknown>>(
  messages: Messages,
  key: string,
): T | undefined {
  const value = getByPath(messages as NestedMessages, key);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as T;
  }
  return undefined;
}
