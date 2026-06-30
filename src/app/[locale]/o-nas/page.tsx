import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ONasPageContent } from "@/components/o-nas/ONasPageContent";
import { oNasPage } from "@/content/pages/o-nas";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: oNasPage.meta.title,
  description: oNasPage.meta.description,
};

export default async function ONasPage({ params }: Props) {
  const { locale } = await params;

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "O nas" },
      ]}
    >
      <ONasPageContent />
    </DedicatedPageShell>
  );
}
