import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getMessageObject } from "@/i18n/translate";
import type { AboutGridContent } from "@/content/about-grid";

type AboutGridMessages = {
  sectionAriaLabel: string;
  sectionCta: string;
  hero: { title: string; description: string; imageAlt: string };
  qualityControl: { title: string; description: string; imageAlt: string };
  businessTrips: { title: string; description: string; imageAlt: string };
};

export function getAboutGrid(
  messages: Messages,
  locale: Locale,
): AboutGridContent {
  const grid = getMessageObject<AboutGridMessages>(messages, "home.aboutGrid");
  if (!grid) {
    throw new Error("Missing home.aboutGrid translations");
  }

  return {
    sectionCta: {
      label: grid.sectionCta,
      href: localizedPath(locale, "zespol-w-chinach"),
    },
    hero: {
      id: "team-china",
      title: grid.hero.title,
      description: grid.hero.description,
      image: "/image/china_office.jpg",
      imageAlt: grid.hero.imageAlt,
    },
    row: [
      {
        id: "quality-control",
        title: grid.qualityControl.title,
        description: grid.qualityControl.description,
        image: "/image/quality_control.jpg",
        imageAlt: grid.qualityControl.imageAlt,
      },
      {
        id: "business-trips",
        title: grid.businessTrips.title,
        description: grid.businessTrips.description,
        image: "/image/business_trips.jpg",
        imageAlt: grid.businessTrips.imageAlt,
      },
    ],
  };
}

export function getAboutGridAriaLabel(messages: Messages): string {
  return (
    getMessageObject<AboutGridMessages>(messages, "home.aboutGrid")
      ?.sectionAriaLabel ?? ""
  );
}
