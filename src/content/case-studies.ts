/**
 * Case study content — real Buy & Bring Solutions project themes.
 * All data sourced from official public company information.
 */

export type CaseStudyCategoryId =
  | "private-label"
  | "battery-tech"
  | "logistics"
  | "machinery"
  | "sourcing";

export type CaseStudyCategory = {
  id: CaseStudyCategoryId;
  label: string;
  description: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  categoryId: CaseStudyCategoryId;
  summary: string;
  coverImage: string;
  challenge: string;
  scope: string[];
  outcome: string;
  gallery: CaseStudyImage[];
  /** Optional fields — not shown if empty */
  destinationCountry?: string;
  publishedAt?: string;
};

export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "private-label",
    label: "Private Label",
    description: "Produkcja i dostawa towarów pod marką klienta.",
  },
  {
    id: "battery-tech",
    label: "Technologie akumulatorowe",
    description: "Pakiety akumulatorowe i rozwiązania energetyczne.",
  },
  {
    id: "logistics",
    label: "Logistyka i konsolidacja",
    description: "Konsolidacja towarów od wielu producentów.",
  },
  {
    id: "machinery",
    label: "Maszyny przemysłowe",
    description: "Dobór i dostawa maszyn przemysłowych.",
  },
  {
    id: "sourcing",
    label: "Sourcing w Chinach",
    description: "Poszukiwanie producentów i uczestnictwo w targach.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-001",
    slug: "garnki-i-patelnie-private-label",
    title: "Produkcja garnków i patelni pod marką klienta",
    categoryId: "private-label",
    summary:
      "Kompleksowa obsługa produkcji naczyń kuchennych z logo klienta — od wyboru producenta po kontrolę jakości i organizację dostawy.",
    coverImage: "/case-studies/cookware.jpg",
    challenge:
      "Klient potrzebował producenta zdolnego do wykonania naczyń kuchennych z niestandardowym logo i opakowaniem. Kluczowe były jakość wykonania, zgodność z wymaganiami UE i bezpieczeństwo kontaktu z żywnością.",
    scope: [
      "Wybór i weryfikacja producenta",
      "Produkcja naczyń z logo klienta",
      "Opracowanie markowych opakowań",
      "Kontrola jakości w fabryce",
      "Organizacja dostawy",
    ],
    outcome:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    gallery: [
      {
        src: "/case-studies/cookware.jpg",
        alt: "Naczynia kuchenne przygotowane do kontroli jakości",
      },
    ],
  },
  {
    id: "cs-002",
    slug: "akumulatory-do-motocykli-elektrycznych",
    title: "Akumulatory do motocykli elektrycznych według specyfikacji klienta",
    categoryId: "battery-tech",
    summary:
      "Dobór producenta, uzgodnienie parametrów technicznych i dostawa pakietów akumulatorowych dopasowanych do konkretnego pojazdu.",
    coverImage: "/case-studies/battery-pack.jpg",
    challenge:
      "Klient wymagał pakietów akumulatorowych o ściśle określonych wymiarach i parametrach elektrycznych, kompatybilnych z istniejącą platformą pojazdu. Kluczowe było dopasowanie BMS do wymagań systemu.",
    scope: [
      "Wybór producenta",
      "Uzgodnienie parametrów technicznych",
      "Dopasowanie wymiarów",
      "Konfiguracja ogniw",
      "System BMS",
      "Kontrola przed wysyłką",
      "Organizacja dostawy",
    ],
    outcome:
      "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
    gallery: [
      {
        src: "/case-studies/battery-pack.jpg",
        alt: "Pakiet akumulatorowy do motocykla elektrycznego",
      },
    ],
  },
  {
    id: "cs-003",
    slug: "konsolidacja-od-9-producentow",
    title: "Konsolidacja towarów od 9 producentów",
    categoryId: "logistics",
    summary:
      "Koordynacja dostaw z dziewięciu fabryk, kontrola kompletności i organizacja wspólnej wysyłki kontenerowej.",
    coverImage: "/case-studies/consolidation.jpg",
    challenge:
      "Klient zamawiał produkty u dziewięciu różnych producentów w Chinach. Potrzebował jednego punktu koordynacji — odbioru towarów, sprawdzenia kompletności i przygotowania jednej spójnej wysyłki.",
    scope: [
      "Koordynacja dostaw od dziewięciu fabryk",
      "Odbiór na magazyn w Chinach",
      "Kontrola kompletności",
      "Przygotowanie wspólnej wysyłki",
      "Załadunek kontenera",
      "Dokumentacja eksportowa",
    ],
    outcome:
      "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
    gallery: [
      {
        src: "/case-studies/consolidation.jpg",
        alt: "Magazyn konsolidacyjny — towary od wielu producentów",
      },
    ],
  },
  {
    id: "cs-004",
    slug: "maszyny-do-produkcji-wyrobow-papierniczych",
    title: "Dobór i dostawa maszyn do produkcji wyrobów papierniczych",
    categoryId: "machinery",
    summary:
      "Analiza potrzeb produkcyjnych, wyszukiwanie i weryfikacja producentów, negocjacje oraz organizacja dostawy maszyn.",
    coverImage: "/case-studies/paper-machines.jpg",
    challenge:
      "Klient planował rozbudowę linii produkcyjnej i potrzebował kilku maszyn do obróbki papieru. Wymagana była analiza dostępnych modeli, weryfikacja producentów i koordynacja dostaw różnych urządzeń.",
    scope: [
      "Analiza potrzeb produkcyjnych",
      "Wyszukiwanie producentów",
      "Porównanie modeli",
      "Negocjacje techniczne",
      "Weryfikacja producenta",
      "Przygotowanie ofert",
      "Organizacja dostawy",
    ],
    outcome:
      "Klient otrzymał komplet maszyn: maszynę do produkcji kubków papierowych, laminator, gilotynę do papieru i grawer laserowy.",
    gallery: [
      {
        src: "/case-studies/paper-machines.jpg",
        alt: "Maszyny do produkcji wyrobów papierniczych przygotowane do wysyłki",
      },
    ],
  },
  {
    id: "cs-005",
    slug: "sourcing-na-targach-w-chinach",
    title: "Poszukiwanie producentów na specjalistycznych targach w Chinach",
    categoryId: "sourcing",
    summary:
      "Udział w branżowych targach chińskich, rozmowy z wystawcami i przygotowanie listy potencjalnych producentów dla klienta.",
    coverImage: "/case-studies/trade-fair.jpg",
    challenge:
      "Klient szukał niszowych producentów nieosiągalnych przez standardowe kanały internetowe. Potrzebował reprezentacji na targach i zebrania materiałów niezbędnych do oceny dostawców.",
    scope: [
      "Udział w targach branżowych",
      "Rozmowy z wystawcami",
      "Analiza produktów i możliwości fabryk",
      "Zebranie kontaktów",
      "Zdjęcia i materiały wideo",
      "Przygotowanie listy potencjalnych producentów",
    ],
    outcome:
      "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
    gallery: [
      {
        src: "/case-studies/trade-fair.jpg",
        alt: "Targi branżowe w Chinach — poszukiwanie producentów",
      },
    ],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id);
}

export function getCaseStudiesByCategory(
  categoryId: CaseStudyCategoryId | "all",
): CaseStudy[] {
  if (categoryId === "all") return caseStudies;
  return caseStudies.filter((c) => c.categoryId === categoryId);
}

export function getCategoryById(
  id: CaseStudyCategoryId,
): CaseStudyCategory | undefined {
  return caseStudyCategories.find((c) => c.id === id);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
