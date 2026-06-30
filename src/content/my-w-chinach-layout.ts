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
      "Wsparcie operacyjne w Foshan: kontakt z producentami, inspekcje, konsolidacja, kontrola załadunku i dokumentacja eksportowa.",
  },
  hero: {
    eyebrow: "Działamy na miejscu w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
    image: "/image/china_office.jpg",
    imageAlt: "Zespół operacyjny Buy & Bring Solutions w Chinach",
  },
  highlights: [
    { value: "Foshan", label: "Operacje w prowincji Guangdong" },
    { value: "Na miejscu", label: "Inspekcje i kontrola załadunku" },
    { value: "Wiele języków", label: "Komunikacja z klientami w Europie" },
    { value: "Elastycznie", label: "Specjaliści dobierani do projektu" },
  ] satisfies MyWChinachHighlight[],
  pillars: [
    {
      id: "zespol",
      title: "Zespół operacyjny w Foshan",
      body: "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
      bullets: [
        "Kontakt i negocjacje z producentami",
        "Zbieranie ofert i danych technicznych",
        "Organizacja inspekcji i kontroli jakości",
        "Konsolidacja oraz przygotowanie wysyłek",
      ],
      image: "/image/china_office.jpg",
      imageAlt: "Zespół operacyjny Buy & Bring Solutions w Foshan",
    },
    {
      id: "kontrola-jakosci",
      title: "Kontrola jakości i dokumentacja",
      body: "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką. Sprawdzamy też dostępne dokumenty producenta.",
      bullets: [
        "Inspekcje przed wysyłką i w trakcie produkcji",
        "Raporty fotograficzne i wideo z kontroli",
        "Weryfikacja dostępnych dokumentów producenta",
        "Sprawdzenie opakowań, etykiet i oznakowania",
      ],
      image: "/image/quality_control.jpg",
      imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    },
    {
      id: "wyjazdy",
      title: "Wsparcie podczas wizyt w Chinach",
      body: "Wspieramy klientów podczas wizyt biznesowych w Chinach — organizujemy wizyty w fabrykach, tłumaczenia na miejscu i pomoc w rozmowach z producentami.",
      bullets: [
        "Umawianie i potwierdzanie wizyt w fabrykach",
        "Tłumaczenie podczas rozmów i inspekcji hali",
        "Transport lokalny między fabrykami",
        "Podsumowania i rekomendacje po wizytach",
      ],
      image: "/image/business_trips.jpg",
      imageAlt: "Wsparcie podczas wizyt biznesowych w Chinach",
    },
  ] satisfies MyWChinachPillar[],
  locations: {
    sectionTitle: "Co robimy na miejscu",
    sectionLead:
      "Z bazy w Foshan obsługujemy cały proces realizacji — od kontaktu z producentami po przygotowanie wspólnej wysyłki.",
    steps: [
      {
        id: "sourcing",
        tabLabel: "Wyszukiwanie",
        title: "Wyszukiwanie i negocjacje",
        body: "Kontaktujemy się z producentami, zbieramy oferty i dane techniczne oraz porównujemy konfiguracje, ceny i warunki współpracy.",
        bullets: [
          "Kontakt i negocjacje z producentami",
          "Zbieranie ofert i danych technicznych",
          "Wizyty w fabrykach, gdy są potrzebne",
        ],
        image: "/image/china_office.jpg",
        imageAlt: "Kontakt z producentami w Chinach",
      },
      {
        id: "inspekcje",
        tabLabel: "Kontrola",
        title: "Inspekcje i kontrola jakości",
        body: "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji oraz przygotowujemy raporty fotograficzne i wideo.",
        bullets: [
          "Kontrola w trakcie produkcji i przed wysyłką",
          "Raporty fotograficzne i wideo",
          "Weryfikacja opakowań i oznakowania",
        ],
        image: "/image/quality_control.jpg",
        imageAlt: "Inspekcja jakości towarów w Chinach",
      },
      {
        id: "konsolidacja",
        tabLabel: "Konsolidacja",
        title: "Konsolidacja i wysyłka",
        body: "Odbieramy towary od kilku producentów, łączymy je w jedną wysyłkę, kontrolujemy kompletność i przygotowujemy dokumentację eksportową.",
        bullets: [
          "Odbiór towarów z wielu fabryk",
          "Kontrola kompletności i załadunku",
          "Dokumentacja eksportowa",
        ],
        image: "/image/consolidation.jpg",
        imageAlt: "Konsolidacja towarów przed wysyłką z Chin",
      },
    ],
  } satisfies FeaturedStepsContent,
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
} as const;
