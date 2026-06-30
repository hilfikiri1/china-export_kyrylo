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
      { value: "17 lat", label: "doświadczenia we współpracy z Chinami" },
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
      tagline: "Poznajemy projekt",
      body: "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
      bullets: [
        "Produkt, zastosowanie i wymagania techniczne",
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
      tagline: "Dobieramy odpowiednie fabryki",
      body: "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
      bullets: [
        "Wyszukiwanie odpowiednich fabryk",
        "Zbieranie i porównanie ofert",
        "Analiza MOQ, terminów i warunków",
      ],
    },
    {
      num: "03",
      icon: "shield-check",
      theme: {
        accent: "#60a5fa",
        glow: "rgba(96,165,250,0.12)",
        glowBorder: "rgba(96,165,250,0.28)",
      },
      title: "Weryfikacja fabryki i próbek",
      tagline: "Sprawdzamy producenta",
      body: "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
      bullets: [
        "Weryfikacja danych i dokumentacji",
        "Ocena możliwości produkcyjnych",
        "Próbki, wideoweryfikacja lub audyt (gdy potrzebne)",
      ],
    },
    {
      num: "04",
      icon: "clipboard-list",
      theme: {
        accent: "#a78bfa",
        glow: "rgba(167,139,250,0.12)",
        glowBorder: "rgba(167,139,250,0.28)",
      },
      title: "Zamówienie i nadzór nad produkcją",
      tagline: "Koordynujemy realizację",
      body: "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
      bullets: [
        "Uzgodnienie specyfikacji i warunków",
        "Harmonogram i sposób odbioru",
        "Koordynacja komunikacji z producentem",
      ],
    },
    {
      num: "05",
      icon: "shield-check",
      theme: {
        accent: "#f472b6",
        glow: "rgba(244,114,182,0.12)",
        glowBorder: "rgba(244,114,182,0.28)",
      },
      title: "Kontrola jakości i dokumentów",
      tagline: "Sprawdzamy przed wysyłką",
      body: "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
      bullets: [
        "Zgodność z ustaleniami i specyfikacją",
        "Ilość, opakowanie i oznakowanie",
        "Działanie oraz dostępne dokumenty",
      ],
    },
    {
      num: "06",
      icon: "truck",
      theme: {
        accent: "#22d3ee",
        glow: "rgba(34,211,238,0.12)",
        glowBorder: "rgba(34,211,238,0.28)",
      },
      title: "Transport, odprawa i dostawa",
      tagline: "Dostarczamy pod wskazany adres",
      body: "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      bullets: [
        "Eksport z Chin i fracht",
        "Odprawa celna i dokumentacja",
        "Dostawa pod wskazany adres",
      ],
    },
  ] satisfies ProcesStep[],
  cta: {
    eyebrow: "Gotowy na import z Chin?",
    title: "Porozmawiajmy o Twoim projekcie",
    body: "Opisz projekt — ocenimy go i zaproponujemy kolejne kroki. Bez zobowiązań.",
    ...procesPage.cta,
  },
} as const;

export { procesPage };
