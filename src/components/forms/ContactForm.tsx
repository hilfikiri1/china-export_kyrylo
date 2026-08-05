"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { getKontaktLayout } from "@/content/i18n/kontakt";
import { useTranslation } from "@/i18n/LocaleProvider";
import { localizedPath, routes } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { locale, messages, t } = useTranslation();
  const { form } = getKontaktLayout(locale, messages, t);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitState === "submitting") return;

    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          language: locale,
          pageUrl: window.location.href,
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          topic: data.get("scope"),
          description: data.get("message"),
          consent: data.get("consent") === "on",
          _hp: data.get("_hp"),
        }),
      });

      if (res.ok) {
        setSubmitState("success");
        formEl.reset();
      } else {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (json.error === "too_many_requests") {
          setErrorMessage(
            "Zbyt wiele prób. Poczekaj chwilę i spróbuj ponownie.",
          );
        } else {
          setErrorMessage(form.error?.description ?? "Spróbuj ponownie później.");
        }
        setSubmitState("error");
      }
    } catch {
      setErrorMessage(form.error?.description ?? "Spróbuj ponownie później.");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="py-6 text-center sm:py-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light/15 text-accent-light">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="text-xl font-bold text-white">{form.success.title}</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            {form.success.description}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-8 border-white/20 bg-transparent text-white hover:bg-white/5"
            onClick={() => setSubmitState("idle")}
          >
            {form.sendAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{form.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {form.description}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="_hp"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-white/80">
              {form.fields?.name}{" "}
              <span className="text-accent-light">*</span>
            </Label>
            <Input
              id="contact-name"
              name="name"
              required
              placeholder={form.placeholders?.name}
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-company" className="text-white/80">
              {form.fields?.company}
            </Label>
            <Input
              id="contact-company"
              name="company"
              placeholder={form.placeholders?.company}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-white/80">
              {form.fields?.email}{" "}
              <span className="text-accent-light">*</span>
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder={form.placeholders?.email}
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-white/80">
              {form.fields?.phone}
            </Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder={form.placeholders?.phone}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-scope" className="text-white/80">
            {form.scopeLabel}
          </Label>
          <select
            id="contact-scope"
            name="scope"
            required
            defaultValue="full"
            className={cn(
              "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              fieldClassName,
            )}
          >
            {form.scopeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-navy-light text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message" className="text-white/80">
            {form.fields?.message}{" "}
            <span className="text-accent-light">*</span>
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder={form.placeholders?.message}
            className={fieldClassName}
          />
        </div>

        {/* Privacy consent */}
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-accent-light"
          />
          <Label
            htmlFor="contact-consent"
            className="text-xs leading-relaxed text-white/50"
          >
            {messages.common.privacyConsent}{" "}
            <Link
              href={localizedPath(locale, routes.privacy)}
              className="text-accent-light/80 underline underline-offset-2 hover:text-accent-light"
              target="_blank"
            >
              {messages.common.privacyPolicy}
            </Link>
            . <span className="text-accent-light">*</span>
          </Label>
        </div>

        {submitState === "error" && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <strong className="block font-medium">{form.error?.title}</strong>
            {errorMessage && (
              <span className="mt-0.5 block text-red-400/80">
                {errorMessage}
              </span>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={submitState === "submitting"}
          className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              {messages.common.loading}
            </>
          ) : (
            form.submitLabel
          )}
        </Button>
      </form>
    </div>
  );
}
