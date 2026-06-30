import type { Metadata } from "next";
import { KontaktPageContent } from "@/components/kontakt/KontaktPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
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
    title: t("seo.kontakt.title"),
    description: t("seo.kontakt.description"),
  };
}

export default function KontaktPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.kontakt" },
      ]}
    >
      <KontaktPageContent />
    </DedicatedPageShell>
  );
}
