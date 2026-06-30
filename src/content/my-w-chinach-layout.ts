import type { FeaturedStepsContent } from "@/content/pages/types";

export type MyWChinachHighlight = {
  value: string;
  label: string;
};

export type MyWChinachPillar = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const myWChinachLayout = {
  meta: {
    title: "Działamy na miejscu w Chinach — Buy & Bring Solutions",
    description:
      "Wsparcie operacyjne Buy & Bring Solutions w Foshan: sourcing, kontrola jakości, konsolidacja oraz organizacja wysyłek.",
  },
  hero: {
    eyebrow: "Działamy na miejscu w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
    image: "/image/plane_shipment.jpg",
    imageAlt: "Logistyka i operacje na miejscu w Chinach",
  },
  highlights: [
    { value: "17 lat", label: "doświadczenia we współpracy z Chinami" },
    { value: "275+", label: "obsłużonych klientów" },
    { value: "PL/EN/CN", label: "Języki zespołu" },
    { value: "Foshan", label: "operacje i wsparcie na miejscu w Chinach" },
  ] satisfies MyWChinachHighlight[],
  pillars: [
    {
      id: "zespol",
      title: "Kontakt i wsparcie operacyjne",
      body: "Prowadzimy bieżący kontakt z producentami, zbieramy oferty i dane techniczne oraz koordynujemy działania po stronie chińskiej.",
      bullets: [
        "Kontakt i negocjacje z producentami",
        "Zbieranie ofert i danych technicznych",
        "Wizyty w fabrykach",
        "Wsparcie klientów podczas wizyt biznesowych w Chinach",
      ],
      image: "/image/china_office.jpg",
      imageAlt: "Zespół operacyjny Buy & Bring Solutions w Chinach",
    },
    {
      id: "kontrola-jakosci",
      title: "Kontrola jakości i raportowanie",
      body: "Organizujemy kontrole przedprodukcyjne, w trakcie produkcji i przed wysyłką. Przygotowujemy raporty fotograficzne i wideo.",
      bullets: [
        "Inspekcje pre-production, inline i pre-shipment",
        "Raporty fotograficzne i wideo z kontroli",
        "Weryfikacja ilości, opakowań i oznakowania",
        "Kontrola dokumentacji przed wysyłką",
      ],
      image: "/image/quality_control.jpg",
      imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    },
    {
      id: "wyjazdy",
      title: "Konsolidacja i przygotowanie wysyłek",
      body: "Koordynujemy odbiory z kilku fabryk, kontrolę kompletności, przeładunek, załadunek kontenera i dokumentację eksportową.",
      bullets: [
        "Odbiór towarów od wielu producentów",
        "Kontrola kompletności i przygotowanie wspólnej wysyłki",
        "Kontrola załadunku kontenera",
        "Dokumentacja handlowa i eksportowa",
      ],
      image: "/image/business_trips.jpg",
      imageAlt: "Transport lotniczy — wyjazdy biznesowe do Chin",
    },
  ] satisfies MyWChinachPillar[],
  locations: {
    sectionTitle: "Foshan i region Guangdong",
    sectionLead:
      "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
    steps: [
      {
        id: "foshan",
        tabLabel: "Foshan",
        title: "Foshan — operacje i koordynacja projektów",
        body: "Stąd koordynujemy sourcing, kontakt z fabrykami, kontrole jakości, konsolidację oraz przygotowanie wysyłek.",
        bullets: [
          "Kontakt i negocjacje z producentami",
          "Organizacja inspekcji i raportów",
          "Koordynacja przygotowania wysyłek",
        ],
        image: "/image/quality_control.jpg",
        imageAlt: "Foshan — operacje Buy & Bring Solutions w Chinach",
      },
    ],
  } satisfies FeaturedStepsContent,
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
} as const;
