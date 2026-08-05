import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  if (l !== "pl") return {};
  return {
    title: "Blog — Buy & Bring Solutions",
    description: "Artykuły o imporcie z Chin, sourcingu i logistyce dla firm.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  if (locale !== "pl") notFound();

  const { t } = await getServerTranslation(locale);
  const posts = getPublishedBlogPosts(locale);

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [{ label: "Blog" }])}
    >
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            Blog
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Wiedza o imporcie z Chin
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Praktyczne artykuły dla firm importujących produkty z Chin.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-white/50">Brak opublikowanych artykułów.</p>
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
                      Czytaj więcej →
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
