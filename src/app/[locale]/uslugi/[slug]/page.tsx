import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LogistykaPageContent } from "@/components/logistyka/LogistykaPageContent";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { FeaturedStepsPanel } from "@/components/services/FeaturedStepsPanel";
import { SourcingProcessCarousel } from "@/components/services/SourcingProcessCarousel";
import {
  getPageContentByServiceSlug,
  getRequiredPageContentByServiceSlug,
} from "@/content/pages";
import { logistykaLayout } from "@/content/logistyka-layout";
import { getServiceBySlug, getServiceNavSlugs } from "@/content/services";
import { company } from "@/config/company";
import { locales } from "@/i18n/config";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getServiceNavSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getPageContentByServiceSlug(slug);

  if (!content) {
    return { title: `404 — ${company.name}` };
  }

  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const content = getRequiredPageContentByServiceSlug(slug);

  if (slug === "spedycja-i-logistyka") {
    return (
      <DedicatedPageShell
        breadcrumbs={[
          { labelKey: "nav.home", href: "/" },
          { labelKey: "nav.uslugiAll", href: "/uslugi" },
          { label: service.title },
        ]}
      >
        <LogistykaPageContent />
        <PageCtaBand
          primary={logistykaLayout.cta.primary}
          secondary={logistykaLayout.cta.secondary}
        />
      </DedicatedPageShell>
    );
  }

  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.uslugiAll", href: "/uslugi" },
        { label: service.title },
      ]}
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
