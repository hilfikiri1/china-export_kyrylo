import {
  BlogSlugConflictError,
  createNotionBlogPost,
  isNotionBlogConfigured,
  NotionBlogConfigurationError,
  type BlogPublicationStatus,
  type NewBlogPostInput,
} from "@/lib/blog/notion";

const MAX = {
  title: 200,
  slug: 120,
  excerpt: 700,
  content: 100_000,
  category: 100,
  author: 120,
  seoTitle: 220,
  seoDescription: 600,
  coverImage: 2_000,
} as const;

function isWriteEnvironment() {
  return process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";
}

function hidden() {
  return Response.json({ error: "Not found" }, { status: 404 });
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validate(body: unknown): { data?: NewBlogPostInput; error?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Nieprawidłowe dane formularza." };
  }

  const input = body as Record<string, unknown>;
  const title = stringValue(input.title);
  const slug = stringValue(input.slug).toLowerCase();
  const excerpt = stringValue(input.excerpt);
  const content = stringValue(input.content);
  const category = stringValue(input.category) || "Import z Chin";
  const author = stringValue(input.author) || "Buy & Bring Solutions";
  const seoTitle = stringValue(input.seoTitle);
  const seoDescription = stringValue(input.seoDescription);
  const coverImage = stringValue(input.coverImage);
  const date = stringValue(input.date) || new Date().toISOString().slice(0, 10);
  const status = stringValue(input.status) as BlogPublicationStatus;

  if (!title || title.length > MAX.title) return { error: "Sprawdź tytuł artykułu." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > MAX.slug) {
    return { error: "Slug może zawierać tylko małe litery a-z, cyfry i myślniki." };
  }
  if (!excerpt || excerpt.length > MAX.excerpt) return { error: "Sprawdź zajawkę artykułu." };
  if (!content || content.length > MAX.content) return { error: "Sprawdź treść artykułu." };
  if (category.length > MAX.category || author.length > MAX.author) {
    return { error: "Kategoria lub autor są zbyt długie." };
  }
  if (seoTitle.length > MAX.seoTitle || seoDescription.length > MAX.seoDescription) {
    return { error: "Pola SEO są zbyt długie." };
  }
  if (!validDate(date)) return { error: "Nieprawidłowa data publikacji." };
  if (status !== "Draft" && status !== "Published") {
    return { error: "Wybierz Draft albo Published." };
  }

  if (coverImage) {
    if (coverImage.length > MAX.coverImage) return { error: "Adres zdjęcia jest zbyt długi." };
    if (!coverImage.startsWith("/")) {
      try {
        const cover = new URL(coverImage);
        const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://global.buybringsolutions.com");
        if (cover.protocol !== "https:" || cover.origin !== site.origin) {
          return { error: "Zdjęcie musi pochodzić z domeny strony B&BS albo używać ścieżki /..." };
        }
      } catch {
        return { error: "Nieprawidłowy adres zdjęcia." };
      }
    }
  }

  return {
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      date,
      coverImage: coverImage || undefined,
      author,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      locale: "pl",
      status,
    },
  };
}

export function GET() {
  if (!isWriteEnvironment()) return hidden();
  return Response.json({ configured: isNotionBlogConfigured() });
}

export async function POST(request: Request) {
  if (!isWriteEnvironment()) return hidden();
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Nieprawidłowy JSON." }, { status: 400 });
  }

  const validated = validate(body);
  if (!validated.data) {
    return Response.json({ error: validated.error ?? "Nieprawidłowe dane." }, { status: 400 });
  }

  try {
    const saved = await createNotionBlogPost(validated.data);
    return Response.json(
      {
        ok: true,
        slug: validated.data.slug,
        status: validated.data.status,
        notionUrl: saved.url,
        publicUrl: `/pl/blog/${validated.data.slug}`,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof BlogSlugConflictError) {
      return Response.json({ error: "Wpis z takim slugiem już istnieje." }, { status: 409 });
    }
    if (error instanceof NotionBlogConfigurationError) {
      return Response.json({ error: "Integracja Notion nie jest skonfigurowana." }, { status: 503 });
    }
    console.error("[api/bbs/blog] Could not create blog post.", error);
    return Response.json({ error: "Nie udało się zapisać wpisu w Notion." }, { status: 502 });
  }
}
