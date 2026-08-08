import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { isMarketingLocale } from "@/config/marketing-locales";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  if (!isMarketingLocale(l)) return {};
  const { t } = await getServerTranslation(l as Locale);
  return {
    title: t("pages.blog.meta.title"),
    description: t("pages.blog.meta.description"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  if (!isMarketingLocale(locale)) notFound();

  const { t } = await getServerTranslation(locale);
  const posts = await getPublishedBlogPosts(locale);

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [{ label: t("pages.blog.eyebrow") }])}
    >
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {t("pages.blog.eyebrow")}
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {t("pages.blog.title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            {t("pages.blog.lead")}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-white/50">{t("pages.blog.empty")}</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-navy-light transition-colors hover:border-white/20"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/6] w-full overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span className="rounded-full border border-white/10 px-2 py-0.5">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden />
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-accent-light/90 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs font-medium text-accent-light">
                      {t("pages.blog.readMore")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DedicatedPageShell>
  );
}
