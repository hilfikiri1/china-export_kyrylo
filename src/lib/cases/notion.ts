import "server-only";

import {
  Client,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";
import { caseStudies, getCaseStudies, getCaseStudyBySlug } from "@/content/cases";
import type { Locale } from "@/i18n/config";
import type {
  AdminNotionCase,
  AdminNotionCaseSummary,
  EditableCaseMediaRef,
  EditableCaseMediaState,
} from "./admin-types";
import type { LocalizedCaseStudy } from "./types";

const NOTION_VERSION = "2026-03-11";
const DEFAULT_CASES_DATA_SOURCE_ID = "975e9b0a-46ca-459f-b3a1-dc95fbeaa60a";
const DEFAULT_COVER_IMAGE = "/image/road_shipment.jpg";
const MAX_GALLERY_IMAGES = 12;

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
  media?: EditableCaseMediaState;
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

function readCheckbox(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "checkbox" ? property.checkbox : false;
}

function readNumber(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "number" ? property.number ?? undefined : undefined;
}

function readUrl(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "url" ? property.url ?? "" : "";
}

type NotionFileEntry = {
  name: string;
  url: string;
};

function readFileEntries(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  if (!property || property.type !== "files") return [] as NotionFileEntry[];
  return property.files.flatMap((item): NotionFileEntry[] => {
    if (item.type === "file") {
      return [{ name: item.name, url: item.file.url }];
    }
    if (item.type === "external") {
      return [{ name: item.name, url: item.external.url }];
    }
    return [];
  });
}

function textProperty(value: string | undefined) {
  const content = (value ?? "").trim().slice(0, 2000);
  return content
    ? { rich_text: [{ type: "text" as const, text: { content } }] }
    : { rich_text: [] };
}

function longTextProperty(value: string | undefined, maxLength = 12000) {
  const content = (value ?? "").trim().slice(0, maxLength);
  if (!content) return { rich_text: [] };
  const chunks = content.match(/[\s\S]{1,1900}/g) ?? [];
  return {
    rich_text: chunks.map((chunk) => ({
      type: "text" as const,
      text: { content: chunk },
    })),
  };
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

function isUploadId(value: string) {
  return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(value);
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

type StoredMediaRef =
  | { t: "url"; v: string }
  | { t: "upload"; i: string; n: string };

type StoredMediaState = {
  v: 1;
  c?: StoredMediaRef;
  g: StoredMediaRef[];
};

function compactMediaRef(ref: EditableCaseMediaRef): StoredMediaRef | undefined {
  if (ref.kind === "url") {
    const value = ref.value.trim();
    return isSupportedCaseImageReference(value) ? { t: "url", v: value } : undefined;
  }
  const id = ref.id.trim();
  const name = ref.name.trim().slice(0, 255);
  return id && name && isUploadId(id) ? { t: "upload", i: id, n: name } : undefined;
}

function expandStoredRef(ref: StoredMediaRef): EditableCaseMediaRef {
  return ref.t === "url"
    ? { kind: "url", value: ref.v, name: ref.v.split("/").pop() || ref.v }
    : { kind: "upload", id: ref.i, name: ref.n };
}

function normalizeEditableMedia(media: EditableCaseMediaState): EditableCaseMediaState {
  const cover = media.cover ? compactMediaRef(media.cover) : undefined;
  const gallery = media.gallery
    .map(compactMediaRef)
    .filter((item): item is StoredMediaRef => Boolean(item))
    .slice(0, MAX_GALLERY_IMAGES);

  return {
    cover: cover ? expandStoredRef(cover) : undefined,
    gallery: gallery.map(expandStoredRef),
  };
}

function serializeMedia(media: EditableCaseMediaState) {
  const normalized = normalizeEditableMedia(media);
  const stored: StoredMediaState = {
    v: 1,
    c: normalized.cover ? compactMediaRef(normalized.cover) : undefined,
    g: normalized.gallery
      .map(compactMediaRef)
      .filter((item): item is StoredMediaRef => Boolean(item)),
  };
  return JSON.stringify(stored);
}

function parseStoredMedia(value: string): EditableCaseMediaState | undefined {
  if (!value.trim()) return undefined;
  try {
    const parsed = JSON.parse(value) as Partial<StoredMediaState>;
    if (parsed.v !== 1 || !Array.isArray(parsed.g)) return undefined;
    const refs = [parsed.c, ...parsed.g].filter(Boolean) as StoredMediaRef[];
    if (
      refs.some(
        (ref) =>
          !ref ||
          (ref.t !== "url" && ref.t !== "upload") ||
          (ref.t === "url" && !isSupportedCaseImageReference(ref.v)) ||
          (ref.t === "upload" && (!isUploadId(ref.i) || !ref.n?.trim())),
      )
    ) {
      return undefined;
    }
    return {
      cover: parsed.c ? expandStoredRef(parsed.c) : undefined,
      gallery: parsed.g.slice(0, MAX_GALLERY_IMAGES).map(expandStoredRef),
    };
  } catch {
    return undefined;
  }
}

export function parseEditableCaseMediaJson(value: string): EditableCaseMediaState | undefined {
  if (!value.trim()) return { gallery: [] };
  try {
    const parsed = JSON.parse(value) as {
      cover?: EditableCaseMediaRef | null;
      gallery?: EditableCaseMediaRef[];
    };
    if (!Array.isArray(parsed.gallery)) return undefined;
    const media: EditableCaseMediaState = {
      cover: parsed.cover ?? undefined,
      gallery: parsed.gallery,
    };
    const normalized = normalizeEditableMedia(media);
    const expectedCover = media.cover ? 1 : 0;
    if ((normalized.cover ? 1 : 0) !== expectedCover) return undefined;
    if (normalized.gallery.length !== Math.min(media.gallery.length, MAX_GALLERY_IMAGES)) {
      return undefined;
    }
    return normalized;
  } catch {
    return undefined;
  }
}

function buildMediaFromInput(input: NewNotionCaseInput): EditableCaseMediaState {
  if (input.media) return normalizeEditableMedia(input.media);
  const cover = input.coverUpload
    ? ({ kind: "upload", id: input.coverUpload.id, name: input.coverUpload.name } satisfies EditableCaseMediaRef)
    : input.coverImage
      ? ({ kind: "url", value: input.coverImage } satisfies EditableCaseMediaRef)
      : undefined;
  const gallery: EditableCaseMediaRef[] = [
    ...(input.galleryUploads ?? []).map(
      (upload) => ({ kind: "upload", id: upload.id, name: upload.name }) satisfies EditableCaseMediaRef,
    ),
    ...(input.galleryUrls ?? []).map(
      (value) => ({ kind: "url", value }) satisfies EditableCaseMediaRef,
    ),
  ];
  return normalizeEditableMedia({ cover, gallery });
}

function uploadsFromMedia(media: EditableCaseMediaState) {
  return media.gallery.flatMap((ref) =>
    ref.kind === "upload" ? [{ id: ref.id, name: ref.name }] : [],
  );
}

function coverUploadFromMedia(media: EditableCaseMediaState) {
  return media.cover?.kind === "upload"
    ? [{ id: media.cover.id, name: media.cover.name }]
    : [];
}

function urlsFromMedia(media: EditableCaseMediaState) {
  return media.gallery.flatMap((ref) => (ref.kind === "url" ? [ref.value] : []));
}

function coverUrlFromMedia(media: EditableCaseMediaState) {
  return media.cover?.kind === "url" ? media.cover.value : "";
}

function resolveUploadRefs(refs: EditableCaseMediaRef[], files: NotionFileEntry[]) {
  const consumed = new Set<number>();
  return refs.flatMap((ref) => {
    if (ref.kind === "url") return [{ ...ref, previewUrl: ref.value } satisfies EditableCaseMediaRef];
    let index = files.findIndex((file, candidateIndex) => !consumed.has(candidateIndex) && file.name === ref.name);
    if (index < 0) index = files.findIndex((_, candidateIndex) => !consumed.has(candidateIndex));
    if (index >= 0) consumed.add(index);
    return [
      {
        ...ref,
        previewUrl: index >= 0 ? files[index].url : undefined,
      } satisfies EditableCaseMediaRef,
    ];
  });
}

function mediaFromPage(page: PageObjectResponse): EditableCaseMediaState {
  const stored = parseStoredMedia(readText(page.properties, "Media JSON"));
  const coverFiles = readFileEntries(page.properties, "Zdjęcie główne");
  const galleryFiles = readFileEntries(page.properties, "Galeria");

  if (stored) {
    const cover = stored.cover
      ? resolveUploadRefs([stored.cover], coverFiles)[0]
      : undefined;
    return {
      cover,
      gallery: resolveUploadRefs(stored.gallery, galleryFiles),
    };
  }

  const coverUrl = readText(page.properties, "Cover URL");
  const galleryUrls = splitLines(readText(page.properties, "Galeria URL"));
  return {
    cover: coverUrl && isSupportedCaseImageReference(coverUrl)
      ? { kind: "url", value: coverUrl, previewUrl: coverUrl, name: coverUrl.split("/").pop() || coverUrl }
      : undefined,
    gallery: galleryUrls
      .filter(isSupportedCaseImageReference)
      .slice(0, MAX_GALLERY_IMAGES)
      .map((value) => ({
        kind: "url" as const,
        value,
        previewUrl: value,
        name: value.split("/").pop() || value,
      })),
  };
}

function resolvedMediaSources(page: PageObjectResponse) {
  const media = mediaFromPage(page);
  const coverImage = media.cover?.previewUrl || DEFAULT_COVER_IMAGE;
  const gallery = media.gallery
    .map((ref) => ref.previewUrl)
    .filter((src): src is string => Boolean(src) && isSupportedCaseImageReference(src));
  return { coverImage, gallery };
}

function isArchived(page: PageObjectResponse) {
  return readCheckbox(page.properties, "Archiwum");
}

function isPublished(page: PageObjectResponse) {
  return readSelect(page.properties, "Status publikacji") === "Published" && !isArchived(page);
}

function mapNotionCase(page: PageObjectResponse, locale: Locale): LocalizedCaseStudy {
  const title = readText(page.properties, "Tytuł") || "Case study";
  const challenge = readText(page.properties, "Potrzeba klienta");
  const result = readText(page.properties, "Rezultat");
  const { coverImage, gallery: gallerySources } = resolvedMediaSources(page);
  const gallery = unique(gallerySources)
    .filter((src) => src !== coverImage)
    .map((src) => ({ src, alt: title }));
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

function mapAdminSummary(page: PageObjectResponse): AdminNotionCaseSummary {
  const status = readSelect(page.properties, "Status publikacji") === "Published" ? "Published" : "Draft";
  const media = resolvedMediaSources(page);
  return {
    id: page.id,
    notionUrl: page.url,
    title: readText(page.properties, "Tytuł") || "Case study",
    slug: readText(page.properties, "Slug"),
    category: readText(page.properties, "Kategoria") || "Inne",
    publishedAt: readDate(page.properties, "Data publikacji") || undefined,
    status,
    published: status === "Published" && !isArchived(page),
    archived: isArchived(page),
    featured: readCheckbox(page.properties, "Featured"),
    coverImage: media.coverImage,
  };
}

function mapAdminCase(page: PageObjectResponse): AdminNotionCase {
  const summary = mapAdminSummary(page);
  return {
    ...summary,
    clientLabel: readText(page.properties, "Klient publiczny"),
    excerpt: readText(page.properties, "Excerpt"),
    country: readSelect(page.properties, "Kraj") || "Inny",
    challenge: readText(page.properties, "Potrzeba klienta"),
    requirements: splitLines(readText(page.properties, "Główne wymagania")),
    work: splitLines(readText(page.properties, "Praca B&BS")),
    products: splitLines(readText(page.properties, "Wyprodukowane produkty")),
    result: readText(page.properties, "Rezultat"),
    outcome: readText(page.properties, "Satysfakcja klienta"),
    orderValueUsd: readNumber(page.properties, "Wartość zamówienia USD"),
    deliveryMethod: readText(page.properties, "Dostawa"),
    videoUrl: readUrl(page.properties, "Video URL"),
    media: mediaFromPage(page),
  };
}

async function queryAllNotionCases() {
  return getClient().dataSources.query({
    data_source_id: casesDataSourceId(),
    result_type: "page",
    page_size: 100,
    sorts: [
      { property: "Data publikacji", direction: "descending" },
      { timestamp: "last_edited_time", direction: "descending" },
    ],
  });
}

async function queryNotionCaseBySlug(slug: string) {
  return getClient().dataSources.query({
    data_source_id: casesDataSourceId(),
    result_type: "page",
    page_size: 2,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
}

export async function listPublishedNotionCases(locale: Locale): Promise<LocalizedCaseStudy[]> {
  if (locale !== "pl" || !isNotionCasesConfigured()) return [];
  const response = await queryAllNotionCases();
  return response.results
    .filter(isFullPage)
    .filter(isPublished)
    .map((page) => mapNotionCase(page, locale))
    .filter((item) => Boolean(item.slug));
}

export async function getPublishedNotionCaseBySlug(
  slug: string,
  locale: Locale,
): Promise<LocalizedCaseStudy | undefined> {
  if (locale !== "pl" || !isNotionCasesConfigured()) return undefined;
  const response = await queryNotionCaseBySlug(slug);
  const page = response.results.filter(isFullPage).find(isPublished);
  return page ? mapNotionCase(page, locale) : undefined;
}

export async function getCasesForLocale(locale: Locale): Promise<LocalizedCaseStudy[]> {
  const staticCases = getCaseStudies(locale) as LocalizedCaseStudy[];
  if (locale !== "pl" || !isNotionCasesConfigured()) return staticCases;

  try {
    const response = await queryAllNotionCases();
    return response.results
      .filter(isFullPage)
      .filter(isPublished)
      .map((page) => mapNotionCase(page, locale))
      .filter((item) => Boolean(item.slug));
  } catch (error) {
    console.error("[cases/notion] Failed to load managed cases", error);
    // Once the Polish CMS is configured, publication state in Notion is authoritative.
    // Fail closed so a Draft/archived legacy case can never reappear from static fallback.
    return [];
  }
}

export async function getCaseForSlug(
  slug: string,
  locale: Locale,
): Promise<LocalizedCaseStudy | undefined> {
  const staticCase = getCaseStudyBySlug(slug, locale) as LocalizedCaseStudy | undefined;
  if (locale !== "pl" || !isNotionCasesConfigured()) return staticCase;

  try {
    const response = await queryNotionCaseBySlug(slug);
    const page = response.results.find(isFullPage);
    return page && isPublished(page) ? mapNotionCase(page, locale) : undefined;
  } catch (error) {
    console.error(`[cases/notion] Failed to load case ${slug}`, error);
    // Notion controls visibility for Polish cases. Do not expose a legacy fallback on CMS errors.
    return undefined;
  }
}

export async function listAdminNotionCases(): Promise<AdminNotionCaseSummary[]> {
  if (!isNotionCasesConfigured()) return [];
  const response = await queryAllNotionCases();
  return response.results.filter(isFullPage).map(mapAdminSummary);
}

export async function getAdminNotionCaseById(pageId: string): Promise<AdminNotionCase | undefined> {
  if (!isNotionCasesConfigured()) return undefined;
  const page = await getClient().pages.retrieve({ page_id: pageId });
  return isFullPage(page) ? mapAdminCase(page) : undefined;
}

export async function getAdminPreviewCaseById(
  pageId: string,
  locale: Locale = "pl",
): Promise<LocalizedCaseStudy | undefined> {
  if (!isNotionCasesConfigured()) return undefined;
  const page = await getClient().pages.retrieve({ page_id: pageId });
  return isFullPage(page) ? mapNotionCase(page, locale) : undefined;
}

async function notionSlugExists(slug: string, excludingPageId?: string) {
  const response = await queryNotionCaseBySlug(slug);
  return response.results.filter(isFullPage).some((page) => page.id !== excludingPageId);
}

async function existingNotionSlugs() {
  const response = await queryAllNotionCases();
  return new Set(
    response.results
      .filter(isFullPage)
      .map((page) => readText(page.properties, "Slug"))
      .filter(Boolean),
  );
}

function caseProperties(input: NewNotionCaseInput, media: EditableCaseMediaState, archived = false) {
  const publishedAt = input.publishedAt || new Date().toISOString().slice(0, 10);
  return {
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
    "Cover URL": textProperty(coverUrlFromMedia(media)),
    "Galeria URL": textProperty(urlsFromMedia(media).join("\n")),
    "Zdjęcie główne": uploadFilesProperty(coverUploadFromMedia(media)),
    "Galeria": uploadFilesProperty(uploadsFromMedia(media)),
    "Media JSON": longTextProperty(serializeMedia(media)),
    "Video URL": { url: input.videoUrl?.trim() || null },
    "Featured": { checkbox: input.featured },
    "Archiwum": { checkbox: archived },
    "Status publikacji": { select: { name: input.published ? "Published" : "Draft" } },
  };
}

async function createCasePage(input: NewNotionCaseInput) {
  const media = buildMediaFromInput(input);
  const page = await getClient().pages.create({
    parent: { data_source_id: casesDataSourceId() },
    properties: caseProperties(input, media),
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

export async function updateNotionCase(pageId: string, input: NewNotionCaseInput) {
  if (await notionSlugExists(input.slug, pageId)) {
    throw new DuplicateCaseSlugError(input.slug);
  }
  const current = await getAdminNotionCaseById(pageId);
  if (!current) throw new Error("Case not found");
  const media = buildMediaFromInput(input);
  const archived = input.published ? false : current.archived;
  const page = await getClient().pages.update({
    page_id: pageId,
    properties: caseProperties(input, media, archived),
  });
  return {
    pageId: page.id,
    slug: input.slug,
    published: input.published,
  };
}

export async function setNotionCasePublished(pageId: string, published: boolean) {
  const current = await getAdminNotionCaseById(pageId);
  if (!current) throw new Error("Case not found");
  await getClient().pages.update({
    page_id: pageId,
    properties: {
      "Status publikacji": { select: { name: published ? "Published" : "Draft" } },
      ...(published ? { "Archiwum": { checkbox: false } } : {}),
    },
  });
  return { slug: current.slug, published };
}

export async function setNotionCaseArchived(pageId: string, archived: boolean) {
  const current = await getAdminNotionCaseById(pageId);
  if (!current) throw new Error("Case not found");
  await getClient().pages.update({
    page_id: pageId,
    properties: {
      "Archiwum": { checkbox: archived },
      ...(archived ? { "Status publikacji": { select: { name: "Draft" } } } : {}),
    },
  });
  return { slug: current.slug, archived };
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
