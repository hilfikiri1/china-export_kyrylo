"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { konsultacjaLayout } from "@/content/konsultacja-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getMessages } from "@/i18n/messages";
import { splitLocaleFromPathname } from "@/i18n/config";

const fieldClassName =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [topic, setTopic] = useState("full");
  const pathname = usePathname();
  const { locale } = splitLocaleFromPathname(pathname || "/");
  const messages = getMessages(locale);
  const { form } = konsultacjaLayout;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return;
    data.set("locale", locale);
    data.set("pageUrl", window.location.href);
    data.set("referrer", document.referrer);
    setSubmitting(true);
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, { method: "POST", body: data });
      } catch {
        // The current project has no confirmed backend. Keep the previous graceful UX.
      }
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-light/20 bg-navy-light/70 p-6 shadow-[0_0_64px_rgba(219,170,71,0.07)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(219,170,71,0.08)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10">
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
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-xl font-bold text-white">{form.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {form.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="topic" value={topic} />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="consultation-name" className="text-white/80">
                    {messages.forms.name}
                  </Label>
                  <Input
                    id="consultation-name"
                    name="name"
                    required
                    placeholder="Jan Kowalski"
                    className={fieldClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-email" className="text-white/80">
                    {messages.forms.email}
                  </Label>
                  <Input
                    id="consultation-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jan@firma.pl"
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="consultation-phone" className="text-white/80">
                    {messages.forms.phone}
                  </Label>
                  <Input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    className={fieldClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-method" className="text-white/80">
                    Preferowana forma kontaktu
                  </Label>
                  <select id="consultation-method" name="preferredMethod" className={cn("flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none", fieldClassName)}>
                    <option className="bg-navy-light text-white" value="phone">Telefon</option>
                    <option className="bg-navy-light text-white" value="whatsapp">WhatsApp</option>
                    <option className="bg-navy-light text-white" value="email">E-mail</option>
                    <option className="bg-navy-light text-white" value="meet">Google Meet / Zoom</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="consultation-date" className="text-white/80">
                    Preferowana data
                  </Label>
                  <Input id="consultation-date" name="preferredDate" type="date" className={fieldClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-time" className="text-white/80">
                    Zakres godzin
                  </Label>
                  <Input id="consultation-time" name="preferredTimeRange" placeholder="10:00-14:00" className={fieldClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultation-timezone" className="text-white/80">
                    Strefa czasowa
                  </Label>
                  <Input id="consultation-timezone" name="timezone" placeholder="Europe/Warsaw" className={fieldClassName} />
                </div>
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
                <Label htmlFor="consultation-notes" className="text-white/80">
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

              <Button
                type="submit"
                disabled={submitting}
                className="w-full border-accent-light/20 bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] sm:w-auto"
              >
                {submitting ? "..." : form.submitLabel}
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
