import "server-only";

import {
  Client,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";
import { contacts } from "@/config/contacts";
import { buildProjectAccessUrl, generateProjectAccessToken } from "@/lib/token/generate";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "./constants";
import type { ProjectDataProvider } from "./provider";
import type {
  Project,
  ProjectDocument,
  ProjectMedia,
  PortalProjectSummary,
  ProjectStage,
  ProjectUpdate,
} from "./types";

const NOTION_VERSION = "2026-03-11";
const DEFAULT_PROJECTS_DATA_SOURCE_ID = "fcb024d7-ac9f-4948-a2e9-715fa011c712";
const DEFAULT_PORTAL_UPDATES_DATA_SOURCE_ID = "43900780-4133-4935-8fa4-f3ba1c28455c";

export type NewPortalProjectInput = {
  name: string;
  projectNumber?: string;
  company?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  description?: string;
  kommoId?: number;
  internalStatus: string;
  currentStage: string;
  nextStep?: string;
  plannedDate?: string;
  managerName?: string;
};

export type PortalProjectEditInput = {
  internalStatus: string;
  currentStage: string;
  nextStep?: string;
  plannedDate?: string;
  managerName?: string;
  active: boolean;
};

export type PortalUpdateInput = {
  currentStage: string;
  description?: string;
  nextStep?: string;
  plannedDate?: string;
  visible: boolean;
  images?: File[];
};

export class NotionPortalConfigurationError extends Error {
  constructor() {
    super("Notion client portal integration is not configured.");
    this.name = "NotionPortalConfigurationError";
  }
}

type FileValue = { name: string; url: string };

let client: Client | undefined;

function getToken() {
  return process.env.NOTION_API_TOKEN?.trim() || process.env.NOTION_API_KEY?.trim();
}

function projectsDataSourceId() {
  return process.env.NOTION_PROJECTS_DATABASE_ID?.trim() || DEFAULT_PROJECTS_DATA_SOURCE_ID;
}

function portalUpdatesDataSourceId() {
  return (
    process.env.NOTION_PORTAL_UPDATES_DATA_SOURCE_ID?.trim() ||
    DEFAULT_PORTAL_UPDATES_DATA_SOURCE_ID
  );
}

function getClient() {
  const token = getToken();
  if (!token) throw new NotionPortalConfigurationError();
  if (!client) client = new Client({ auth: token, notionVersion: NOTION_VERSION });
  return client;
}

export function isNotionPortalConfigured() {
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

function readNumber(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "number" ? property.number ?? 0 : 0;
}

function readCheckbox(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "checkbox" ? property.checkbox : false;
}

function readUrl(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  return property?.type === "url" ? property.url ?? "" : "";
}

function readFiles(properties: PageObjectResponse["properties"], name: string): FileValue[] {
  const property = properties[name];
  if (!property || property.type !== "files") return [];
  return property.files.flatMap((item) => {
    if (item.type === "file") return [{ name: item.name, url: item.file.url }];
    if (item.type === "external") return [{ name: item.name, url: item.external.url }];
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

function normalizeId(value: string) {
  return value.replaceAll("-", "").toLowerCase();
}

function normalizeStage(value: string) {
  return value.trim().toLocaleLowerCase("pl-PL");
}

function stageId(name: string, index: number) {
  return `${index + 1}-${name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function buildStages(currentStage: string): ProjectStage[] {
  const currentIndex = PORTAL_STAGES.findIndex(
    (name) => normalizeStage(name) === normalizeStage(currentStage),
  );
  if (currentIndex < 0) {
    return [{ id: stageId(currentStage, 0), name: currentStage, status: "current" }];
  }
  return PORTAL_STAGES.map((name, index) => ({
    id: stageId(name, index),
    name,
    status: index < currentIndex ? "completed" : index === currentIndex ? "current" : "upcoming",
  }));
}

function extension(name: string) {
  const match = name.toLowerCase().match(/\.([a-z0-9]{2,8})$/);
  return match?.[1] ?? "file";
}

function mediaType(name: string): "image" | "video" | undefined {
  const ext = extension(name);
  if (["jpg", "jpeg", "png", "webp", "gif", "avif", "heic"].includes(ext)) return "image";
  if (["mp4", "mov", "webm", "m4v"].includes(ext)) return "video";
  return undefined;
}

function uniqueFiles<T extends { url: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.url, item])).values());
}

function countryLabel(value: string) {
  const labels: Record<string, string> = {
    Польша: "Polska",
    Украина: "Ukraina",
    Германия: "Niemcy",
    Латвия: "Łotwa",
    Болгария: "Bułgaria",
    Испания: "Hiszpania",
    Китай: "Chiny",
    Другая: "Inny kraj",
  };
  return labels[value] ?? value;
}

function isExpired(page: PageObjectResponse) {
  const expiresAt = readDate(page.properties, "Portal wygasa");
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt).getTime();
  return Number.isFinite(expiry) && expiry < Date.now();
}

function isExpectedProjectPage(page: PageObjectResponse) {
  const parent = page.parent;
  return (
    parent.type === "data_source_id" &&
    normalizeId(parent.data_source_id) === normalizeId(projectsDataSourceId())
  );
}

async function visibleUpdates(projectPageId: string) {
  const response = await getClient().dataSources.query({
    data_source_id: portalUpdatesDataSourceId(),
    result_type: "page",
    page_size: 100,
    filter: {
      and: [
        { property: "Projekt", relation: { contains: projectPageId } },
        { property: "Widoczne dla klienta", checkbox: { equals: true } },
      ],
    },
    sorts: [{ property: "Data", direction: "descending" }],
  });
  return response.results.filter(isFullPage);
}

function mapUpdate(page: PageObjectResponse, fallbackStage: string): ProjectUpdate {
  return {
    id: page.id,
    date: readDate(page.properties, "Data") || page.created_time.slice(0, 10),
    stage: readText(page.properties, "Etap") || fallbackStage,
    note:
      readText(page.properties, "Opis dla klienta") ||
      readText(page.properties, "Aktualizacja"),
  };
}

function updateDocuments(pages: PageObjectResponse[]): ProjectDocument[] {
  return pages.flatMap((page) => {
    if (readSelect(page.properties, "Typ") !== "Document") return [];
    const uploadedAt = readDate(page.properties, "Data") || page.created_time.slice(0, 10);
    return readFiles(page.properties, "Pliki").map((file, index) => ({
      id: `${page.id}-${index}`,
      name: file.name,
      url: file.url,
      fileType: extension(file.name),
      uploadedAt,
    }));
  });
}

function updateMedia(pages: PageObjectResponse[]): ProjectMedia[] {
  return pages.flatMap((page) => {
    if (readSelect(page.properties, "Typ") === "Document") return [];
    const caption = readText(page.properties, "Opis dla klienta") || undefined;
    return readFiles(page.properties, "Pliki").flatMap((file, index) => {
      const type = mediaType(file.name);
      if (!type) return [];
      return [{ id: `${page.id}-${index}`, type, url: file.url, caption }];
    });
  });
}

async function mapProject(page: PageObjectResponse): Promise<Project> {
  const updates = await visibleUpdates(page.id);
  const currentStage = readText(page.properties, "Portal etap") || PORTAL_STAGES[0];
  const baseDocuments: ProjectDocument[] = readFiles(page.properties, "Portal dokumenty").map(
    (file, index) => ({
      id: `base-document-${index}`,
      name: file.name,
      url: file.url,
      fileType: extension(file.name),
      uploadedAt: page.last_edited_time.slice(0, 10),
    }),
  );
  const baseMedia: ProjectMedia[] = readFiles(page.properties, "Portal media").flatMap(
    (file, index) => {
      const type = mediaType(file.name);
      return type ? [{ id: `base-media-${index}`, type, url: file.url }] : [];
    },
  );
  const totalValue = readNumber(page.properties, "Portal wartość klienta USD");
  const paid = readNumber(page.properties, "Portal zapłacono USD");
  const lastUpdateTime = updates.reduce(
    (latest, update) => (update.last_edited_time > latest ? update.last_edited_time : latest),
    page.last_edited_time,
  );

  return {
    token: readText(page.properties, "Portal token"),
    projectNumber:
      readText(page.properties, "Numer projektu publiczny") || `BBS-${page.id.slice(0, 8)}`,
    name: readText(page.properties, "Portal produkt") || readText(page.properties, "Название"),
    currentStage,
    nextStep: readText(page.properties, "Portal następny krok") || undefined,
    plannedDate: readDate(page.properties, "Portal planowana data") || undefined,
    lastUpdatedAt: lastUpdateTime,
    manager: {
      name: readText(page.properties, "Portal manager") || "Buy & Bring Solutions",
      email: contacts.email,
      phone: contacts.phones.poland.display,
    },
    stages: buildStages(currentStage),
    updates: updates
      .map((update) => mapUpdate(update, currentStage))
      .filter((update) => update.note),
    documents: uniqueFiles([...baseDocuments, ...updateDocuments(updates)]),
    media: uniqueFiles([...baseMedia, ...updateMedia(updates)]),
    payment: {
      currency: "USD",
      totalValue,
      paid,
      remaining: Math.max(0, totalValue - paid),
      entries: [],
    },
    delivery: {
      method: readText(page.properties, "Portal metoda dostawy"),
      destinationCountry: countryLabel(readSelect(page.properties, "Страна")),
      containerNumber: readText(page.properties, "Portal kontener") || undefined,
      trackingNumber: readText(page.properties, "Portal tracking") || undefined,
      trackingUrl: readUrl(page.properties, "Portal tracking URL") || undefined,
      estimatedArrival: readDate(page.properties, "Portal planowana data") || undefined,
    },
    active: readCheckbox(page.properties, "Portal aktywny") && !isExpired(page),
  };
}

function summaryFromPage(page: PageObjectResponse): PortalProjectSummary {
  const token = readText(page.properties, "Portal token");
  return {
    pageId: page.id,
    name: readText(page.properties, "Portal produkt") || readText(page.properties, "Название"),
    company: readText(page.properties, "Компания"),
    contactName: readText(page.properties, "Контактное лицо"),
    projectNumber: readText(page.properties, "Numer projektu publiczny"),
    currentStage: readText(page.properties, "Portal etap") || PORTAL_STAGES[0],
    internalStatus: readSelect(page.properties, "Статус") || INTERNAL_PROJECT_STATUSES[0],
    nextStep: readText(page.properties, "Portal następny krok"),
    plannedDate: readDate(page.properties, "Portal planowana data"),
    managerName: readText(page.properties, "Portal manager") || "Buy & Bring Solutions",
    active: readCheckbox(page.properties, "Portal aktywny") && !isExpired(page),
    token,
    accessUrl: token ? buildProjectAccessUrl(token) : "",
    updatedAt: page.last_edited_time,
    notionUrl: page.url,
  };
}

async function getExpectedProjectPage(pageId: string) {
  const result = await getClient().pages.retrieve({ page_id: pageId });
  if (!isFullPage(result) || !isExpectedProjectPage(result)) {
    throw new Error("Project is outside the configured Notion project data source.");
  }
  return result;
}

export async function listPortalProjects(): Promise<PortalProjectSummary[]> {
  const response = await getClient().dataSources.query({
    data_source_id: projectsDataSourceId(),
    result_type: "page",
    page_size: 100,
    filter: { property: "Тип записи", select: { equals: "Проект" } },
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });
  return response.results
    .filter(isFullPage)
    .filter((page) => Boolean(readText(page.properties, "Portal token")))
    .map(summaryFromPage);
}

export async function getPortalProjectAdmin(pageId: string) {
  return summaryFromPage(await getExpectedProjectPage(pageId));
}

export async function createPortalProject(input: NewPortalProjectInput) {
  const notion = getClient();
  const token = generateProjectAccessToken();
  const projectNumber =
    input.projectNumber?.trim() ||
    `BBS-${new Date().getFullYear()}-${token.slice(0, 6).toUpperCase()}`;
  const page = await notion.pages.create({
    parent: { data_source_id: projectsDataSourceId() },
    properties: {
      "Название": titleProperty(input.name),
      "Тип записи": { select: { name: "Проект" } },
      "Статус": { select: { name: input.internalStatus } },
      "Компания": textProperty(input.company),
      "Контактное лицо": textProperty(input.contactName),
      "Email": { email: input.email?.trim() || null },
      "Телефон": { phone_number: input.phone?.trim() || null },
      "Описание / ТЗ": textProperty(input.description),
      "Kommo ID": { number: input.kommoId ?? null },
      "Numer projektu publiczny": textProperty(projectNumber),
      "Portal aktywny": { checkbox: true },
      "Portal token": textProperty(token),
      "Portal produkt": textProperty(input.name),
      "Portal manager": textProperty(input.managerName || "Buy & Bring Solutions"),
      "Portal etap": textProperty(input.currentStage),
      "Portal następny krok": textProperty(input.nextStep),
      "Portal planowana data": {
        date: input.plannedDate ? { start: input.plannedDate } : null,
      },
    },
  });
  if (!("id" in page)) throw new Error("Notion did not return the created project ID.");
  return {
    pageId: page.id,
    token,
    projectNumber,
    accessUrl: buildProjectAccessUrl(token),
    notionUrl: "url" in page ? page.url : "",
  };
}

export async function updatePortalProject(pageId: string, input: PortalProjectEditInput) {
  await getExpectedProjectPage(pageId);
  await getClient().pages.update({
    page_id: pageId,
    properties: {
      "Статус": { select: { name: input.internalStatus } },
      "Portal aktywny": { checkbox: input.active },
      "Portal manager": textProperty(input.managerName || "Buy & Bring Solutions"),
      "Portal etap": textProperty(input.currentStage),
      "Portal następny krok": textProperty(input.nextStep),
      "Portal planowana data": {
        date: input.plannedDate ? { start: input.plannedDate } : null,
      },
    },
  });
}

async function uploadImage(file: File) {
  const notion = getClient();
  const upload = await notion.fileUploads.create({
    mode: "single_part",
    filename: file.name,
    content_type: file.type,
  });
  await notion.fileUploads.send({
    file_upload_id: upload.id,
    file: { filename: file.name, data: file },
  });
  return { id: upload.id, name: file.name };
}

export async function createPortalUpdate(pageId: string, input: PortalUpdateInput) {
  await getExpectedProjectPage(pageId);
  const uploads = [];
  for (const image of input.images ?? []) uploads.push(await uploadImage(image));
  const today = new Date().toISOString().slice(0, 10);
  const title = input.description?.trim().slice(0, 80) || `Aktualizacja — ${input.currentStage}`;
  await getClient().pages.create({
    parent: { data_source_id: portalUpdatesDataSourceId() },
    properties: {
      "Aktualizacja": titleProperty(title),
      "Data": { date: { start: today } },
      "Etap": textProperty(input.currentStage),
      "Następny krok": textProperty(input.nextStep),
      "Opis dla klienta": textProperty(input.description),
      "Planowana data": {
        date: input.plannedDate ? { start: input.plannedDate } : null,
      },
      "Pliki": {
        files: uploads.map((upload) => ({
          type: "file_upload" as const,
          file_upload: { id: upload.id },
          name: upload.name,
        })),
      },
      "Projekt": { relation: [{ id: pageId }] },
      "Typ": { select: { name: "Status" } },
      "Widoczne dla klienta": { checkbox: input.visible },
    },
  });
}

export class NotionProjectProvider implements ProjectDataProvider {
  async getProjectByToken(token: string): Promise<Project | null> {
    const cleanToken = token.trim();
    if (!/^[a-f0-9]{64}$/i.test(cleanToken)) return null;
    const response = await getClient().dataSources.query({
      data_source_id: projectsDataSourceId(),
      result_type: "page",
      page_size: 1,
      filter: {
        and: [
          { property: "Portal token", rich_text: { equals: cleanToken } },
          { property: "Portal aktywny", checkbox: { equals: true } },
        ],
      },
    });
    const page = response.results.find(isFullPage);
    if (!page || isExpired(page)) return null;
    return mapProject(page);
  }
}
