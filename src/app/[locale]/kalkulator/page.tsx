import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ImportCalculator } from "@/components/forms/ImportCalculator";
import { getRequiredPageContent } from "@/content/pages";

const content = getRequiredPageContent("kalkulator");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function KalkulatorPage() {
  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Kalkulator importu" },
      ]}
      skipSections
    >
      <ImportCalculator />
    </DedicatedMarketingPage>
  );
}
