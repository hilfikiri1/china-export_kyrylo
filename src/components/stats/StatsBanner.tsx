"use client";

import { useT } from "@/i18n/LocaleProvider";

const STAT_IDS = ["experience", "clients", "containers", "foshan"] as const;

export function StatsBanner() {
  const t = useT();

  return (
    <section
      className="stats-banner relative w-full border-y border-white/10 bg-surface-elevated"
      aria-label={t("trust.heading")}
    >
      <div className="mx-auto flex min-h-[9.375rem] max-w-7xl items-center px-4 py-8 sm:min-h-[10rem] sm:px-6 lg:px-8">
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-y-0">
          {STAT_IDS.map((id) => (
            <li
              key={id}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t(`stats.${id}.value`)}
              </span>
              <span className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-xs sm:tracking-widest">
                {t(`stats.${id}.label`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
