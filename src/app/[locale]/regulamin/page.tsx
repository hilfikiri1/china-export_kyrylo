import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { LegalPlaceholder } from "@/components/layout/LegalPlaceholder";
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
  return { title: t("footer.terms") };
}

export default function TermsPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { labelKey: "nav.home", href: "/" },
        { labelKey: "footer.terms" },
      ]}
    >
      <LegalPlaceholder titleKey="footer.terms" />
    </DedicatedPageShell>
  );
}
