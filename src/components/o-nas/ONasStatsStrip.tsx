"use client";

import { useEffect, useRef, useState } from "react";
import type { ONasHighlight } from "@/content/o-nas-layout";
import { useCountUp } from "@/components/o-nas/useCountUp";

function StatCard({
  stat,
  animate,
}: {
  stat: ONasHighlight;
  animate: boolean;
}) {
  const count = useCountUp(stat.numericValue, 1800, animate, stat.decimal);

  const displayValue = stat.display
    ? stat.display
    : stat.decimal
      ? count.toFixed(1).replace(".", ",")
      : String(count);

  return (
    <div className="border-l border-white/10 py-2 pl-6">
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-light/80">
        {stat.mono}
      </div>
      <div className="text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-white/55">{stat.label}</div>
    </div>
  );
}

export function ONasStatsStrip({ highlights }: { highlights: ONasHighlight[] }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={statsRef} className="border-y border-white/10 bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {highlights.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
