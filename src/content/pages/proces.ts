import type { DedicatedPageContent } from "./types";

export const procesPage: DedicatedPageContent = {
  id: "proces",
  meta: {
    title: "Proces importu — Buy & Bring Solutions",
    description:
      "Poznaj pełną ścieżkę importu z Chin — od briefu i weryfikacji dostawcy po fracht, odprawę celną i dostawę door-to-door.",
  },
  hero: {
    eyebrow: "Mapa współpracy",
    title: "Import z Chin krok po kroku",
    lead: "Każdy projekt przechodzi przez przewidywalne etapy. Wiesz, co dzieje się teraz, co będzie dalej i kto za to odpowiada — po stronie polskiej i chińskiej.",
  },
  sections: [
    {
      title: "Od briefu do pierwszej wyceny",
      body: "Zaczynamy od krótkiego briefu: produkt, wolumen, budżet i harmonogram. Na tej podstawie proponujemy zakres — pełny import albo wybrane moduły współpracy.",
      bullets: [
        "Analiza produktu i wymagań rynku UE",
        "Wstępna ocena ryzyk i harmonogramu",
        "Propozycja modułów i transparentny kosztorys",
      ],
    },
    {
      title: "Transparentność na każdym etapie",
      body: "Nie znikamy między etapami. Po każdym kroku otrzymujesz raport, zdjęcia lub dokumenty — w zależności od fazy. Możesz wejść w proces w dowolnym momencie albo powierzyć nam całość.",
      bullets: [
        "Stały opiekun projektu po stronie PL",
        "Zespół operacyjny na miejscu w Chinach",
        "Raporty i aktualizacje w uzgodnionym rytmie",
      ],
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
