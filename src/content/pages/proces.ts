import type { DedicatedPageContent } from "./types";

export const procesPage: DedicatedPageContent = {
  id: "proces",
  meta: {
    title: "Jak pracujemy — proces importu z Chin",
    description:
      "Poznaj ścieżkę importu z Chin — od briefu i wyszukiwania producentów po kontrolę jakości, transport, odprawę celną i dostawę.",
  },
  hero: {
    eyebrow: "Jak pracujemy",
    title: "Import z Chin krok po kroku",
    lead: "Każdy projekt przechodzi przez przewidywalne etapy. Wiesz, co dzieje się teraz, co będzie dalej i kto za to odpowiada — po stronie europejskiej i chińskiej.",
  },
  sections: [
    {
      title: "Od briefu do wyboru producenta",
      body: "Zaczynamy od briefu: produkt, zastosowanie, wymagania techniczne, ilość, budżet, termin i kraj docelowy. Na tej podstawie proponujemy zakres — kompleksową obsługę albo wybrane moduły.",
      bullets: [
        "Analiza produktu i wymagań rynku docelowego",
        "Wstępna ocena ryzyk i harmonogramu",
        "Propozycja modułów i transparentny zakres",
      ],
    },
    {
      title: "Transparentność na każdym etapie",
      body: "Po kolejnych krokach otrzymujesz raport, zdjęcia lub dokumenty — w zależności od fazy projektu. Możesz wejść w proces w dowolnym momencie albo powierzyć nam całość.",
      bullets: [
        "Opiekun projektu po stronie europejskiej",
        "Zespół operacyjny na miejscu w Chinach (Foshan)",
        "Raporty i aktualizacje w uzgodnionym rytmie",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
