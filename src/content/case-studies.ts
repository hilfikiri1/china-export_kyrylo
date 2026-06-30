/**
 * Case studies (Polish master). Real Buy & Bring Solutions project themes.
 *
 * Do NOT invent delivery times, quantities, savings percentages, countries or
 * dates. Optional fields (`destinationCountry`, `publishedAt`, `status`) are
 * hidden in the UI when empty.
 *
 * TODO (owner): replace placeholder images with real project photos. See the
 * asset checklist in CONTENT_EDITING_GUIDE.md.
 */

export type CaseStudyCategoryId =
  | "private-label"
  | "battery"
  | "logistics"
  | "machinery"
  | "sourcing";

export type CaseStudyCategory = {
  id: CaseStudyCategoryId;
  label: string;
  description: string;
  examples: string;
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
  /** Optional — hidden when empty. */
  destinationCountry?: string;
  /** Optional ISO date — hidden when empty. */
  publishedAt?: string;
  /** Optional status label — hidden when empty. */
  status?: string;
};

export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "private-label",
    label: "Private Label",
    description: "Produkcja pod marką własną — produkt, opakowanie i etykiety.",
    examples:
      "Naczynia, artykuły gospodarstwa domowego i produkty konsumenckie pod marką klienta.",
  },
  {
    id: "battery",
    label: "Technologie akumulatorowe",
    description: "Ogniwa, pakiety akumulatorowe i systemy BMS.",
    examples:
      "Pakiety akumulatorowe, ogniwa LFP i NMC, systemy BMS oraz rozwiązania energetyczne.",
  },
  {
    id: "logistics",
    label: "Logistyka i konsolidacja",
    description: "Konsolidacja towarów od wielu producentów i organizacja wysyłki.",
    examples:
      "Odbiór z wielu fabryk, kontrola kompletności, załadunek kontenera i dokumentacja eksportowa.",
  },
  {
    id: "machinery",
    label: "Maszyny przemysłowe",
    description: "Dobór, weryfikacja i dostawa maszyn oraz linii produkcyjnych.",
    examples:
      "Maszyny do produkcji wyrobów papierniczych, linie pakujące i urządzenia przemysłowe.",
  },
  {
    id: "sourcing",
    label: "Sourcing w Chinach",
    description: "Wyszukiwanie producentów, w tym na targach branżowych w Chinach.",
    examples:
      "Udział w targach, rozmowy z wystawcami i przygotowanie listy potencjalnych producentów.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-private-label-cookware",
    slug: "produkcja-garnkow-i-patelni-private-label",
    title: "Produkcja garnków i patelni pod marką klienta",
    categoryId: "private-label",
    summary:
      "Produkcja naczyń pod marką własną klienta — od wyboru producentów po markowe opakowania i dostawę.",
    coverImage: "/case-studies/kitchen.jpg",
    challenge:
      "Klient chciał wprowadzić serię naczyń (garnki i patelnie) do sprzedaży pod własną marką i potrzebował producenta oraz spójnych, markowych opakowań.",
    scope: [
      "Wybór producentów",
      "Produkcja naczyń z logo klienta",
      "Opracowanie markowych opakowań",
      "Kontrola jakości w fabryce",
      "Organizacja dostawy",
    ],
    outcome:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    gallery: [
      { src: "/case-studies/kitchen.jpg", alt: "Naczynia pod marką własną klienta" },
      { src: "/case-studies/kitchen-2.jpg", alt: "Kontrola jakości naczyń w fabryce" },
    ],
  },
  {
    id: "cs-ev-batteries",
    slug: "akumulatory-do-motocykli-elektrycznych",
    title: "Akumulatory do motocykli elektrycznych według specyfikacji klienta",
    categoryId: "battery",
    summary:
      "Pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta — od konfiguracji ogniw po kontrolę przed wysyłką.",
    coverImage: "/case-studies/ebikes.jpg",
    challenge:
      "Klient potrzebował pakietów akumulatorowych dopasowanych do parametrów technicznych i wymiarów swojego pojazdu elektrycznego.",
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
      { src: "/case-studies/ebikes.jpg", alt: "Pojazd elektryczny klienta" },
      { src: "/case-studies/ebikes-2.jpg", alt: "Kontrola pakietów akumulatorowych przed wysyłką" },
    ],
  },
  {
    id: "cs-consolidation-9",
    slug: "konsolidacja-towarow-od-9-producentow",
    title: "Konsolidacja towarów od 9 producentów",
    categoryId: "logistics",
    summary:
      "Połączenie towarów od dziewięciu fabryk w jedną wysyłkę kontenerową — od odbioru po dokumentację eksportową.",
    coverImage: "/case-studies/packaging.jpg",
    challenge:
      "Klient zamawiał towary od dziewięciu różnych producentów w Chinach i potrzebował jednego punktu koordynacji oraz wspólnej wysyłki.",
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
      { src: "/case-studies/packaging.jpg", alt: "Towary w magazynie konsolidacyjnym" },
      { src: "/case-studies/packaging-2.jpg", alt: "Załadunek kontenera z konsolidowanym towarem" },
    ],
  },
  {
    id: "cs-paper-machines",
    slug: "maszyny-do-produkcji-wyrobow-papierniczych",
    title: "Dobór i dostawa maszyn do produkcji wyrobów papierniczych",
    categoryId: "machinery",
    summary:
      "Analiza potrzeb produkcyjnych, wyszukiwanie producentów i dostawa maszyn do produkcji wyrobów papierniczych.",
    coverImage: "/case-studies/laser-cnc.jpg",
    challenge:
      "Klient planował uruchomić produkcję wyrobów papierniczych i potrzebował doboru oraz weryfikacji maszyn dopasowanych do swoich potrzeb.",
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
      "Klient otrzymał dobór maszyn wraz z weryfikacją producentów — w zakresie projektu znalazły się m.in. maszyna do produkcji kubków papierowych, laminator, gilotyna do papieru oraz grawer laserowy.",
    gallery: [
      { src: "/case-studies/laser-cnc.jpg", alt: "Maszyna przemysłowa do produkcji wyrobów papierniczych" },
      { src: "/case-studies/laser-cnc-2.jpg", alt: "Weryfikacja maszyny u producenta" },
      { src: "/case-studies/laser-cnc-3.jpg", alt: "Przygotowanie maszyny do wysyłki" },
    ],
  },
  {
    id: "cs-trade-fair-sourcing",
    slug: "poszukiwanie-producentow-na-targach-w-chinach",
    title: "Poszukiwanie producentów na specjalistycznych targach w Chinach",
    categoryId: "sourcing",
    summary:
      "Udział w branżowych targach w Chinach i przygotowanie listy potencjalnych producentów dla klienta.",
    coverImage: "/image/business_trips.jpg",
    challenge:
      "Klient szukał nowych producentów w konkretnej branży i potrzebował rozeznania rynku oraz kontaktów do fabryk.",
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
      { src: "/image/business_trips.jpg", alt: "Targi branżowe w Chinach" },
      { src: "/image/china_office.jpg", alt: "Rozmowy z producentami w Chinach" },
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
