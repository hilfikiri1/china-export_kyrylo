import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { FeaturedStepsPanel } from "@/components/services/FeaturedStepsPanel";
import { SourcingProcessCarousel } from "@/components/services/SourcingProcessCarousel";
import {
  getPageContentByServiceSlug,
  getRequiredPageContentByServiceSlug,
} from "@/content/i18n/pages";
import {
  getServiceBySlug,
  getServiceNavSlugs,
} from "@/content/i18n/services";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { localizedPath } from "@/i18n/routing";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getServiceNavSlugs().flatMap((slug) =>
    ["pl", "uk", "ru", "de", "zh"].map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const { messages } = await getServerTranslation(locale);
  const content = getPageContentByServiceSlug(messages, locale, slug);

  if (!content) {
    return { title: "Buy & Bring Solutions" };
  }

  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const { messages, t } = await getServerTranslation(locale);
  const service = getServiceBySlug(messages, slug);

  if (!service) {
    notFound();
  }

  const content = getRequiredPageContentByServiceSlug(messages, locale, slug);

  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.services", href: localizedPath(locale, "uslugi") },
        { label: service.title },
      ])}
      beforeSections={
        content.featuredSteps ? (
          <FeaturedStepsPanel {...content.featuredSteps} />
        ) : content.processCarousel ? (
          <SourcingProcessCarousel
            {...content.processCarousel}
            asideSections={content.sections}
          />
        ) : undefined
      }
      skipSections={Boolean(content.processCarousel)}
      numberedSections
    />
  );
}
