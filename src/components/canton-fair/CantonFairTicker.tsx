import Link from "next/link";
import { localizedPath } from "@/i18n/routing";
import { CANTON_FAIR_PATH } from "@/content/canton-fair";

const TICKER_TEXT =
  "Canton Fair 2026 • Guangzhou • Październik 2026 • Największe targi świata";

export function CantonFairTicker() {
  const href = localizedPath("pl", CANTON_FAIR_PATH);
  const items = Array.from({ length: 4 }, (_, index) => (
    <span key={index} className="inline-flex shrink-0 items-center gap-8 px-8">
      <span>{TICKER_TEXT}</span>
      <span aria-hidden className="text-accent-light/70">
        ✦
      </span>
    </span>
  ));

  return (
    <div className="canton-fair-ticker relative w-full overflow-hidden border-b border-accent-light/15 bg-[linear-gradient(90deg,rgba(200,146,42,0.12),rgba(28,33,40,0.98),rgba(185,28,28,0.08))] py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[color:var(--surface-deep)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[color:var(--surface-deep)] to-transparent" />

      <Link
        href={href}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep"
        aria-label={`${TICKER_TEXT} — przejdź do strony Canton Fair`}
      >
        <div className="canton-fair-ticker-track flex w-max items-center text-sm font-semibold uppercase tracking-[0.18em] text-white/85 transition group-hover:text-white">
          {items}
        </div>
      </Link>
    </div>
  );
}
