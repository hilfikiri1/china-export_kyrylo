"use server";

import { revalidatePath } from "next/cache";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import {
  createNotionCase,
  DuplicateCaseSlugError,
  isNotionCasesConfigured,
  isSupportedCaseImageReference,
  migrateStaticPolishCases,
  type NotionCaseUpload,
} from "@/lib/cases/notion";

export type NewCaseActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  slug?: string;
  notionUrl?: string;
  published?: boolean;
};

export type LegacyMigrationActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  imported?: number;
  skipped?: number;
  failed?: number;
};

export const initialNewCaseState: NewCaseActionState = { status: "idle" };
export const initialLegacyMigrationState: LegacyMigrationActionState = { status: "idle" };

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

function isUploadId(value: string) {
  return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(value);
}

function readCoverUpload(formData: FormData): NotionCaseUpload | undefined {
  const id = readText(formData, "coverUploadId", 80);
  const name = readText(formData, "coverUploadName", 255);
  return id && name && isUploadId(id) ? { id, name } : undefined;
}

function readGalleryUploads(formData: FormData): NotionCaseUpload[] {
  const raw = readText(formData, "galleryUploadsJson", 12000);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .flatMap((item): NotionCaseUpload[] => {
        if (!item || typeof item !== "object") return [];
        const id = typeof item.id === "string" ? item.id.trim() : "";
        const name = typeof item.name === "string" ? item.name.trim().slice(0, 255) : "";
        return id && name && isUploadId(id) ? [{ id, name }] : [];
      })
      .slice(0, 12);
  } catch {
    return [];
  }
}

export async function createCaseAction(
  _previousState: NewCaseActionState,
  formData: FormData,
): Promise<NewCaseActionState> {
  if (!(await hasBbsAdminSession())) {
    return { status: "error", message: "Sesja wygasła. Zaloguj się ponownie do panelu." };
  }
  if (!isNotionCasesConfigured()) {
    return { status: "error", message: "Integracja Notion nie jest skonfigurowana na serwerze." };
  }

  const clientLabel = readText(formData, "clientLabel", 300);
  const title = readText(formData, "title", 300);
  const slug = readText(formData, "slug", 120).toLowerCase();
  const excerpt = readText(formData, "excerpt", 500);
  const category = readText(formData, "category", 200);
  const country = readText(formData, "country", 50) || "Polska";
  const challenge = readText(formData, "challenge");
  const requirements = readList(formData, "requirements");
  const work = readList(formData, "work");
  const products = readList(formData, "products");
  const result = readText(formData, "result");
  const outcome = readText(formData, "outcome");
  const deliveryMethod = readText(formData, "deliveryMethod", 300);
  const publishedAt = readText(formData, "publishedAt", 10);
  const coverImage = readText(formData, "coverImage", 1000);
  const galleryUrls = readList(formData, "galleryUrls");
  const coverUpload = readCoverUpload(formData);
  const galleryUploads = readGalleryUploads(formData);
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
    return {
      status: "error",
      message: "Slug może zawierać tylko małe litery, cyfry i myślniki, np. import-maszyn-cnc-polska.",
    };
  }
  if (!COUNTRIES.has(country)) {
    return { status: "error", message: "Wybierz prawidłowy kraj docelowy." };
  }
  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    return { status: "error", message: "Nieprawidłowa data publikacji." };
  }
  if (coverImage && !isSupportedCaseImageReference(coverImage)) {
    return {
      status: "error",
      message: "Zdjęcie główne musi być ścieżką lokalną (/cases/...) albo obsługiwanym adresem HTTPS.",
    };
  }
  if (galleryUrls.some((url) => !isSupportedCaseImageReference(url))) {
    return {
      status: "error",
      message: "Galeria zawiera nieobsługiwany adres obrazu. Wpisz jedną ścieżkę / URL w każdym wierszu.",
    };
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
    const created = await createNotionCase({
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
      coverImage,
      galleryUrls,
      coverUpload,
      galleryUploads,
      videoUrl,
      featured,
      published,
    });

    revalidatePath("/pl/realizacje");
    revalidatePath(`/pl/realizacje/${slug}`);
    revalidatePath("/sitemap.xml");

    return {
      status: "success",
      message: published
        ? "Case zapisany w Notion i opublikowany na stronie."
        : "Case zapisany w Notion jako Draft — nie jest jeszcze widoczny publicznie.",
      slug,
      notionUrl: created.notionUrl,
      published,
    };
  } catch (error) {
    if (error instanceof DuplicateCaseSlugError) {
      return { status: "error", message: "Taki slug już istnieje. Wybierz inny adres URL." };
    }
    console.error("[bbs/cases] Failed to create Notion case", error);
    return {
      status: "error",
      message: "Nie udało się zapisać case'u w Notion. Sprawdź konfigurację i spróbuj ponownie.",
    };
  }
}

export async function migrateLegacyCasesAction(
  _previousState: LegacyMigrationActionState,
  _formData: FormData,
): Promise<LegacyMigrationActionState> {
  if (!(await hasBbsAdminSession())) {
    return { status: "error", message: "Sesja wygasła. Zaloguj się ponownie do panelu." };
  }
  if (!isNotionCasesConfigured()) {
    return { status: "error", message: "Integracja Notion nie jest skonfigurowana na serwerze." };
  }

  try {
    const result = await migrateStaticPolishCases();
    revalidatePath("/pl/realizacje");
    revalidatePath("/sitemap.xml");

    const imported = result.imported.length;
    const skipped = result.skipped.length;
    const failed = result.failed.length;

    if (failed > 0) {
      console.error("[bbs/cases] Legacy case migration failures", result.failed);
      return {
        status: "error",
        message: `Migracja częściowa: dodano ${imported}, pominięto ${skipped}, błędy ${failed}.`,
        imported,
        skipped,
        failed,
      };
    }

    return {
      status: "success",
      message: `Migracja zakończona: dodano ${imported}, pominięto istniejące ${skipped}.`,
      imported,
      skipped,
      failed: 0,
    };
  } catch (error) {
    console.error("[bbs/cases] Failed to migrate legacy cases", error);
    return {
      status: "error",
      message: "Nie udało się przenieść istniejących case'ów do Notion.",
    };
  }
}
