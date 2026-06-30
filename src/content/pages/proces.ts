import type { DedicatedPageContent } from "./types";

export const procesPage: DedicatedPageContent = {
  id: "proces",
  meta: {
    title: "Jak pracujemy — proces importu z Chin | Buy & Bring Solutions",
    description:
      "Sześć etapów importu z Chin — od briefu i weryfikacji producenta po kontrolę jakości, transport i dostawę.",
  },
  hero: {
    eyebrow: "Jak pracujemy",
    title: "Import z Chin krok po kroku",
    lead: "Każdy projekt przechodzi przez przewidywalne etapy. Wiesz, co dzieje się teraz, co będzie dalej i kto za to odpowiada.",
  },
  sections: [
    {
      title: "Transparentność na każdym etapie",
      body: "Po każdym kroku otrzymujesz informację o stanie projektu. Możesz wejść w proces w dowolnym momencie albo powierzyć nam całość — od briefu do dostawy.",
      bullets: [
        "Stały kontakt podczas realizacji",
        "Wsparcie operacyjne na miejscu w Chinach",
        "Aktualizacje w uzgodnionym rytmie",
      ],
    },
    {
      title: "Pełny zakres lub wybrane etapy",
      body: "Możesz zlecić nam cały proces importu lub skorzystać tylko z wybranych modułów — np. sourcingu, weryfikacji producenta, kontroli jakości lub organizacji transportu.",
      bullets: [
        "Przed produkcją — sourcing, weryfikacja, kontrola jakości, Private Label",
        "Logistyka — eksport, konsolidacja, fracht",
        "Dostawa w UE — odprawa celna, dostawa końcowa",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz swój projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
