import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { getRequiredPageContent } from "@/content/pages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return { title: t("title"), description: t("description") };
}

export default async function UslugiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getRequiredPageContent("uslugi");

  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Usługi" },
      ]}
      widget={<ServicesDedicatedGrid />}
    />
  );
}
