import type { DedicatedPageContent } from "./types";

export const uslugiPage: DedicatedPageContent = {
  id: "uslugi",
  meta: {
    title: "Usługi importu z Chin | Buy & Bring Solutions",
    description:
      "Modułowe usługi importowe — sourcing, weryfikacja fabryk, kontrola jakości, Private Label, konsolidacja, transport i odprawa celna.",
  },
  hero: {
    eyebrow: "Usługi modułowe",
    title: "Usługi dopasowane do etapu Twojego projektu",
    lead: "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie.",
  },
  sections: [
    {
      title: "Jak wybrać zakres",
      body: "Jeśli masz już dostawcę — potrzebujesz może tylko kontroli jakości i transportu. Jeśli zaczynasz od zera — zaczynamy od sourcingu i weryfikacji. Na konsultacji pomożemy dobrać minimalny, sensowny zakres.",
      bullets: [
        "Przed produkcją — wyszukiwanie producentów, weryfikacja, kontrola jakości, Private Label",
        "Logistyka — koordynacja eksportu, konsolidacja, fracht",
        "Dostawa w UE — odprawa celna, dostawa końcowa",
      ],
    },
  ],
  cta: {
    primary: { label: "Opisz swój projekt", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
