import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog/posts";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedBlogPosts(locale).map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug, locale);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: { title: post.seoTitle ?? post.title, description: post.seoDescription ?? post.excerpt },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  if (locale !== "pl") notFound();

  const post = getBlogPostBySlug(slug, locale);
  if (!post) notFound();

  const { t } = await getServerTranslation(locale);

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { label: "Blog", href: `/${locale}/blog` },
        { label: post.title },
      ])}
    >
      <article className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        {/* Meta */}
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
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" aria-hidden />
              {post.author}
            </span>
          </div>
        </div>

        {/* Cover */}
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

        {/* Content — rendered as markdown-like text using prose styles */}
        <div className="blog-content space-y-4 text-sm leading-relaxed text-white/75">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 text-lg font-bold text-white">
                  {block.slice(3)}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-6 text-base font-semibold text-white/90">
                  {block.slice(4)}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="space-y-1.5 pl-1">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                      <span>{item.slice(2)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-accent-light/20 bg-accent-light/5 p-5 sm:p-6">
          <p className="font-semibold text-white">Interesuje Cię import z Chin?</p>
          <p className="mt-1 text-sm text-white/60">
            Opisz swój projekt — zaproponujemy zakres wsparcia.
          </p>
          <a
            href={`/${locale}/kontakt`}
            className="mt-4 inline-block rounded-lg border border-accent-light/20 bg-accent-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
          >
            Skontaktuj się
          </a>
        </div>
      </article>
    </DedicatedPageShell>
  );
}
