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
    imageAlt: "Kontenery cargo — import z Chin",
    primaryCta: { label: "Działamy w Chinach", href: "/zespol-w-chinach" },
    secondaryCta: {
      label: oNasPage.cta.primary.label,
      href: oNasPage.cta.primary.href,
    },
  },
  highlights: [
    {
      label: "lat doświadczenia z Chinami",
      value: "17",
      mono: "DOŚWIADCZENIE",
      numericValue: 17,
      suffix: "",
    },
    {
      label: "obsłużonych klientów",
      value: "275+",
      mono: "KLIENCI",
      numericValue: 275,
      suffix: "+",
    },
    {
      label: "dostarczonych kontenerów",
      value: "110+",
      mono: "KONTENERY",
      numericValue: 110,
      suffix: "+",
    },
    {
      label: "baza operacyjna w Chinach",
      value: "Foshan",
      mono: "CHINY",
      numericValue: 0,
      suffix: "",
    },
  ] satisfies ONasHighlight[],
  story: {
    eyebrow: "O nas",
    title: "17 lat doświadczenia we współpracy z Chinami",
    body: "Naszym celem jest ograniczenie ryzyka, uporządkowanie komunikacji z producentem i przeprowadzenie klienta przez cały proces — od specyfikacji i wyboru fabryki po kontrolę, transport i dostawę. Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    accentValue: "17",
    accentLabel: "LAT",
  },
  values: {
    eyebrow: "Współpraca",
    title: "Dlaczego firmy nam powierzają projekty",
    body: "Oferujemy modułowy zakres bez konieczności zamawiania całego pakietu.",
    cards: [
      {
        icon: "layers",
        label: "MODUŁOWOŚĆ",
        title: "Pełny proces lub wybrana usługa",
        body: "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
      },
      {
        icon: "shield-check",
        label: "WERYFIKACJA",
        title: "Weryfikujemy producentów",
        body: "Sprawdzamy dane firmy, możliwości produkcyjne i dokumentację przed zamówieniem.",
      },
      {
        icon: "file-check",
        label: "DOKUMENTACJA",
        title: "Dokumentacja i eksport",
        body: "Koordynujemy dokumentację eksportową i celną zgodną z wymogami importu do UE.",
      },
    ] satisfies ONasValueCard[],
  },
  cta: {
    eyebrow: "Kontakt",
    title: "Opisz nam swój projekt",
    body: "Niezależnie od skali — od wyszukiwania producenta po pełną logistykę. Porozmawiajmy o Twoim projekcie.",
    image: "/image/business_trips.jpg",
    ...oNasPage.cta,
  },
} as const;

export { oNasPage };
