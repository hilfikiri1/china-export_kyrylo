import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { MyWChinachPageContent } from "@/components/my-w-chinach/MyWChinachPageContent";
import { myWChinachLayout } from "@/content/my-w-chinach-layout";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = createTranslator(await getDictionary(locale));
  return {
    title: t("seo.chiny.title"),
    description: t("seo.chiny.description"),
  };
}

export default function ZespolWChinachPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.chiny" },
      ]}
    >
      <MyWChinachPageContent />
      <PageCtaBand
        primary={myWChinachLayout.cta.primary}
        secondary={myWChinachLayout.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
