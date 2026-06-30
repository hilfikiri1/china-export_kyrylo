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

const themes: ProcesStepTheme[] = [
  { accent: "#dbaa47", glow: "rgba(219,170,71,0.12)", glowBorder: "rgba(219,170,71,0.28)" },
  { accent: "#4ade80", glow: "rgba(74,222,128,0.12)", glowBorder: "rgba(74,222,128,0.28)" },
  { accent: "#60a5fa", glow: "rgba(96,165,250,0.12)", glowBorder: "rgba(96,165,250,0.28)" },
  { accent: "#a78bfa", glow: "rgba(167,139,250,0.12)", glowBorder: "rgba(167,139,250,0.28)" },
  { accent: "#22d3ee", glow: "rgba(34,211,238,0.12)", glowBorder: "rgba(34,211,238,0.28)" },
  { accent: "#f472b6", glow: "rgba(244,114,182,0.12)", glowBorder: "rgba(244,114,182,0.28)" },
];

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
      theme: themes[0],
      title: "Brief i specyfikacja",
      tagline: "Produkt, wymagania i kraj docelowy",
      body:
        "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
      bullets: ["produkt i zastosowanie", "wymagania techniczne", "ilość, budżet i termin"],
    },
    {
      num: "02",
      icon: "search",
      theme: themes[1],
      title: "Wyszukiwanie i porównanie producentów",
      tagline: "Oferty, MOQ i warunki handlowe",
      body:
        "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
      bullets: ["wyszukiwanie producentów", "porównanie ofert", "analiza MOQ i terminów"],
    },
    {
      num: "03",
      icon: "shield-check",
      theme: themes[2],
      title: "Weryfikacja fabryki i próbek",
      tagline: "Dokumenty, próbki lub audyt według potrzeb",
      body:
        "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
      bullets: ["weryfikacja dokumentów", "próbki lub wideoweryfikacja", "audyt jako osobny zakres"],
    },
    {
      num: "04",
      icon: "clipboard-list",
      theme: themes[3],
      title: "Zamówienie i nadzór nad produkcją",
      tagline: "Uzgodnienia i komunikacja z producentem",
      body:
        "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
      bullets: ["specyfikacja i płatności", "harmonogram", "koordynacja komunikacji"],
    },
    {
      num: "05",
      icon: "shield-check",
      theme: themes[4],
      title: "Kontrola jakości i dokumentów",
      tagline: "Sprawdzenie zgodności przed wysyłką",
      body:
        "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
      bullets: ["towar i ilość", "opakowanie i oznakowanie", "dostępne dokumenty"],
    },
    {
      num: "06",
      icon: "truck",
      theme: themes[5],
      title: "Transport, odprawa i dostawa",
      tagline: "Eksport z Chin i dostawa pod adres",
      body:
        "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      bullets: ["eksport i fracht", "odprawa celna", "dostawa końcowa"],
    },
  ] satisfies ProcesStep[],
  cta: {
    eyebrow: "Gotowy na kolejny krok?",
    title: "Opisz swój projekt importowy",
    body:
      "Napisz, czego szukasz i na jakim etapie potrzebujesz wsparcia. Dobierzemy zakres współpracy do projektu.",
    ...procesPage.cta,
  },
} as const;

export { procesPage };
