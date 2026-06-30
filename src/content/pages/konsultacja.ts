import type { DedicatedPageContent } from "./types";

export const konsultacjaPage: DedicatedPageContent = {
  id: "konsultacja",
  meta: {
    title: "Bezpłatna konsultacja importowa | Buy & Bring Solutions",
    description:
      "Umów bezpłatną konsultację z ekspertem Buy & Bring Solutions. Omówimy Twój projekt, ryzyka i rekomendowany zakres usług.",
  },
  hero: {
    eyebrow: "Konsultacja",
    title: "Umów bezpłatną konsultację",
    lead: "Opisz krótko swój projekt i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  sections: [
    {
      title: "Co omawiamy podczas rozmowy",
      body: "Konsultacja odbywa się online lub telefonicznie. Przygotuj krótki opis produktu, planowany wolumen i informację, na czym najbardziej zależy Ci w tym projekcie.",
      bullets: [
        "Analiza produktu i wymagań projektu",
        "Ocena potencjalnych ryzyk",
        "Rekomendacja zakresu usług i orientacyjny harmonogram",
        "Odpowiedzi na pytania o proces i koszty",
      ],
    },
    {
      title: "Z kim rozmawiasz",
      body: "Konsultacje prowadzą koordynatorzy projektów z doświadczeniem w obsłudze importów z Chin — osoby, które na co dzień pracują z producentami i klientami.",
    },
  ],
  cta: {
    primary: { label: "Poproś o kontakt", href: "/kontakt" },
    secondary: { label: "Zobacz jak pracujemy", href: "/proces" },
  },
};
