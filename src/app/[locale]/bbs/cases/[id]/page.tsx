import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { CaseEditorForm } from "@/components/bbs/CaseEditorForm";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import { getAdminNotionCaseById } from "@/lib/cases/notion";

export const dynamic = "force-dynamic";

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeParam, id } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";
  if (!(await hasBbsAdminSession())) redirect(`/${locale}/bbs`);

  const item = await getAdminNotionCaseById(id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={`/${locale}/bbs/cases`} className="text-xs text-white/45 hover:text-white/75">
            ← {ru ? "Все кейсы" : "Wszystkie case'y"}
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{ru ? "Редактировать кейс" : "Edytuj case"}</h1>
          <p className="mt-2 text-sm text-white/50">{item.title}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${locale}/bbs/cases/${item.id}/podglad`}
            target="_blank"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs text-white/70 hover:bg-white/5 hover:text-white"
          >
            {ru ? "Просмотр" : "Podgląd"} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <a
            href={item.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs text-white/70 hover:bg-white/5 hover:text-white"
          >
            Notion <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      <CaseEditorForm locale={locale} initial={item} />
    </div>
  );
}
