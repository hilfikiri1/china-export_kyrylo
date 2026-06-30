import type { DedicatedPageContent } from "./types";

export const wyszukiwanieDostawcowPage: DedicatedPageContent = {
  id: "uslugi-wyszukiwanie-dostawcow",
  meta: {
    title: "Wyszukiwanie producentów — Buy & Bring Solutions",
    description:
      "Sourcing i negocjacje z fabrykami w Chinach — identyfikacja producentów, porównanie ofert i negocjacja warunków handlowych.",
  },
  hero: {
    eyebrow: "Przed produkcją",
    title: "Wyszukiwanie dostawców i negocjacje",
    lead: "Znajdujemy fabryki dopasowane do Twojej specyfikacji, weryfikujemy wstępnie i negocjujemy warunki — zanim podejmiesz decyzję o współpracy.",
  },
  processCarousel: {
    sectionTitle: "Jak przebiega sourcing",
    sectionLead:
      "Wybierz etap z listy, aby zobaczyć szczegóły każdego kroku procesu.",
    steps: [
      {
        id: "brief",
        cardLabel: "Brief",
        title: "Brief i specyfikacja",
        body: "Zaczynamy od zebrania wymagań: produkt, MOQ, budżet docelowy, certyfikaty i harmonogram. Im precyzyjniejszy brief, tym trafniejsza shortlista fabryk.",
        bullets: [
          "Specyfikacja techniczna i zdjęcia referencyjne",
          "Wolumen, MOQ i target ceny",
          "Wymagania certyfikacyjne (CE, RoHS, ISO)",
        ],
      },
      {
        id: "rfq",
        cardLabel: "RFQ",
        title: "Zapytania ofertowe (RFQ)",
        body: "Wysyłamy ustrukturyzowane RFQ do 5–15 prekwalifikowanych producentów. Każda fabryka otrzymuje ten sam pakiet informacji — porównywalne odpowiedzi w ujednoliconym formacie.",
        bullets: [
          "Identyfikacja producentów w odpowiednich klastrach",
          "Wstępna weryfikacja licencji i certyfikatów",
          "Zbieranie ofert: cena, MOQ, lead time, Incoterms",
        ],
      },
      {
        id: "negocjacje",
        cardLabel: "Negocjacje",
        title: "Negocjacje warunków",
        body: "Negocjujemy warunki handlowe w Twoim imieniu — cenę, MOQ, płatności, gwarancje i odpowiedzialność za jakość. Znamy lokalne realia i typowe pułapki w umowach chińskich.",
        bullets: [
          "Negocjacja ceny i minimalnych ilości zamówienia",
          "Struktura płatności (TT, LC, milestone)",
          "Warunki reklamacji i gwarancji",
        ],
      },
      {
        id: "shortlista",
        cardLabel: "Shortlista",
        title: "Shortlista kandydatów",
        body: "Z ofert wybieramy 2–3 najlepszych kandydatów — nie tylko po cenie, ale po ryzyku, zgodności specyfikacji i wiarygodności producenta. Każdy kandydat ma uzasadnienie wyboru.",
        bullets: [
          "Porównanie ofert w macierzy decyzyjnej",
          "Ocena ryzyka każdego dostawcy",
          "Rekomendacja z rankingiem i komentarzem",
        ],
      },
      {
        id: "raport",
        cardLabel: "Raport",
        title: "Raport decyzyjny",
        body: "Otrzymujesz raport PDF z pełnym porównaniem dostawców, wyceną próbek, proponowanymi warunkami handlowymi i naszą rekomendacją. Możesz od razu przejść do audytu fabryki lub zamówić próbki.",
        bullets: [
          "Raport porównawczy dostawców",
          "Wycena próbek i propozycja MOQ",
          "Plan kolejnych kroków (audyt, QC, produkcja)",
        ],
      },
    ],
  },
  sections: [
    {
      title: "Co otrzymujesz",
      body: "Na koniec fazy sourcingu masz 2–3 rekomendowanych dostawców z uzasadnieniem, wyceną próbek i propozycją warunków handlowych do negocjacji.",
      bullets: [
        "Raport porównawczy dostawców",
        "Wycena próbek i MOQ",
        "Rekomendacja z uzasadnieniem ryzyk",
      ],
    },
    {
      title: "Typowy harmonogram",
      stat: "7–14 dni",
      body: "Standardowy sourcing trwa 7–14 dni roboczych w zależności od złożoności produktu i liczby wymaganych certyfikatów.",
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
