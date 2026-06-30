"use client";

import Link from "next/link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

export function LegalPlaceholder({ titleKey }: { titleKey: string }) {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
        {t("footer.legalTitle")}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {t(titleKey)}
      </h1>
      <div className="mt-6 rounded-2xl border border-white/10 bg-navy-light/50 p-6">
        <h2 className="text-lg font-semibold text-white">
          {t("legal.preparationTitle")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {t("legal.preparationBody")}
        </p>
        <Link
          href={localeHref(locale, "/kontakt")}
          className="mt-6 inline-flex rounded-lg border border-accent-light/20 bg-accent-light px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#dbaa47]"
        >
          {t("legal.contactCta")}
        </Link>
      </div>
    </div>
  );
}
