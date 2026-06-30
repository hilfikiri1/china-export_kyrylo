"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

const fieldClassName =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

type Status = "idle" | "submitting" | "success" | "error";

const SCOPE_OPTIONS = [
  "sourcing",
  "verification",
  "qc",
  "oem",
  "consolidation",
  "freight",
  "full",
  "other",
] as const;

const CONTACT_METHODS = ["email", "phone", "whatsapp"] as const;
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const selectClassName = cn(
  "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  fieldClassName,
);

export function ConsultationForm() {
  const t = useT();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const metaRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const meta: Record<string, string> = {
      locale,
      page: window.location.pathname,
    };
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) meta[key] = value;
    }
    if (document.referrer) meta.referrer = document.referrer;
    try {
      meta.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      /* ignore */
    }
    metaRef.current = meta;
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    if ((formData.get("company_website") as string)?.length) {
      setStatus("success");
      form.reset();
      return;
    }
    if (!consent) return;

    setStatus("submitting");
    const payload: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );
    delete payload.company_website;
    payload.meta = metaRef.current;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
      } else {
        console.warn("NEXT_PUBLIC_FORM_ENDPOINT is not set; form not delivered.");
      }
      setStatus("success");
      form.reset();
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-light/20 bg-navy-light/70 p-6 shadow-[0_0_64px_rgba(219,170,71,0.07)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(219,170,71,0.08)_0%,transparent_60%)]"
        aria-hidden
      />
      <div className="relative z-10">
        {status === "success" ? (
          <div className="py-6 text-center sm:py-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light/15 text-accent-light">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="text-xl font-bold text-white">{t("form.success.title")}</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {t("form.success.description")}
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-8 border-white/20 bg-transparent text-white hover:bg-white/5"
              onClick={() => setStatus("idle")}
            >
              {t("form.sendAnother")}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-xl font-bold text-white">
                {t("consultationPage.heading")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {t("consultationPage.supporting")}
              </p>
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold">{t("form.error.title")}</p>
                  <p className="mt-1 text-red-100/80">{t("form.error.description")}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="hidden" aria-hidden>
                <label htmlFor="cons-company-website">Company website</label>
                <input
                  id="cons-company-website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cons-name" className="text-white/80">
                    {t("form.labels.name")}
                  </Label>
                  <Input id="cons-name" name="name" required placeholder={t("form.placeholders.name")} className={fieldClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cons-email" className="text-white/80">
                    {t("form.labels.email")}
                  </Label>
                  <Input id="cons-email" name="email" type="email" required placeholder={t("form.placeholders.email")} className={fieldClassName} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cons-phone" className="text-white/80">
                    {t("form.labels.phone")}
                  </Label>
                  <Input id="cons-phone" name="phone" type="tel" placeholder={t("form.placeholders.phone")} className={fieldClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cons-method" className="text-white/80">
                    {t("form.labels.contactMethod")}
                  </Label>
                  <select id="cons-method" name="contactMethod" defaultValue="email" className={selectClassName}>
                    {CONTACT_METHODS.map((m) => (
                      <option key={m} value={m} className="bg-navy-light text-white">
                        {t(`form.contactMethodOptions.${m}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cons-date" className="text-white/80">
                    {t("form.labels.preferredDate")}
                  </Label>
                  <Input id="cons-date" name="preferredDate" type="date" className={fieldClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cons-time" className="text-white/80">
                    {t("form.labels.preferredTime")}
                  </Label>
                  <Input id="cons-time" name="preferredTime" placeholder="9:00–17:00" className={fieldClassName} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cons-category" className="text-white/80">
                  {t("form.labels.scope")}
                </Label>
                <select id="cons-category" name="category" defaultValue="full" className={selectClassName}>
                  {SCOPE_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-navy-light text-white">
                      {t(`form.scopeOptions.${option}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cons-notes" className="text-white/80">
                  {t("form.labels.message")}
                </Label>
                <Textarea
                  id="cons-notes"
                  name="notes"
                  rows={3}
                  placeholder={t("form.placeholders.notes")}
                  className={fieldClassName}
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 accent-accent-light"
                />
                <span>
                  {t("form.consent")}{" "}
                  <Link
                    href={localeHref(locale, "/polityka-prywatnosci")}
                    className="font-medium text-accent-light/90 underline-offset-2 hover:underline"
                  >
                    {t("form.consentLink")}
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={!consent || status === "submitting"}
                className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:opacity-50 sm:w-auto"
              >
                {status === "submitting" ? t("form.submitting") : t("consultationPage.cta")}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
