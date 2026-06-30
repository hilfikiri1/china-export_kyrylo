import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { KonsultacjaPageContent } from "@/components/konsultacja/KonsultacjaPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.consultation" });
  return { title: t("title"), description: t("description") };
}

export default async function KonsultacjaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Umów konsultację" },
      ]}
    >
      <KonsultacjaPageContent />
    </DedicatedPageShell>
  );
}
