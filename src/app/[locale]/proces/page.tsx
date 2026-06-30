import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ProcesPageContent } from "@/components/proces/ProcesPageContent";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { createLocalizedPageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return createLocalizedPageMetadata(localeParam as Locale, "proces", "proces");
}

export default async function ProcesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { t } = await getServerTranslation(locale);

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.process" },
      ])}
    >
      <ProcesPageContent />
    </DedicatedPageShell>
  );
}
