import type { FeaturedStepsContent } from "@/content/pages/types";
import type { MyWChinachHighlight, MyWChinachPillar } from "@/content/my-w-chinach-layout";
import { spedycjaILogistykaPage } from "@/content/pages/uslugi-spedycja-i-logistyka";

export const logistykaLayout = {
  meta: spedycjaILogistykaPage.meta,
  hero: {
    ...spedycjaILogistykaPage.hero,
    image: "/image/consolidation.jpg",
    imageAlt: "Kontenery cargo — spedycja i transport z Chin",
    headingId: "logistyka-hero-heading",
    imageOverlayTitle: "Fracht i śledzenie",
    imageOverlayBody:
      "Rezerwacja kontenerów, dokumentacja B/L i AWB oraz tracking ładunku na każdym etapie trasy.",
  },
  highlights: [
    { value: "Projektowo", label: "Czas tranzytu ustalany per trasa" },
    { value: "Elastycznie", label: "Dobór środka transportu" },
    { value: "FCL / LCL / Air", label: "Tryby transportu" },
    { value: "Door-to-door", label: "Od fabryki po adres w UE" },
  ] satisfies MyWChinachHighlight[],
  transportModes: {
    sectionTitle: "Tryby transportu",
    sectionLead:
      "Dobieramy tryb do pilności, wagi i budżetu. Dla większości ładunków B2B optymalny jest fracht morski FCL/LCL; lotniczy stosujemy przy próbkach i pilnych dostawach.",
    steps: [
      {
        id: "fcl",
        tabLabel: "FCL",
        title: "FCL — pełny kontener",
        body: "Pełny kontener morski (20'/40'/40'HC) dla większych wolumenów. Czas tranzytu zależy od portu załadunku, sezonu i warunków przewoźnika.",
        bullets: [
          "Kontenery 20', 40' i 40'HC",
          "Optymalne kosztowo przy większych wolumenach",
          "Rezerwacja frachtu i dokumentacja B/L",
          "Tracking kontenera na każdym etapie trasy",
        ],
        image: "/image/airplane_tryb.jpg",
        imageAlt: "Fracht morski FCL — pełny kontener",
      },
      {
        id: "lcl",
        tabLabel: "LCL",
        title: "LCL — ładunek drobnica",
        body: "Konsolidacja mniejszych przesyłek w portcie załadunku — płacisz za zajmowaną przestrzeń, nie za cały kontener. Dobre rozwiązanie przy pierwszych dostawach i mniejszych seriach.",
        bullets: [
          "Konsolidacja w porcie nadania",
          "Niższy próg wejścia niż FCL",
          "Łączenie ładunków z wielu dostawców",
          "Elastyczność przy testowych wolumenach",
        ],
        image: "/image/llc.jpg",
        imageAlt: "Fracht LCL — konsolidacja drobnicy w porcie",
      },
      {
        id: "air",
        tabLabel: "Lotniczy",
        title: "Fracht lotniczy",
        body: "Express i standard air freight dla próbek, pilnych dostaw i ładunków o wysokiej wartości jednostkowej. Czas tranzytu zależy od wybranej trasy i harmonogramu linii.",
        bullets: [
          "Express i standard air freight",
          "Próbki produkcyjne i pilne dostawy",
          "Dokumentacja AWB i koordynacja lotniskowa",
          "Szybsza alternatywa dla mniejszych ładunków",
        ],
        image: "/image/plane_shipment.jpg",
        imageAlt: "Fracht lotniczy — transport air freight z Chin",
      },
      {
        id: "multimodal",
        tabLabel: "Multimodal",
        title: "Transport multimodalny",
        body: "Połączenie morskiego, kolejowego i drogowego — optymalizacja trasy Chiny–Europa pod kątem czasu i kosztu. Dobieramy kombinację do specyfiki ładunku i harmonogramu.",
        bullets: [
          "Morski + kolej + droga (Chiny–Europa)",
          "Optymalizacja trasy i kosztów",
          "Śledzenie ładunku na każdym odcinku",
          "Elastyczność przy niestandardowych trasach",
        ],
        image: "/image/road_shipment.jpg",
        imageAlt: "Transport multimodalny Chiny–Europa",
      },
    ],
  } satisfies FeaturedStepsContent,
  chainPillars: [
    {
      id: "konsolidacja",
      title: "Konsolidacja i odbiór z fabryki",
      body: "Od odbioru z fabryki po załadunek w porcie — koordynujemy cały łańcuch po stronie chińskiej. Odbieramy towary z wielu producentów, magazynujemy i łączymy przesyłki w jeden kontener.",
      bullets: [
        "Odbiór z fabryki i transport do portu / lotniska",
        "Magazynowanie i łączenie przesyłek z wielu dostawców",
        "Przeopakowanie i przygotowanie ładunku do eksportu",
        "Rezerwacja frachtu i dokumentacja B/L / AWB",
      ],
      image: "/image/cargo_conteiners.jpg",
      imageAlt: "Konsolidacja ładunków i odbiór z fabryki w Chinach",
    },
    {
      id: "odprawa-dostawa",
      title: "Odprawa celna i dostawa door-to-door",
      body: "Po dotarciu do UE przejmujemy odprawę celną i koordynujemy last mile — od dokumentacji taryfowej po dostawę pod wskazany adres w Polsce lub Europie.",
      bullets: [
        "Przygotowanie dokumentacji taryfowej i klasyfikacja kodów HS",
        "Koordynacja z brokerami celnymi po stronie UE",
        "Tracking ładunku i alerty o opóźnieniach",
        "Logistyka last mile — dostawa pod wskazany adres",
      ],
      image: "/image/plane_shipment.jpg",
      imageAlt: "Odprawa celna i dostawa door-to-door w UE",
    },
  ] satisfies MyWChinachPillar[],
  cta: spedycjaILogistykaPage.cta,
} as const;
