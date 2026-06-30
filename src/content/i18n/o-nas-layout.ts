import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getMessageObject } from "@/i18n/translate";
import type {
  ONasHighlight,
  ONasValueCard,
  ONasValueIcon,
} from "@/content/o-nas-layout";

type AboutPageMessages = {
  hero: { eyebrow: string; title: string; lead: string };
  sections: Array<{ title: string; body: string; bullets?: string[] }>;
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  layout: {
    heroImageAlt: string;
    primaryCta: { label: string; href: string };
    storyEyebrow: string;
    storyImageAlt: string;
    storyAccentLabel: string;
    valuesEyebrow: string;
    valueCards: Array<{
      icon: ONasValueIcon;
      label: string;
      title: string;
    }>;
    highlights: {
      experience: { mono: string; label: string };
      clients: { mono: string; label: string };
      containers: { mono: string; label: string };
      foshan: { mono: string; label: string };
    };
    ctaBand: { eyebrow: string; title: string; body: string };
  };
};

export function getONasLayout(messages: Messages, locale: Locale) {
  const page = getMessageObject<AboutPageMessages>(messages, "pages.about");
  const stats = getMessageObject<{
    experience: { value: string };
    clients: { value: string };
    containers: { value: string };
    foshan: { value: string };
  }>(messages, "home.stats");

  if (!page?.layout) {
    throw new Error("Missing pages.about.layout translations");
  }

  const { layout } = page;
  const section0 = page.sections[0];
  const section1 = page.sections[1];

  const highlights: ONasHighlight[] = [
    {
      label: layout.highlights.experience.label,
      value: `${stats?.experience?.value ?? "17"}+`,
      mono: layout.highlights.experience.mono,
      numericValue: Number(stats?.experience?.value ?? 17),
      suffix: "+",
    },
    {
      label: layout.highlights.clients.label,
      value: stats?.clients?.value ?? "275+",
      mono: layout.highlights.clients.mono,
      numericValue: 275,
      suffix: "+",
    },
    {
      label: layout.highlights.containers.label,
      value: stats?.containers?.value ?? "110+",
      mono: layout.highlights.containers.mono,
      numericValue: 110,
      suffix: "+",
    },
    {
      label: layout.highlights.foshan.label,
      value: stats?.foshan?.value ?? "Foshan",
      mono: layout.highlights.foshan.mono,
      numericValue: 0,
      suffix: "",
      raw: true,
    },
  ];

  const valueCards: ONasValueCard[] = layout.valueCards.map((card, index) => ({
    icon: card.icon,
    label: card.label,
    title: card.title,
    body: section1?.bullets?.[index] ?? "",
  }));

  return {
    hero: {
      eyebrow: page.hero.eyebrow,
      title: page.hero.title,
      lead: page.hero.lead,
      image: "/image/cargo_conteiners.jpg",
      imageAlt: layout.heroImageAlt,
      primaryCta: layout.primaryCta,
      secondaryCta: {
        label: page.cta.primary.label,
        href: localizedPath(locale, page.cta.primary.href.replace(/^\//, "")),
      },
    },
    highlights,
    story: {
      eyebrow: layout.storyEyebrow,
      title: section0?.title ?? "",
      body: section0?.body ?? "",
      bullets: section0?.bullets ?? [],
      image: "/image/quality_control.jpg",
      imageAlt: layout.storyImageAlt,
      accentValue: stats?.experience?.value ?? "17",
      accentLabel: layout.storyAccentLabel,
    },
    values: {
      eyebrow: layout.valuesEyebrow,
      title: section1?.title ?? "",
      body: section1?.body ?? "",
      cards: valueCards,
    },
    cta: {
      eyebrow: layout.ctaBand.eyebrow,
      title: layout.ctaBand.title,
      body: layout.ctaBand.body,
      image: "/image/business_trips.jpg",
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
