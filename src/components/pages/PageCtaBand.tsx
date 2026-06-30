"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

const goldCtaClassName =
  "inline-flex justify-center rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]";

const mutedCtaClassName =
  "inline-flex justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";

type PageCtaBandProps = {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function PageCtaBand({ primary, secondary }: PageCtaBandProps) {
  const locale = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={localeHref(locale, primary.href)} className={goldCtaClassName}>
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={localeHref(locale, secondary.href)}
            className={mutedCtaClassName}
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
