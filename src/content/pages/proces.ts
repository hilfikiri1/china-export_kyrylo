import type { DedicatedPageContent } from "./types";

export const procesPage: DedicatedPageContent = {
  id: "proces",
  meta: {
    title: "Proces importu — Buy & Bring Solutions",
    description:
      "Sześć etapów importu z Chin: brief, sourcing, weryfikacja producenta, produkcja, kontrola jakości, transport, odprawa i dostawa.",
  },
  hero: {
    eyebrow: "Jak pracujemy",
    title: "Import z Chin krok po kroku",
    lead:
      "Porządkujemy cały proces — od pierwszej specyfikacji produktu po kontrolę jakości, odprawę celną i dostawę do magazynu.",
  },
  sections: [
    {
      title: "Proces dopasowany do projektu",
      body:
        "Nie każdy import wymaga tego samego zakresu. Możesz zlecić cały proces albo wybrane etapy, takie jak weryfikacja producenta, kontrola jakości, konsolidacja lub transport.",
      bullets: [
        "jasny zakres i odpowiedzialności",
        "komunikacja z producentem",
        "kontrola jakości według uzgodnionej specyfikacji",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz swój projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
