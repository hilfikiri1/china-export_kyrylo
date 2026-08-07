import { Client, isFullPage, type PageObjectResponse } from "@notionhq/client";
import type { BlogPost } from "./types";

const NOTION_VERSION = "2026-03-11";
const DEFAULT_BLOG_DATA_SOURCE_ID = "8c0d09be-98d8-48ce-85be-4f2fff313766";
const DEFAULT_SITE_URL = "https://global.buybringsolutions.com";

export type BlogPublicationStatus = "Draft" | "Published";

export type NewBlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  coverImage?: string;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  locale: "pl";
  status: BlogPublicationStatus;
};

export class BlogSlugConflictError extends Error {
  constructor(slug: string) {
    super(`Blog post with slug "${slug}" already exists.`);
    this.name = "BlogSlugConflictError";
  }
}

export class NotionBlogConfigurationError extends Error {
  constructor() {
    super("Notion blog integration is not configured.");
    this.name = "NotionBlogConfigurationError";
  }
}

let client: Client | undefined;

function getToken() {
  return process.env.NOTION_API_TOKEN?.trim() || process.env.NOTION_API_KEY?.trim();
}

function getDataSourceId() {
  return process.env.NOTION_BLOG_DATA_SOURCE_ID?.trim() || DEFAULT_BLOG_DATA_SOURCE_ID;
}

function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  try {
    return new URL(candidate);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

function getClient() {
  const token = getToken();
  if (!token) throw new NotionBlogConfigurationError();
  if (!client) {
    client = new Client({ auth: token, notionVersion: NOTION_VERSION });
  }
  return client;
}

export function isNotionBlogConfigured() {
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

function fileUrlFromProperty(properties: PageObjectResponse["properties"], name: string) {
  const property = properties[name];
  if (!property || property.type !== "files" || property.files.length === 0) return undefined;
  const file = property.files[0];
  if (file.type === "external") return file.external.url;
  if (file.type === "file") return file.file.url;
  return undefined;
}

function pageCoverUrl(page: PageObjectResponse) {
  if (!page.cover) return undefined;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return undefined;
}

function websiteCoverPath(url: string | undefined) {
  if (!url) return undefined;
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    const site = getSiteUrl();
    if (parsed.origin === site.origin) return `${parsed.pathname}${parsed.search}`;
  } catch {
    return undefined;
  }
  // The website intentionally does not proxy arbitrary third-party image URLs.
  return undefined;
}

function mapPage(page: PageObjectResponse, content = ""): BlogPost | undefined {
  const title = readText(page.properties, "Tytuł");
  const slug = readText(page.properties, "Slug");
  const excerpt = readText(page.properties, "Excerpt");
  if (!title || !slug || !excerpt) return undefined;

  const status = readSelect(page.properties, "Status publikacji");
  return {
    slug,
    title,
    excerpt,
    content,
    coverImage: websiteCoverPath(
      fileUrlFromProperty(page.properties, "Zdjęcie główne") ?? pageCoverUrl(page),
    ),
    date: readDate(page.properties, "Data publikacji") || page.created_time.slice(0, 10),
    author: readText(page.properties, "Autor") || "Buy & Bring Solutions",
    category: readText(page.properties, "Kategoria") || "Import z Chin",
    locale: readSelect(page.properties, "Locale") || "pl",
    published: status === "Published",
    seoTitle: readText(page.properties, "SEO title") || undefined,
    seoDescription: readText(page.properties, "SEO description") || undefined,
  };
}

export async function getNotionPublishedBlogPosts(locale = "pl"): Promise<BlogPost[]> {
  const notion = getClient();
  const response = await notion.dataSources.query({
    data_source_id: getDataSourceId(),
    result_type: "page",
    page_size: 100,
    filter: {
      and: [
        { property: "Status publikacji", select: { equals: "Published" } },
        { property: "Locale", select: { equals: locale } },
      ],
    },
    sorts: [{ property: "Data publikacji", direction: "descending" }],
  });

  return response.results
    .filter(isFullPage)
    .map((page) => mapPage(page))
    .filter((post): post is BlogPost => Boolean(post));
}

export async function getNotionBlogPostBySlug(
  slug: string,
  locale = "pl",
): Promise<BlogPost | undefined> {
  const notion = getClient();
  const response = await notion.dataSources.query({
    data_source_id: getDataSourceId(),
    result_type: "page",
    page_size: 1,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Status publikacji", select: { equals: "Published" } },
        { property: "Locale", select: { equals: locale } },
      ],
    },
  });

  const page = response.results.find(isFullPage);
  if (!page) return undefined;

  const markdown = await notion.pages.retrieveMarkdown({ page_id: page.id });
  return mapPage(page, markdown.markdown);
}

function notionCoverUrl(value: string | undefined) {
  if (!value) return undefined;
  const site = getSiteUrl();
  if (value.startsWith("/")) return new URL(value, site).toString();

  const parsed = new URL(value);
  if (parsed.protocol !== "https:" || parsed.origin !== site.origin) {
    throw new Error("Cover image must use the website origin or a local / path.");
  }
  return parsed.toString();
}

async function slugExists(slug: string) {
  const notion = getClient();
  const response = await notion.dataSources.query({
    data_source_id: getDataSourceId(),
    result_type: "page",
    page_size: 1,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  return response.results.some(isFullPage);
}

export async function createNotionBlogPost(input: NewBlogPostInput) {
  if (await slugExists(input.slug)) throw new BlogSlugConflictError(input.slug);

  const notion = getClient();
  const coverUrl = notionCoverUrl(input.coverImage);
  const files = coverUrl
    ? [{ name: "blog-cover", type: "external" as const, external: { url: coverUrl } }]
    : [];

  const page = await notion.pages.create({
    parent: { data_source_id: getDataSourceId() },
    properties: {
      "Tytuł": { title: [{ type: "text", text: { content: input.title } }] },
      "Slug": { rich_text: [{ type: "text", text: { content: input.slug } }] },
      "Excerpt": { rich_text: [{ type: "text", text: { content: input.excerpt } }] },
      "Kategoria": { rich_text: [{ type: "text", text: { content: input.category } }] },
      "Locale": { select: { name: input.locale } },
      "Autor": { rich_text: [{ type: "text", text: { content: input.author } }] },
      "SEO title": input.seoTitle
        ? { rich_text: [{ type: "text", text: { content: input.seoTitle } }] }
        : { rich_text: [] },
      "SEO description": input.seoDescription
        ? { rich_text: [{ type: "text", text: { content: input.seoDescription } }] }
        : { rich_text: [] },
      "Status publikacji": { select: { name: input.status } },
      "Data publikacji": { date: { start: input.date } },
      "Zdjęcie główne": { files },
    },
    markdown: input.content,
    cover: coverUrl ? { type: "external", external: { url: coverUrl } } : undefined,
  });

  return { id: page.id, url: "url" in page ? page.url : undefined };
}
