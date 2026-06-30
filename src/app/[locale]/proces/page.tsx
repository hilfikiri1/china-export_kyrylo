import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ProcesPageContent } from "@/components/proces/ProcesPageContent";
import { procesPage } from "@/content/pages/proces";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: procesPage.meta.title,
  description: procesPage.meta.description,
};

export default async function ProcesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Jak pracujemy" },
      ]}
    >
      <ProcesPageContent />
    </DedicatedPageShell>
  );
}
