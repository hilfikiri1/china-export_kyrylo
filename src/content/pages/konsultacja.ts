import type { DedicatedPageContent } from "./types";

export const konsultacjaPage: DedicatedPageContent = {
  id: "konsultacja",
  meta: {
    title: "Umów bezpłatną konsultację — Buy & Bring Solutions",
    description:
      "Opisz krótko swój projekt i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  hero: {
    eyebrow: "Konsultacja",
    title: "Umów bezpłatną konsultację",
    lead:
      "Opisz krótko swój projekt i wskaż dogodny termin kontaktu. Skontaktujemy się z Tobą, aby potwierdzić rozmowę.",
  },
  sections: [
    {
      title: "Jak przygotować zgłoszenie",
      body:
        "Napisz, czego dotyczy projekt, na jakim etapie jesteś i jaki zakres wsparcia rozważasz.",
      bullets: [
        "produkt lub rodzaj maszyny",
        "kraj dostawy",
        "preferowany termin kontaktu",
        "zakres potrzebnej pomocy",
      ],
    },
    {
      title: "Kto odpowie",
      body:
        "Zgłoszenie trafi do zespołu Buy & Bring Solutions, który dobierze odpowiednią osobę do tematu projektu.",
    },
  ],
  cta: {
    primary: { label: "Opisz projekt", href: "/kontakt" },
    secondary: { label: "Zobacz proces importu", href: "/proces" },
  },
};
