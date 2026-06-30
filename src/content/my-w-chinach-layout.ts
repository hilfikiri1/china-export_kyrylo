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
    title: "Działamy w Chinach — Foshan | Buy & Bring Solutions",
    description:
      "Zespół Buy & Bring Solutions w Foshan wspiera wyszukiwanie producentów, kontrolę jakości, konsolidację i przygotowanie wysyłek.",
  },
  hero: {
    eyebrow: "Działamy w Chinach",
    title: "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
    lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
    image: "/image/plane_shipment.jpg",
    imageAlt: "Logistyka i operacje na miejscu w Chinach",
  },
  highlights: [
    { value: "Foshan", label: "baza operacyjna w Chinach" },
    { value: "PL/UK/EN/CN", label: "języki komunikacji" },
    { value: "17 lat", label: "doświadczenia z Chinami" },
    { value: "Na miejscu", label: "inspekcje i weryfikacje" },
  ] satisfies MyWChinachHighlight[],
  pillars: [
    {
      id: "operacje",
      title: "Operacje w Foshan",
      body: "Nasz zespół operacyjny w Foshan koordynuje kontakt z producentami, zbieranie ofert, wizyty fabryczne i przygotowanie wysyłek. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
      bullets: [
        "Kontakt i negocjacje z producentami",
        "Zbieranie ofert i danych technicznych",
        "Wizyty w fabrykach i inspekcje",
        "Raporty fotograficzne i wideo",
        "Konsolidacja i kontrola załadunku",
        "Dokumentacja eksportowa",
      ],
      image: "/image/china_office.jpg",
      imageAlt: "Operacje Buy & Bring Solutions w Foshan, Chiny",
    },
    {
      id: "kontrola-jakosci",
      title: "Kontrola jakości i dokumentacja",
      body: "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji i checklisty. Dostarczamy raporty fotograficzne i wideo z inspekcji.",
      bullets: [
        "Kontrola przed rozpoczęciem produkcji",
        "Kontrola w trakcie produkcji",
        "Inspekcja przed wysyłką",
        "Nadzór nad załadunkiem kontenera",
      ],
      image: "/image/quality_control.jpg",
      imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
    },
    {
      id: "wyjazdy",
      title: "Wsparcie przy wizytach biznesowych",
      body: "Wspieramy klientów podczas wyjazdów do Chin — organizacja wizyt w fabrykach, wsparcie podczas rozmów i tłumaczenie techniczne.",
      bullets: [
        "Koordynacja programu wizyt fabrycznych",
        "Wsparcie podczas negocjacji",
        "Transport lokalny między fabrykami",
        "Raport po wizycie z rekomendacjami",
      ],
      image: "/image/business_trips.jpg",
      imageAlt: "Wizyta biznesowa w chińskiej fabryce",
    },
  ] satisfies MyWChinachPillar[],
  locations: {
    sectionTitle: "Baza operacyjna w Foshan",
    sectionLead:
      "Nasze operacje w Chinach koordynowane są z Foshan w prowincji Guangdong.",
    steps: [
      {
        id: "foshan",
        tabLabel: "Foshan",
        title: "Foshan — główna baza operacyjna",
        body: "Foshan to centrum przemysłowe w prowincji Guangdong. Nasz zespół operacyjny koordynuje stąd kontakt z producentami, wizyty fabryczne i organizację wysyłek.",
        bullets: [
          "Kontakt z producentami w regionie Guangdong",
          "Organizacja inspekcji i wizyt fabrycznych",
          "Koordynacja konsolidacji i dokumentacji eksportowej",
        ],
        image: "/image/quality_control.jpg",
        imageAlt: "Foshan — centrum przemysłowe prowincji Guangdong",
      },
    ],
  } satisfies FeaturedStepsContent,
  cta: {
    primary: { label: "Opisz swój projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
} as const;
