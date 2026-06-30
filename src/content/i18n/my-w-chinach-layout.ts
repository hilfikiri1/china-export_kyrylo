import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getMessageObject } from "@/i18n/translate";

type ChinaPageMessages = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  sections: Array<{ title: string; body: string; bullets?: string[] }>;
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  layout: {
    heroImageAlt: string;
    heroOverlayTitle: string;
    heroOverlayBody: string;
    statsAriaLabel: string;
    highlights: Array<{ value: string; label: string }>;
    pillars: Array<{ id: string; imageAlt: string }>;
    locations: {
      sectionTitle: string;
      sectionLead: string;
      stepImageAlt: string;
    };
  };
};

const pillarImages: Record<string, string> = {
  zespol: "/image/china_office.jpg",
  "kontrola-jakosci": "/image/quality_control.jpg",
  wyjazdy: "/image/business_trips.jpg",
};

export function getMyWChinachLayout(messages: Messages, locale: Locale) {
  const page = getMessageObject<ChinaPageMessages>(messages, "pages.china");

  if (!page?.layout) {
    throw new Error("Missing pages.china.layout translations");
  }

  const pillars = page.layout.pillars.map((pillar, index) => {
    const section = page.sections[index];
    return {
      id: pillar.id,
      title: section?.title ?? "",
      body: section?.body ?? "",
      bullets: section?.bullets ?? [],
      image: pillarImages[pillar.id] ?? "/image/china_office.jpg",
      imageAlt: pillar.imageAlt,
    };
  });

  const locationSection = page.sections[2];

  return {
    meta: page.meta,
    hero: {
      eyebrow: page.hero.eyebrow,
      title: page.hero.title,
      lead: page.hero.lead,
      image: "/image/plane_shipment.jpg",
      imageAlt: page.layout.heroImageAlt,
      imageOverlayTitle: page.layout.heroOverlayTitle,
      imageOverlayBody: page.layout.heroOverlayBody,
      statsAriaLabel: page.layout.statsAriaLabel,
    },
    highlights: page.layout.highlights,
    pillars,
    locations: {
      sectionTitle: page.layout.locations.sectionTitle,
      sectionLead: page.layout.locations.sectionLead,
      steps: [
        {
          id: "foshan",
          tabLabel: "Foshan",
          title: locationSection?.title ?? "",
          body: locationSection?.body ?? "",
          bullets: locationSection?.bullets ?? [],
          image: "/image/china_office.jpg",
          imageAlt: page.layout.locations.stepImageAlt,
        },
      ],
    },
    cta: {
      primary: {
        ...page.cta.primary,
        href: localizedPath(locale, page.cta.primary.href.replace(/^\//, "")),
      },
      secondary: page.cta.secondary
        ? {
            ...page.cta.secondary,
            href: localizedPath(
              locale,
              page.cta.secondary.href.replace(/^\//, ""),
            ),
          }
        : undefined,
    },
  };
}
