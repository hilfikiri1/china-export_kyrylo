import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { CopyButton } from "@/components/portal/CopyButton";
import { isLocale, type Locale } from "@/i18n/config";
import { listPortalProjects } from "@/lib/portal/notion";
import { getPortalProjectKommoIds } from "@/lib/portal/qualified-project";
import type { PortalProjectSummary } from "@/lib/portal/types";

export const metadata: Metadata = {
  title: "Client projects — B&BS Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

export default async function PortalProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";
  const { q = "" } = await searchParams;
  const query = normalize(q).slice(0, 120);

  let projects: PortalProjectSummary[] = [];
  let kommoIds = new Map<string, number>();
  let loadError = false;
  try {
    [projects, kommoIds] = await Promise.all([listPortalProjects(), getPortalProjectKommoIds()]);
  } catch (error) {
    console.error("[bbs/projects] Could not load portal projects.", error);
    loadError = true;
  }

  const filteredProjects = query
    ? projects.filter((project) => {
        const kommoId = kommoIds.get(project.pageId);
        return [
          project.name,
          project.company,
          project.contactName,
          project.projectNumber,
          kommoId ? String(kommoId) : "",
        ].some((value) => normalize(value).includes(query));
      })
    : projects;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={`/${locale}/bbs`} className="text-xs text-white/40 hover:text-white/70">
            ← {ru ? "Внутренняя панель" : "Panel wewnętrzny"}
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white">{ru ? "Проекты клиентов" : "Projekty klientów"}</h1>
          <p className="mt-1 text-sm text-white/50">
            {ru
              ? "Поиск по проекту, клиенту, компании, номеру проекта или ID лида Kommo."
              : "Szukaj po projekcie, kliencie, firmie, numerze projektu lub ID leada Kommo."}
          </p>
        </div>
        <Link
          href={`/${locale}/bbs/nowy-projekt`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-accent-light px-3 text-sm font-medium text-white transition-colors hover:bg-[#dbaa47]"
        >
          + {ru ? "Новый проект" : "Nowy projekt"}
        </Link>
      </div>

      <form className="mt-7 flex gap-2" action={`/${locale}/bbs/projekty`} method="get">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
          <span className="sr-only">{ru ? "Поиск проектов" : "Szukaj projektów"}</span>
          <input
            type="search"
            name="q"
            defaultValue={q}
            autoComplete="off"
            placeholder={ru ? "Название, имя клиента или ID Kommo…" : "Nazwa, klient lub ID Kommo…"}
            className="h-10 w-full rounded-lg border border-white/12 bg-white/5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent-light/50"
          />
        </label>
        <button type="submit" className="rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-white/80 hover:bg-white/10">
          {ru ? "Найти" : "Szukaj"}
        </button>
        {query && (
          <Link href={`/${locale}/bbs/projekty`} className="inline-flex items-center rounded-lg px-3 text-xs text-white/45 hover:text-white/80">
            {ru ? "Сбросить" : "Wyczyść"}
          </Link>
        )}
      </form>

      {loadError ? (
        <div role="alert" className="mt-8 rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-5 text-sm leading-relaxed text-yellow-200/80">
          {ru ? (
            <>Не удалось прочитать базу проектов. Проверьте, что интеграция Notion имеет доступ к базам <strong>Klienci i projekty</strong> и <strong>Portal klienta — aktualizacje</strong>.</>
          ) : (
            <>Nie udało się odczytać bazy projektów. Sprawdź, czy integracja Notion strony ma dostęp do baz <strong>Klienci i projekty</strong> oraz <strong>Portal klienta — aktualizacje</strong>.</>
          )}
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/3 p-8 text-center">
          <p className="text-sm text-white/60">
            {ru ? "Пока нет проектов." : "Nie ma jeszcze projektów."}
          </p>
          <Link href={`/${locale}/bbs/nowy-projekt`} className="mt-3 inline-block text-sm text-accent-light underline">
            {ru ? "Создать первый проект" : "Utwórz pierwszy projekt"}
          </Link>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/3 p-8 text-center">
          <p className="text-sm text-white/60">
            {ru ? `Ничего не найдено по запросу «${q}».` : `Brak wyników dla „${q}”.`}
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <p className="text-xs text-white/35">
            {ru ? `Показано: ${filteredProjects.length} из ${projects.length}` : `Wyświetlono: ${filteredProjects.length} z ${projects.length}`}
          </p>
          {filteredProjects.map((project) => {
            const kommoId = kommoIds.get(project.pageId);
            return (
              <article key={project.pageId} className="rounded-2xl border border-white/10 bg-navy-light p-5 transition-colors hover:border-white/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-white">{project.name || (ru ? "Проект без названия" : "Projekt bez nazwy")}</h2>
                      <span className={project.active ? "rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300" : "rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/40"}>
                        {project.active ? (ru ? "ссылка активна" : "link aktywny") : ru ? "ссылка отключена" : "link wyłączony"}
                      </span>
                      {kommoId && <span className="rounded-full bg-sky-400/10 px-2 py-0.5 font-mono text-[11px] text-sky-300">Kommo #{kommoId}</span>}
                    </div>
                    <p className="mt-1 text-xs text-white/40">
                      {project.projectNumber || (ru ? "Без номера" : "Bez numeru")}
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
                    {ru ? "Редактировать проект" : "Edytuj projekt"}
                  </Link>
                </div>

                {project.accessUrl && (
                  <div className="mt-4 flex items-center rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                    <a href={project.accessUrl} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-mono text-xs text-white/40 hover:text-accent-light">
                      {project.accessUrl}
                    </a>
                    <CopyButton value={project.accessUrl} label={ru ? "Копировать ссылку клиента" : "Kopiuj link klienta"} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
