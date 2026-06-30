import { FeaturedStepsPanel } from "@/components/services/FeaturedStepsPanel";
import { MyWChinachHero } from "@/components/my-w-chinach/MyWChinachHero";
import { MyWChinachPillarSection } from "@/components/my-w-chinach/MyWChinachPillarSection";
import { MyWChinachStatsStrip } from "@/components/my-w-chinach/MyWChinachStatsStrip";
import { logistykaLayout } from "@/content/logistyka-layout";

export function LogistykaPageContent() {
  const { hero, highlights, transportModes, chainPillars } = logistykaLayout;

  return (
    <>
      <MyWChinachHero {...hero} />
      <MyWChinachStatsStrip highlights={[...highlights]} ariaLabel="" />
      <FeaturedStepsPanel {...transportModes} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {chainPillars.map((pillar, index) => (
          <MyWChinachPillarSection
            key={pillar.id}
            {...pillar}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </>
  );
}
