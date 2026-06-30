"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
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

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type TrackingMeta = Record<string, string>;

export function ContactForm() {
  const t = useT();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const metaRef = useRef<TrackingMeta>({});

  useEffect(() => {
    const meta: TrackingMeta = { locale, page: window.location.pathname };
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) meta[key] = value;
    }
    if (document.referrer) meta.referrer = document.referrer;
    metaRef.current = meta;
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // prevent duplicate submissions

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — silently accept bots without sending.
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
        // No backend configured yet — see CONTENT_EDITING_GUIDE.md
        // (set NEXT_PUBLIC_FORM_ENDPOINT). Avoid losing the lead silently.
        console.warn("NEXT_PUBLIC_FORM_ENDPOINT is not set; form not delivered.");
      }
      setStatus("success");
      form.reset();
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
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
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{t("contactPage.heading")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {t("contactPage.supporting")}
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
        {/* Honeypot field — hidden from users */}
        <div className="hidden" aria-hidden>
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="contact-name" name="name" label={t("form.labels.name")} required placeholder={t("form.placeholders.name")} />
          <Field id="contact-company" name="company" label={t("form.labels.company")} placeholder={t("form.placeholders.company")} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="contact-email" name="email" type="email" label={t("form.labels.email")} required placeholder={t("form.placeholders.email")} />
          <Field id="contact-phone" name="phone" type="tel" label={t("form.labels.phone")} placeholder={t("form.placeholders.phone")} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="contact-country" name="country" label={t("form.labels.country")} />
          <Field id="contact-city" name="city" label={t("form.labels.city")} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="contact-product" name="product" label={t("form.labels.product")} />
          <Field id="contact-quantity" name="quantity" label={t("form.labels.quantity")} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="contact-budget" name="budget" label={t("form.labels.budget")} />
          <Field id="contact-deadline" name="deadline" label={t("form.labels.deadline")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-scope" className="text-white/80">
            {t("form.labels.scope")}
          </Label>
          <select
            id="contact-scope"
            name="scope"
            defaultValue="full"
            className={cn(
              "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              fieldClassName,
            )}
          >
            {SCOPE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-navy-light text-white">
                {t(`form.scopeOptions.${option}`)}
              </option>
            ))}
          </select>
        </div>

        <Field id="contact-product-link" name="productLink" type="url" label={t("form.labels.productLink")} />

        <div className="space-y-2">
          <Label htmlFor="contact-message" className="text-white/80">
            {t("form.labels.message")}
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder={t("form.placeholders.message")}
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
          className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:opacity-50"
        >
          {status === "submitting" ? t("form.submitting") : t("form.submit")}
        </Button>
      </form>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white/80">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClassName}
      />
    </div>
  );
}
