"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { getKonsultacjaLayout } from "@/content/i18n/konsultacja-layout";
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

export function ConsultationForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [topic, setTopic] = useState("full");
  const formRef = useRef<HTMLFormElement>(null);
  const { locale, messages } = useTranslation();
  const { form } = getKonsultacjaLayout(messages, locale);

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
          formType: "consultation",
          language: locale,
          pageUrl: window.location.href,
          name: data.get("name"),
          company: "",
          email: data.get("email"),
          phone: data.get("phone"),
          topic,
          description: data.get("notes"),
          consent: data.get("consent") === "on",
          _hp: data.get("_hp"),
        }),
      });

      if (res.ok) {
        setSubmitState("success");
        formEl.reset();
        setTopic("full");
      } else {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (json.error === "too_many_requests") {
          setErrorMessage(
            "Zbyt wiele prób. Poczekaj chwilę i spróbuj ponownie.",
          );
        } else {
          setErrorMessage("Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio.");
        }
        setSubmitState("error");
      }
    } catch {
      setErrorMessage("Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio.");
      setSubmitState("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-light/20 bg-navy-light/70 p-6 shadow-[0_0_64px_rgba(219,170,71,0.07)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(219,170,71,0.08)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10">
        {submitState === "success" ? (
          <div className="py-6 text-center sm:py-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light/15 text-accent-light">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="text-xl font-bold text-white">
              {form.success.title}
            </h2>
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
        ) : (
          <>
            <div className="mb-6 text-center sm:text-left">
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
              <input type="hidden" name="topic" value={topic} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="consultation-name"
                    className="text-white/80"
                  >
                    {form.fields.name}{" "}
                    <span className="text-accent-light">*</span>
                  </Label>
                  <Input
                    id="consultation-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={form.placeholders.name}
                    className={fieldClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="consultation-email"
                    className="text-white/80"
                  >
                    {form.fields.email}{" "}
                    <span className="text-accent-light">*</span>
                  </Label>
                  <Input
                    id="consultation-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder={form.placeholders.email}
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-phone" className="text-white/80">
                  {messages.common.phone}
                </Label>
                <Input
                  id="consultation-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+48 783 232 971"
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">{form.topicLabel}</Label>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label={form.topicLabel}
                >
                  {form.topicOptions.map((option) => {
                    const isActive = topic === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setTopic(option.value)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm",
                          isActive
                            ? "border-accent-light/50 bg-accent-light/15 text-accent-light"
                            : "border-white/10 bg-navy-light/40 text-white/60 hover:border-white/20 hover:text-white/80",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="consultation-notes"
                  className="text-white/80"
                >
                  {form.notesLabel}
                </Label>
                <Textarea
                  id="consultation-notes"
                  name="notes"
                  rows={3}
                  placeholder={form.notesPlaceholder}
                  className={fieldClassName}
                />
              </div>

              {/* Privacy consent */}
              <div className="flex items-start gap-3">
                <input
                  id="consultation-consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-accent-light"
                />
                <Label
                  htmlFor="consultation-consent"
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
                  <strong className="block font-medium">
                    Nie udało się wysłać formularza
                  </strong>
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
                className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitState === "submitting" ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden
                    />
                    {messages.common.loading}
                  </>
                ) : (
                  form.submitLabel
                )}
              </Button>

              <p className="text-center text-xs text-white/40 sm:text-left">
                {form.footnote}{" "}
                <Link
                  href={form.footnoteLink.href}
                  className="font-medium text-accent-light/80 transition-colors hover:text-accent-light"
                >
                  {form.footnoteLink.label}
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
