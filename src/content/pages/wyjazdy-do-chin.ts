import type { DedicatedPageContent } from "./types";

export const wyjazdyDoChinPage: DedicatedPageContent = {
  id: "wyjazdy-do-chin",
  meta: {
    title: "Wyjazdy do Chin | Buy & Bring Solutions",
    description:
      "Zorganizowane wyjazdy biznesowe do Chin — wizyty w fabrykach, tłumaczenie na miejscu i wsparcie podczas negocjacji.",
  },
  hero: {
    eyebrow: "Wyjazdy biznesowe",
    title: "Jedź do Chin z planem — nie na ślepo",
    lead: "Organizujemy wyjazdy służbowe z konkretnym programem: prekwalifikowane fabryki, tłumaczenie techniczne i nasz zespół u boku podczas negocjacji.",
  },
  sections: [
    {
      title: "Jak wygląda typowy wyjazd",
      body: "Przed wylotem ustalamy cele: jakie produkty, jaki budżet, ile fabryk chcesz odwiedzić. My przygotowujemy shortlistę zweryfikowanych producentów i harmonogram. Na miejscu towarzyszy Ci opiekun, który zna mandaryński i specyfikację techniczną.",
      bullets: [
        "Dzień 1–2: wizyty w fabrykach z shortlisty (2–4 producentów dziennie)",
        "Tłumaczenie techniczne podczas rozmów i inspekcji hali",
        "Wspólne podsumowanie wieczorne — porównanie ofert i rekomendacje",
        "Dzień 3+: opcjonalne negocjacje warunków i pobranie próbek",
      ],
    },
    {
      title: "Co jest w cenie organizacji",
      body: "Zapewniamy logistykę lokalną, tłumacza, kontakt z fabrykami i raport po wyjeździe. Lot i nocleg organizujesz samodzielnie lub przez naszego partnera travel — według preferencji.",
      bullets: [
        "Shortlist fabryk i potwierdzone terminy wizyt",
        "Transport lokalny między fabrykami",
        "Tłumacz techniczny na miejscu (PL/EN/CN)",
        "Raport porównawczy po powrocie",
      ],
    },
  ],
  cta: {
    primary: { label: "Umów konsultację", href: "/konsultacja" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
};
