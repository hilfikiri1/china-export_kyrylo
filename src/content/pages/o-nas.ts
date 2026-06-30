import type { DedicatedPageContent } from "./types";

export const oNasPage: DedicatedPageContent = {
  id: "o-nas",
  meta: {
    title: "O nas — Buy & Bring Solutions",
    description:
      "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin.",
  },
  hero: {
    eyebrow: "Kim jesteśmy",
    title: "Łączymy europejskie firmy z producentami w Chinach",
    lead: "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin. Łączymy bezpośrednią pracę z chińskimi fabrykami z obsługą klientów w Europie i Ukrainie.",
  },
  sections: [
    {
      title: "Jak pracujemy",
      body: "Naszym celem jest ograniczenie ryzyka, uporządkowanie komunikacji z producentem i przeprowadzenie klienta przez cały proces — od specyfikacji i wyboru fabryki po kontrolę, transport i dostawę.",
      bullets: [
        "Bezpośredni kontakt z producentami",
        "Wsparcie zespołu na miejscu w Chinach",
        "Komunikacja w kilku językach",
      ],
    },
    {
      title: "Nasze doświadczenie i zakres",
      body: "Zespół Buy & Bring Solutions posiada 17 lat doświadczenia we współpracy z Chinami. Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
      bullets: [
        "Możliwość kompleksowej lub modułowej współpracy",
        "Doświadczenie w maszynach, surowcach i produktach Private Label",
        "Kontrola projektu od zapytania do wysyłki",
      ],
    },
  ],
  highlights: [
    { label: "lat doświadczenia we współpracy z Chinami", value: "17" },
    { label: "obsłużonych klientów", value: "275+" },
    { label: "dostarczonych kontenerów", value: "110+" },
    { label: "operacje i wsparcie na miejscu w Chinach", value: "Foshan" },
  ],
  cta: {
    primary: { label: "Działamy na miejscu w Chinach", href: "/dzialamy-w-chinach" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
