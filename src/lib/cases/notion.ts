import "server-only";

import {
  Client,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";
import { caseStudies, getCaseStudies, getCaseStudyBySlug } from "@/content/cases";
import type { Locale } from "@/i18n/config";
import type { LocalizedCaseStudy } from "./types";

const NOTION_VERSION = "2026-03-11";
const DEFAULT_CASES_DATA_SOURCE_ID = "975e9b0a-46ca-459f-b3a1-dc95fbeaa60a";
const DEFAULT_COVER_IMAGE = "/image/road_shipment.jpg";

let client: Client | undefined;

export type NotionCaseUpload = {
  id: string;
  name: string;
};

export type NewNotionCaseInput = {
  clientLabel: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  country: string;
  challenge: string;
  requirements: string[];
  work: string[];
  products: string[];
  result: string;
  outcome?: string;
  orderValueUsd?: number;
  deliveryMethod?: string;
  publishedAt?: string;
  coverImage?: string;
  galleryUrls?: string[];
  coverUpload?: NotionCaseUpload;
  galleryUploads?: NotionCaseUpload[];
  videoUrl?: string;
  featured: boolean;
  published: boolean;
};

export type LegacyCasesMigrationResult = {
  imported: string[];
  skipped: string[];
  failed: { slug: string; message: string }[];
};

export class NotionCasesConfigurationError extends Error {
  constructor() {
    super("Notion cases integration is not configured.");
    this.name = "NotionCasesConfigurationError";
  }
}

export class DuplicateCaseSlugError extends Error {
  constructor(slug: string) {
    super(`Case slug already exists: ${slug}`);
    this.name = "DuplicateCaseSlugError";
  }
}

function getToken() {
  return process.env.NOTION_API_TOKEN?.trim() || process.env.NOTION_API_KEY?.trim();
}

function casesDataSourceId() {
  return process.env.NOTION_CASES_DATA_SOURCE_ID?.trim() || DEFAULT_CASES_DATA_SOURCE_ID;
}

function getClient() {
  const token = getToken();
  if (!token) throw new NotionCasesConfigurationError();
  if (!client) client = new Client({ auth: token, notionVersion: NOTION_VERSION });
  return client;
}

export function isNotionCasesConfigured() {
  return Boolean(getToken());
}

function readText(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  if (!property) return "";
  if (property.type === "title") {
    return property.title.map((item) => item.plain_text).join("").trim();
  }
  if (property.type === "rich_text") {
    return property.rich_text.map((item) => item.plain_text).join("").trim();
  }
  return "";
}

function readSelect(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "select" ? property.select?.name ?? "" : "";
}

function readDate(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "date" ? property.date?.start ?? "" : "";
}

function readFiles(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  if (!property || property.type !== "files") return [] as string[];
  return property.files.flatMap((item) => {
    if (item.type === "file") return [item.file.url];
    if (item.type === "external") return [item.external.url];
    return [];
  });
}

function textProperty(value: string | undefined) {
  const content = (value ?? "").trim().slice(0, 2000);
  return content
    ? { rich_text: [{ type: "text" as const, text: { content } }] }
    : { rich_text: [] };
}

function titleProperty(value: string) {
  return {
    title: [{ type: "text" as const, text: { content: value.trim().slice(0, 2000) } }],
  };
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*(?:[-•*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function uploadFilesProperty(uploads: NotionCaseUpload[] = []) {
  return {
    files: uploads.map((upload) => ({
      type: "file_upload" as const,
      file_upload: { id: upload.id },
      name: upload.name,
    })),
  };
}

export function isSupportedCaseImageReference(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return (
      host === "images.unsplash.com" ||
      host.endsWith(".amazonaws.com") ||
      host === "notion.so" ||
      host.endsWith(".notion.so")
    );
  } catch {
    return false;
  }
}

export async function uploadNotionCaseImage(file: File): Promise<NotionCaseUpload> {
  const notion = getClient();
  const upload = await notion.fileUploads.create({
    mode: "single_part",
    filename: file.name,
    content_type: file.type || "application/octet-stream",
  });
  await notion.fileUploads.send({
    file_upload_id: upload.id,
    file: { filename: file.name, data: file },
  });
  return { id: upload.id, name: file.name };
}

function mapNotionCase(page: PageObjectResponse, locale: Locale): LocalizedCaseStudy {
  const title = readText(page.properties, "Tytuł") || "Case study";
  const challenge = readText(page.properties, "Potrzeba klienta");
  const result = readText(page.properties, "Rezultat");
  const galleryFromFiles = readFiles(page.properties, "Galeria");
  const galleryFromText = splitLines(readText(page.properties, "Galeria URL"));
  const gallerySources = unique([...galleryFromFiles, ...galleryFromText]).filter(
    isSupportedCaseImageReference,
  );
  const coverCandidates = [
    readText(page.properties, "Cover URL"),
    ...readFiles(page.properties, "Zdjęcie główne"),
    ...gallerySources,
  ].filter(isSupportedCaseImageReference);
  const coverImage = coverCandidates[0] || DEFAULT_COVER_IMAGE;
  const gallery = unique([coverImage, ...gallerySources]).map((src) => ({ src, alt: title }));
  const requirements = splitLines(readText(page.properties, "Główne wymagania"));
  const products = splitLines(readText(page.properties, "Wyprodukowane produkty"));

  return {
    id: `notion-${page.id}`,
    slug: readText(page.properties, "Slug"),
    title,
    summary: readText(page.properties, "Excerpt") || challenge.slice(0, 240) || result.slice(0, 240),
    category: readText(page.properties, "Kategoria") || "Inne",
    challenge: challenge || undefined,
    requirements: requirements.length ? requirements : undefined,
    scope: splitLines(readText(page.properties, "Praca B&BS")),
    products: products.length ? products : undefined,
    result: result || readText(page.properties, "Satysfakcja klienta") || "Projekt zrealizowany.",
    coverImage,
    gallery,
    country: readSelect(page.properties, "Kraj") || undefined,
    date: readDate(page.properties, "Data publikacji") || undefined,
    status: readSelect(page.properties, "Status publikacji") || undefined,
    locale,
  };
}

async function queryPublishedNotionCases(slug?: string) {
  return getClient().dataSources.query({
    data_source_id: casesDataSourceId(),
    result_type: "page",
    page_size: slug ? 1 : 100,
    filter: slug
      ? {
          and: [
            { property: "Status publikacji", select: { equals: "Published" } },
            { property: "Locale", select: { equals: "pl" } },
            { property: "Slug", rich_text: { equals: slug } },
          ],
        }
      : {
          and: [
            { property: "Status publikacji", select: { equals: "Published" } },
            { property: "Locale", select: { equals: "pl" } },
          ],
        },
    sorts: [
      { property: "Featured", direction: "descending" },
      { property: "Data publikacji", direction: "descending" },
      { timestamp: "last_edited_time", direction: "descending" },
    ],
  });
}

export async function listPublishedNotionCases(locale: Locale): Promise<LocalizedCaseStudy[]> {
  if (locale !== "pl" || !isNotionCasesConfigured()) return [];
  const response = await queryPublishedNotionCases();
  return response.results
    .filter(isFullPage)
    .map((page) => mapNotionCase(page, locale))
    .filter((item) => Boolean(item.slug));
}

export async function getPublishedNotionCaseBySlug(
  slug: string,
  locale: Locale,
): Promise<LocalizedCaseStudy | undefined> {
  if (locale !== "pl" || !isNotionCasesConfigured()) return undefined;
  const response = await queryPublishedNotionCases(slug);
  const page = response.results.find(isFullPage);
  return page ? mapNotionCase(page, locale) : undefined;
}

export async function getCasesForLocale(locale: Locale): Promise<LocalizedCaseStudy[]> {
  const staticCases = getCaseStudies(locale) as LocalizedCaseStudy[];
  if (locale !== "pl") return staticCases;
  try {
    const notionCases = await listPublishedNotionCases(locale);
    const notionSlugs = new Set(notionCases.map((item) => item.slug));
    return [...notionCases, ...staticCases.filter((item) => !notionSlugs.has(item.slug))];
  } catch (error) {
    console.error("[cases/notion] Failed to load published cases", error);
    return staticCases;
  }
}

export async function getCaseForSlug(
  slug: string,
  locale: Locale,
): Promise<LocalizedCaseStudy | undefined> {
  const staticCase = getCaseStudyBySlug(slug, locale) as LocalizedCaseStudy | undefined;
  if (locale !== "pl") return staticCase;
  try {
    return (await getPublishedNotionCaseBySlug(slug, locale)) ?? staticCase;
  } catch (error) {
    console.error(`[cases/notion] Failed to load case ${slug}`, error);
    return staticCase;
  }
}

async function notionSlugExists(slug: string) {
  const response = await getClient().dataSources.query({
    data_source_id: casesDataSourceId(),
    result_type: "page",
    page_size: 1,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  return response.results.some(isFullPage);
}

async function existingNotionSlugs() {
  const response = await getClient().dataSources.query({
    data_source_id: casesDataSourceId(),
    result_type: "page",
    page_size: 100,
  });
  return new Set(
    response.results
      .filter(isFullPage)
      .map((page) => readText(page.properties, "Slug"))
      .filter(Boolean),
  );
}

async function createCasePage(input: NewNotionCaseInput) {
  const publishedAt = input.publishedAt || new Date().toISOString().slice(0, 10);
  const page = await getClient().pages.create({
    parent: { data_source_id: casesDataSourceId() },
    properties: {
      "Tytuł": titleProperty(input.title),
      "Slug": textProperty(input.slug),
      "Excerpt": textProperty(input.excerpt),
      "Kategoria": textProperty(input.category),
      "Kraj": { select: { name: input.country } },
      "Locale": { select: { name: "pl" } },
      "Klient publiczny": textProperty(input.clientLabel),
      "Potrzeba klienta": textProperty(input.challenge),
      "Główne wymagania": textProperty(input.requirements.join("\n")),
      "Praca B&BS": textProperty(input.work.join("\n")),
      "Wyprodukowane produkty": textProperty(input.products.join("\n")),
      "Rezultat": textProperty(input.result),
      "Satysfakcja klienta": textProperty(input.outcome),
      "Dostawa": textProperty(input.deliveryMethod),
      "Wartość zamówienia USD": { number: input.orderValueUsd ?? null },
      "Data publikacji": { date: { start: publishedAt } },
      "Cover URL": textProperty(input.coverImage),
      "Galeria URL": textProperty((input.galleryUrls ?? []).join("\n")),
      "Zdjęcie główne": uploadFilesProperty(input.coverUpload ? [input.coverUpload] : []),
      "Galeria": uploadFilesProperty(input.galleryUploads),
      "Video URL": { url: input.videoUrl?.trim() || null },
      "Featured": { checkbox: input.featured },
      "Status publikacji": { select: { name: input.published ? "Published" : "Draft" } },
    },
  });

  return {
    pageId: page.id,
    notionUrl: "url" in page ? page.url : "",
    slug: input.slug,
    published: input.published,
  };
}

export async function createNotionCase(input: NewNotionCaseInput) {
  if (caseStudies.some((item) => item.slug === input.slug) || (await notionSlugExists(input.slug))) {
    throw new DuplicateCaseSlugError(input.slug);
  }
  return createCasePage(input);
}

const MIGRATION_COUNTRIES = new Set([
  "Polska",
  "Ukraina",
  "Niemcy",
  "Łotwa",
  "Bułgaria",
  "Hiszpania",
  "Chiny",
  "Inny",
]);

function migrationCountry(value?: string) {
  return value && MIGRATION_COUNTRIES.has(value) ? value : "Inny";
}

export async function migrateStaticPolishCases(): Promise<LegacyCasesMigrationResult> {
  const existing = await existingNotionSlugs();
  const imported: string[] = [];
  const skipped: string[] = [];
  const failed: { slug: string; message: string }[] = [];

  for (const item of [...caseStudies].reverse()) {
    if (existing.has(item.slug)) {
      skipped.push(item.slug);
      continue;
    }

    try {
      await createCasePage({
        clientLabel: "Dotychczasowy klient B&BS",
        title: item.title.pl,
        slug: item.slug,
        excerpt: item.summary.pl,
        category: item.category.pl,
        country: migrationCountry(item.country?.pl),
        challenge: item.challenge?.pl || item.summary.pl,
        requirements: item.requirements?.pl ?? [],
        work: item.scope.pl,
        products: item.products?.pl ?? [],
        result: item.result.pl,
        outcome: item.status?.pl,
        publishedAt: item.date,
        coverImage: item.coverImage,
        galleryUrls: item.gallery.map((image) => image.src),
        featured: false,
        published: true,
      });
      existing.add(item.slug);
      imported.push(item.slug);
    } catch (error) {
      failed.push({
        slug: item.slug,
        message: error instanceof Error ? error.message : "Unknown migration error",
      });
    }
  }

  return {
    imported: imported.reverse(),
    skipped: skipped.reverse(),
    failed: failed.reverse(),
  };
}
