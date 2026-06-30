"use client";

import { PageTrustGrid } from "@/components/pages/PageTrustGrid";
import { ONasCtaBand } from "@/components/o-nas/ONasCtaBand";
import { ONasHero } from "@/components/o-nas/ONasHero";
import { ONasStatsStrip } from "@/components/o-nas/ONasStatsStrip";
import { ONasStorySection } from "@/components/o-nas/ONasStorySection";
import { ONasValuesSection } from "@/components/o-nas/ONasValuesSection";
import { getONasLayout } from "@/content/i18n/o-nas-layout";
import { useTranslation } from "@/i18n/LocaleProvider";

export function ONasPageContent() {
  const { messages, locale } = useTranslation();
  const { hero, highlights, story, values, cta } = getONasLayout(
    messages,
    locale,
  );

  return (
    <>
      <ONasHero {...hero} />
      <ONasStatsStrip highlights={highlights} />
      <ONasStorySection {...story} />
      <ONasValuesSection {...values} />
      <div className="pb-8">
        <PageTrustGrid />
      </div>
      <ONasCtaBand {...cta} />
    </>
  );
}
