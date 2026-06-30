import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ONasPageContent } from "@/components/o-nas/ONasPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

export default async function ONasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "O nas" },
      ]}
    >
      <ONasPageContent />
    </DedicatedPageShell>
  );
}
