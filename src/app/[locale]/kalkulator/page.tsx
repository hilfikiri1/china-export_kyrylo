import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ImportCalculator } from "@/components/forms/ImportCalculator";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { getRequiredPageContent } from "@/content/i18n/pages";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { createLocalizedPageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return createLocalizedPageMetadata(
    localeParam as Locale,
    "calculator",
    "kalkulator",
  );
}

export default async function KalkulatorPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { messages, t } = await getServerTranslation(locale);
  const content = getRequiredPageContent(messages, locale, "calculator");

  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.calculator" },
      ])}
      skipSections
    >
      <ImportCalculator />
    </DedicatedMarketingPage>
  );
}
