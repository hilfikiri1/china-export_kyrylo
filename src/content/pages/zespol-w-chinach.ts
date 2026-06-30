import type { DedicatedPageContent } from "./types";

export const zespolWChinachPage: DedicatedPageContent = {
  id: "zespol-w-chinach",
  meta: {
    title: "Zespół w Chinach — Buy & Bring Solutions",
    description:
      "Operacje w Foshan: wyszukiwanie producentów, komunikacja z fabrykami, kontrole jakości, konsolidacja i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "My w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
  },
  sections: [
    {
      title: "Kto jest w zespole",
      body: "Zespół terenowy to specjaliści ds. sourcingu, inżynierowie QC, koordynatorzy logistyczni i tłumacze techniczni. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
      bullets: [
        "Sourcing i negocjacje — identyfikacja i weryfikacja fabryk",
        "Inżynierowie QC — inspekcje na linii produkcyjnej",
        "Logistyka — odbiór z fabryki, magazyn, konsolidacja",
        "Tłumacze techniczni — specyfikacje, umowy, raporty",
      ],
    },
    {
      title: "Gdzie działamy",
      body: "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong — blisko producentów i portów eksportowych. Z tej bazy kontaktujemy się z fabrykami, organizujemy inspekcje i przygotowujemy wysyłki.",
      bullets: [
        "Foshan — kontakt z producentami i koordynacja zamówień",
        "Inspekcje jakości i audyty fabryk",
        "Magazynowanie, konsolidacja i dokumentacja eksportowa",
      ],
    },
  ],
  cta: {
    primary: { label: "Poznaj nasz zespół", href: "/kontakt" },
    secondary: { label: "Wyjazdy biznesowe do Chin", href: "/wyjazdy-do-chin" },
  },
};
