"use client";

import Link from "next/link";
import { CANTON_FAIR_PATH } from "@/content/canton-fair";
import { useCurrentLocale, useT } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/routing";

function TickerSequence({ text }: { text: string }) {
  const items = Array.from({ length: 6 }, (_, index) => (
    <span key={index} className="inline-flex shrink-0 items-center gap-8 px-8">
      <span>{text}</span>
      <span aria-hidden className="text-accent-light/70">
        ✦
      </span>
    </span>
  ));

  return (
    <span className="flex shrink-0 items-center" style={{ minWidth: "100vw" }}>
      {items}
    </span>
  );
}

export function CantonFairTicker() {
  const locale = useCurrentLocale();
  const t = useT();
  const text = t("home.cantonFairTicker.text");
  const href = localizedPath(locale, CANTON_FAIR_PATH);

  return (
    <div className="canton-fair-ticker relative w-full overflow-hidden border-b border-accent-light/20 bg-[linear-gradient(90deg,rgba(200,146,42,0.18),rgba(20,24,30,0.96),rgba(185,28,28,0.12))] py-2.5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[color:var(--surface-deep)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[color:var(--surface-deep)] to-transparent" />

      <Link
        href={href}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep"
        aria-label={t("home.cantonFairTicker.ariaLabel")}
      >
        <div className="canton-fair-ticker-track flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-white/85 transition group-hover:text-white">
          <TickerSequence text={text} />
          <TickerSequence text={text} />
        </div>
      </Link>
    </div>
  );
}
