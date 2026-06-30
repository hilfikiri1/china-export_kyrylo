"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Messages } from "./get-dictionary";
import {
  createTranslator,
  getMessageArray,
  getMessageObject,
  type Translator,
} from "./translate";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  t: Translator;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      locale,
      messages,
      t: createTranslator(messages),
    }),
    [locale, messages],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useTranslation() {
  const { locale, messages, t } = useLocale();
  return {
    locale,
    messages,
    t,
    getArray: <T extends Record<string, unknown>>(key: string) =>
      getMessageArray<T>(messages, key),
    getObject: <T extends Record<string, unknown>>(key: string) =>
      getMessageObject<T>(messages, key),
  };
}

/** @deprecated Use useTranslation().messages */
export function useMessages() {
  return useLocale().messages;
}

export function useCurrentLocale() {
  return useLocale().locale;
}

export function useT() {
  return useLocale().t;
}
