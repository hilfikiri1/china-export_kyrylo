import type { Metadata } from "next";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { getRequiredPageContent } from "@/content/pages";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = getRequiredPageContent("uslugi");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default async function UslugiPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedMarketingPage
      content={content}
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Usługi" },
      ]}
      widget={<ServicesDedicatedGrid />}
    />
  );
}
