import { procesPage } from "@/content/pages/proces";

export type ProcesStepIcon =
  | "file-text"
  | "search"
  | "clipboard-list"
  | "shield-check"
  | "truck";

export type ProcesStepTheme = {
  accent: string;
  glow: string;
  glowBorder: string;
};

export type ProcesStep = {
  num: string;
  icon: ProcesStepIcon;
  theme: ProcesStepTheme;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
};

export type ProcesStat = {
  value: string;
  label: string;
};

export const procesLayout = {
  hero: {
    eyebrow: procesPage.hero.eyebrow,
    titleLead: "Import z Chin",
    titleAccent: "krok po kroku",
    lead: procesPage.hero.lead,
    stats: [
      { value: "17 lat", label: "doświadczenia z Chinami" },
      { value: "275+", label: "obsłużonych klientów" },
      { value: "110+", label: "dostarczonych kontenerów" },
    ] satisfies ProcesStat[],
  },
  steps: [
    {
      num: "01",
      icon: "file-text",
      theme: {
        accent: "#dbaa47",
        glow: "rgba(219,170,71,0.12)",
        glowBorder: "rgba(219,170,71,0.28)",
      },
      title: "Brief i specyfikacja",
      tagline: "Poznajemy Twój projekt i wymagania",
      body: "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
      bullets: [
        "Opis produktu i wymagania techniczne",
        "Planowana ilość, budżet i termin",
        "Kraj docelowy i wymagania rynku",
      ],
    },
    {
      num: "02",
      icon: "search",
      theme: {
        accent: "#4ade80",
        glow: "rgba(74,222,128,0.12)",
        glowBorder: "rgba(74,222,128,0.28)",
      },
      title: "Wyszukiwanie i porównanie producentów",
      tagline: "Zbieramy i porównujemy oferty",
      body: "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
      bullets: [
        "Identyfikacja fabryk w odpowiednich regionach",
        "Zbieranie porównywalnych ofert",
        "Analiza MOQ, cen, terminów i warunków",
      ],
    },
    {
      num: "03",
      icon: "clipboard-list",
      theme: {
        accent: "#60a5fa",
        glow: "rgba(96,165,250,0.12)",
        glowBorder: "rgba(96,165,250,0.28)",
      },
      title: "Weryfikacja fabryki i próbek",
      tagline: "Sprawdzamy producenta przed zamówieniem",
      body: "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
      bullets: [
        "Weryfikacja dokumentów i danych producenta",
        "Ocena możliwości produkcyjnych",
        "Opcjonalne próbki, wideoweryfikacja lub audyt",
      ],
    },
    {
      num: "04",
      icon: "shield-check",
      theme: {
        accent: "#a78bfa",
        glow: "rgba(167,139,250,0.12)",
        glowBorder: "rgba(167,139,250,0.28)",
      },
      title: "Zamówienie i kontrola jakości",
      tagline: "Nadzorujemy produkcję i sprawdzamy towar",
      body: "Pomagamy uzgodnić warunki zamówienia i koordynujemy komunikację. W zależności od projektu organizujemy kontrolę jakości przed wysyłką.",
      bullets: [
        "Koordynacja komunikacji z producentem",
        "Nadzór nad harmonogramem produkcji",
        "Inspekcja towaru przed wysyłką",
      ],
    },
    {
      num: "05",
      icon: "truck",
      theme: {
        accent: "#22d3ee",
        glow: "rgba(34,211,238,0.12)",
        glowBorder: "rgba(34,211,238,0.28)",
      },
      title: "Transport, odprawa i dostawa",
      tagline: "Od portu do Twojego magazynu",
      body: "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      bullets: [
        "Transport morski FCL/LCL, kolejowy lub lotniczy",
        "Dokumentacja eksportowa i celna",
        "Dostawa końcowa pod wskazany adres",
      ],
    },
  ] satisfies ProcesStep[],
  cta: {
    eyebrow: "Gotowy na swój projekt importu?",
    title: "Opisz nam co chcesz sprowadzić",
    body: "Konsultacja jest bezpłatna — omówimy projekt i zaproponujemy zakres.",
    ...procesPage.cta,
  },
} as const;

export { procesPage };
