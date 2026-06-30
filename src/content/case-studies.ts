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
  category: string;
  summary: string;
  coverImage: string;
  problem: string;
  requirements: string[];
  workCompleted: string[];
  result: string;
  challenge: string;
  scope: string[];
  outcome: string;
  gallery: CaseStudyImage[];
  destinationCountry?: string;
  publishedAt?: string;
  status?: string;
  seo?: { title: string; description: string };
};

export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "private-label",
    label: "Private Label",
    description: "Produkcja produktów pod marką klienta.",
    examples: "Naczynia, opakowania, logo, etykiety i kontrola jakości.",
  },
  {
    id: "battery",
    label: "Technologie akumulatorowe",
    description: "Akumulatory i komponenty energetyczne według specyfikacji.",
    examples: "Ogniwa, pakiety baterii, BMS i dopasowanie wymiarów.",
  },
  {
    id: "logistics",
    label: "Logistyka i konsolidacja",
    description: "Łączenie towarów od wielu producentów w jedną wysyłkę.",
    examples: "Odbiór, magazyn, kompletność, załadunek kontenera i dokumenty eksportowe.",
  },
  {
    id: "machinery",
    label: "Maszyny przemysłowe",
    description: "Dobór producentów i dostawa maszyn dla produkcji.",
    examples: "Maszyny papiernicze, laminator, gilotyna i grawer laserowy.",
  },
  {
    id: "sourcing",
    label: "Sourcing w Chinach",
    description: "Poszukiwanie producentów na targach i bezpośrednio w Chinach.",
    examples: "Rozmowy z wystawcami, kontakty, zdjęcia, wideo i lista potencjalnych producentów.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cookware-private-label",
    slug: "produkcja-garnkow-i-patelni-private-label",
    title: "Produkcja garnków i patelni pod marką klienta",
    categoryId: "private-label",
    category: "Private Label",
    summary:
      "Organizacja produkcji naczyń z logo klienta, markowych opakowań, kontroli jakości i dostawy.",
    coverImage: "/cases/placeholders/private-label.svg",
    problem: "Klient potrzebował gotowej serii produktów przeznaczonej do sprzedaży pod własną marką.",
    requirements: [
      "wybór producentów",
      "produkcja naczyń z logo klienta",
      "opracowanie markowych opakowań",
      "kontrola jakości w fabryce",
      "organizacja dostawy",
    ],
    workCompleted: [
      "wybrano producentów naczyń",
      "uzgodniono logo i opakowania",
      "zorganizowano kontrolę jakości",
      "koordynowano dostawę",
    ],
    result:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    challenge:
      "Produkcja garnków i patelni pod marką klienta wymagała koordynacji produktu, opakowań i kontroli jakości.",
    scope: [
      "wybór producentów",
      "produkcja naczyń z logo klienta",
      "opracowanie markowych opakowań",
      "kontrola jakości w fabryce",
      "organizacja dostawy",
    ],
    outcome:
      "Klient otrzymał gotową serię produktów przeznaczoną do sprzedaży pod własną marką.",
    gallery: [],
  },
  {
    id: "ev-motorcycle-batteries",
    slug: "akumulatory-do-motocykli-elektrycznych",
    title: "Akumulatory do motocykli elektrycznych według specyfikacji klienta",
    categoryId: "battery",
    category: "Technologie akumulatorowe",
    summary:
      "Dobór producenta, uzgodnienie parametrów technicznych, konfiguracji ogniw, BMS i kontroli przed wysyłką.",
    coverImage: "/cases/placeholders/battery.svg",
    problem:
      "Klient potrzebował pakietów akumulatorowych dopasowanych do parametrów technicznych pojazdu.",
    requirements: [
      "wybór producenta",
      "uzgodnienie parametrów technicznych",
      "dopasowanie wymiarów",
      "konfiguracja ogniw",
      "system BMS",
      "kontrola przed wysyłką",
      "organizacja dostawy",
    ],
    workCompleted: [
      "uzgodniono parametry techniczne baterii",
      "dopasowano wymiary i konfigurację ogniw",
      "sprawdzono system BMS",
      "zorganizowano kontrolę i dostawę",
    ],
    result:
      "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
    challenge:
      "Produkcja akumulatorów wymagała dopasowania wymiarów, konfiguracji ogniw i systemu BMS do pojazdu klienta.",
    scope: [
      "wybór producenta",
      "uzgodnienie parametrów technicznych",
      "dopasowanie wymiarów",
      "konfiguracja ogniw",
      "system BMS",
      "kontrola przed wysyłką",
      "organizacja dostawy",
    ],
    outcome:
      "Wyprodukowano pakiety akumulatorowe dopasowane do parametrów technicznych pojazdu klienta.",
    gallery: [],
  },
  {
    id: "nine-suppliers-consolidation",
    slug: "konsolidacja-towarow-od-9-producentow",
    title: "Konsolidacja towarów od 9 producentów",
    categoryId: "logistics",
    category: "Logistyka i konsolidacja",
    summary:
      "Koordynacja dostaw od dziewięciu fabryk, kontrola kompletności i wspólna wysyłka kontenerowa.",
    coverImage: "/cases/placeholders/consolidation.svg",
    problem:
      "Klient kupował towary od kilku producentów i potrzebował połączenia ich w jedną wysyłkę.",
    requirements: [
      "koordynacja dostaw od dziewięciu fabryk",
      "odbiór na magazyn w Chinach",
      "kontrola kompletności",
      "przygotowanie wspólnej wysyłki",
      "załadunek kontenera",
      "dokumentacja eksportowa",
    ],
    workCompleted: [
      "skoordynowano dostawy od dziewięciu producentów",
      "sprawdzono kompletność towarów",
      "przygotowano wspólną wysyłkę",
      "zorganizowano załadunek i dokumenty eksportowe",
    ],
    result:
      "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
    challenge:
      "Towary pochodziły od dziewięciu producentów i wymagały kontroli kompletności oraz wspólnego przygotowania do wysyłki.",
    scope: [
      "koordynacja dostaw od dziewięciu fabryk",
      "odbiór na magazyn w Chinach",
      "kontrola kompletności",
      "przygotowanie wspólnej wysyłki",
      "załadunek kontenera",
      "dokumentacja eksportowa",
    ],
    outcome:
      "Towary od dziewięciu producentów zostały połączone w jedną wysyłkę kontenerową.",
    gallery: [],
  },
  {
    id: "paper-equipment",
    slug: "maszyny-do-produkcji-wyrobow-papierniczych",
    title: "Dobór i dostawa maszyn do produkcji wyrobów papierniczych",
    categoryId: "machinery",
    category: "Maszyny przemysłowe",
    summary:
      "Analiza potrzeb, wyszukiwanie producentów i porównanie maszyn do produkcji wyrobów papierniczych.",
    coverImage: "/cases/placeholders/machinery.svg",
    problem:
      "Firma planowała rozszerzyć produkcję i potrzebowała dobrać odpowiednie maszyny od producentów w Chinach.",
    requirements: [
      "analiza potrzeb produkcyjnych",
      "wyszukiwanie producentów",
      "porównanie modeli",
      "negocjacje techniczne",
      "weryfikacja producenta",
      "przygotowanie ofert",
      "organizacja dostawy",
    ],
    workCompleted: [
      "przeanalizowano potrzeby produkcyjne",
      "porównano modele i parametry",
      "zweryfikowano producentów",
      "przygotowano oferty i organizację dostawy",
    ],
    result:
      "Klient otrzymał dobrane propozycje maszyn i wsparcie w organizacji dostawy sprzętu.",
    challenge:
      "Dobór sprzętu wymagał porównania parametrów technicznych, możliwości producentów i warunków dostawy.",
    scope: [
      "maszyna do produkcji kubków papierowych",
      "laminator",
      "gilotyna do papieru",
      "grawer laserowy",
    ],
    outcome:
      "Klient otrzymał dobrane propozycje maszyn i wsparcie w organizacji dostawy sprzętu.",
    gallery: [],
  },
  {
    id: "trade-fair-sourcing",
    slug: "poszukiwanie-producentow-na-targach-w-chinach",
    title: "Poszukiwanie producentów na specjalistycznych targach w Chinach",
    categoryId: "sourcing",
    category: "Sourcing w Chinach",
    summary:
      "Udział w targach, rozmowy z wystawcami, analiza produktów i lista potencjalnych producentów dla klienta.",
    coverImage: "/cases/placeholders/trade-fair.svg",
    problem:
      "Klient szukał nowych producentów i potrzebował materiałów do rozpoczęcia dalszych negocjacji.",
    requirements: [
      "udział w targach branżowych",
      "rozmowy z wystawcami",
      "analiza produktów i możliwości fabryk",
      "zebranie kontaktów",
      "zdjęcia i materiały wideo",
      "przygotowanie listy potencjalnych producentów",
    ],
    workCompleted: [
      "odwiedzono specjalistyczne targi",
      "przeprowadzono rozmowy z wystawcami",
      "zebrano kontakty i materiały",
      "przygotowano listę potencjalnych producentów",
    ],
    result:
      "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
    challenge:
      "Sourcing na targach wymagał szybkiej selekcji wystawców, rozmów i zebrania materiałów dla klienta.",
    scope: [
      "udział w targach branżowych",
      "rozmowy z wystawcami",
      "analiza produktów i możliwości fabryk",
      "zebranie kontaktów",
      "zdjęcia i materiały wideo",
      "przygotowanie listy potencjalnych producentów",
    ],
    outcome:
      "Klient otrzymał listę potencjalnych producentów oraz materiały potrzebne do rozpoczęcia dalszych negocjacji.",
    gallery: [],
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
