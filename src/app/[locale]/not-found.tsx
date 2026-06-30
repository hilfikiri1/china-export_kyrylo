"use client";

import Link from "next/link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

export default function NotFound() {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-accent-light">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">{t("notFound.title")}</h1>
      <p className="mt-3 text-white/60">{t("notFound.description")}</p>
      <Link
        href={localeHref(locale, "/")}
        className="mt-8 rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#dbaa47]"
      >
        {t("notFound.cta")}
      </Link>
    </div>
  );
}
