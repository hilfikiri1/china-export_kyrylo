"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMessages, useLocale } from "@/i18n/LocaleProvider";
import { localizedPath, routes } from "@/i18n/routing";

const CONSENT_KEY = "bbs_cookie_consent";

export function CookieBanner() {
  const messages = useMessages();
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept(all = true) {
    localStorage.setItem(CONSENT_KEY, all ? "all" : "essential");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="cookie-banner dark-surface fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur-md sm:p-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/70">
          {messages.cookie.message}{" "}
          <Link
            href={localizedPath(locale, routes.cookies)}
            className="text-accent-light underline-offset-2 hover:underline"
          >
            {messages.common.cookiePolicy}
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => accept(false)}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            {messages.cookie.reject}
          </button>
          <button
            type="button"
            onClick={() => accept(true)}
            className="gold-cta rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white hover:bg-[#dbaa47]"
          >
            {messages.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
