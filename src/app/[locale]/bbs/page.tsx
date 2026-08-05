import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Newspaper, Users } from "lucide-react";
import { createProjectAccessRecord } from "@/lib/token/generate";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Panel wewnętrzny — Buy & Bring Solutions",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BbsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  // Generate a demo token for UI preview — never stored, never production-visible
  const demoRecord = createProjectAccessRecord("BBS-DEMO");

  const sections = [
    {
      href: `/${locale}/bbs/nowy-case`,
      icon: FileText,
      title: "Nowy case",
      description: "Dodaj zamknięty case do sekcji Realizacje.",
    },
    {
      href: `/${locale}/bbs/nowy-wpis`,
      icon: Newspaper,
      title: "Nowy wpis blogowy",
      description: "Napisz artykuł do sekcji Blog.",
    },
    {
      href: `/${locale}/bbs/nowy-projekt`,
      icon: Users,
      title: "Nowy projekt klienta",
      description: "Wygeneruj bezpieczny link do panelu klienta (wkrótce).",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Dev/Preview banner */}
      <div className="mb-8 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400">
        <strong>Panel wewnętrzny B&BS</strong> — dostępny tylko w środowisku
        developerskim i Vercel Preview. W produkcji wymaga uwierzytelnienia.
      </div>

      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        Panel wewnętrzny
      </h1>
      <p className="mt-2 text-sm text-white/50">
        Narzędzia robocze dla zespołu Buy &amp; Bring Solutions.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {sections.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-white/10 bg-navy-light p-5 transition-colors hover:border-white/20 hover:bg-white/5"
          >
            <Icon className="mb-3 h-6 w-6 text-accent-light" aria-hidden />
            <p className="font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/50">
              {description}
            </p>
          </Link>
        ))}
      </div>

      {/* Token generation preview */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-widest text-white/40">
          Generowanie linku klienta (podgląd)
        </h2>
        <p className="mt-2 text-xs text-white/50">
          Docelowo: pracownik tworzy projekt → system generuje bezpieczny token → pracownik kopiuje link i wysyła klientowi.
          Zapis do bazy danych wymaga przyszłej integracji (Notion / CMS).
        </p>
        <div className="mt-4 rounded-lg border border-white/8 bg-white/3 px-3 py-3">
          <p className="mb-1 text-xs text-white/30">Przykładowy link (jednorazowy, nie zapisany):</p>
          <p className="break-all font-mono text-xs text-accent-light/80">
            {demoRecord.accessUrl}
          </p>
        </div>
        <p className="mt-2 text-xs text-white/30">
          Token generowany przy każdym odświeżeniu strony, nie jest przechowywany.
        </p>
      </div>
    </div>
  );
}
