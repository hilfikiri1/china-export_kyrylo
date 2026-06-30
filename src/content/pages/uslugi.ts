import type { DedicatedPageContent } from "./types";

export const uslugiPage: DedicatedPageContent = {
  id: "uslugi",
  meta: {
    title: "Usługi modułowe — Buy & Bring Solutions",
    description:
      "Każdy etap importu jako osobna usługa — sourcing, audyty, QC, spedycja i dostawa door-to-door. Wybierz moduły, których potrzebujesz.",
  },
  hero: {
    eyebrow: "Usługi",
    title: "Usługi dopasowane do etapu Twojego projektu",
    lead: "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie.",
  },
  sections: [
    {
      title: "Jak wybrać moduły",
      body: "Jeśli masz już dostawcę — potrzebujesz może tylko QC i spedycji. Jeśli zaczynasz od zera — zaczynamy od sourcingu i audytu. Na konsultacji pomożemy dobrać minimalny, sensowny zakres.",
      bullets: [
        "Przed produkcją — sourcing, audyty, QC, OEM",
        "Logistyka — płatności, konsolidacja, fracht",
        "Dostawa w UE — odprawa celna, door-to-door",
      ],
    },
  ],
  cta: {
    primary: { label: "Wyślij zapytanie", href: "/kontakt" },
    secondary: { label: "Umów konsultację", href: "/konsultacja" },
  },
};
