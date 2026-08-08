"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { getKontaktLayout } from "@/content/i18n/kontakt";
import { useTranslation } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ExtraCopy = {
  product: string;
  productPlaceholder: string;
  quantity: string;
  quantityPlaceholder: string;
  budget: string;
  budgetHint: string;
  destination: string;
  destinationPlaceholder: string;
  deadline: string;
  deadlinePlaceholder: string;
  attachments: string;
  attachmentHint: string;
  tooManyFiles: string;
  filesTooLarge: string;
};

const extraCopy: Record<Locale, ExtraCopy> = {
  pl: {
    product: "Produkt",
    productPlaceholder: "np. generator gazowy 250 kW",
    quantity: "Planowana ilość",
    quantityPlaceholder: "np. 4 szt. / 1 kontener",
    budget: "Orientacyjny budżet projektu",
    budgetHint: "Obsługujemy projekty od 5 000 USD. Zamówień poniżej tej wartości nie realizujemy.",
    destination: "Kraj / miasto dostawy",
    destinationPlaceholder: "np. Polska, Poznań",
    deadline: "Oczekiwany termin",
    deadlinePlaceholder: "np. listopad 2026",
    attachments: "Załączniki (opcjonalnie)",
    attachmentHint: "Zdjęcia, PDF, DOC/DOCX lub XLS/XLSX. Maks. 3 pliki, łącznie do 3,5 MB.",
    tooManyFiles: "Możesz dodać maksymalnie 3 załączniki.",
    filesTooLarge: "Łączny rozmiar załączników nie może przekraczać 3,5 MB.",
  },
  en: {
    product: "Product",
    productPlaceholder: "e.g. 250 kW gas generator",
    quantity: "Planned quantity",
    quantityPlaceholder: "e.g. 4 pcs / 1 container",
    budget: "Estimated project budget",
    budgetHint: "We work with projects from USD 5,000. We do not handle orders below this value.",
    destination: "Delivery country / city",
    destinationPlaceholder: "e.g. Poland, Poznań",
    deadline: "Expected timeline",
    deadlinePlaceholder: "e.g. November 2026",
    attachments: "Attachments (optional)",
    attachmentHint: "Images, PDF, DOC/DOCX or XLS/XLSX. Up to 3 files, 3.5 MB total.",
    tooManyFiles: "You can add up to 3 attachments.",
    filesTooLarge: "The total attachment size cannot exceed 3.5 MB.",
  },
  uk: {
    product: "Товар / обладнання",
    productPlaceholder: "напр. газовий генератор 250 кВт",
    quantity: "Планована кількість",
    quantityPlaceholder: "напр. 4 шт. / 1 контейнер",
    budget: "Орієнтовний бюджет проєкту",
    budgetHint: "Ми працюємо з проєктами від 5 000 USD. Замовлення нижче цієї суми не беремо.",
    destination: "Країна / місто доставки",
    destinationPlaceholder: "напр. Україна, Львів",
    deadline: "Бажаний термін",
    deadlinePlaceholder: "напр. листопад 2026",
    attachments: "Файли (необов’язково)",
    attachmentHint: "Фото, PDF, DOC/DOCX або XLS/XLSX. До 3 файлів, разом до 3,5 МБ.",
    tooManyFiles: "Можна додати максимум 3 файли.",
    filesTooLarge: "Загальний розмір файлів не може перевищувати 3,5 МБ.",
  },
  ru: {
    product: "Товар / оборудование",
    productPlaceholder: "например, газовый генератор 250 кВт",
    quantity: "Планируемое количество",
    quantityPlaceholder: "например, 4 шт. / 1 контейнер",
    budget: "Ориентировочный бюджет проекта",
    budgetHint: "Мы работаем с проектами от 5 000 USD. Заказы ниже этой суммы не берем.",
    destination: "Страна / город доставки",
    destinationPlaceholder: "например, Польша, Варшава",
    deadline: "Желаемый срок",
    deadlinePlaceholder: "например, ноябрь 2026",
    attachments: "Файлы (необязательно)",
    attachmentHint: "Фото, PDF, DOC/DOCX или XLS/XLSX. До 3 файлов, суммарно до 3,5 МБ.",
    tooManyFiles: "Можно добавить максимум 3 файла.",
    filesTooLarge: "Общий размер файлов не может превышать 3,5 МБ.",
  },
  de: {
    product: "Produkt",
    productPlaceholder: "z. B. 250-kW-Gasgenerator",
    quantity: "Geplante Menge",
    quantityPlaceholder: "z. B. 4 Stk. / 1 Container",
    budget: "Geschätztes Projektbudget",
    budgetHint: "Wir betreuen Projekte ab 5.000 USD. Kleinere Bestellungen übernehmen wir nicht.",
    destination: "Lieferland / Stadt",
    destinationPlaceholder: "z. B. Deutschland, Berlin",
    deadline: "Gewünschter Termin",
    deadlinePlaceholder: "z. B. November 2026",
    attachments: "Anhänge (optional)",
    attachmentHint: "Bilder, PDF, DOC/DOCX oder XLS/XLSX. Max. 3 Dateien, insgesamt 3,5 MB.",
    tooManyFiles: "Sie können maximal 3 Anhänge hinzufügen.",
    filesTooLarge: "Die Anhänge dürfen zusammen höchstens 3,5 MB groß sein.",
  },
  zh: {
    product: "产品 / 设备",
    productPlaceholder: "例如：250 kW 燃气发电机",
    quantity: "计划数量",
    quantityPlaceholder: "例如：4台 / 1个集装箱",
    budget: "预计项目预算",
    budgetHint: "我们承接5,000美元起的项目，低于该金额的订单暂不受理。",
    destination: "目的国家 / 城市",
    destinationPlaceholder: "例如：波兰，华沙",
    deadline: "期望时间",
    deadlinePlaceholder: "例如：2026年11月",
    attachments: "附件（可选）",
    attachmentHint: "支持图片、PDF、DOC/DOCX、XLS/XLSX。最多3个文件，总计不超过3.5 MB。",
    tooManyFiles: "最多可添加3个附件。",
    filesTooLarge: "附件总大小不能超过3.5 MB。",
  },
};

