import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { getRequiredPageContent } from "@/content/i18n/pages";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { createLocalizedPageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return createLocalizedPageMetadata(localeParam as Locale, "services", "uslugi");
}

export default async function UslugiPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { messages, t } = await getServerTranslation(locale);
  const content = getRequiredPageContent(messages, locale, "services");

  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.services" },
      ])}
      widget={<ServicesDedicatedGrid />}
    />
  );
}
