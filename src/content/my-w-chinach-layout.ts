import type { FeaturedStepsContent } from "@/content/pages/types";

export type MyWChinachHighlight = {
  value: string;
  label: string;
};

export type MyWChinachPillar = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const myWChinachLayout = {
  meta: {
    title: "Działamy na miejscu w Chinach — Buy & Bring Solutions",
    description:
      "Operacje w Foshan: wyszukiwanie producentów, komunikacja z fabrykami, kontrole jakości, konsolidacja i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "My w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
    image: "/image/plane_shipment.jpg",
    imageAlt: "Logistyka i operacje na miejscu w Foshan, Chiny",
  },
  highlights: [
    { value: "Foshan", label: "Baza operacyjna w Chinach" },
    { value: "PL/EN/CN", label: "Języki zespołu" },
    { value: "Na miejscu", label: "Inspekcje i audyty QA" },
    { value: "17 lat", label: "Doświadczenia z Chinami" },
  ] satisfies MyWChinachHighlight[],
  pillars: [
    {
      id: "zespol",
      title: "Zespół w Chinach",
      body: "Lokalny zespół na miejscu — od weryfikacji dostawców po koordynację produkcji i wysyłki. Każdy projekt ma przypisanego opiekuna, który raportuje bezpośrednio do zespołu w Europie.",
      bullets: [
        "Sourcing i negocjacje — identyfikacja i weryfikacja fabryk",
        "Inżynierowie QC — inspekcje na linii produkcyjnej",
        "Logistyka — odbiór z fabryki, magazyn, konsolidacja",
        "Tłumacze techniczni — specyfikacje, umowy, raporty",
      ],
      image: "/image/china_office.jpg",
      imageAlt: "Zespół Buy & Bring Solutions w Foshan",
    },
    {
      id: "kontrola-jakosci",
      title: "Kontrola jakości i dokumentacja",
      body: "Inspekcje QA, raporty z kontroli, certyfikaty i pełna dokumentacja zgodna z wymogami importu do UE — wykonywane przez nasz zespół na miejscu, przed wysyłką.",
      bullets: [
        "Inspekcje pre-shipment i inline na linii produkcyjnej",
        "Raporty fotograficzne i wideo z kontroli",
        "Certyfikaty, deklaracje zgodności i dokumentacja celna",
        "Weryfikacja opakowań, etykiet i specyfikacji pod rynek UE",
      ],
      image: "/image/quality_control.jpg",
      imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    },
    {
      id: "wyjazdy",
      title: "Wyjazdy biznesowe do Chin",
      body: "Organizujemy wizyty w fabrykach, tłumaczenia na miejscu i wsparcie podczas negocjacji z dostawcami — z konkretnym programem, nie na ślepo.",
      bullets: [
        "Shortlist fabryk i potwierdzone terminy wizyt przed wylotem",
        "Tłumaczenie techniczne podczas rozmów i inspekcji hali",
        "Transport lokalny między fabrykami i wspólne podsumowania",
        "Raport porównawczy po powrocie z rekomendacjami",
      ],
      image: "/image/business_trips.jpg",
      imageAlt: "Wyjazdy biznesowe do fabryk w Chinach",
    },
  ] satisfies MyWChinachPillar[],
  locations: {
    sectionTitle: "Gdzie działamy",
    sectionLead:
      "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong — blisko producentów i portów eksportowych.",
    steps: [
      {
        id: "foshan",
        tabLabel: "Foshan",
        title: "Foshan — operacje na miejscu",
        body: "Z Foshan koordynujemy kontakt z producentami, inspekcje, konsolidację ładunków i dokumentację eksportową. Region Guangdong obejmuje szerokie spektrum branż — od naczyń i elektroniki po maszyny przemysłowe.",
        bullets: [
          "Kontakt z producentami i koordynacja zamówień",
          "Inspekcje jakości i audyty fabryk",
          "Magazynowanie, konsolidacja i przygotowanie wysyłek",
          "Dokumentacja eksportowa po stronie chińskiej",
        ],
        image: "/image/china_office.jpg",
        imageAlt: "Operacje Buy & Bring Solutions w Foshan",
      },
    ],
  } satisfies FeaturedStepsContent,
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
} as const;
