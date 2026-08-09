"use client";

export const COOKIE_CONSENT_KEY = "bbs_cookie_consent";
export const COOKIE_CONSENT_EVENT = "bbs-cookie-consent-change";

export type CookieConsent = "all" | "essential" | null;
export type AnalyticsEventName =
  | "form_start"
  | "lead_submit"
  | "consultation_submit"
  | "calculator_complete"
  | "whatsapp_click"
  | "case_view"
  | "page_view";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function getCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "all" || value === "essential" ? value : null;
}

function notifyConsent(value: CookieConsent) {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function setCookieConsent(value: Exclude<CookieConsent, null>) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);

  if (value === "all") {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    window.fbq?.("consent", "grant");
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.fbq?.("consent", "revoke");
  }

  notifyConsent(value);
}

export function resetCookieConsent() {
  window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.fbq?.("consent", "revoke");
  notifyConsent(null);
}

export function analyticsAllowed() {
  return getCookieConsent() === "all";
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined" || !analyticsAllowed()) return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.gtag?.("event", eventName, cleanParams);
  window.fbq?.("trackCustom", eventName, cleanParams);
}
