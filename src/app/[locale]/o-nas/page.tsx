import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ONasPageContent } from "@/components/o-nas/ONasPageContent";
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
    title: t("seo.oNas.title"),
    description: t("seo.oNas.description"),
  };
}

export default function ONasPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "nav.oNas" },
      ]}
    >
      <ONasPageContent />
    </DedicatedPageShell>
  );
}
