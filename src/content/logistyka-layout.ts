import type { FeaturedStepsContent } from "@/content/pages/types";
import type { MyWChinachHighlight, MyWChinachPillar } from "@/content/my-w-chinach-layout";
import { spedycjaILogistykaPage } from "@/content/pages/uslugi-spedycja-i-logistyka";

export const logistykaLayout = {
  meta: spedycjaILogistykaPage.meta,
  hero: {
    ...spedycjaILogistykaPage.hero,
    image: "/image/consolidation.jpg",
    imageAlt: "Kontenery cargo — transport, odprawa i dostawa z Chin",
    headingId: "logistyka-hero-heading",
    imageOverlayTitle: "Transport i odprawa",
    imageOverlayBody:
      "Dobór trybu transportu, dokumentacja, odprawa celna i dostawa końcowa zależą od danych ładunku oraz miejsca dostawy.",
  },
  highlights: [
    { value: "FCL", label: "Pełne kontenery" },
    { value: "LCL", label: "Ładunki drobnicowe" },
    { value: "Air / Rail / Road", label: "Tryby według projektu" },
    { value: "Door-to-door", label: "Dostawa końcowa" },
  ] satisfies MyWChinachHighlight[],
  transportModes: {
    sectionTitle: "Tryby transportu",
    sectionLead:
      "Dobieramy tryb do wagi, objętości, pilności, adresu załadunku i miejsca dostawy. Dokładna wycena frachtu wymaga pełnych danych ładunku.",
    steps: [
      {
        id: "fcl",
        tabLabel: "FCL",
        title: "FCL — pełny kontener",
        body:
          "Pełny kontener morski (20'/40'/40'HC) dla większych wolumenów. Termin i koszt zależą od portu załadunku, sezonu, przewoźnika i miejsca dostawy.",
        bullets: [
          "kontenery 20', 40' i 40'HC",
          "opłacalne przy większych wolumenach",
          "rezerwacja frachtu i dokumentacja B/L",
          "status przewoźnika, jeśli jest dostępny",
        ],
        image: "/image/airplane_tryb.jpg",
        imageAlt: "Fracht morski FCL — pełny kontener",
      },
      {
        id: "lcl",
        tabLabel: "LCL",
        title: "LCL — ładunek drobnicowy",
        body:
          "Konsolidacja mniejszych przesyłek — płacisz za zajmowaną przestrzeń, nie za cały kontener. Dobre rozwiązanie przy pierwszych dostawach i mniejszych seriach.",
        bullets: [
          "konsolidacja w magazynie lub porcie",
          "niższy próg wejścia niż FCL",
          "łączenie ładunków z wielu producentów",
          "elastyczność przy testowych wolumenach",
        ],
        image: "/image/llc.jpg",
        imageAlt: "Fracht LCL — konsolidacja drobnicy",
      },
      {
        id: "air",
        tabLabel: "Lotniczy",
        title: "Transport lotniczy",
        body:
          "Transport lotniczy stosujemy przy próbkach, pilnych dostawach i ładunkach o wysokiej wartości jednostkowej. Stawka zależy od wagi wymiarowej i trasy.",
        bullets: [
          "próbki produkcyjne i pilne dostawy",
          "dokumentacja AWB",
          "koordynacja lotniskowa",
          "wycena na podstawie pełnych danych ładunku",
        ],
        image: "/image/plane_shipment.jpg",
        imageAlt: "Transport lotniczy z Chin",
      },
      {
        id: "multimodal",
        tabLabel: "Multimodal",
        title: "Transport multimodalny",
        body:
          "Łączymy transport morski, kolejowy, lotniczy i drogowy, gdy wymaga tego projekt, budżet lub adres dostawy.",
        bullets: [
          "rozwiązania morskie, kolejowe, lotnicze i drogowe",
          "koordynacja od fabryki do miejsca dostawy",
          "dokumentacja transportowa",
          "dobór trasy do ładunku i harmonogramu",
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
      body:
        "Organizujemy odbiór towarów z kilku fabryk, magazynowanie, kontrolę kompletności, przeładunek i przygotowanie wspólnej wysyłki.",
      bullets: [
        "odbiór z fabryki",
        "magazynowanie i kompletacja",
        "przygotowanie ładunku do eksportu",
        "dokumentacja transportowa",
      ],
      image: "/image/cargo_conteiners.jpg",
      imageAlt: "Konsolidacja ładunków i odbiór z fabryki w Chinach",
    },
    {
      id: "odprawa-dostawa",
      title: "Odprawa celna i dostawa",
      body:
        "Koordynujemy dokumentację, odprawę celną i dostawę końcową pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      bullets: [
        "koordynacja dokumentacji",
        "współpraca z brokerami celnymi",
        "opłaty terminalowe i dostawa końcowa",
        "status przesyłki według możliwości przewoźnika",
      ],
      image: "/image/plane_shipment.jpg",
      imageAlt: "Odprawa celna i dostawa końcowa",
    },
  ] satisfies MyWChinachPillar[],
  cta: spedycjaILogistykaPage.cta,
} as const;
