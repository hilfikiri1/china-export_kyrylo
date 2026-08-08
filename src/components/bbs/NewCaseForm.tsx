"use client";

import { useActionState } from "react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createCaseAction,
  initialNewCaseState,
} from "@/app/[locale]/bbs/nowy-case/actions";

const fieldCls =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

const CATEGORIES = [
  "Maszyny i urządzenia",
  "Maszyny budowlane",
  "Pojazdy elektryczne",
  "Technologie akumulatorowe",
  "Opakowania i surowce",
  "Private Label",
  "Gastronomia i naczynia",
  "Logistyka i spedycja",
  "Sourcing w Chinach",
  "Projekt niestandardowy",
  "Inne",
];

const COUNTRIES = [
  "Polska",
  "Ukraina",
  "Niemcy",
  "Łotwa",
  "Bułgaria",
  "Hiszpania",
  "Chiny",
  "Inny",
];

export function NewCaseForm({ locale }: { locale: Locale }) {
  const [state, formAction, pending] = useActionState(
    createCaseAction,
    initialNewCaseState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <p className="font-semibold text-white">Case zapisany</p>
        <p className="mt-2 text-sm text-white/65">{state.message}</p>

        <div className="mt-4 space-y-2 text-sm">
          {state.published && state.slug && (
            <p>
              <span className="text-white/40">Strona publiczna: </span>
              <a
                href={`/pl/realizacje/${state.slug}`}
                className="text-accent-light underline underline-offset-2"
              >
                /pl/realizacje/{state.slug}
              </a>
            </p>
          )}
          {state.notionUrl && (
            <p>
              <span className="text-white/40">Notion: </span>
              <a
                href={state.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light underline underline-offset-2"
              >
                otwórz zapisany case
              </a>
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`/${locale}/bbs/nowy-case`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Dodaj kolejny
          </a>
          <a
            href={`/${locale}/bbs`}
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm text-white/60 transition-colors hover:text-white"
          >
            Wróć do panelu
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="rounded-lg border border-accent-light/20 bg-accent-light/5 px-4 py-3 text-xs text-white/60">
        Formularz zapisuje case bezpośrednio do Notion. Publiczna sekcja Realizacje korzysta z rekordów
        oznaczonych jako <span className="font-semibold text-white">Published</span>. Obecnie nowe case&apos;y
        publikujemy w polskiej wersji strony.
      </div>

      {state.status === "error" && (
        <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="cc-client" className="text-white/80">
          Etykieta klienta (anonimizowana) <span className="text-accent-light">*</span>
        </Label>
        <Input
          id="cc-client"
          name="clientLabel"
          required
          placeholder="np. Polski importer, branża metalowa"
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-title" className="text-white/80">
          Tytuł case&apos;u <span className="text-accent-light">*</span>
        </Label>
        <Input
          id="cc-title"
          name="title"
          required
          placeholder="np. Import maszyn CNC — dostawa do Polski"
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-slug" className="text-white/80">
          Slug URL <span className="text-accent-light">*</span>
        </Label>
        <Input
          id="cc-slug"
          name="slug"
          required
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          placeholder="np. import-maszyn-cnc-polska"
          className={fieldCls}
        />
        <p className="text-xs text-white/30">Małe litery, cyfry i myślniki. Slug musi być unikalny.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-excerpt" className="text-white/80">
          Krótki opis / Excerpt <span className="text-accent-light">*</span>
        </Label>
        <Textarea
          id="cc-excerpt"
          name="excerpt"
          rows={2}
          required
          placeholder="1–2 zdania widoczne na karcie realizacji."
          className={fieldCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cc-category" className="text-white/80">
            Kategoria <span className="text-accent-light">*</span>
          </Label>
          <select
            id="cc-category"
            name="category"
            required
            className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-navy-light text-white">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cc-country" className="text-white/80">Kraj docelowy</Label>
          <select
            id="cc-country"
            name="country"
            defaultValue="Polska"
            className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {COUNTRIES.map((country) => (
              <option key={country} value={country} className="bg-navy-light text-white">
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-challenge" className="text-white/80">
          Zadanie / potrzeba klienta <span className="text-accent-light">*</span>
        </Label>
        <Textarea
          id="cc-challenge"
          name="challenge"
          rows={3}
          required
          placeholder="Co klient chciał osiągnąć, znaleźć lub wyprodukować?"
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-requirements" className="text-white/80">
          Główne wymagania <span className="text-accent-light">*</span>
        </Label>
        <Textarea
          id="cc-requirements"
          name="requirements"
          rows={5}
          required
          placeholder={"Każde wymaganie w nowym wierszu, np.:\nMoc 250 kW\nCE dla rynku UE\nDostawa DAP Polska"}
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-work" className="text-white/80">
          Co zrobiliśmy <span className="text-accent-light">*</span>
        </Label>
        <Textarea
          id="cc-work"
          name="work"
          rows={5}
          required
          placeholder={"Każdy krok w nowym wierszu, np.:\nWyszukaliśmy 8 producentów\nZweryfikowaliśmy 3 fabryki\nPrzeprowadziliśmy kontrolę jakości"}
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-products" className="text-white/80">Wyprodukowane produkty</Label>
        <Textarea
          id="cc-products"
          name="products"
          rows={4}
          placeholder="Każdy produkt / element w nowym wierszu."
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-result" className="text-white/80">
          Rezultat <span className="text-accent-light">*</span>
        </Label>
        <Textarea
          id="cc-result"
          name="result"
          rows={3}
          required
          placeholder="Dostawa, termin, spełnione parametry techniczne, oszczędność lub efekt projektu."
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-outcome" className="text-white/80">Zadowolenie klienta / efekt końcowy</Label>
        <Textarea
          id="cc-outcome"
          name="outcome"
          rows={2}
          placeholder="np. Klient uruchomił produkcję zgodnie z harmonogramem."
          className={fieldCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cc-value" className="text-white/80">Wartość zamówienia USD</Label>
          <Input
            id="cc-value"
            name="orderValueUsd"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="np. 45000"
            className={fieldCls}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc-delivery" className="text-white/80">Metoda dostawy</Label>
          <Input
            id="cc-delivery"
            name="deliveryMethod"
            placeholder="np. Morze FCL 20ft"
            className={fieldCls}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-date" className="text-white/80">Data publikacji</Label>
        <Input id="cc-date" name="publishedAt" type="date" className={fieldCls} />
        <p className="text-xs text-white/30">Jeżeli zostawisz puste, system wpisze dzisiejszą datę.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-cover" className="text-white/80">Zdjęcie główne — ścieżka / URL</Label>
        <Input
          id="cc-cover"
          name="coverImage"
          type="text"
          placeholder="/cases/nazwa-projektu.jpg"
          className={fieldCls}
        />
        <p className="text-xs text-white/30">
          Najbezpieczniej użyć pliku z katalogu public, np. /cases/...; obsługiwane są też obrazy Notion/S3 i Unsplash.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-gallery" className="text-white/80">Galeria — ścieżki / URL</Label>
        <Textarea
          id="cc-gallery"
          name="galleryUrls"
          rows={4}
          placeholder={"/cases/projekt-1.jpg\n/cases/projekt-2.jpg"}
          className={fieldCls}
        />
        <p className="text-xs text-white/30">Jeden obraz w każdym wierszu.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cc-video" className="text-white/80">URL wideo</Label>
        <Input
          id="cc-video"
          name="videoUrl"
          type="url"
          placeholder="https://..."
          className={fieldCls}
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-3">
          <input
            id="cc-featured"
            name="featured"
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-light"
          />
          <Label htmlFor="cc-featured" className="text-sm text-white/80">
            Wyróżniony (Featured)
          </Label>
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
            Opublikowany publicznie
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Zapisywanie w Notion..." : "Zapisz case w Notion"}
      </Button>
    </form>
  );
}
