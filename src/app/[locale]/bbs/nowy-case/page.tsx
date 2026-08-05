import type { Metadata } from "next";
import { NewCaseForm } from "@/components/bbs/NewCaseForm";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Nowy case — Panel wewnętrzny",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function NowyCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6">
        <a
          href={`/${locale}/bbs`}
          className="text-xs text-white/40 hover:text-white/70"
        >
          ← Panel wewnętrzny
        </a>
        <h1 className="mt-2 text-2xl font-bold text-white">Nowy case</h1>
        <p className="mt-1 text-sm text-white/50">
          Formularz do dodania zamkniętego case&apos;u. Podgląd dostępny lokalnie — zapis do produkcji wymaga integracji CMS/Notion.
        </p>
      </div>
      <NewCaseForm locale={locale} />
    </div>
  );
}
