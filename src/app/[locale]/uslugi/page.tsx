import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { getRequiredPageContent } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

const content = getRequiredPageContent("uslugi");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = createTranslator(await getDictionary(locale));
  return {
    title: t("seo.uslugi.title"),
    description: t("seo.uslugi.description"),
  };
}

export default function UslugiPage() {
  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.uslugiAll" },
      ]}
      widget={<ServicesDedicatedGrid />}
    />
  );
}