const fieldClassName =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

const budgetOptions = [
  { value: "5k-10k", label: "$5 000–10 000" },
  { value: "10k-20k", label: "$10 000–20 000" },
  { value: "20k+", label: "$20 000+" },
] as const;

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { locale, messages, t } = useTranslation();
  const { form } = getKontaktLayout(locale, messages, t);
  const extra = extraCopy[locale];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitState === "submitting") return;

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const files = data
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (files.length > 3) {
      setErrorMessage(extra.tooManyFiles);
      setSubmitState("error");
      return;
    }
    if (files.reduce((sum, file) => sum + file.size, 0) > 3_500_000) {
      setErrorMessage(extra.filesTooLarge);
      setSubmitState("error");
      return;
    }

    const text = (name: string) => {
      const value = data.get(name);
      return typeof value === "string" ? value : "";
    };

    const body = new FormData();
    body.set("formType", "contact");
    body.set("language", locale);
    body.set("pageUrl", window.location.href);
    body.set("name", text("name"));
    body.set("company", text("company"));
    body.set("email", text("email"));
    body.set("phone", text("phone"));
    body.set("topic", text("scope"));
    body.set("product", text("product"));
    body.set("quantity", text("quantity"));
    body.set("budget", text("budget"));
    body.set("destination", text("destination"));
    body.set("deadline", text("deadline"));
    body.set("description", text("message"));
    body.set("consent", data.get("consent") === "on" ? "true" : "false");
    body.set("_hp", text("_hp"));
    files.forEach((file) => body.append("attachments", file, file.name));

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body,
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
            locale === "pl"
              ? "Zbyt wiele prób. Poczekaj chwilę i spróbuj ponownie."
              : form.error?.description ?? "Try again later.",
          );
        } else if (json.error === "attachments_too_large") {
          setErrorMessage(extra.filesTooLarge);
        } else if (json.error === "too_many_attachments") {
          setErrorMessage(extra.tooManyFiles);
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
              {form.fields?.name}{" "}<span className="text-accent-light">*</span>
            </Label>
            <Input id="contact-name" name="name" required autoComplete="name" placeholder={form.placeholders?.name} className={fieldClassName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-company" className="text-white/80">{form.fields?.company}</Label>
            <Input id="contact-company" name="company" autoComplete="organization" placeholder={form.placeholders?.company} className={fieldClassName} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-white/80">
              {form.fields?.email}{" "}<span className="text-accent-light">*</span>
            </Label>
            <Input id="contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder={form.placeholders?.email} className={fieldClassName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-white/80">{form.fields?.phone}</Label>
            <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder={form.placeholders?.phone} className={fieldClassName} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-scope" className="text-white/80">{form.scopeLabel}</Label>
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
              <option key={option.value} value={option.value} className="bg-navy-light text-white">{option.label}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-product" className="text-white/80">{extra.product}</Label>
            <Input id="contact-product" name="product" placeholder={extra.productPlaceholder} className={fieldClassName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-quantity" className="text-white/80">{extra.quantity}</Label>
            <Input id="contact-quantity" name="quantity" placeholder={extra.quantityPlaceholder} className={fieldClassName} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-budget" className="text-white/80">
            {extra.budget}{" "}<span className="text-accent-light">*</span>
          </Label>
          <select
            id="contact-budget"
            name="budget"
            required
            defaultValue=""
            className={cn(
              "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              fieldClassName,
            )}
          >
            <option value="" disabled className="bg-navy-light text-white/50">—</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-navy-light text-white">{option.label}</option>
            ))}
          </select>
          <p className="text-xs leading-relaxed text-accent-light/80">{extra.budgetHint}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-destination" className="text-white/80">{extra.destination}</Label>
            <Input id="contact-destination" name="destination" placeholder={extra.destinationPlaceholder} className={fieldClassName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-deadline" className="text-white/80">{extra.deadline}</Label>
            <Input id="contact-deadline" name="deadline" placeholder={extra.deadlinePlaceholder} className={fieldClassName} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message" className="text-white/80">
            {form.fields?.message}{" "}<span className="text-accent-light">*</span>
          </Label>
          <Textarea id="contact-message" name="message" rows={5} required placeholder={form.placeholders?.message} className={fieldClassName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-attachments" className="flex items-center gap-2 text-white/80">
            <Paperclip className="h-4 w-4 text-accent-light" aria-hidden />
            {extra.attachments}
          </Label>
          <Input
            id="contact-attachments"
            name="attachments"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx"
            className={`${fieldClassName} h-auto py-2 file:mr-3 file:rounded-md file:border-0 file:bg-accent-light/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent-light`}
          />
          <p className="text-xs leading-relaxed text-white/40">{extra.attachmentHint}</p>
        </div>

        <div className="flex items-start gap-3">
          <input id="contact-consent" name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-accent-light" />
          <Label htmlFor="contact-consent" className="text-xs leading-relaxed text-white/50">
            {messages.common.privacyConsent}{" "}
            <Link href={localizedPath(locale, routes.privacy)} className="text-accent-light/80 underline underline-offset-2 hover:text-accent-light" target="_blank">
              {messages.common.privacyPolicy}
            </Link>
            . <span className="text-accent-light">*</span>
          </Label>
        </div>

        {submitState === "error" && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <strong className="block font-medium">{form.error?.title}</strong>
            {errorMessage && <span className="mt-0.5 block text-red-400/80">{errorMessage}</span>}
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
