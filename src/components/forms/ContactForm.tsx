"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { getKontaktLayout } from "@/content/i18n/kontakt";
import { useTranslation } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldClassName =
  "light-form-field border-white/15 bg-white/5 text-white placeholder:text-white/30";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { locale, messages, t } = useTranslation();
  const { form } = getKontaktLayout(locale, messages, t);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-form-panel rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
      {submitted ? (
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
            onClick={() => setSubmitted(false)}
          >
            {form.sendAnother}
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{form.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {form.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-white/80">
                  {form.fields?.name}
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
                  {form.fields?.email}
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
                {form.fields?.message}
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

            <Button
              type="submit"
              className="gold-cta w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
            >
              {form.submitLabel}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
