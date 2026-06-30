"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { kontaktLayout } from "@/content/kontakt-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getMessages } from "@/i18n/messages";
import { splitLocaleFromPathname } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import Link from "next/link";

const fieldClassName =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const pathname = usePathname();
  const { locale } = splitLocaleFromPathname(pathname || "/");
  const messages = getMessages(locale);
  const { form } = kontaktLayout;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const data = new FormData(e.currentTarget);
    if (data.get("website")) return;

    setSubmitting(true);
    setError(false);

    data.set("locale", locale);
    data.set("pageUrl", window.location.href);
    data.set("referrer", document.referrer);
    const currentSearchParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
      data.set(key, currentSearchParams.get(key) ?? "");
    });

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          body: data,
        });
        if (!response.ok) throw new Error("Form submission failed");
      }
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-6 shadow-xl shadow-black/20 sm:p-8">
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
            {messages.forms.submitAgain}
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
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="pageUrl" value={pathname || ""} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-white/80">
                  {messages.forms.name}
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  placeholder={messages.forms.name}
                  className={fieldClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-company" className="text-white/80">
                  {messages.forms.company}
                </Label>
                <Input
                  id="contact-company"
                  name="company"
                  placeholder={messages.forms.company}
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-white/80">
                  {messages.forms.email}
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className={fieldClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-white/80">
                  {messages.forms.phone}
                </Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+48 783 232 971"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-country" className="text-white/80">
                  {messages.forms.country}
                </Label>
                <Input id="contact-country" name="country" className={fieldClassName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-delivery" className="text-white/80">
                  {messages.forms.deliveryCity}
                </Label>
                <Input id="contact-delivery" name="deliveryCity" className={fieldClassName} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-product" className="text-white/80">
                  {messages.forms.product}
                </Label>
                <Input id="contact-product" name="product" required className={fieldClassName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-quantity" className="text-white/80">
                  {messages.forms.quantity}
                </Label>
                <Input id="contact-quantity" name="quantity" className={fieldClassName} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-budget" className="text-white/80">
                  {messages.forms.budget}
                </Label>
                <Input id="contact-budget" name="budget" className={fieldClassName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-deadline" className="text-white/80">
                  {messages.forms.deadline}
                </Label>
                <Input id="contact-deadline" name="deadline" className={fieldClassName} />
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
                {messages.forms.message}
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder={`${messages.forms.product}, ${messages.forms.quantity}, ${messages.forms.deadline}...`}
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-product-link" className="text-white/80">
                {messages.forms.productLink}
              </Label>
              <Input
                id="contact-product-link"
                name="productLink"
                type="url"
                placeholder="https://"
                className={fieldClassName}
              />
            </div>

            <label className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-white/60">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span>
                {messages.forms.consent}{" "}
                <Link href={localizePath("/polityka-prywatnosci", locale)} className="text-accent-light underline">
                  {messages.forms.privacyPolicy}
                </Link>
              </span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100" role="alert">
                <strong>{messages.forms.errorTitle}</strong>
                <p>{messages.forms.errorText}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
            >
              {submitting ? "..." : form.submitLabel}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
