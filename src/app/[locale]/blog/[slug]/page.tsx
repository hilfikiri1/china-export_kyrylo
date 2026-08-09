import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog/posts";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { siteUrl } from "@/config/seo";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

function absoluteMediaUrl(value?: string) {
  if (!value) return `${siteUrl}/image/plane_shipment.jpg`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

function renderBlogContent(content: string): ReactNode[] {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${i}`} className="mt-6 scroll-mt-24 text-base font-semibold text-white/90">
          {line.slice(4)}
        </h3>,
      );
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${i}`} className="mt-8 scroll-mt-24 text-lg font-bold text-white">
          {line.slice(3)}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h2 key={`h1-${i}`} className="mt-8 scroll-mt-24 text-lg font-bold text-white">
          {line.slice(2)}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      let cursor = i;
      while (cursor < lines.length && lines[cursor].trim().startsWith("- ")) {
        items.push(lines[cursor].trim().slice(2));
        cursor += 1;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="space-y-1.5 pl-1">
          {items.map((item, itemIndex) => (
            <li key={`${i}-${itemIndex}`} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>,
      );
      i = cursor - 1;
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      let cursor = i;
      while (cursor < lines.length && /^\d+\.\s/.test(lines[cursor].trim())) {
        items.push(lines[cursor].trim().replace(/^\d+\.\s+/, ""));
        cursor += 1;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="list-decimal space-y-1.5 pl-5 marker:text-accent-light">
          {items.map((item, itemIndex) => (
            <li key={`${i}-${itemIndex}`} className="pl-1">
              {item}
            </li>
          ))}
        </ol>,
      );
      i = cursor - 1;
      continue;
    }

    if (line === "---") {
      blocks.push(<hr key={`hr-${i}`} className="my-8 border-white/10" />);
      continue;
    }

    blocks.push(<p key={`p-${i}`}>{line}</p>);
  }

  return blocks;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "pl") return { robots: { index: false, follow: false } };
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const url = `${siteUrl}/pl/blog/${post.slug}`;
  const image = absoluteMediaUrl(post.coverImage);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Buy & Bring Solutions",
      locale: "pl_PL",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || "Buy & Bring Solutions"],
      section: post.category,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  if (locale !== "pl") notFound();

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug, locale),
    getPublishedBlogPosts(locale),
  ]);
  if (!post) notFound();

  const { t } = await getServerTranslation(locale);
  const canonicalUrl = `${siteUrl}/pl/blog/${post.slug}`;
  const image = absoluteMediaUrl(post.coverImage);
  const description = post.seoDescription ?? post.excerpt;
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    headline: post.title,
    description,
    image: [image],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pl-PL",
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: {
      "@type": post.author === "Buy & Bring Solutions" ? "Organization" : "Person",
      name: post.author || "Buy & Bring Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "Buy & Bring Solutions",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo.svg` },
    },
  };
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Buy & Bring Solutions", item: `${siteUrl}/pl` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/pl/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { label: "Blog", href: `/${locale}/blog` },
        { label: post.title },
      ])}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <article className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        <div className="mb-6">
          <span className="mb-3 inline-block rounded-full border border-accent-light/30 bg-accent-light/10 px-3 py-1 text-xs font-medium text-accent-light">
            {post.category}
          </span>
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" aria-hidden />
              {post.author}
            </span>
          </div>
        </div>

        {post.coverImage && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        <div className="blog-content space-y-4 text-sm leading-relaxed text-white/75">
          {renderBlogContent(post.content)}
        </div>

        {relatedPosts.length > 0 && (
          <aside className="mt-12 border-t border-white/10 pt-8" aria-labelledby="related-posts-title">
            <h2 id="related-posts-title" className="text-lg font-bold text-white">Powiązane artykuły</h2>
            <div className="mt-4 grid gap-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/pl/blog/${item.slug}`}
                  className="rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-accent-light/30"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-light">{item.category}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <div className="mt-12 rounded-2xl border border-accent-light/20 bg-accent-light/5 p-5 sm:p-6">
          <p className="font-semibold text-white">Interesuje Cię import z Chin?</p>
          <p className="mt-1 text-sm text-white/60">
            Opisz swój projekt — zaproponujemy zakres wsparcia.
          </p>
          <Link
            href={`/${locale}/kontakt`}
            className="mt-4 inline-block rounded-lg border border-accent-light/20 bg-accent-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
          >
            Skontaktuj się
          </Link>
        </div>
      </article>
    </DedicatedPageShell>
  );
}
