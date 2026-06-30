import type { DedicatedPageContent } from "./types";

export const oNasPage: DedicatedPageContent = {
  id: "o-nas",
  meta: {
    title: "O nas — Buy & Bring Solutions",
    description:
      "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin do Polski, Ukrainy i Europy.",
  },
  hero: {
    eyebrow: "Kim jesteśmy",
    title: "Most między rynkiem chińskim a Twoją firmą w Europie",
    lead: "17 lat doświadczenia we współpracy z Chinami. Nie jesteśmy pośrednikiem z katalogu — jesteśmy operatorem, który bierze odpowiedzialność za każdy etap.",
  },
  sections: [
    {
      title: "Europa i Chiny — jeden zespół",
      body: "Obsługujemy klientów w Polsce, Ukrainie i innych krajach europejskich. Operacje w Chinach koordynujemy z Foshan — sourcing, audyty, kontrola jakości i eksport. Dzięki temu nie polegamy na przypadkowych agentach — mamy własną obecność na miejscu.",
      bullets: [
        "Obsługa klientów w Polsce, Ukrainie i Europie",
        "Operacje w Foshan, prowincja Guangdong",
        "Komunikacja w języku polskim, angielskim i mandaryńskim",
      ],
    },
    {
      title: "Dlaczego klienci zostają z nami",
      body: "Większość współprac zaczyna się od jednego modułu — np. audytu fabryki lub pierwszej wysyłki próbnej. Gdy widzą, jak pracujemy, powierzają kolejne etapy. Nie wiążemy umową długoterminową — zostajesz, bo proces działa.",
      bullets: [
        "Modułowa współpraca bez sztywnego pakietu",
        "Weryfikacja dostawcy przed płatnością",
        "Pełna dokumentacja zgodna z wymogami UE",
      ],
    },
  ],
  highlights: [
    { label: "Lat doświadczenia", value: "17+" },
    { label: "Obsłużonych klientów", value: "275+" },
    { label: "Dostarczonych kontenerów", value: "110+" },
    { label: "Baza w Chinach", value: "Foshan" },
  ],
  cta: {
    primary: { label: "Poznaj nasz zespół w Chinach", href: "/zespol-w-chinach" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
};
