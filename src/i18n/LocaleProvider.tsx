"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";
import { createTranslator, type Translator } from "@/i18n/translate";

type LocaleContextValue = {
  locale: Locale;
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
  children: React.ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: createTranslator(messages) }),
    [locale, messages],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return ctx;
}

export function useLocale(): Locale {
  return useLocaleContext().locale;
}

/** Client-side translator hook. */
export function useT(): Translator {
  return useLocaleContext().t;
}
