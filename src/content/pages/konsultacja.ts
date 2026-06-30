import type { DedicatedPageContent } from "./types";

export const konsultacjaPage: DedicatedPageContent = {
  id: "konsultacja",
  meta: {
    title: "Umów konsultację — Buy & Bring Solutions",
    description:
      "Bezpłatna 30-minutowa konsultacja z specjalistą ds. importu z Chin — omówimy Twój projekt, ryzyka i rekomendowany plan.",
  },
  hero: {
    eyebrow: "Narzędzia",
    title: "Bezpłatna konsultacja 30 minut",
    lead: "Porozmawiaj z naszym specjalistą ds. importu — bez zobowiązań. Omówimy produkt, ryzyka, harmonogram i rekomendowany zakres usług.",
  },
  sections: [
    {
      title: "Jak wygląda rozmowa",
      body: "Konsultacja trwa ok. 30 minut online (Zoom / Google Meet) lub telefonicznie. Przygotuj krótki opis produktu, planowany wolumen i to, na czym najbardziej zależy Ci w imporcie.",
      bullets: [
        "Analiza produktu i wymagań rynku UE",
        "Ocena ryzyk (dostawca, certyfikaty, logistyka)",
        "Rekomendacja modułów i orientacyjny harmonogram",
        "Odpowiedzi na pytania o proces i koszty",
      ],
    },
    {
      title: "Z kim rozmawiasz",
      body: "Konsultacje prowadzą doświadczeni koordynatorzy projektów — osoby, które na co dzień nadzorują importy w różnych branżach.",
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Zobacz proces importu", href: "/proces" },
  },
};
