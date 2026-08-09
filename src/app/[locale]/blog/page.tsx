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
import { siteUrl } from "@/config/seo";

type PageProps = { params: Promise<{ locale: string }> };

export const revalidate = 300;

const BLOG_TITLE = "Blog o imporcie z Chin, sourcingu i logistyce — Buy & Bring Solutions";
const BLOG_DESCRIPTION =
  "Praktyczne artykuły B2B o imporcie z Chin: sourcing dostawców, audyty fabryk, kontrola jakości, logistyka, negocjacje i bezpieczna organizacja zakupów.";
const BLOG_URL = `${siteUrl}/pl/blog`;
const DEFAULT_OG_IMAGE = `${siteUrl}/image/plane_shipment.jpg`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  if (l !== "pl") return { robots: { index: false, follow: false } };
  return {
    title: { absolute: BLOG_TITLE },
    description: BLOG_DESCRIPTION,
    alternates: { canonical: BLOG_URL },
    robots: { index: true, follow: true },
    openGraph: {
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      url: BLOG_URL,
      siteName: "Buy & Bring Solutions",
      locale: "pl_PL",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, alt: "Buy & Bring Solutions — import z Chin" }],
    },
    twitter: {
      card: "summary_large_image",
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
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
  const posts = await getPublishedBlogPosts(locale);
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Buy & Bring Solutions — Blog",
    description: BLOG_DESCRIPTION,
    url: BLOG_URL,
    inLanguage: "pl-PL",
    publisher: {
      "@type": "Organization",
      name: "Buy & Bring Solutions",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo.svg` },
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription ?? post.excerpt,
      datePublished: post.date,
      url: `${BLOG_URL}/${post.slug}`,
      author: { "@type": "Organization", name: post.author || "Buy & Bring Solutions" },
      ...(post.coverImage ? { image: post.coverImage } : {}),
    })),
  };
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BLOG_URL}/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [{ label: "Blog" }])}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            Blog
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Wiedza o imporcie z Chin
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Praktyczne artykuły dla firm importujących produkty z Chin: sourcing, weryfikacja fabryk, kontrola jakości, negocjacje i logistyka.
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
                    <h2 className="text-lg font-bold text-white transition-colors group-hover:text-accent-light/90">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
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
