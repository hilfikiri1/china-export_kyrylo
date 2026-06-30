import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { RealizacjePageSection } from "@/components/case-studies/RealizacjePageSection";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cases" });
  return { title: t("title"), description: t("description") };
}

export default async function RealizacjePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Realizacje" },
      ]}
    >
      <RealizacjePageSection
        eyebrow="Realizacje"
        title="Przykłady projektów Buy & Bring Solutions"
        lead="Wybrane przypadki z zakresu sourcingu, weryfikacji fabryk, kontroli jakości, logistyki i produkcji pod marką własną."
      />
      <PageCtaBand
        primary={{ label: "Opisz swój projekt", href: "/kontakt" }}
        secondary={{ label: "Umów konsultację", href: "/konsultacja" }}
      />
    </DedicatedPageShell>
  );
}
