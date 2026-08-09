"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useMessages, useLocale } from "@/i18n/LocaleProvider";
import { localizedPath, routes } from "@/i18n/routing";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  setCookieConsent,
} from "@/lib/analytics";

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
  };
}

function getConsentSnapshot() {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === null;
}

function getServerConsentSnapshot() {
  return false;
}

export function CookieBanner() {
  const messages = useMessages();
  const { locale } = useLocale();
  const visible = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur-md sm:p-6"
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
            onClick={() => setCookieConsent("essential")}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            {messages.cookie.reject}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent("all")}
            className="rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white hover:bg-[#dbaa47]"
          >
            {messages.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
