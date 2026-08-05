import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { createProjectAccessRecord } from "@/lib/token/generate";
import { CopyButton } from "@/components/portal/CopyButton";

export const metadata: Metadata = {
  title: "Nowy projekt klienta — Panel wewnętrzny",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function NowyProjektPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  const record = createProjectAccessRecord();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6">
        <a href={`/${locale}/bbs`} className="text-xs text-white/40 hover:text-white/70">
          ← Panel wewnętrzny
        </a>
        <h1 className="mt-2 text-2xl font-bold text-white">Nowy projekt klienta</h1>
        <p className="mt-1 text-sm text-white/50">
          Generowanie bezpiecznego linku dostępowego do panelu klienta.
        </p>
      </div>

      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400 mb-8">
        <strong>Podgląd deweloperski.</strong> Token generowany jest przy każdym odświeżeniu
        strony i <strong>nie jest zapisywany</strong>. Trwałe przechowywanie projektów wymaga
        integracji z Notion lub bazą danych (zaplanowane).
      </div>

      <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
            Wygenerowany token
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 break-all rounded bg-white/5 px-3 py-2 font-mono text-xs text-white/80">
              {record.token}
            </code>
            <CopyButton value={record.token} label="Kopiuj token" />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
            Link klienta
          </p>
          <div className="flex items-start gap-2">
            <code className="flex-1 break-all rounded bg-white/5 px-3 py-2 font-mono text-xs text-accent-light/80">
              {record.accessUrl}
            </code>
            <CopyButton value={record.accessUrl} label="Kopiuj link" />
          </div>
        </div>

        <p className="text-xs text-white/30">
          Wygenerowano: {new Date(record.createdAt).toLocaleString("pl-PL")}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-navy-light/60 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white/60">Planowany przepływ pracy</h2>
        <ol className="space-y-2 text-xs text-white/50">
          {[
            "Pracownik wypełnia dane projektu",
            "System generuje bezpieczny, losowy token",
            "Projekt jest zapisywany w Notion z tokenem",
            "Pracownik kopiuje link i wysyła klientowi",
            "Klient otwiera /pl/panel/[token]",
            "Panel wyświetla tylko dane zatwierdzone dla klienta",
          ].map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="w-4 shrink-0 font-medium text-accent-light/50">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-white/30 pt-1">
          Kroki 1 i 3 wymagają integracji z Notion / bazą danych (następna faza).
        </p>
      </div>
    </div>
  );
}
