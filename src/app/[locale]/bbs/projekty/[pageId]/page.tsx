import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalProjectEditor } from "@/components/bbs/PortalProjectEditor";
import { CopyButton } from "@/components/portal/CopyButton";
import { isLocale, type Locale } from "@/i18n/config";
import { getPortalProjectAdmin } from "@/lib/portal/notion";

export const metadata: Metadata = {
  title: "Edit client project — B&BS Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalProjectEditPage({
  params,
}: {
  params: Promise<{ locale: string; pageId: string }>;
}) {
  const { locale: localeParam, pageId } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const ru = locale === "ru";

  let project;
  try {
    project = await getPortalProjectAdmin(pageId);
  } catch (error) {
    console.error("[bbs/projects] Could not load project editor.", error);
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href={`/${locale}/bbs/projekty`} className="text-xs text-white/40 hover:text-white/70">
          ← {ru ? "Проекты клиентов" : "Projekty klientów"}
        </Link>
        <div role="alert" className="mt-6 rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-5 text-sm text-yellow-200/80">
          {ru
            ? "Не удалось открыть этот проект. Проверьте доступ интеграции Notion или вернитесь к списку проектов."
            : "Nie udało się otworzyć tego projektu. Sprawdź dostęp integracji Notion albo wróć do listy projektów."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-7">
        <Link href={`/${locale}/bbs/projekty`} className="text-xs text-white/40 hover:text-white/70">
          ← {ru ? "Проекты клиентов" : "Projekty klientów"}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-white">{project.name || (ru ? "Проект клиента" : "Projekt klienta")}</h1>
          <span className={project.active ? "rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300" : "rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/40"}>
            {project.active ? (ru ? "активен" : "aktywny") : ru ? "отключён" : "wyłączony"}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/45">{project.projectNumber || (ru ? "Без номера проекта" : "Bez numeru projektu")}</p>

        {project.accessUrl && (
          <div className="mt-4 flex items-start rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <a href={project.accessUrl} target="_blank" rel="noreferrer" className="min-w-0 flex-1 break-all font-mono text-xs text-accent-light/80 hover:text-accent-light">
              {project.accessUrl}
            </a>
            <CopyButton value={project.accessUrl} label={ru ? "Копировать ссылку клиента" : "Kopiuj link klienta"} />
          </div>
        )}
      </div>

      <PortalProjectEditor
        project={{
          pageId: project.pageId,
          internalStatus: project.internalStatus,
          currentStage: project.currentStage,
          nextStep: project.nextStep,
          plannedDate: project.plannedDate,
          managerName: project.managerName,
          active: project.active,
        }}
        locale={locale}
      />
    </div>
  );
}
