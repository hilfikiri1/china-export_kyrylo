import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/cases";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";
import { CaseStudyArticle } from "@/components/cases/CaseStudyArticle";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { getCaseForSlug } from "@/lib/cases/notion";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((cs) => ({ locale, slug: cs.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) return {};
  const locale = localeParam as Locale;
  const cs = await getCaseForSlug(slug, locale);
  if (!cs) return {};
  return {
    title: { absolute: `${cs.title} — Buy & Bring Solutions` },
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const { t } = await getServerTranslation(locale);

  const cs = await getCaseForSlug(slug, locale);
  if (!cs) notFound();

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.cases", href: localizedPath(locale, routes.cases) },
        { label: cs.title },
      ])}
    >
      <CaseStudyArticle
        caseStudy={cs}
        labels={{
          challenge: t("cases.challenge"),
          requirements: t("cases.requirements"),
          scope: t("cases.scope"),
          products: t("cases.products"),
          result: t("cases.result"),
          photos: "Zdjęcia",
        }}
      />
    </DedicatedPageShell>
  );
}
