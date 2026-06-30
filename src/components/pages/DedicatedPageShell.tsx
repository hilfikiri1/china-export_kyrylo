"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

export type BreadcrumbItem = {
  /** Translation key for the label (preferred). */
  labelKey?: string;
  /** Literal label (used when no key is available, e.g. a case-study title). */
  label?: string;
  /** Locale-independent internal href; prefixed with the active locale here. */
  href?: string;
};

type DedicatedPageShellProps = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export function DedicatedPageShell({
  children,
  breadcrumbs,
}: DedicatedPageShellProps) {
  const locale = useLocale();
  const t = useT();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <LogisticsBackdrop variant="formPage" />
      <div className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
          >
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/50">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const label = item.labelKey ? t(item.labelKey) : item.label ?? "";

                return (
                  <li key={`${label}-${index}`} className="flex items-center gap-1">
                    {index > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" />
                    )}
                    {isLast || !item.href ? (
                      <span className="text-white/70">{label}</span>
                    ) : (
                      <Link
                        href={localeHref(locale, item.href)}
                        className="hover:text-white"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {children}
      </div>
    </div>
  );
}
