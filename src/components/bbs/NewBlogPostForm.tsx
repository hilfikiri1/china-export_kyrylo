"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldCls =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

export function NewBlogPostForm({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const [slug, setSlug] = useState("");

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
        <p className="font-semibold text-white">Gotowe (podgląd lokalny)</p>
        <p className="mt-2 text-sm text-white/60">
          Wpis przygotowany. Trwałe opublikowanie wymaga integracji z CMS lub Notion.
        </p>
        <p className="mt-3 text-xs text-white/40">
          Podgląd:{" "}
          <a href={`/${locale}/blog/${slug}`} className="text-accent-light/80 underline">
            /{locale}/blog/{slug}
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
    setSlug(String(data.get("slug") || "nowy-wpis"));
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400/80">
        Dane nie są zapisywane trwale — tylko podgląd lokalny.
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-title" className="text-white/80">
          Tytuł <span className="text-accent-light">*</span>
        </Label>
        <Input id="bp-title" name="title" required placeholder="np. Jak importować z Chin krok po kroku" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-slug" className="text-white/80">
          Slug URL <span className="text-accent-light">*</span>
        </Label>
        <Input id="bp-slug" name="slug" required placeholder="np. jak-importowac-z-chin" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-excerpt" className="text-white/80">
          Zajawka <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="bp-excerpt" name="excerpt" rows={2} required placeholder="Krótki opis artykułu (1–2 zdania)" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-content" className="text-white/80">
          Treść artykułu <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="bp-content" name="content" rows={12} required placeholder="Treść w formacie tekstowym. ## Nagłówek, ### Podnagłówek, - lista" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-category" className="text-white/80">Kategoria</Label>
        <Input id="bp-category" name="category" placeholder="np. Sourcing, Logistyka, QC" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-date" className="text-white/80">Data publikacji</Label>
        <Input id="bp-date" name="date" type="date" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-cover" className="text-white/80">URL zdjęcia głównego</Label>
        <Input id="bp-cover" name="coverImage" type="url" placeholder="https://..." className={fieldCls} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="bp-published"
          name="published"
          type="checkbox"
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-light"
        />
        <Label htmlFor="bp-published" className="text-sm text-white/80">
          Opublikowany
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
