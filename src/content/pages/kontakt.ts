import type { DedicatedPageContent } from "./types";

export const kontaktPage: DedicatedPageContent = {
  id: "kontakt",
  meta: {
    title: "Kontakt | Buy & Bring Solutions",
    description:
      "Skontaktuj się z Buy & Bring Solutions — opisz swój projekt importowy i otrzymaj ocenę możliwości i następnych kroków.",
  },
  hero: {
    eyebrow: "Kontakt",
    title: "Opowiedz nam o swoim projekcie",
    lead: "Im więcej informacji otrzymamy na początku, tym szybciej będziemy mogli ocenić projekt i przygotować kolejne kroki.",
  },
  sections: [
    {
      title: "Co warto opisać",
      body: "Nie musisz mieć gotowej specyfikacji — wystarczy opis produktu, planowany wolumen i harmonogram.",
      bullets: [
        "Rodzaj produktu lub maszyny",
        "Planowana ilość i budżet",
        "Oczekiwany termin",
        "Kraj docelowy lub port dostawy",
        "Zakres potrzebnej pomocy",
      ],
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
