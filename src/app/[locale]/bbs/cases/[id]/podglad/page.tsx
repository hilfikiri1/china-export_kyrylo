import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/cases/CaseStudyArticle";
import { getAdminNotionCaseById, getAdminPreviewCaseById } from "@/lib/cases/notion";

export const dynamic = "force-dynamic";

export default async function CasePreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [adminCase, preview] = await Promise.all([
    getAdminNotionCaseById(id),
    getAdminPreviewCaseById(id, "pl"),
  ]);
  if (!adminCase || !preview) notFound();

  const stateLabel = adminCase.archived
    ? "Archiwum"
    : adminCase.published
      ? "Published"
      : "Draft";

  return (
    <div className="pb-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 pt-8 sm:px-6 lg:px-8">
        <Link href={`/${locale}/bbs/cases/${id}`} className="text-sm text-white/55 hover:text-white">
          ← Wróć do edycji
        </Link>
        {adminCase.published && !adminCase.archived && (
          <a
            href={`/pl/realizacje/${adminCase.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-light hover:underline"
          >
            Otwórz stronę publiczną ↗
          </a>
        )}
      </div>

      <CaseStudyArticle
        caseStudy={preview}
        previewBanner={`Podgląd roboczy (${stateLabel}) — ta strona jest dostępna tylko w chronionym panelu B&BS.`}
        labels={{
          challenge: "Wyzwanie",
          requirements: "Główne wymagania",
          scope: "Co zrobiliśmy",
          products: "Wyprodukowane produkty",
          result: "Rezultat",
          photos: "Zdjęcia",
        }}
      />
    </div>
  );
}
