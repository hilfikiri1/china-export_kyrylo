import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ProcesPageContent } from "@/components/proces/ProcesPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.process" });
  return { title: t("title"), description: t("description") };
}

export default async function ProcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Jak pracujemy" },
      ]}
    >
      <ProcesPageContent />
    </DedicatedPageShell>
  );
}
