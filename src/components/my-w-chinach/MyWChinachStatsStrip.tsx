import type { MyWChinachHighlight } from "@/content/my-w-chinach-layout";

export function MyWChinachStatsStrip({
  highlights,
  ariaLabel,
}: {
  highlights: MyWChinachHighlight[];
  ariaLabel: string;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="border-y border-white/10 bg-navy-light"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-navy/50 px-4 py-5 text-center sm:px-5 sm:py-6"
            >
              <p className="text-2xl font-bold text-accent-light sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-white/55 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
