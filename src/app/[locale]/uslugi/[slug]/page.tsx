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

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceNavSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getPageContentByServiceSlug(slug);

  if (!content) {
    return { title: "Usługa nie znaleziona — China Export" };
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
          { label: "Strona główna", href: "/" },
          { label: "Usługi", href: "/uslugi" },
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
        { label: "Strona główna", href: "/" },
        { label: "Usługi", href: "/uslugi" },
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
