import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/portal/CopyButton";
import { isLocale, type Locale } from "@/i18n/config";
import { listPortalProjects } from "@/lib/portal/notion";
import type { PortalProjectSummary } from "@/lib/portal/types";

export const metadata: Metadata = {
  title: "Projekty klientów — Panel wewnętrzny",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  let projects: PortalProjectSummary[] = [];
  let loadError = false;
  try {
    projects = await listPortalProjects();
  } catch (error) {
    console.error("[bbs/projects] Could not load portal projects.", error);
    loadError = true;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={`/${locale}/bbs`} className="text-xs text-white/40 hover:text-white/70">
            ← Panel wewnętrzny
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white">Projekty klientów</h1>
          <p className="mt-1 text-sm text-white/50">Wybierz klienta, aby zmienić etap, status lub dodać zdjęcia.</p>
        </div>
        <Link
          href={`/${locale}/bbs/nowy-projekt`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-accent-light px-3 text-sm font-medium text-white transition-colors hover:bg-[#dbaa47]"
        >
          + Nowy projekt
        </Link>
      </div>

      {loadError ? (
        <div role="alert" className="mt-8 rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-5 text-sm leading-relaxed text-yellow-200/80">
          Nie udało się odczytać bazy projektów. Sprawdź, czy integracja Notion strony ma dostęp do baz
          <strong> Klienci i projekty</strong> oraz <strong>Portal klienta — aktualizacje</strong>.
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/3 p-8 text-center">
          <p className="text-sm text-white/60">Nie ma jeszcze projektów z aktywnym panelem klienta.</p>
          <Link href={`/${locale}/bbs/nowy-projekt`} className="mt-3 inline-block text-sm text-accent-light underline">
            Utwórz pierwszy projekt
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {projects.map((project) => (
            <article key={project.pageId} className="rounded-2xl border border-white/10 bg-navy-light p-5 transition-colors hover:border-white/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-white">{project.name || "Projekt bez nazwy"}</h2>
                    <span className={project.active ? "rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300" : "rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/40"}>
                      {project.active ? "link aktywny" : "link wyłączony"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">
                    {project.projectNumber || "Bez numeru"}
                    {project.company ? ` · ${project.company}` : ""}
                    {project.contactName ? ` · ${project.contactName}` : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-md border border-accent-light/20 bg-accent-light/5 px-2 py-1 text-accent-light/80">{project.currentStage}</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/50">{project.internalStatus}</span>
                  </div>
                </div>
                <Link
                  href={`/${locale}/bbs/projekty/${project.pageId}`}
                  className="shrink-0 rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Edytuj projekt
                </Link>
              </div>

              {project.accessUrl && (
                <div className="mt-4 flex items-center rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                  <a href={project.accessUrl} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-mono text-xs text-white/40 hover:text-accent-light">
                    {project.accessUrl}
                  </a>
                  <CopyButton value={project.accessUrl} label="Kopiuj link klienta" />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
