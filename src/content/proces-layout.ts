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
      tagline: "Rozpoznanie potrzeb projektu",
      body: "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
      bullets: [
        "Analiza wymagań technicznych i biznesowych",
        "Ustalenie priorytetów projektu",
        "Wybór zakresu współpracy",
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
      tagline: "Dobór fabryk do projektu",
      body: "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
      bullets: [
        "Shortlista producentów",
        "Porównanie ofert i warunków",
        "Ocena ryzyk i rekomendacje",
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
      tagline: "Sprawdzenie przed zamówieniem",
      body: "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
      bullets: [
        "Weryfikacja dokumentów",
        "Ocena możliwości produkcyjnych",
        "Organizacja próbek i audytów projektowych",
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
      title: "Zamówienie i nadzór nad produkcją",
      tagline: "Koordynacja realizacji",
      body: "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
      bullets: [
        "Uzgodnienie warunków handlowych",
        "Nadzór nad harmonogramem produkcji",
        "Bieżąca komunikacja projektowa",
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
      title: "Kontrola jakości i dokumentów",
      tagline: "Weryfikacja przed wysyłką",
      body: "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
      bullets: [
        "Kontrola jakości wg specyfikacji",
        "Weryfikacja dokumentów i oznaczeń",
        "Raport końcowy przed wysyłką",
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
      tagline: "Od Chin do magazynu docelowego",
      body: "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      bullets: [
        "Dobór sposobu transportu (FCL, LCL, kolej, lotniczy, drogowy)",
        "Koordynacja odprawy celnej",
        "Dostawa końcowa do magazynu",
      ],
    },
  ] satisfies ProcesStep[],
  cta: {
    eyebrow: "Gotowy na swój pierwszy import?",
    title: "Zacznij bez ryzyka",
    body: "Pierwsza konsultacja i wycena są bezpłatne. Zero zobowiązań.",
    ...procesPage.cta,
  },
} as const;

export { procesPage };
