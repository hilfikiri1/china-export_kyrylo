"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createCaseAction,
  initialLegacyMigrationState,
  initialNewCaseState,
  migrateLegacyCasesAction,
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

const MAX_GALLERY_IMAGES = 12;

type UploadedImage = {
  id: string;
  name: string;
};

async function uploadCaseImage(file: File): Promise<UploadedImage> {
  const payload = new FormData();
  payload.set("file", file);

  const response = await fetch("/api/bbs/case-media", {
    method: "POST",
    body: payload,
  });
  const result = (await response.json().catch(() => null)) as
    | { id?: string; name?: string; error?: string }
    | null;

  if (!response.ok || !result?.id || !result.name) {
    throw new Error(result?.error || "Nie udało się przesłać zdjęcia.");
  }

  return { id: result.id, name: result.name };
}

export function NewCaseForm({ locale }: { locale: Locale }) {
  const [state, formAction, pending] = useActionState(
    createCaseAction,
    initialNewCaseState,
  );
  const [migrationState, migrationAction, migrating] = useActionState(
    migrateLegacyCasesAction,
    initialLegacyMigrationState,
  );
  const [coverUpload, setCoverUpload] = useState<UploadedImage>();
  const [galleryUploads, setGalleryUploads] = useState<UploadedImage[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [mediaError, setMediaError] = useState<string>();

  const uploading = uploadingCount > 0;

  async function upload(file: File) {
    setUploadingCount((count) => count + 1);
    try {
      return await uploadCaseImage(file);
    } finally {
      setUploadingCount((count) => Math.max(0, count - 1));
    }
  }

  async function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    setMediaError(undefined);
    try {
      const uploaded = await upload(file);
      setCoverUpload(uploaded);
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : "Nie udało się przesłać zdjęcia.");
    }
  }

  async function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (!selected.length) return;

    const available = Math.max(0, MAX_GALLERY_IMAGES - galleryUploads.length);
    if (available === 0) {
      setMediaError(`Galeria może zawierać maksymalnie ${MAX_GALLERY_IMAGES} zdjęć.`);
      return;
    }

    setMediaError(undefined);
    for (const file of selected.slice(0, available)) {
      try {
        const uploaded = await upload(file);
        setGalleryUploads((items) => [...items, uploaded].slice(0, MAX_GALLERY_IMAGES));
      } catch (error) {
        setMediaError(error instanceof Error ? error.message : "Nie udało się przesłać zdjęcia.");
        break;
      }
    }
  }

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
    <div className="space-y-6">
      <form
        action={migrationAction}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">Migracja istniejących case&apos;ów</p>
            <p className="mt-1 text-xs text-white/45">
              Jednorazowo kopiuje polskie case&apos;y zapisane w kodzie do Notion. Istniejące slugi są automatycznie pomijane.
            </p>
          </div>
          <Button
            type="submit"
            variant="outline"
            disabled={migrating}
            className="shrink-0 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
          >
            {migrating ? "Migracja..." : "Przenieś do Notion"}
          </Button>
        </div>
        {migrationState.status !== "idle" && (
          <p
            className={`mt-3 text-xs ${
              migrationState.status === "success" ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {migrationState.message}
          </p>
        )}
      </form>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="coverUploadId" value={coverUpload?.id ?? ""} />
        <input type="hidden" name="coverUploadName" value={coverUpload?.name ?? ""} />
        <input type="hidden" name="galleryUploadsJson" value={JSON.stringify(galleryUploads)} />

        <div className="rounded-lg border border-accent-light/20 bg-accent-light/5 px-4 py-3 text-xs text-white/60">
          Formularz zapisuje case bezpośrednio do Notion. Publiczna sekcja Realizacje korzysta z rekordów
          oznaczonych jako <span className="font-semibold text-white">Published</span>. Zdjęcia możesz przesłać
          bezpośrednio z komputera — nie trzeba już dodawać ich do GitHub.
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

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-medium text-white">Zdjęcia</p>
          <p className="mt-1 text-xs text-white/40">
            JPG, PNG, WebP, GIF lub AVIF. Maks. 3,5 MB na plik. Każde zdjęcie jest wysyłane osobno do Notion.
          </p>

          {mediaError && (
            <div className="mt-3 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {mediaError}
            </div>
          )}

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cc-cover-file" className="text-white/80">Zdjęcie główne</Label>
              <Input
                id="cc-cover-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleCoverChange}
                disabled={uploading}
                className={fieldCls}
              />
              {coverUpload && (
                <div className="flex items-center justify-between rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs">
                  <span className="truncate text-emerald-200">✓ {coverUpload.name}</span>
                  <button
                    type="button"
                    onClick={() => setCoverUpload(undefined)}
                    className="ml-3 text-white/45 hover:text-white"
                  >
                    usuń
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cc-gallery-files" className="text-white/80">
                Galeria ({galleryUploads.length}/{MAX_GALLERY_IMAGES})
              </Label>
              <Input
                id="cc-gallery-files"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleGalleryChange}
                disabled={uploading || galleryUploads.length >= MAX_GALLERY_IMAGES}
                className={fieldCls}
              />
              {galleryUploads.length > 0 && (
                <div className="space-y-1.5">
                  {galleryUploads.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2 text-xs"
                    >
                      <span className="truncate text-white/65">✓ {image.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryUploads((items) => items.filter((item) => item.id !== image.id))
                        }
                        className="ml-3 text-white/45 hover:text-white"
                      >
                        usuń
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {uploading && <p className="mt-3 text-xs text-accent-light">Przesyłanie zdjęć do Notion...</p>}
        </div>

        <details className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer text-sm text-white/65">
            Alternatywnie: użyj istniejących ścieżek / URL
          </summary>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cc-cover" className="text-white/80">Zdjęcie główne — ścieżka / URL</Label>
              <Input
                id="cc-cover"
                name="coverImage"
                type="text"
                placeholder="/cases/nazwa-projektu.jpg"
                className={fieldCls}
              />
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
          </div>
        </details>

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
          disabled={pending || uploading}
          className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading
            ? "Najpierw kończę przesyłanie zdjęć..."
            : pending
              ? "Zapisywanie w Notion..."
              : "Zapisz case w Notion"}
        </Button>
      </form>
    </div>
  );
}
