import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ImportCalculator } from "@/components/forms/ImportCalculator";
import { getRequiredPageContent } from "@/content/pages";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = getRequiredPageContent("kalkulator");

export const metadata: Metadata = {
  title: "Kalkulator kosztu importu z Chin | Buy & Bring Solutions",
  description: content.meta.description,
};

export default async function KalkulatorPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Kalkulator" },
      ]}
      skipSections
    >
      <ImportCalculator />
    </DedicatedMarketingPage>
  );
}
