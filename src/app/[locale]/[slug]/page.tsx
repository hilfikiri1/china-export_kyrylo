import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getAlternateLanguages, getCanonicalUrl, getPageSeo } from "@/config/seo";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/routing";

const legalPages = [
  "polityka-prywatnosci",
  "polityka-cookies",
  "regulamin",
  "zastrzezenie-kalkulatora",
] as const;

type LegalSlug = (typeof legalPages)[number];

const slugToSeoKey: Record<
  LegalSlug,
  "privacy" | "cookies" | "terms" | "calculatorDisclaimer"
> = {
  "polityka-prywatnosci": "privacy",
  "polityka-cookies": "cookies",
  regulamin: "terms",
  "zastrzezenie-kalkulatora": "calculatorDisclaimer",
};

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    legalPages.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const seoKey = slugToSeoKey[slug as LegalSlug];
  if (!seoKey) return {};
  const seo = getPageSeo(seoKey, locale);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: getCanonicalUrl(locale, slug),
      languages: getAlternateLanguages(slug),
    },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const legalSlug = slug as LegalSlug;
  const seoKey = slugToSeoKey[legalSlug];

  if (!seoKey) notFound();

  const messages = await getDictionary(locale);
  const seo = getPageSeo(seoKey, locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: messages.common.home, href: localizedPath(locale) },
        { label: seo.title.split(" | ")[0] ?? seo.title },
      ]}
    >
      <LegalPageContent
        title={seo.title.split(" | ")[0] ?? seo.title}
        locale={locale}
        slug={legalSlug}
      />
    </DedicatedPageShell>
  );
}
