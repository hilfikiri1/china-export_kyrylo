import type { DedicatedPageContent } from "./types";

export const uslugiPage: DedicatedPageContent = {
  id: "uslugi",
  meta: {
    title: "Usługi importowe z Chin",
    description:
      "Usługi dopasowane do etapu Twojego projektu — wyszukiwanie producentów, audyty, kontrola jakości, Private Label, konsolidacja, transport i odprawa celna.",
  },
  hero: {
    eyebrow: "Usługi",
    title: "Usługi dopasowane do etapu Twojego projektu",
    lead: "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie. Każda usługa działa jako samodzielny moduł.",
  },
  sections: [
    {
      title: "Jak wybrać zakres",
      body: "Jeśli masz już producenta — może wystarczy kontrola jakości i transport. Jeśli zaczynasz od zera — zaczynamy od wyszukiwania producentów i weryfikacji. Na konsultacji pomożemy dobrać sensowny zakres.",
      bullets: [
        "Przed produkcją — wyszukiwanie, weryfikacja, kontrola jakości, Private Label",
        "Logistyka — koordynacja eksportu, konsolidacja, fracht",
        "Dostawa — odprawa celna i dostawa pod wskazany adres",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
