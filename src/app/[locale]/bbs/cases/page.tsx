import Link from "next/link";
import { Archive, Eye, Pencil, Plus, RotateCcw } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { hasBbsAdminSession } from "@/lib/bbs/auth";
import { listAdminNotionCases } from "@/lib/cases/notion";
import {
  archiveCaseAction,
  hideCaseAction,
  publishCaseAction,
  restoreCaseAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function CasesAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  if (!(await hasBbsAdminSession())) redirect(`/${locale}/bbs`);

  const cases = await listAdminNotionCases();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href={`/${locale}/bbs`}
            className="text-xs text-white/45 transition-colors hover:text-white/75"
          >
            ← Panel wewnętrzny
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Case&apos;y</h1>
          <p className="mt-2 text-sm text-white/50">
            Zarządzaj publikacją, edycją i archiwum sekcji Realizacje.
          </p>
        </div>
        <Link
          href={`/${locale}/bbs/nowy-case`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent-light px-4 text-sm font-semibold text-white shadow-lg shadow-accent-light/20 transition-colors hover:bg-[#dbaa47]"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Nowy case
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-navy-light/60">
        {cases.length === 0 ? (
          <div className="p-8 text-center text-sm text-white/50">
            Brak case&apos;ów w Notion.
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {cases.map((item) => (
              <article
                key={item.id}
                className={`grid gap-4 p-5 lg:grid-cols-[minmax(0,1.6fr)_150px_150px_auto] lg:items-center ${
                  item.archived ? "bg-black/15 opacity-70" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        item.archived
                          ? "border-white/15 bg-white/5 text-white/45"
                          : item.published
                            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                            : "border-amber-400/25 bg-amber-400/10 text-amber-200"
                      }`}
                    >
                      {item.archived ? "Archiwum" : item.status}
                    </span>
                    {item.featured && (
                      <span className="rounded-full border border-accent-light/25 bg-accent-light/10 px-2.5 py-1 text-[11px] font-medium text-accent-light">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 truncate text-base font-semibold text-white">{item.title}</h2>
                  <p className="mt-1 truncate text-xs text-white/35">/{item.slug}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/30">Data</p>
                  <p className="mt-1 text-sm text-white/65">{item.publishedAt || "—"}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/30">Kategoria</p>
                  <p className="mt-1 text-sm text-white/65">{item.category}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <Link
                    href={`/${locale}/bbs/cases/${item.id}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden />
                    Edytuj
                  </Link>
                  <Link
                    href={`/${locale}/bbs/cases/${item.id}/podglad`}
                    target="_blank"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden />
                    Podgląd
                  </Link>

                  {!item.archived && item.published && (
                    <form action={hideCaseAction}>
                      <input type="hidden" name="pageId" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button
                        type="submit"
                        className="inline-flex h-9 items-center rounded-md border border-amber-400/25 bg-amber-400/5 px-3 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-400/10"
                      >
                        Ukryj
                      </button>
                    </form>
                  )}

                  {!item.archived && !item.published && (
                    <form action={publishCaseAction}>
                      <input type="hidden" name="pageId" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button
                        type="submit"
                        className="inline-flex h-9 items-center rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 text-xs font-medium text-emerald-100 transition-colors hover:bg-emerald-400/15"
                      >
                        Publikuj
                      </button>
                    </form>
                  )}

                  {!item.archived ? (
                    <form action={archiveCaseAction}>
                      <input type="hidden" name="pageId" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button
                        type="submit"
                        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/10 px-3 text-xs text-white/45 transition-colors hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-200"
                      >
                        <Archive className="h-3.5 w-3.5" aria-hidden />
                        Archiwizuj
                      </button>
                    </form>
                  ) : (
                    <form action={restoreCaseAction}>
                      <input type="hidden" name="pageId" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <button
                        type="submit"
                        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                        Przywróć
                      </button>
                    </form>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
