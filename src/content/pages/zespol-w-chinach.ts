import type { DedicatedPageContent } from "./types";

export const zespolWChinachPage: DedicatedPageContent = {
  id: "zespol-w-chinach",
  meta: {
    title: "Działamy na miejscu w Chinach — Buy & Bring Solutions",
    description:
      "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "Działamy na miejscu w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
  },
  sections: [
    {
      title: "Zakres wsparcia operacyjnego",
      body: "W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
      bullets: [
        "Kontakt i negocjacje z producentami",
        "Zbieranie ofert i danych technicznych",
        "Wizyty w fabrykach i organizacja inspekcji",
        "Raporty fotograficzne i wideo",
      ],
    },
    {
      title: "Foshan i operacje eksportowe",
      body: "Koordynujemy konsolidację, kontrolę załadunku, dokumentację eksportową oraz wsparcie klientów podczas wizyt biznesowych w Chinach.",
      bullets: [
        "Adres operacyjny: Foshan, Guangdong, Chiny",
        "Konsolidacja i przygotowanie wspólnych wysyłek",
        "Kontrola załadunku i dokumentacja eksportowa",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
