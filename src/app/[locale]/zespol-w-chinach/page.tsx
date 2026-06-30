import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { MyWChinachPageContent } from "@/components/my-w-chinach/MyWChinachPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.china" });
  return { title: t("title"), description: t("description") };
}

export default async function ZespolWChinachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Działamy w Chinach" },
      ]}
    >
      <MyWChinachPageContent />
      <PageCtaBand
        primary={{ label: "Opisz swój projekt", href: "/kontakt" }}
        secondary={{ label: "Umów konsultację", href: "/konsultacja" }}
      />
    </DedicatedPageShell>
  );
}
