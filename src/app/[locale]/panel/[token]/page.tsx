import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Mail, Phone, RefreshCw } from "lucide-react";
import { getProjectByToken } from "@/lib/portal/provider";
import { ProjectTimeline } from "@/components/portal/ProjectTimeline";
import { FinanceCard } from "@/components/portal/FinanceCard";
import { DeliveryCard } from "@/components/portal/DeliveryCard";
import { DocumentsList } from "@/components/portal/DocumentsList";
import { MediaGallery } from "@/components/portal/MediaGallery";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Panel klienta — Buy & Bring Solutions",
  robots: { index: false, follow: false },
};

// Disable static generation — all token pages are dynamic
export const dynamic = "force-dynamic";

export default async function PortalTokenPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale: localeParam, token } = await params;

  if (!locales.includes(localeParam as Locale)) notFound();

  // Neutral response for unknown/expired/inactive token
  const project = await getProjectByToken(token).catch(() => null);
  if (!project) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <RefreshCw className="h-6 w-6 text-white/30" aria-hidden />
        </div>
        <h1 className="text-xl font-bold text-white">
          Nie można otworzyć projektu
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Link jest nieprawidłowy lub wygasł. Jeśli uważasz, że to błąd,
          skontaktuj się ze swoim opiekunem projektu.
        </p>
      </section>
    );
  }

  const currentStageObj = project.stages.find(
    (s) => s.status === "current",
  );
  const currentStageName = currentStageObj?.name ?? project.currentStage;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header summary */}
      <div className="mb-8 rounded-2xl border border-accent-light/20 bg-navy-light/70 p-5 sm:p-6">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(219,170,71,0.07) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            {project.projectNumber}
          </p>
          <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            {project.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent-light/30 bg-accent-light/10 px-3 py-1 text-xs font-medium text-accent-light">
              {currentStageName}
            </span>
            <span className="text-xs text-white/40">
              Aktualizacja:{" "}
              {new Date(project.lastUpdatedAt).toLocaleDateString("pl-PL")}
            </span>
          </div>

          {project.nextStep && (
            <div className="mt-4 rounded-lg border border-white/8 bg-white/3 px-4 py-3">
              <p className="text-xs font-medium text-white/40">Następny krok</p>
              <p className="mt-0.5 text-sm text-white/80">{project.nextStep}</p>
            </div>
          )}

          {project.plannedDate && (
            <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <span>Planowane zakończenie: {project.plannedDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main column */}
        <div className="space-y-8">
          {/* Timeline */}
          <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/40">
              Etapy projektu
            </h2>
            <ProjectTimeline stages={project.stages} />
          </div>

          {/* Updates */}
          {project.updates.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40">
                Historia aktualizacji
              </h2>
              <ul className="space-y-4">
                {project.updates.map((update) => (
                  <li
                    key={update.id}
                    className="border-l-2 border-white/10 pl-4"
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-accent-light/70">
                        {update.stage}
                      </span>
                      <span className="text-xs text-white/30">
                        {update.date}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70">
                      {update.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents */}
          {project.documents.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
              <DocumentsList documents={project.documents} />
            </div>
          )}

          {/* Media */}
          {project.media.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
              <MediaGallery media={project.media} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <FinanceCard payment={project.payment} />
          <DeliveryCard delivery={project.delivery} />

          {/* Manager contact */}
          <div className="rounded-2xl border border-white/10 bg-navy-light p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
              Opiekun projektu
            </h3>
            <p className="font-medium text-white">{project.manager.name}</p>
            <div className="mt-2 space-y-1.5">
              <a
                href={`mailto:${project.manager.email}`}
                className="flex items-center gap-2 text-sm text-accent-light/70 transition-colors hover:text-accent-light"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {project.manager.email}
              </a>
              {project.manager.phone && (
                <a
                  href={`tel:${project.manager.phone}`}
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {project.manager.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
