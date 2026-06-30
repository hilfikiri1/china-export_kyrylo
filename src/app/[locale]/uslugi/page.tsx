import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { getRequiredPageContent } from "@/content/pages";

const content = getRequiredPageContent("uslugi");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function UslugiPage() {
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
