import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewPortalProjectForm } from "@/components/bbs/NewPortalProjectForm";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Nowy projekt klienta — Panel wewnętrzny",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NowyProjektPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-7">
        <Link href={`/${locale}/bbs`} className="text-xs text-white/40 hover:text-white/70">
          ← Panel wewnętrzny
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">Nowy projekt klienta</h1>
        <p className="mt-1 text-sm text-white/50">
          Utwórz projekt w Notion i stały link do panelu klienta.
        </p>
        <Link href={`/${locale}/bbs/projekty`} className="mt-3 inline-block text-xs text-accent-light/80 underline">
          Zobacz i edytuj istniejące projekty
        </Link>
      </div>

      <NewPortalProjectForm locale={locale} />
    </div>
  );
}
