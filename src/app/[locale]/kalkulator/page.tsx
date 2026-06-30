import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ImportCalculator } from "@/components/forms/ImportCalculator";
import { getRequiredPageContent } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

const content = getRequiredPageContent("kalkulator");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = createTranslator(await getDictionary(locale));
  return {
    title: t("seo.kalkulator.title"),
    description: t("seo.kalkulator.description"),
  };
}

export default function KalkulatorPage() {
  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.kalkulator" },
      ]}
      skipSections
    >
      <ImportCalculator />
    </DedicatedMarketingPage>
  );
}
