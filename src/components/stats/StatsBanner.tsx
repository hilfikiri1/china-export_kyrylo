"use client";

import { useTranslation } from "@/i18n/LocaleProvider";

export function StatsBanner() {
  const { t, getObject } = useTranslation();
  const stats =
    getObject<{
      experience: { value: string; label: string };
      clients: { value: string; label: string };
      containers: { value: string; label: string };
      foshan: { value: string; label: string };
    }>("home.stats") ?? {
      experience: { value: "", label: "" },
      clients: { value: "", label: "" },
      containers: { value: "", label: "" },
      foshan: { value: "", label: "" },
    };

  const items = [
    { id: "experience", ...stats.experience },
    { id: "clients", ...stats.clients },
    { id: "containers", ...stats.containers },
    { id: "foshan", ...stats.foshan },
  ];

  return (
    <section
      className="stats-banner relative w-full border-y border-white/10 bg-surface-elevated"
      aria-label={t("home.stats.ariaLabel")}
    >
      <div className="mx-auto flex min-h-[9.375rem] max-w-7xl items-center px-4 py-8 sm:min-h-[10rem] sm:px-6 lg:px-8">
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-y-0">
          {items.map((stat) => (
            <li
              key={stat.id}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-xs sm:tracking-widest">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
