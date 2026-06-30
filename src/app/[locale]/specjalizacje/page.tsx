import type { Metadata } from "next";
import { SpecjalizacjePageContent } from "@/components/specializations/SpecjalizacjePageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { getRequiredPageContent } from "@/content/i18n/pages";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { getMessageObject } from "@/i18n/translate";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { createLocalizedPageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return createLocalizedPageMetadata(
    localeParam as Locale,
    "specializations",
    "specjalizacje",
  );
}

export default async function SpecjalizacjePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { messages, t } = await getServerTranslation(locale);
  const content = getRequiredPageContent(messages, locale, "specializations");
  const secondaryLead =
    getMessageObject<{ secondaryLead?: string }>(
      messages,
      "pages.specializations",
    )?.secondaryLead ?? "";

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.company" },
        { labelKey: "common.specializations" },
      ])}
    >
      <SpecjalizacjePageContent
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        lead={content.hero.lead}
        secondaryLead={secondaryLead}
      />
      <PageCtaBand
        primary={content.cta.primary}
        secondary={content.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
