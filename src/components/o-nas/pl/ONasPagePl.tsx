"use client";

import { ONasPlGallery } from "@/components/o-nas/pl/ONasPlGallery";
import { ONasPlHero } from "@/components/o-nas/pl/ONasPlHero";
import { ONasPlIntro } from "@/components/o-nas/pl/ONasPlIntro";
import { ONasPlLicense } from "@/components/o-nas/pl/ONasPlLicense";
import { getAboutPlContent } from "@/content/i18n/about-page-pl";
import { useTranslation } from "@/i18n/LocaleProvider";

export function ONasPagePl() {
  const { messages, locale } = useTranslation();
  const content = getAboutPlContent(messages, locale);

  if (!content) return null;

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <ONasPlHero content={content.hero} />
      <ONasPlIntro intro={content.intro} pillars={content.pillars} />
      <ONasPlGallery gallery={content.gallery} />
      <ONasPlLicense license={content.license} />
    </div>
  );
}
