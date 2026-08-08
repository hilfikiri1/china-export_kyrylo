import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { contacts } from "@/config/contacts";
import { localizedPath, routes } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getServerTranslation } from "@/i18n/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) return {};
  const { t } = await getServerTranslation(localeParam as Locale);
  return {
    title: t("pages.panel.meta.title"),
    robots: { index: false, follow: false },
  };
}

export default async function PanelEntryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const messages = await getDictionary(locale);
  const { t } = await getServerTranslation(locale);

  return (
    <section className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-light/20 bg-accent-light/10">
        <Lock className="h-8 w-8 text-accent-light" aria-hidden />
      </div>

      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        {t("pages.panel.title")}
      </h1>

      <p className="mt-4 max-w-prose text-base leading-relaxed text-white/60">
        {t("pages.panel.lead")}
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-navy-light p-6">
        <p className="text-sm leading-relaxed text-white/70">
          {t("pages.panel.infoBeforeEmail")}{" "}
          <a
            href={`mailto:${contacts.email}`}
            className="text-accent-light transition-colors hover:text-accent-light/80"
          >
            {contacts.email}
          </a>
          {t("pages.panel.infoAfterEmail")}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`mailto:${contacts.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent-light/20 bg-accent-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {t("pages.panel.writeUs")}
        </Link>
        <Link
          href={localizedPath(locale, routes.contact)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white"
        >
          {messages.common.contact}
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-10 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
          <p className="text-xs text-yellow-400/70">
            <strong className="text-yellow-400">{t("pages.panel.devOnly")}</strong>{" "}
            {t("pages.panel.devDemoLabel")}{" "}
            <a
              href={`/${locale}/panel/demo-bbs-projekt-testowy-2025`}
              className="underline"
            >
              /{locale}/panel/demo-bbs-projekt-testowy-2025
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
