/* eslint-disable @next/next/no-img-element */
"use client";

import { useActionState, useMemo, useState, type ChangeEvent } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type {
  AdminNotionCase,
  EditableCaseMediaRef,
} from "@/lib/cases/admin-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  initialEditCaseState,
  updateCaseAction,
} from "@/app/[locale]/bbs/cases/[id]/actions";

const fieldCls = "border-white/15 bg-white/5 text-white placeholder:text-white/30";
const MAX_GALLERY_IMAGES = 12;

const BASE_CATEGORIES = [
  "Private Label",
  "Technologie akumulatorowe",
  "Logistyka i konsolidacja",
  "Maszyny przemysłowe",
  "Maszyny i urządzenia",
  "Maszyny budowlane",
  "Pojazdy elektryczne",
  "Opakowania i surowce",
  "Gastronomia i naczynia",
  "Sourcing w Chinach",
  "Logistyka i spedycja",
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

async function uploadCaseImage(file: File): Promise<{ id: string; name: string }> {
  const payload = new FormData();
  payload.set("file", file);
  const response = await fetch("/api/bbs/case-media", { method: "POST", body: payload });
  const result = (await response.json().catch(() => null)) as
    | { id?: string; name?: string; error?: string }
    | null;
  if (!response.ok || !result?.id || !result.name) {
    throw new Error(result?.error || "Nie udało się przesłać zdjęcia.");
  }
  return { id: result.id, name: result.name };
}

function cleanMediaRef(ref: EditableCaseMediaRef) {
  return ref.kind === "url"
    ? { kind: "url" as const, value: ref.value, name: ref.name }
    : { kind: "upload" as const, id: ref.id, name: ref.name };
}

function previewUrl(ref: EditableCaseMediaRef) {
  return ref.previewUrl || (ref.kind === "url" ? ref.value : "");
}

function mediaKey(ref: EditableCaseMediaRef) {
  return ref.kind === "upload" ? `upload:${ref.id}` : `url:${ref.value}`;
}

function MediaThumb({ item }: { item: EditableCaseMediaRef }) {
  const src = previewUrl(item);
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5">
      {src ? (
        <img src={src} alt={item.name || "Zdjęcie case'u"} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-white/30">Podgląd po zapisie</div>
      )}
    </div>
  );
}

