import type { DedicatedPageContent } from "./types";

export const konsultacjaPage: DedicatedPageContent = {
  id: "konsultacja",
  meta: {
    title: "Umów bezpłatną konsultację",
    description:
      "Opisz krótko swój projekt importowy i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  hero: {
    eyebrow: "Konsultacja",
    title: "Umów bezpłatną konsultację",
    lead: "Opisz krótko swój projekt i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  sections: [
    {
      title: "Jak wygląda rozmowa",
      body: "Konsultacja odbywa się online lub telefonicznie. Przygotuj krótki opis produktu, planowaną ilość i to, na czym najbardziej zależy Ci w imporcie.",
      bullets: [
        "Analiza produktu i wymagań rynku docelowego",
        "Ocena ryzyk (producent, dokumentacja, logistyka)",
        "Rekomendacja zakresu i orientacyjny harmonogram",
        "Odpowiedzi na pytania o proces i koszty",
      ],
    },
    {
      title: "Z kim rozmawiasz",
      body: "Konsultacje prowadzą doświadczeni koordynatorzy projektów Buy & Bring Solutions — osoby, które na co dzień nadzorują importy w różnych branżach.",
    },
  ],
  cta: {
    primary: { label: "Poproś o kontakt", href: "/kontakt" },
    secondary: { label: "Jak pracujemy", href: "/proces" },
  },
};
