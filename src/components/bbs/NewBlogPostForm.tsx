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
  const [result, setResult] = useState<{
    slug: string;
    status: "Draft" | "Published";
    notionUrl?: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  if (result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
        <p className="font-semibold text-white">Wpis zapisany w Notion</p>
        <p className="mt-2 text-sm text-white/60">
          {result.status === "Published"
            ? "Status: Published — artykuł jest widoczny publicznie."
            : "Status: Draft — artykuł nie jest jeszcze widoczny publicznie."}
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          {result.status === "Published" && (
            <a href={`/${locale}/blog/${result.slug}`} className="text-accent-light/80 underline">
              Otwórz artykuł
            </a>
          )}
          {result.notionUrl && (
            <a href={result.notionUrl} target="_blank" rel="noreferrer" className="text-accent-light/80 underline">
              Otwórz w Notion
            </a>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-white/20 bg-transparent text-white hover:bg-white/5"
          onClick={() => {
            setResult(null);
            setError("");
            setTitle("");
            setSlug("");
            setSlugEdited(false);
          }}
        >
          Dodaj kolejny
        </Button>
      </div>
    );
  }

  function slugify(value: string) {
    return value
      .toLocaleLowerCase("pl-PL")
      .replace(/ł/g, "l")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const data = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/bbs/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.get("title"),
          slug: data.get("slug"),
          excerpt: data.get("excerpt"),
          content: data.get("content"),
          category: data.get("category"),
          date: data.get("date"),
          coverImage: data.get("coverImage"),
          author: data.get("author"),
          seoTitle: data.get("seoTitle"),
          seoDescription: data.get("seoDescription"),
          status: data.get("status"),
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        slug?: string;
        status?: "Draft" | "Published";
        notionUrl?: string;
      };
      if (!response.ok || !payload.slug || !payload.status) {
        throw new Error(payload.error || "Nie udało się zapisać wpisu.");
      }

      setResult({ slug: payload.slug, status: payload.status, notionUrl: payload.notionUrl });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Nie udało się zapisać wpisu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg border border-accent-light/20 bg-accent-light/5 px-4 py-3 text-xs text-white/60">
        Wpis zostanie zapisany w bazie <strong className="text-white/80">Website — blog</strong> w Notion.
        Draft pozostaje ukryty; Published pojawia się w publicznym Blogu.
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-title" className="text-white/80">
          Tytuł <span className="text-accent-light">*</span>
        </Label>
        <Input
          id="bp-title"
          name="title"
          required
          maxLength={200}
          value={title}
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);
            if (!slugEdited) setSlug(slugify(nextTitle));
          }}
          placeholder="np. Jak importować z Chin krok po kroku"
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-slug" className="text-white/80">
          Slug URL <span className="text-accent-light">*</span>
        </Label>
        <Input
          id="bp-slug"
          name="slug"
          required
          maxLength={120}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          value={slug}
          onChange={(event) => {
            setSlugEdited(true);
            setSlug(slugify(event.target.value));
          }}
          placeholder="np. jak-importowac-z-chin"
          className={fieldCls}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-excerpt" className="text-white/80">
          Zajawka <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="bp-excerpt" name="excerpt" rows={2} required maxLength={700} placeholder="Krótki opis artykułu (1–2 zdania)" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-content" className="text-white/80">
          Treść artykułu <span className="text-accent-light">*</span>
        </Label>
        <Textarea id="bp-content" name="content" rows={16} required maxLength={100000} placeholder="Treść w Markdown. ## Nagłówek, ### Podnagłówek, - lista" className={fieldCls} />
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
        <Label htmlFor="bp-cover" className="text-white/80">Zdjęcie główne (opcjonalnie)</Label>
        <Input id="bp-cover" name="coverImage" placeholder="/case-studies/nazwa.jpg" className={fieldCls} />
        <p className="text-xs text-white/30">Ścieżka z publicznych plików strony (/...) lub URL z domeny B&amp;BS.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bp-author" className="text-white/80">Autor</Label>
          <Input id="bp-author" name="author" maxLength={120} defaultValue="Buy & Bring Solutions" className={fieldCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bp-status" className="text-white/80">Status publikacji</Label>
          <select
            id="bp-status"
            name="status"
            defaultValue="Draft"
            className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="Draft" className="bg-navy-light text-white">Draft</option>
            <option value="Published" className="bg-navy-light text-white">Published</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-seo-title" className="text-white/80">SEO title (opcjonalnie)</Label>
        <Input id="bp-seo-title" name="seoTitle" maxLength={220} placeholder="Jeśli puste, użyjemy tytułu artykułu" className={fieldCls} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bp-seo-description" className="text-white/80">SEO description (opcjonalnie)</Label>
        <Textarea id="bp-seo-description" name="seoDescription" rows={2} maxLength={600} placeholder="Jeśli puste, użyjemy zajawki" className={fieldCls} />
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
      >
        {submitting ? "Zapisywanie…" : "Zapisz w Notion"}
      </Button>
    </form>
  );
}
