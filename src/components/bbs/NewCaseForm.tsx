"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldCls =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

const CATEGORIES = [
  "Maszyny i urządzenia",
  "Maszyny budowlane",
  "Pojazdy elektryczne",
  "Opakowania i surowce",
  "Gastronomia i naczynia",
  "Logistyka i spedycja",
  "Projekt niestandardowy",
  "Inne",
];

export function NewCaseForm({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const [previewSlug, setPreviewSlug] = useState("");

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
        <p className="font-semibold text-white">Gotowe (podgląd lokalny)</p>
        <p className="mt-2 text-sm text-white/60">
          Case zapisany lokalnie do podglądu. Trwałe opublikowanie na stronie wymaga przyszłej integracji z CMS lub Notion.
        </p>
        <p className="mt-3 text-xs text-white/40">
          Podgląd publiczny:{" "}
          <a
            href={`/${locale}/realizacje/${previewSlug}`}
            className="text-accent-light/80 underline"
          >
            /{locale}/realizacje/{previewSlug}
          </a>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-white/20 bg-transparent text-white hover:bg-white/5"
          onClick={() => setSubmitted(false)}
        >
          Dodaj kolejny
        </Button>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPreviewSlug(String(data.get("slug") || "nowy-case"));
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* UWAGA */}
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400/80">
        Dane nie są zapisywane trwale — tylko podgląd lokalny.
        Zapis produkcyjny wymaga podłączenia CMS / Notion (zaplanowane).
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-client" className="text-white/80">
          Etykieta klienta (anonimizowana) <span className="text-accent-light">*</span>
        </Label>
        <Input id="cc-client" name="clientLabel" required placeholder="np. Polski importer, branża metalowa" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-title" className="text-white/80">
          Tytuł case&apos;u <span className="text-accent-light">*</span>
        </Label>
        <Input id="cc-title" name="title" required placeholder="np. Import maszyn CNC — dostawa do Polski" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-slug" className="text-white/80">
          Slug URL <span className="text-accent-light">*</span>
        </Label>
        <Input id="cc-slug" name="slug" required placeholder="np. import-maszyn-cnc-polska" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-category" className="text-white/80">
          Kategoria
        </Label>
        <select
          id="cc-category"
          name="category"
          className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-navy-light text-white">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-country" className="text-white/80">Kraj docelowy</Label>
        <Input id="cc-country" name="country" placeholder="np. Polska" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-challenge" className="text-white/80">
          Potrzeba klienta <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="cc-challenge" name="challenge" rows={3} required placeholder="Co klient chciał osiągnąć lub znaleźć?" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-work" className="text-white/80">
          Co zrobił B&amp;BS <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="cc-work" name="work" rows={4} required placeholder="Wyszukiwanie producenta, weryfikacja, kontrola jakości, logistyka..." className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-result" className="text-white/80">
          Rezultat <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="cc-result" name="result" rows={3} required placeholder="Dostawa, termin, spełnione parametry techniczne..." className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-outcome" className="text-white/80">Zadowolenie klienta / efekt końcowy</Label>
        <Textarea id="cc-outcome" name="outcome" rows={2} placeholder="np. Klient uruchomił produkcję zgodnie z harmonogramem." className={fieldCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cc-value" className="text-white/80">Wartość zamówienia (opcjonalnie)</Label>
          <Input id="cc-value" name="orderValue" placeholder="np. 45 000 EUR" className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc-delivery" className="text-white/80">Metoda dostawy (opcjonalnie)</Label>
          <Input id="cc-delivery" name="deliveryMethod" placeholder="np. Morze FCL 20ft" className={fieldCls} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-date" className="text-white/80">Data publikacji</Label>
        <Input id="cc-date" name="publishedAt" type="date" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-cover" className="text-white/80">URL zdjęcia głównego</Label>
        <Input id="cc-cover" name="coverImage" type="url" placeholder="https://..." className={fieldCls} />
        <p className="text-xs text-white/30">Ścieżka lokalna (np. /case-studies/...) lub URL zewnętrzny.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-video" className="text-white/80">URL wideo (opcjonalnie)</Label>
        <Input id="cc-video" name="videoUrl" type="url" placeholder="https://..." className={fieldCls} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="cc-visible"
          name="published"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-light"
        />
        <Label htmlFor="cc-visible" className="text-sm text-white/80">
          Opublikowany (widoczny publicznie)
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
      >
        Zapisz (podgląd lokalny)
      </Button>
    </form>
  );
}
