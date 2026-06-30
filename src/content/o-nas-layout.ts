import { oNasPage } from "@/content/pages/o-nas";

export type ONasValueIcon = "layers" | "shield-check" | "file-check";

export type ONasHighlight = {
  label: string;
  value: string;
  mono: string;
  numericValue: number;
  suffix: string;
  decimal?: boolean;
  /** Non-numeric stats render this string directly (no count-up). */
  display?: string;
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
      label: "Doświadczenia we współpracy z Chinami",
      value: "17 lat",
      mono: "ZESPÓŁ",
      numericValue: 17,
      suffix: " lat",
    },
    {
      label: "Obsłużonych klientów",
      value: "275+",
      mono: "KLIENCI",
      numericValue: 275,
      suffix: "+",
    },
    {
      label: "Dostarczonych kontenerów",
      value: "110+",
      mono: "DOSTAWY",
      numericValue: 110,
      suffix: "+",
    },
    {
      label: "Operacje na miejscu w Chinach",
      value: "Foshan",
      mono: "GUANGDONG",
      numericValue: 0,
      suffix: "",
      display: "Foshan",
    },
  ] satisfies ONasHighlight[],
  story: {
    eyebrow: "Zespół",
    ...oNasPage.sections[0],
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    accentValue: "17",
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
    body: "Niezależnie od skali — od weryfikacji producenta po kompleksową obsługę logistyczną. Porozmawiajmy o Twoim projekcie.",
    image: "/image/business_trips.jpg",
    ...oNasPage.cta,
  },
} as const;

export { oNasPage };
