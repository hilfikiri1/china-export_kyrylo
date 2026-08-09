"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  trackEvent,
  type CookieConsent,
} from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const PRIVATE_PATH_RE = /^\/(?:pl|en|uk|ru|de|zh)\/(?:bbs|panel)(?:\/|$)/;
const CASE_PATH_RE = /^\/(?:pl|en|uk|ru|de|zh)\/realizacje\/[^/]+\/?$/;

function formTypeFromBody(body: BodyInit | null | undefined) {
  if (body instanceof FormData) {
    const formType = body.get("formType");
    return {
      formType: typeof formType === "string" ? formType : "contact",
      budget: typeof body.get("budget") === "string" ? String(body.get("budget")) : undefined,
    };
  }

  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body) as { formType?: unknown };
      return { formType: typeof parsed.formType === "string" ? parsed.formType : "contact" };
    } catch {
      return { formType: "contact" };
    }
  }

  return { formType: "contact" };
}

function isContactEndpoint(input: RequestInfo | URL) {
  if (typeof input === "string") return input === "/api/contact" || input.endsWith("/api/contact");
  if (input instanceof URL) return input.pathname === "/api/contact";
  return new URL(input.url, window.location.origin).pathname === "/api/contact";
}

export function MarketingAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<CookieConsent>(null);
  const startedForms = useRef(new WeakSet<HTMLFormElement>());
  const lastCaseView = useRef("");

  useEffect(() => {
    setConsent(getCookieConsent());
    const onConsent = () => setConsent(getCookieConsent());
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    window.addEventListener("storage", onConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  useEffect(() => {
    if (consent !== "all" || PRIVATE_PATH_RE.test(pathname)) return;
    trackEvent("page_view", { page_path: pathname });
    if (CASE_PATH_RE.test(pathname) && lastCaseView.current !== pathname) {
      lastCaseView.current = pathname;
      trackEvent("case_view", { case_slug: pathname.split("/").filter(Boolean).at(-1), page_path: pathname });
    }
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "all" || PRIVATE_PATH_RE.test(pathname)) return;

    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest("form");
      if (!(form instanceof HTMLFormElement) || startedForms.current.has(form)) return;
      if (!form.querySelector('[name="email"]')) return;

      startedForms.current.add(form);
      const formType = form.querySelector('[name="budget"]') ? "contact" : form.querySelector('[name="topic"]') ? "consultation" : "other";
      trackEvent("form_start", { form_type: formType, page_path: pathname });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.href.toLowerCase();
        if (href.includes("wa.me/") || href.includes("api.whatsapp.com/") || href.startsWith("whatsapp:")) {
          trackEvent("whatsapp_click", { page_path: pathname });
        }
      }

      if (!pathname.includes("/kalkulator")) return;
      const button = target.closest("button[type=\"button\"]");
      if (!(button instanceof HTMLButtonElement)) return;
      const inputSection = button.closest("section");
      if (!inputSection?.querySelector("#goods") || !inputSection.querySelector("#mode")) return;

      window.setTimeout(() => {
        const resultRegion = document.querySelector('section[aria-live="polite"]');
        if (!resultRegion?.querySelector("strong")) return;
        const mode = (document.querySelector("#mode") as HTMLSelectElement | null)?.value;
        const currency = (document.querySelector("#currency") as HTMLSelectElement | null)?.value;
        trackEvent("calculator_complete", { transport_mode: mode, currency, page_path: pathname });
      }, 0);
    };

    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick);
    };
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "all" || PRIVATE_PATH_RE.test(pathname)) return;
    const originalFetch = window.fetch;

    window.fetch = async (...args: Parameters<typeof window.fetch>) => {
      const [input, init] = args;
      const shouldObserve = isContactEndpoint(input);
      const qualification = shouldObserve ? formTypeFromBody(init?.body) : null;
      const response = await originalFetch(...args);

      if (shouldObserve && response.ok && qualification) {
        if (qualification.formType === "consultation") {
          trackEvent("consultation_submit", { page_path: pathname });
        } else {
          trackEvent("lead_submit", {
            page_path: pathname,
            budget_bucket: qualification.budget,
          });
        }
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [consent, pathname]);

  if (consent !== "all" || PRIVATE_PATH_RE.test(pathname)) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script id="bbs-ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${GA_ID}',{send_page_view:false,anonymize_ip:true});`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="bbs-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');`}
        </Script>
      )}
    </>
  );
}
