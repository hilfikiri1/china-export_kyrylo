import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { CaseStudyArticle } from "@/components/cases/CaseStudyArticle";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import { getAdminNotionCaseById, getAdminPreviewCaseById } from "@/lib/cases/notion";

export const dynamic = "force-dynamic";

export default async function CasePreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeParam, id } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";
  if (!(await hasBbsAdminSession())) redirect(`/${locale}/bbs`);

  const [adminCase, preview] = await Promise.all([
    getAdminNotionCaseById(id),
    getAdminPreviewCaseById(id, "pl"),
  ]);
  if (!adminCase || !preview) notFound();

  const stateLabel = adminCase.archived
    ? ru ? "Архив" : "Archiwum"
    : adminCase.published
      ? ru ? "Опубликован" : "Published"
      : ru ? "Черновик" : "Draft";

  return (
    <div className="pb-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 pt-8 sm:px-6 lg:px-8">
        <Link href={`/${locale}/bbs/cases/${id}`} className="text-sm text-white/55 hover:text-white">
          ← {ru ? "Вернуться к редактированию" : "Wróć do edycji"}
        </Link>
        {adminCase.published && !adminCase.archived && (
          <a
            href={`/pl/realizacje/${adminCase.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-light hover:underline"
          >
            {ru ? "Открыть публичную страницу" : "Otwórz stronę publiczną"} ↗
          </a>
        )}
      </div>

      <CaseStudyArticle
        caseStudy={preview}
        previewBanner={
          ru
            ? `Рабочий предпросмотр (${stateLabel}) — эта страница доступна только в защищённой панели B&BS.`
            : `Podgląd roboczy (${stateLabel}) — ta strona jest dostępna tylko w chronionym panelu B&BS.`
        }
        labels={
          ru
            ? {
                challenge: "Задача",
                requirements: "Основные требования",
                scope: "Что мы сделали",
                products: "Произведённые товары",
                result: "Результат",
                photos: "Фотографии",
              }
            : {
                challenge: "Wyzwanie",
                requirements: "Główne wymagania",
                scope: "Co zrobiliśmy",
                products: "Wyprodukowane produkty",
                result: "Rezultat",
                photos: "Zdjęcia",
              }
        }
      />
    </div>
  );
}
