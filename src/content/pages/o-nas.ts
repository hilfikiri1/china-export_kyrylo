import type { DedicatedPageContent } from "./types";

export const oNasPage: DedicatedPageContent = {
  id: "o-nas",
  meta: {
    title: "O nas — Buy & Bring Solutions",
    description:
      "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin.",
  },
  hero: {
    eyebrow: "O nas",
    title: "Łączymy europejskie firmy z producentami w Chinach",
    lead:
      "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin. Łączymy bezpośrednią pracę z chińskimi fabrykami z obsługą klientów w Europie i Ukrainie.",
  },
  sections: [
    {
      title: "Nasza misja",
      body:
        "Naszym celem jest ograniczenie ryzyka, uporządkowanie komunikacji z producentem i przeprowadzenie klienta przez cały proces — od specyfikacji i wyboru fabryki po kontrolę, transport i dostawę.",
      bullets: [
        "bezpośredni kontakt z producentami",
        "wsparcie zespołu na miejscu w Chinach",
        "komunikacja w kilku językach",
      ],
    },
    {
      title: "Doświadczenie i obecność operacyjna",
      body:
        "Zespół Buy & Bring Solutions posiada 17 lat doświadczenia we współpracy z Chinami. Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
      bullets: [
        "możliwość kompleksowej lub modułowej współpracy",
        "doświadczenie w maszynach, surowcach i produktach Private Label",
        "kontrola projektu od zapytania do wysyłki",
      ],
    },
  ],
  highlights: [
    { label: "Doświadczenia we współpracy z Chinami", value: "17 lat" },
    { label: "Obsłużonych klientów", value: "275+" },
    { label: "Dostarczonych kontenerów", value: "110+" },
  ],
  cta: {
    primary: { label: "Zobacz, jak działamy w Chinach", href: "/zespol-w-chinach" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
