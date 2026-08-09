import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { generateProjectAccessToken } from "@/lib/token/generate";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "./constants";

const NOTION_VERSION = "2026-03-11";
const DEFAULT_PROJECTS_DATA_SOURCE_ID = "fcb024d7-ac9f-4948-a2e9-715fa011c712";

export type QualifiedLeadProjectInput = {
  kommoId: number;
  name: string;
  company?: string;
  contactName: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  budget: string;
  destination: string;
  deadline: string;
  description: string;
};

let client: Client | undefined;

function token() {
  return process.env.NOTION_API_TOKEN?.trim() || process.env.NOTION_API_KEY?.trim();
}

function dataSourceId() {
  return process.env.NOTION_PROJECTS_DATABASE_ID?.trim() || DEFAULT_PROJECTS_DATA_SOURCE_ID;
}

function notion() {
  const auth = token();
  if (!auth) throw new Error("Notion client portal integration is not configured.");
  if (!client) client = new Client({ auth, notionVersion: NOTION_VERSION });
  return client;
}

function text(value: string | undefined) {
  const content = (value ?? "").trim().slice(0, 2000);
  return content
    ? { rich_text: [{ type: "text" as const, text: { content } }] }
    : { rich_text: [] };
}

function title(value: string) {
  return {
    title: [{ type: "text" as const, text: { content: value.trim().slice(0, 2000) } }],
  };
}

function numberFromPage(page: Parameters<typeof isFullPage>[0], propertyName: string) {
  if (!isFullPage(page)) return null;
  const property = page.properties[propertyName];
  return property?.type === "number" ? property.number : null;
}

export async function getPortalProjectKommoIds() {
  const response = await notion().dataSources.query({
    data_source_id: dataSourceId(),
    result_type: "page",
    page_size: 100,
    filter: { property: "Тип записи", select: { equals: "Проект" } },
  });

  const result = new Map<string, number>();
  for (const item of response.results) {
    if (!isFullPage(item)) continue;
    const kommoId = numberFromPage(item, "Kommo ID");
    if (typeof kommoId === "number" && Number.isFinite(kommoId)) result.set(item.id, kommoId);
  }
  return result;
}

export async function findProjectByKommoId(kommoId: number) {
  const response = await notion().dataSources.query({
    data_source_id: dataSourceId(),
    result_type: "page",
    page_size: 1,
    filter: {
      and: [
        { property: "Тип записи", select: { equals: "Проект" } },
        { property: "Kommo ID", number: { equals: kommoId } },
      ],
    },
  });
  const page = response.results.find(isFullPage);
  return page ? { pageId: page.id, url: page.url } : null;
}

export async function createProjectFromQualifiedLead(input: QualifiedLeadProjectInput) {
  if (!Number.isInteger(input.kommoId) || input.kommoId <= 0) {
    throw new Error("A valid Kommo lead ID is required.");
  }

  const existing = await findProjectByKommoId(input.kommoId);
  if (existing) return { ...existing, created: false };

  const portalToken = generateProjectAccessToken();
  const projectNumber = `BBS-${new Date().getFullYear()}-${String(input.kommoId)}`;
  const qualification = [
    input.description.trim(),
    "",
    "--- Website qualification ---",
    `Product: ${input.product}`,
    `Quantity: ${input.quantity}`,
    `Budget: ${input.budget}`,
    `Destination: ${input.destination}`,
    `Deadline: ${input.deadline}`,
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 2000);

  const page = await notion().pages.create({
    parent: { data_source_id: dataSourceId() },
    properties: {
      "Название": title(input.name),
      "Тип записи": { select: { name: "Проект" } },
      "Статус": { select: { name: INTERNAL_PROJECT_STATUSES[0] } },
      "Компания": text(input.company),
      "Контактное лицо": text(input.contactName),
      "Email": { email: input.email.trim() || null },
      "Телефон": { phone_number: input.phone.trim() || null },
      "Описание / ТЗ": text(qualification),
      "Kommo ID": { number: input.kommoId },
      "Numer projektu publiczny": text(projectNumber),
      "Portal aktywny": { checkbox: false },
      "Portal token": text(portalToken),
      "Portal produkt": text(input.product || input.name),
      "Portal manager": text("Buy & Bring Solutions"),
      "Portal etap": text(PORTAL_STAGES[0]),
      "Portal następny krok": text("Kwalifikacja projektu i potwierdzenie wymagań"),
      "Portal planowana data": { date: null },
    },
  });

  if (!("id" in page)) throw new Error("Notion did not return the created project ID.");
  return { pageId: page.id, url: "url" in page ? page.url : "", created: true };
}
