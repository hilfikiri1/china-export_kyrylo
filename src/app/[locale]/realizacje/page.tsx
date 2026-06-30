import type { Metadata } from "next";
import { RealizacjePageSection } from "@/components/case-studies/RealizacjePageSection";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { getRequiredPageContent } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

const content = getRequiredPageContent("realizacje");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = createTranslator(await getDictionary(locale));
  return {
    title: t("seo.realizacje.title"),
    description: t("seo.realizacje.description"),
  };
}

export default function RealizacjePage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.realizacje" },
      ]}
    >
      <RealizacjePageSection
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        lead={content.hero.lead}
      />
      <PageCtaBand
        primary={content.cta.primary}
        secondary={content.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
