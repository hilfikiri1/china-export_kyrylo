import { oNasPage } from "@/content/pages/o-nas";

export type ONasValueIcon = "layers" | "shield-check" | "file-check";

export type ONasHighlight = {
  label: string;
  value: string;
  mono: string;
  numericValue: number;
  suffix: string;
  decimal?: boolean;
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
    primaryCta: { label: "Nasza misja", href: "#o-nas-story" },
    secondaryCta: {
      label: oNasPage.cta.primary.label,
      href: oNasPage.cta.primary.href,
    },
  },
  highlights: [
    {
      label: "Lat doświadczenia we współpracy z Chinami",
      value: "17",
      mono: "CHINY",
      numericValue: 17,
      suffix: "",
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
      mono: "KONTENERY",
      numericValue: 110,
      suffix: "+",
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
        label: "ELASTYCZNOŚĆ",
        title: "Kompleksowo lub modułowo",
        body: oNasPage.sections[1].bullets![0],
      },
      {
        icon: "shield-check",
        label: "DOŚWIADCZENIE",
        title: "Maszyny, surowce i Private Label",
        body: oNasPage.sections[1].bullets![1],
      },
      {
        icon: "file-check",
        label: "KONTROLA PROJEKTU",
        title: "Od zapytania do wysyłki",
        body: oNasPage.sections[1].bullets![2],
      },
    ] satisfies ONasValueCard[],
  },
  cta: {
    eyebrow: "Kontakt",
    title: "Gotowy na import z Chin?",
    body:
      "Opisz produkt, zakres pomocy i kraj dostawy. Wrócimy z propozycją kolejnych kroków.",
    image: "/image/business_trips.jpg",
    ...oNasPage.cta,
  },
} as const;

export { oNasPage };
