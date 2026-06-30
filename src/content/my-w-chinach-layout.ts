import type { FeaturedStepsContent } from "@/content/pages/types";
import { companyConfig } from "@/config/company";

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
      "Wsparcie operacyjne B&BS w Foshan: sourcing, komunikacja z producentami, kontrole, konsolidacja i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "Działamy na miejscu w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead:
      "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
    image: "/image/plane_shipment.jpg",
    imageAlt: "Operacje importowe i wysyłki z Chin",
  },
  highlights: [
    { value: "Foshan", label: "Koordynacja operacji w Chinach" },
    { value: "Guangdong", label: "Prowincja operacyjna" },
    { value: "PL/UK/RU/CN", label: "Komunikacja w kilku językach" },
    { value: "Projektowo", label: "Dobór specjalistów do branży" },
  ] satisfies MyWChinachHighlight[],
  pillars: [
    {
      id: "operacje",
      title: "Kontakt i negocjacje z producentami",
      body:
        "Wspieramy zbieranie ofert, danych technicznych i warunków handlowych bezpośrednio od producentów w Chinach.",
      bullets: [
        "kontakt i negocjacje z producentami",
        "zbieranie ofert i danych technicznych",
        "weryfikacja podstawowych dokumentów",
        "koordynacja komunikacji w trakcie projektu",
      ],
      image: "/image/china_office.jpg",
      imageAlt: "Wsparcie operacyjne Buy & Bring Solutions w Chinach",
    },
    {
      id: "kontrole",
      title: "Kontrole, wizyty i raporty",
      body:
        "Organizujemy wizyty w fabrykach, inspekcje, raporty fotograficzne i wideo oraz kontrolę załadunku, jeśli wymaga tego projekt.",
      bullets: [
        "wizyty w fabrykach",
        "organizacja inspekcji",
        "raporty fotograficzne i wideo",
        "kontrola załadunku",
      ],
      image: "/image/quality_control.jpg",
      imageAlt: "Kontrola jakości i raportowanie w Chinach",
    },
    {
      id: "wysylki",
      title: "Konsolidacja i przygotowanie wysyłek",
      body:
        "Koordynujemy konsolidację towarów, dokumentację eksportową oraz wsparcie klientów podczas wizyt biznesowych w Chinach.",
      bullets: [
        "konsolidacja towarów",
        "dokumentacja eksportowa",
        "przygotowanie wspólnej wysyłki",
        "wsparcie klientów podczas wizyt biznesowych w Chinach",
      ],
      image: "/image/cargo_conteiners.jpg",
      imageAlt: "Konsolidacja i przygotowanie wysyłek z Chin",
    },
  ] satisfies MyWChinachPillar[],
  locations: {
    sectionTitle: "Adres operacyjny w Chinach",
    sectionLead:
      "W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
    steps: [
      {
        id: "foshan",
        tabLabel: "Foshan",
        title: "Foshan, Guangdong",
        body: companyConfig.addresses.china,
        bullets: [
          "koordynacja operacyjna",
          "kontakt z producentami",
          "organizacja kontroli i wysyłek",
        ],
        image: "/image/china_office.jpg",
        imageAlt: "Adres operacyjny Buy & Bring Solutions w Foshan",
      },
    ],
  } satisfies FeaturedStepsContent,
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
} as const;
