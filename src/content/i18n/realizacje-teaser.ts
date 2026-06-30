import type { Messages } from "@/i18n/get-dictionary";
import { getMessageObject } from "@/i18n/translate";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";

export type RealizacjeTeaserContent = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: { value: string; label: string }[];
  bullets: string[];
  image: string;
  imageAlt: string;
  overlayTitle: string;
  overlayBody: string;
  cta: { label: string; href: string };
};

type TeaserMessages = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: { projects: string; categories: string; clients: string };
  imageAlt: string;
  overlayTitle: string;
  overlayBody: string;
  ctaLabel: string;
  bullets: string[];
};

export function getRealizacjeTeaser(
  messages: Messages,
  locale: Locale,
): RealizacjeTeaserContent {
  const teaser = getMessageObject<TeaserMessages>(messages, "home.casesTeaser");
  if (!teaser) {
    throw new Error("Missing home.casesTeaser translations");
  }

  return {
    eyebrow: teaser.eyebrow,
    title: teaser.title,
    lead: teaser.lead,
    highlights: [
      { value: String(teaser.bullets.length), label: teaser.highlights.projects },
      { value: "5", label: teaser.highlights.categories },
      { value: "275+", label: teaser.highlights.clients },
    ],
    bullets: teaser.bullets,
    image: "/image/plane_shipment.jpg",
    imageAlt: teaser.imageAlt,
    overlayTitle: teaser.overlayTitle,
    overlayBody: teaser.overlayBody,
    cta: {
      label: teaser.ctaLabel,
      href: localizedPath(locale, "realizacje"),
    },
  };
}
