import type { DedicatedPageContent } from "./types";

export const konsultacjaPage: DedicatedPageContent = {
  id: "konsultacja",
  meta: {
    title: "Umów konsultację — Buy & Bring Solutions",
    description:
      "Opisz krótko projekt i wskaż dogodny termin kontaktu. Skontaktujemy się, aby potwierdzić rozmowę.",
  },
  hero: {
    eyebrow: "Narzędzia",
    title: "Umów bezpłatną konsultację",
    lead: "Opisz krótko swój projekt i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  sections: [
    {
      title: "Jak wygląda rozmowa",
      body: "Konsultacja odbywa się online lub telefonicznie. Przygotuj krótki opis produktu, planowaną ilość i zakres wsparcia, którego potrzebujesz.",
      bullets: [
        "Analiza produktu i wymagań rynku UE",
        "Ocena ryzyk (dostawca, certyfikaty, logistyka)",
        "Rekomendacja modułów i orientacyjny harmonogram",
        "Odpowiedzi na pytania o proces i koszty",
      ],
    },
    {
      title: "Co warto przygotować przed rozmową",
      body: "Podaj preferowany sposób kontaktu, termin, strefę czasową i kategorię projektu. Dzięki temu szybciej zaproponujemy właściwe następne kroki.",
    },
  ],
  cta: {
    primary: { label: "Poproś o kontakt", href: "/kontakt" },
    secondary: { label: "Zobacz proces importu", href: "/proces" },
  },
};
