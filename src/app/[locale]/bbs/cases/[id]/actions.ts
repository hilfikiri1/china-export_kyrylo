"use server";

import { revalidatePath } from "next/cache";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import {
  DuplicateCaseSlugError,
  getAdminNotionCaseById,
  isNotionCasesConfigured,
  parseEditableCaseMediaJson,
  updateNotionCase,
} from "@/lib/cases/notion";

export type EditCaseActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  slug?: string;
  published?: boolean;
};

export const initialEditCaseState: EditCaseActionState = { status: "idle" };

const COUNTRIES = new Set([
  "Polska",
  "Ukraina",
  "Niemcy",
  "Łotwa",
  "Bułgaria",
  "Hiszpania",
  "Chiny",
  "Inny",
]);

function readText(formData: FormData, name: string, maxLength = 2000) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readList(formData: FormData, name: string) {
  return readText(formData, name)
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*(?:[-•*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
}

function isHttpsUrl(value: string) {
  if (!value) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function revalidateCasePaths(locale: string, oldSlug: string, newSlug: string) {
  revalidatePath(`/${locale}/bbs/cases`);
  revalidatePath(`/${locale}/realizacje`);
  revalidatePath(`/${locale}/realizacje/${oldSlug}`);
  revalidatePath(`/${locale}/realizacje/${newSlug}`);
  revalidatePath("/sitemap.xml");
}

export async function updateCaseAction(
  pageId: string,
  _previousState: EditCaseActionState,
  formData: FormData,
): Promise<EditCaseActionState> {
  if (!(await hasBbsAdminSession())) {
    return { status: "error", message: "Sesja wygasła. Zaloguj się ponownie do panelu." };
  }
  if (!isNotionCasesConfigured()) {
    return { status: "error", message: "Integracja Notion nie jest skonfigurowana na serwerze." };
  }

  const current = await getAdminNotionCaseById(pageId);
  if (!current) return { status: "error", message: "Nie znaleziono case'u w Notion." };

  const clientLabel = readText(formData, "clientLabel", 300);
  const title = readText(formData, "title", 300);
  const slug = readText(formData, "slug", 120).toLowerCase();
  const excerpt = readText(formData, "excerpt", 500);
  const category = readText(formData, "category", 200);
  const country = readText(formData, "country", 50) || "Inny";
  const challenge = readText(formData, "challenge");
  const requirements = readList(formData, "requirements");
  const work = readList(formData, "work");
  const products = readList(formData, "products");
  const result = readText(formData, "result");
  const outcome = readText(formData, "outcome");
  const deliveryMethod = readText(formData, "deliveryMethod", 300);
  const publishedAt = readText(formData, "publishedAt", 10);
  const media = parseEditableCaseMediaJson(readText(formData, "mediaJson", 16000));
  const videoUrl = readText(formData, "videoUrl", 1000);
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";

  if (!clientLabel || !title || !excerpt || !category || !challenge || !requirements.length || !work.length || !result) {
    return {
      status: "error",
      message: "Uzupełnij wszystkie wymagane pola, w tym opis, wymagania i zakres prac B&BS.",
    };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { status: "error", message: "Nieprawidłowy slug case'u." };
  }
  if (!COUNTRIES.has(country)) {
    return { status: "error", message: "Wybierz prawidłowy kraj docelowy." };
  }
  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    return { status: "error", message: "Nieprawidłowa data publikacji." };
  }
  if (!media) {
    return { status: "error", message: "Nieprawidłowe dane galerii. Odśwież stronę i spróbuj ponownie." };
  }
  if (videoUrl && !isHttpsUrl(videoUrl)) {
    return { status: "error", message: "URL wideo musi zaczynać się od https://" };
  }

  const orderValueRaw = readText(formData, "orderValueUsd", 30).replace(/\s/g, "").replace(",", ".");
  const orderValueUsd = orderValueRaw ? Number(orderValueRaw) : undefined;
  if (orderValueRaw && (!Number.isFinite(orderValueUsd) || (orderValueUsd ?? 0) < 0)) {
    return { status: "error", message: "Wartość zamówienia USD musi być prawidłową liczbą." };
  }

  try {
    const updated = await updateNotionCase(pageId, {
      clientLabel,
      title,
      slug,
      excerpt,
      category,
      country,
      challenge,
      requirements,
      work,
      products,
      result,
      outcome,
      orderValueUsd,
      deliveryMethod,
      publishedAt,
      media,
      videoUrl,
      featured,
      published,
    });

    const locale = readText(formData, "locale", 10) || "pl";
    revalidateCasePaths(locale, current.slug, updated.slug);

    return {
      status: "success",
      message: published
        ? "Zmiany zapisane w Notion. Case jest opublikowany."
        : "Zmiany zapisane w Notion. Case pozostaje ukryty jako Draft.",
      slug: updated.slug,
      published,
    };
  } catch (error) {
    if (error instanceof DuplicateCaseSlugError) {
      return { status: "error", message: "Taki slug już istnieje." };
    }
    console.error("[bbs/cases] Failed to update Notion case", error);
    return { status: "error", message: "Nie udało się zapisać zmian w Notion." };
  }
}
