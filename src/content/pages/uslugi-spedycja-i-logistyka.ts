import type { DedicatedPageContent } from "./types";

export const spedycjaILogistykaPage: DedicatedPageContent = {
  id: "uslugi-spedycja-i-logistyka",
  meta: {
    title: "Transport, odprawa celna i dostawa — Buy & Bring Solutions",
    description:
      "Dobór sposobu transportu, koordynacja frachtu, dokumentacji, odprawy celnej oraz dostawy końcowej z Chin do Polski i Europy.",
  },
  hero: {
    eyebrow: "Logistyka",
    title: "Transport, odprawa celna i dostawa",
    lead:
      "Dobieramy sposób transportu, koordynujemy fracht, dokumentację, odprawę celną oraz dostawę końcową.",
  },
  sections: [
    {
      title: "Dostępne tryby",
      body:
        "Wybór transportu zależy od wagi, objętości, adresu załadunku, miejsca dostawy i oczekiwanego terminu.",
      bullets: [
        "FCL",
        "LCL",
        "kolej",
        "transport lotniczy",
        "transport drogowy",
        "rozwiązania multimodalne",
      ],
    },
    {
      title: "Co koordynujemy",
      body:
        "Organizujemy odbiór, konsolidację, dokumentację transportową, odprawę celną i dostawę końcową. Status przesyłki przekazujemy zgodnie z możliwościami przewoźnika.",
      bullets: [
        "odbiór z fabryki lub magazynu",
        "konsolidacja ładunków",
        "dokumentacja eksportowa i transportowa",
        "odprawa celna i dostawa pod adres",
      ],
    },
  ],
  cta: {
    primary: { label: "Oblicz orientacyjny koszt importu", href: "/kalkulator" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
