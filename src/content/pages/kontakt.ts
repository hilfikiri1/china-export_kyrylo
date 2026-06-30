import type { DedicatedPageContent } from "./types";

export const kontaktPage: DedicatedPageContent = {
  id: "kontakt",
  meta: {
    title: "Kontakt — Buy & Bring Solutions",
    description:
      "Opowiedz nam o swoim projekcie importu z Chin. Im więcej informacji otrzymamy, tym szybciej ocenimy projekt i kolejne kroki.",
  },
  hero: {
    eyebrow: "Kontakt",
    title: "Opowiedz nam o swoim projekcie",
    lead:
      "Im więcej informacji otrzymamy na początku, tym szybciej będziemy mogli ocenić projekt i przygotować kolejne kroki.",
  },
  sections: [
    {
      title: "Co warto napisać",
      body:
        "Opisz produkt, zastosowanie, planowaną ilość, budżet, termin, kraj dostawy oraz zakres pomocy, którego potrzebujesz.",
      bullets: [
        "produkt lub rodzaj maszyny",
        "planowana ilość i budżet",
        "kraj, miasto lub kod pocztowy dostawy",
        "czy potrzebujesz pełnej obsługi, czy wybranego etapu",
      ],
    },
  ],
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Zobacz usługi", href: "/uslugi" },
  },
};