export function CaseEditorForm({
  locale,
  initial,
}: {
  locale: Locale;
  initial: AdminNotionCase;
}) {
  const boundAction = updateCaseAction.bind(null, initial.id);
  const [state, formAction, pending] = useActionState(boundAction, initialEditCaseState);
  const [cover, setCover] = useState<EditableCaseMediaRef | undefined>(initial.media.cover);
  const [gallery, setGallery] = useState<EditableCaseMediaRef[]>(initial.media.gallery);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [mediaError, setMediaError] = useState<string>();

  const categories = useMemo(
    () => (BASE_CATEGORIES.includes(initial.category) ? BASE_CATEGORIES : [initial.category, ...BASE_CATEGORIES]),
    [initial.category],
  );
  const uploading = uploadingCount > 0;
  const mediaJson = JSON.stringify({
    cover: cover ? cleanMediaRef(cover) : null,
    gallery: gallery.map(cleanMediaRef),
  });

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
      setCover({
        kind: "upload",
        id: uploaded.id,
        name: uploaded.name,
        previewUrl: URL.createObjectURL(file),
      });
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : "Nie udało się przesłać zdjęcia.");
    }
  }

  async function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (!files.length) return;
    const available = Math.max(0, MAX_GALLERY_IMAGES - gallery.length);
    if (!available) {
      setMediaError(`Galeria może zawierać maksymalnie ${MAX_GALLERY_IMAGES} zdjęć.`);
      return;
    }
    setMediaError(undefined);
    for (const file of files.slice(0, available)) {
      try {
        const uploaded = await upload(file);
        const item: EditableCaseMediaRef = {
          kind: "upload",
          id: uploaded.id,
          name: uploaded.name,
          previewUrl: URL.createObjectURL(file),
        };
        setGallery((items) => [...items, item].slice(0, MAX_GALLERY_IMAGES));
      } catch (error) {
        setMediaError(error instanceof Error ? error.message : "Nie udało się przesłać zdjęcia.");
        break;
      }
    }
  }

  function moveGallery(index: number, direction: -1 | 1) {
    setGallery((items) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= items.length) return items;
      const copy = [...items];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="mediaJson" value={mediaJson} />

      {initial.archived && (
        <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/65">
          Ten case jest w archiwum. Możesz go edytować; przywrócenie wykonasz z listy case&apos;ów.
        </div>
      )}

      {state.status !== "idle" && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-100"
              : "border-red-500/25 bg-red-500/10 text-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ce-client" className="text-white/80">Etykieta klienta *</Label>
          <Input id="ce-client" name="clientLabel" required defaultValue={initial.clientLabel} className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-title" className="text-white/80">Tytuł *</Label>
          <Input id="ce-title" name="title" required defaultValue={initial.title} className={fieldCls} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ce-slug" className="text-white/80">Slug URL</Label>
        <Input id="ce-slug" name="slug" readOnly value={initial.slug} className={`${fieldCls} cursor-not-allowed opacity-60`} />
        <p className="text-xs text-white/30">Slug pozostaje stały, aby nie tworzyć starych, zduplikowanych adresów.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ce-excerpt" className="text-white/80">Krótki opis / Excerpt *</Label>
        <Textarea id="ce-excerpt" name="excerpt" rows={2} required defaultValue={initial.excerpt} className={fieldCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ce-category" className="text-white/80">Kategoria *</Label>
          <select
            id="ce-category"
            name="category"
            required
            defaultValue={initial.category}
            className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-navy-light text-white">{category}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-country" className="text-white/80">Kraj docelowy</Label>
          <select
            id="ce-country"
            name="country"
            defaultValue={initial.country}
            className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {COUNTRIES.map((country) => (
              <option key={country} value={country} className="bg-navy-light text-white">{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ce-challenge" className="text-white/80">Zadanie / potrzeba klienta *</Label>
        <Textarea id="ce-challenge" name="challenge" rows={4} required defaultValue={initial.challenge} className={fieldCls} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ce-requirements" className="text-white/80">Główne wymagania *</Label>
          <Textarea id="ce-requirements" name="requirements" rows={7} required defaultValue={initial.requirements.join("\n")} className={fieldCls} />
          <p className="text-xs text-white/30">Jedna pozycja w każdym wierszu.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-work" className="text-white/80">Co zrobiliśmy *</Label>
          <Textarea id="ce-work" name="work" rows={7} required defaultValue={initial.work.join("\n")} className={fieldCls} />
          <p className="text-xs text-white/30">Jeden krok w każdym wierszu.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ce-products" className="text-white/80">Wyprodukowane produkty</Label>
        <Textarea id="ce-products" name="products" rows={5} defaultValue={initial.products.join("\n")} className={fieldCls} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ce-result" className="text-white/80">Rezultat *</Label>
          <Textarea id="ce-result" name="result" rows={5} required defaultValue={initial.result} className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-outcome" className="text-white/80">Zadowolenie klienta / efekt</Label>
          <Textarea id="ce-outcome" name="outcome" rows={5} defaultValue={initial.outcome} className={fieldCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="ce-value" className="text-white/80">Wartość USD</Label>
          <Input id="ce-value" name="orderValueUsd" type="number" min="0" step="0.01" defaultValue={initial.orderValueUsd ?? ""} className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-delivery" className="text-white/80">Metoda dostawy</Label>
          <Input id="ce-delivery" name="deliveryMethod" defaultValue={initial.deliveryMethod} className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ce-date" className="text-white/80">Data publikacji</Label>
          <Input id="ce-date" name="publishedAt" type="date" defaultValue={initial.publishedAt ?? ""} className={fieldCls} />
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-white">Zdjęcia</h2>
            <p className="mt-1 text-xs text-white/40">Zmień okładkę, dodawaj i usuwaj zdjęcia oraz ustawiaj kolejność galerii.</p>
          </div>
          <span className="text-xs text-white/35">{gallery.length}/{MAX_GALLERY_IMAGES}</span>
        </div>

        {mediaError && (
          <div className="mt-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-200">{mediaError}</div>
        )}

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Okładka</p>
            {cover ? (
              <div className="space-y-2">
                <MediaThumb item={cover} />
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-white/55">{cover.name || "Zdjęcie główne"}</span>
                  <button type="button" onClick={() => setCover(undefined)} className="text-red-200/70 hover:text-red-200">usuń</button>
                </div>
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/15 text-xs text-white/30">Brak okładki</div>
            )}
            <Label htmlFor="ce-cover-file" className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 hover:bg-white/5">
              <ImagePlus className="h-4 w-4" aria-hidden />
              {cover ? "Zmień okładkę" : "Dodaj okładkę"}
            </Label>
            <Input id="ce-cover-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={handleCoverChange} disabled={uploading} className="sr-only" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Galeria</p>
              <Label htmlFor="ce-gallery-files" className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 hover:bg-white/5">
                <ImagePlus className="h-4 w-4" aria-hidden /> Dodaj zdjęcia
              </Label>
              <Input id="ce-gallery-files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={handleGalleryChange} disabled={uploading || gallery.length >= MAX_GALLERY_IMAGES} className="sr-only" />
            </div>

            {gallery.length === 0 ? (
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-white/15 text-xs text-white/30">Galeria jest pusta.</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {gallery.map((item, index) => (
                  <div key={mediaKey(item)} className="rounded-xl border border-white/10 bg-black/10 p-2">
                    <MediaThumb item={item} />
                    <p className="mt-2 truncate text-[11px] text-white/45">{index + 1}. {item.name || "zdjęcie"}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <button type="button" onClick={() => moveGallery(index, -1)} disabled={index === 0} aria-label="Przesuń zdjęcie w górę" className="rounded border border-white/10 p-1.5 text-white/55 hover:bg-white/5 disabled:opacity-20">
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button type="button" onClick={() => moveGallery(index, 1)} disabled={index === gallery.length - 1} aria-label="Przesuń zdjęcie w dół" className="rounded border border-white/10 p-1.5 text-white/55 hover:bg-white/5 disabled:opacity-20">
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button type="button" onClick={() => setGallery((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label="Usuń zdjęcie" className="ml-auto rounded border border-red-400/15 p-1.5 text-red-200/60 hover:bg-red-400/5 hover:text-red-200">
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {uploading && <p className="mt-4 text-xs text-accent-light">Przesyłanie zdjęć do Notion...</p>}
      </section>

      <div className="space-y-2">
        <Label htmlFor="ce-video" className="text-white/80">URL wideo</Label>
        <Input id="ce-video" name="videoUrl" type="url" defaultValue={initial.videoUrl} className={fieldCls} />
      </div>

      <div className="flex flex-wrap gap-x-7 gap-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <label className="flex items-center gap-3 text-sm text-white/80">
          <input name="featured" type="checkbox" defaultChecked={initial.featured} className="h-4 w-4 accent-accent-light" />
          Wyróżniony (Featured)
        </label>
        <label className="flex items-center gap-3 text-sm text-white/80">
          <input name="published" type="checkbox" defaultChecked={initial.published} className="h-4 w-4 accent-accent-light" />
          Opublikowany publicznie
        </label>
      </div>

      <Button type="submit" disabled={pending || uploading} className="w-full bg-accent-light text-white hover:bg-[#dbaa47] disabled:opacity-60">
        {uploading ? "Najpierw kończę przesyłanie zdjęć..." : pending ? "Zapisywanie zmian..." : "Zapisz zmiany w Notion"}
      </Button>
    </form>
  );
}
