import type { DedicatedPageContent } from "./types";

export const kontaktPage: DedicatedPageContent = {
  id: "kontakt",
  meta: {
    title: "Kontakt — Buy & Bring Solutions",
    description:
      "Skontaktuj się z Buy & Bring Solutions. Opisz swój projekt importowy z Chin — ocenimy go i przygotujemy kolejne kroki.",
  },
  hero: {
    eyebrow: "Kontakt",
    title: "Opowiedz nam o swoim projekcie",
    lead: "Im więcej informacji otrzymamy na początku, tym szybciej będziemy mogli ocenić projekt i przygotować kolejne kroki.",
  },
  sections: [
    {
      title: "Co warto napisać",
      body: "Nie musisz mieć gotowej specyfikacji — wystarczy opis produktu, planowany wolumen i harmonogram. Resztę doprecyzujemy na konsultacji.",
      bullets: [
        "Produkt — co importujesz, do czego służy",
        "Wolumen — MOQ, planowana ilość, częstotliwość zamówień",
        "Harmonogram — kiedy potrzebujesz dostawy",
        "Zakres — pełny import czy wybrane moduły (np. tylko QC)",
      ],
    },
    {
      title: "Dane kontaktowe",
      body: "Preferujesz rozmowę telefoniczną? Zadzwoń lub napisz — umówimy termin konsultacji.",
      bullets: [
        "E-mail: contact@buybringsolutions.com",
        "Polska: +48 783 232 971",
        "Ukraina: +380 66 496 38 81",
        "Chiny: +86 139 2994 3320",
      ],
    },
  ],
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Zobacz usługi", href: "/uslugi" },
  },
};
