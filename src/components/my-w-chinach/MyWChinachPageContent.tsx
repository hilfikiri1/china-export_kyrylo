"use client";

import { FeaturedStepsPanel } from "@/components/services/FeaturedStepsPanel";
import { MyWChinachHero } from "@/components/my-w-chinach/MyWChinachHero";
import { MyWChinachPillarSection } from "@/components/my-w-chinach/MyWChinachPillarSection";
import { MyWChinachStatsStrip } from "@/components/my-w-chinach/MyWChinachStatsStrip";
import { getMyWChinachLayout } from "@/content/i18n/my-w-chinach-layout";
import { useTranslation } from "@/i18n/LocaleProvider";

export function MyWChinachPageContent() {
  const { messages, locale } = useTranslation();
  const { hero, highlights, pillars, locations } = getMyWChinachLayout(
    messages,
    locale,
  );

  return (
    <>
      <MyWChinachHero {...hero} />
      <MyWChinachStatsStrip
        highlights={[...highlights]}
        ariaLabel={hero.statsAriaLabel}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {pillars.map((pillar, index) => (
          <MyWChinachPillarSection
            key={pillar.id}
            {...pillar}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <FeaturedStepsPanel {...locations} />
    </>
  );
}
