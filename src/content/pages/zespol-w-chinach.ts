import type { DedicatedPageContent } from "./types";

export const zespolWChinachPage: DedicatedPageContent = {
  id: "zespol-w-chinach",
  meta: {
    title: "Działamy na miejscu w Chinach — Buy & Bring Solutions",
    description:
      "Wsparcie operacyjne B&BS w Foshan: sourcing, komunikacja z producentami, kontrole, konsolidacja i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "Chiny",
    title: "Działamy na miejscu w Chinach",
    lead:
      "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
  },
  sections: [
    {
      title: "Wsparcie operacyjne w Foshan",
      body:
        "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
      bullets: [
        "kontakt i negocjacje z producentami",
        "zbieranie ofert i danych technicznych",
        "wizyty w fabrykach",
        "organizacja inspekcji",
        "raporty fotograficzne i wideo",
        "konsolidacja",
        "kontrola załadunku",
        "dokumentacja eksportowa",
        "wsparcie klientów podczas wizyt biznesowych w Chinach",
      ],
    },
  ],
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
