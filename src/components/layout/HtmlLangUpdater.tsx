"use client";

import { useEffect } from "react";
import { localeMeta } from "@/i18n/config";
import { useCurrentLocale } from "@/i18n/use-current-locale";

export function HtmlLangUpdater() {
  const locale = useCurrentLocale();

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  return null;
}
