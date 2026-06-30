"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

const STORAGE_KEY = "bbs_cookie_consent";

/**
 * Minimal cookie consent. Stores the choice in localStorage. Non-essential
 * scripts (analytics/marketing) must only be loaded after "accept-all".
 */
export function CookieConsent() {
  const locale = useLocale();
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  function choose(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookie.message")}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-navy/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-white/70">
          {t("cookie.message")}{" "}
          <Link
            href={localeHref(locale, "/polityka-prywatnosci")}
            className="font-medium text-accent-light/90 underline-offset-2 hover:underline"
          >
            {t("cookie.privacyLink")}
          </Link>
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5"
          >
            {t("cookie.essential")}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#dbaa47]"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
