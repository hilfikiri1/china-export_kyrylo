/**
 * Centralized case study content.
 */

export type CaseStudyCategoryId =
  | "private-label"
  | "battery-tech"
  | "logistics"
  | "industrial-machinery"
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
  problem: string;
  requirements: string[];
  workCompleted: string[];
  result: string;
  challenge: string;
  scope: string[];
  destinationCountry: string;
  outcome: string;
  gallery: CaseStudyImage[];
  publishedAt: string;
  status?: string;
  seo?: { title: string; description: string };
};

export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "private-label",
    label: "Private Label",
    description: "Projekty produkcji pod marką własną klienta.",
    examples: "Naczynia, opakowania markowe, etykiety i instrukcje.",
  },
  {
    id: "battery-tech",
    label: "Technologie akumulatorowe",
    description: "Rozwiązania akumulatorowe pod wymagania techniczne projektu.",
    examples: "Pakiety akumulatorowe, konfiguracja ogniw, systemy BMS.",
  },
  {
    id: "logistics",
    label: "Logistyka i konsolidacja",
    description: "Konsolidacja wielu producentów i wysyłki kontenerowe.",
    examples: "Konsolidacja magazynowa, załadunek, dokumentacja eksportowa.",
  },
  {
    id: "industrial-machinery",
    label: "Maszyny przemysłowe",
    description: "Dobór i dostawy maszyn dla produkcji.",
    examples:
      "Maszyny do kubków papierowych, laminatory, gilotyny, grawery laserowe.",
  },
  {
    id: "sourcing",
    label: "Sourcing w Chinach",
    description: "Pozyskiwanie producentów na targach branżowych.",
    examples: "Analiza wystawców, lista producentów, materiały wideo.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-private-label-cookware",
    slug: "produkcja-garnkow-patelni-private-label",
    title: "Produkcja garnków i patelni pod marką klienta",
    categoryId: "private-label",
    summary:
      "Produkcja naczyń z logo klienta wraz z opracowaniem opakowań i kontrolą jakości.",
    coverImage: "/cases/case-private-label-cookware.jpg",
    problem:
      "Klient potrzebował gotowej serii naczyń do sprzedaży pod własną marką.",
    challenge:
      "Potrzebne było skoordynowanie produkcji, brandingu oraz kontroli jakości dla gotowej serii produktów.",
    requirements: [
      "Wybór producentów",
      "Produkcja z logo klienta",
      "Opracowanie markowych opakowań",
    ],
    workCompleted: [
      "Koordynacja produkcji pod markę własną",
      "Kontrola jakości w fabryce",
      "Organizacja dostawy",
    ],
    result:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    scope: [
      "Sourcing i negocjacje z producentami",
      "Produkcja naczyń z logo klienta",
      "Opracowanie markowych opakowań",
      "Kontrola jakości",
      "Organizacja dostawy",
    ],
    destinationCountry: "Europa",
    outcome:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    gallery: [
      {
        src: "/cases/case-private-label-cookware.jpg",
        alt: "Produkcja naczyń pod marką klienta",
      },
    ],
    publishedAt: "2026-01-10",
  },
  {
    id: "case-battery-motorcycles",
    slug: "akumulatory-do-motocykli-elektrycznych",
    title: "Akumulatory do motocykli elektrycznych według specyfikacji klienta",
    categoryId: "battery-tech",
    summary:
      "Dobór producenta i konfiguracja pakietów akumulatorowych do parametrów pojazdu.",
    coverImage: "/cases/case-battery-motorcycles.jpg",
    problem:
      "Klient potrzebował pakietów akumulatorowych dopasowanych do specyfikacji motocykli elektrycznych.",
    challenge:
      "Kluczowe było dopasowanie konfiguracji technicznej pakietów do wymagań konstrukcyjnych pojazdu.",
    requirements: [
      "Uzgodnienie parametrów technicznych",
      "Dopasowanie wymiarów i konfiguracji ogniw",
      "Integracja BMS",
    ],
    workCompleted: [
      "Wybór producenta i uzgodnienie konfiguracji",
      "Kontrola przed wysyłką",
      "Organizacja dostawy",
    ],
    result:
      "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
    scope: [
      "Wybór producenta",
      "Uzgodnienie parametrów technicznych",
      "Konfiguracja ogniw i system BMS",
      "Kontrola przed wysyłką",
      "Organizacja dostawy",
    ],
    destinationCountry: "Europa",
    outcome:
      "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
    gallery: [
      {
        src: "/cases/case-battery-motorcycles.jpg",
        alt: "Pakiety akumulatorowe do motocykli elektrycznych",
      },
    ],
    publishedAt: "2026-01-12",
  },
  {
    id: "case-consolidation-9-suppliers",
    slug: "konsolidacja-9-producentow",
    title: "Konsolidacja towarów od 9 producentów",
    categoryId: "logistics",
    summary:
      "Połączenie dostaw z dziewięciu fabryk w jedną wysyłkę kontenerową.",
    coverImage: "/cases/case-consolidation-9-suppliers.jpg",
    problem:
      "Projekt wymagał synchronizacji odbiorów i wspólnej wysyłki od wielu dostawców.",
    challenge:
      "Należało połączyć dostawy od wielu producentów i przygotować kompletną dokumentację eksportową.",
    requirements: [
      "Koordynacja odbiorów od dziewięciu fabryk",
      "Kontrola kompletności",
      "Przygotowanie wspólnej wysyłki",
    ],
    workCompleted: [
      "Odbiór na magazyn w Chinach",
      "Kontrola kompletności i dokumentacji",
      "Załadunek kontenera i wysyłka",
    ],
    result:
      "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
    scope: [
      "Koordynacja dostaw od dziewięciu fabryk",
      "Odbiór na magazyn w Chinach",
      "Kontrola kompletności",
      "Przygotowanie wspólnej wysyłki",
      "Załadunek kontenera",
      "Dokumentacja eksportowa",
    ],
    destinationCountry: "Europa",
    outcome:
      "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
    gallery: [
      {
        src: "/cases/case-consolidation-9-suppliers.jpg",
        alt: "Konsolidacja towarów od dziewięciu producentów",
      },
    ],
    publishedAt: "2026-01-15",
  },
  {
    id: "case-paper-machinery",
    slug: "maszyny-do-produkcji-wyrobow-papierniczych",
    title: "Dobór i dostawa maszyn do produkcji wyrobów papierniczych",
    categoryId: "industrial-machinery",
    summary:
      "Wsparcie doboru maszyn, negocjacji technicznych i organizacji dostawy.",
    coverImage: "/cases/case-paper-machinery.jpg",
    problem:
      "Klient potrzebował doboru maszyn i porównania modeli dla uruchomienia produkcji wyrobów papierniczych.",
    challenge:
      "Wymagane było porównanie rozwiązań technologicznych oraz weryfikacja producentów przed zamówieniem.",
    requirements: [
      "Analiza potrzeb produkcyjnych",
      "Wyszukiwanie producentów i porównanie modeli",
      "Negocjacje techniczne i przygotowanie ofert",
    ],
    workCompleted: [
      "Weryfikacja producenta",
      "Koordynacja procesu ofertowego",
      "Organizacja dostawy",
    ],
    result:
      "Dostarczono zestaw maszyn dopasowany do założeń technologicznych projektu klienta.",
    scope: [
      "Analiza potrzeb produkcyjnych",
      "Wyszukiwanie producentów",
      "Porównanie modeli",
      "Negocjacje techniczne",
      "Weryfikacja producenta",
      "Przygotowanie ofert",
      "Organizacja dostawy",
      "Maszyna do produkcji kubków papierowych",
      "Laminator",
      "Gilotyna do papieru",
      "Grawer laserowy",
    ],
    destinationCountry: "Europa",
    outcome: "Dostarczono zestaw maszyn dopasowany do projektu produkcyjnego.",
    gallery: [
      {
        src: "/cases/case-paper-machinery.jpg",
        alt: "Maszyny do produkcji wyrobów papierniczych",
      },
    ],
    publishedAt: "2026-01-18",
  },
  {
    id: "case-trade-fair-sourcing",
    slug: "poszukiwanie-producentow-na-targach",
    title: "Poszukiwanie producentów na specjalistycznych targach w Chinach",
    categoryId: "sourcing",
    summary:
      "Wsparcie sourcingowe podczas targów i przygotowanie shortlisty producentów.",
    coverImage: "/cases/case-trade-fair-sourcing.jpg",
    problem:
      "Klient szukał nowych producentów i potrzebował wsparcia podczas wizyt na targach branżowych.",
    challenge:
      "Celem było skuteczne wyselekcjonowanie producentów i przygotowanie materiałów do dalszych negocjacji.",
    requirements: [
      "Analiza wystawców i rozmowy na targach",
      "Ocena produktów i możliwości fabryk",
      "Przygotowanie listy potencjalnych producentów",
    ],
    workCompleted: [
      "Udział w targach branżowych",
      "Zebranie kontaktów i materiałów wideo",
      "Przygotowanie listy potencjalnych producentów",
    ],
    result:
      "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
    scope: [
      "Udział w targach branżowych",
      "Rozmowy z wystawcami",
      "Analiza produktów i możliwości fabryk",
      "Zebranie kontaktów",
      "Zdjęcia i materiały wideo",
      "Przygotowanie listy potencjalnych producentów",
    ],
    destinationCountry: "Chiny / Europa",
    outcome:
      "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
    gallery: [
      {
        src: "/cases/case-trade-fair-sourcing.jpg",
        alt: "Poszukiwanie producentów podczas targów w Chinach",
      },
    ],
    publishedAt: "2026-01-20",
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
