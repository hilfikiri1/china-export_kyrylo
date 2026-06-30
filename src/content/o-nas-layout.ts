import { oNasPage } from "@/content/pages/o-nas";
import { statistics } from "@/content/statistics";

export type ONasValueIcon = "layers" | "shield-check" | "file-check";

export type ONasHighlight = {
  label: string;
  value: string;
  mono: string;
  numericValue: number;
  suffix: string;
  decimal?: boolean;
  /** When true, display `value` directly instead of count-up animation */
  raw?: boolean;
};

export type ONasValueCard = {
  icon: ONasValueIcon;
  label: string;
  title: string;
  body: string;
};

export const oNasLayout = {
  hero: {
    ...oNasPage.hero,
    image: "/image/cargo_conteiners.jpg",
    imageAlt: "Kontenery cargo — logistyka i import z Chin",
    primaryCta: { label: "Nasza historia", href: "#o-nas-story" },
    secondaryCta: {
      label: oNasPage.cta.primary.label,
      href: oNasPage.cta.primary.href,
    },
  },
  highlights: [
    {
      label: "Lat doświadczenia",
      value: `${statistics.experience.value}+`,
      mono: "DOŚWIADCZENIE",
      numericValue: Number(statistics.experience.value),
      suffix: "+",
    },
    {
      label: statistics.clients.label.pl,
      value: statistics.clients.value,
      mono: "KLIENCI",
      numericValue: 275,
      suffix: "+",
    },
    {
      label: statistics.containers.label.pl,
      value: statistics.containers.value,
      mono: "KONTENERY",
      numericValue: 110,
      suffix: "+",
    },
    {
      label: statistics.foshan.label.pl,
      value: statistics.foshan.value,
      mono: "CHINY",
      numericValue: 0,
      suffix: "",
      raw: true,
    },
  ] satisfies ONasHighlight[],
  story: {
    eyebrow: "Zespół",
    ...oNasPage.sections[0],
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    accentValue: statistics.experience.value,
    accentLabel: "LAT",
  },
  values: {
    eyebrow: "Współpraca",
    title: oNasPage.sections[1].title,
    body: oNasPage.sections[1].body,
    cards: [
      {
        icon: "layers",
        label: "MODUŁOWOŚĆ",
        title: "Bez sztywnego pakietu",
        body: oNasPage.sections[1].bullets![0],
      },
      {
        icon: "shield-check",
        label: "BEZPIECZEŃSTWO",
        title: "Weryfikacja przed płatnością",
        body: oNasPage.sections[1].bullets![1],
      },
      {
        icon: "file-check",
        label: "DOKUMENTACJA",
        title: "Zgodność z wymogami UE",
        body: oNasPage.sections[1].bullets![2],
      },
    ] satisfies ONasValueCard[],
  },
  cta: {
    eyebrow: "Kontakt",
    title: "Gotowy na import z Chin?",
    body: "Niezależnie od skali — od audytu fabryki po pełną logistykę door-to-door. Porozmawiajmy o Twoim projekcie.",
    image: "/image/business_trips.jpg",
    ...oNasPage.cta,
  },
} as const;

export { oNasPage };
