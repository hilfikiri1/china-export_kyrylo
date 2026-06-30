import type { DedicatedPageContent } from "./types";

export const oNasPage: DedicatedPageContent = {
  id: "o-nas",
  meta: {
    title: "O nas | Buy & Bring Solutions",
    description:
      "Buy & Bring Solutions — 17 lat doświadczenia we współpracy z Chinami. Sourcing, weryfikacja producentów, kontrola jakości i logistyka.",
  },
  hero: {
    eyebrow: "Kim jesteśmy",
    title: "Łączymy europejskie firmy z producentami w Chinach",
    lead: "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin. Łączymy bezpośrednią pracę z chińskimi fabrykami z obsługą klientów w Europie i Ukrainie.",
  },
  sections: [
    {
      title: "17 lat doświadczenia we współpracy z Chinami",
      body: "Naszym celem jest ograniczenie ryzyka, uporządkowanie komunikacji z producentem i przeprowadzenie klienta przez cały proces — od specyfikacji i wyboru fabryki po kontrolę, transport i dostawę. Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong.",
      bullets: [
        "Bezpośredni kontakt z producentami",
        "Wsparcie zespołu na miejscu w Chinach",
        "Komunikacja w kilku językach",
        "Możliwość kompleksowej lub modułowej współpracy",
        "Doświadczenie w maszynach, surowcach i produktach Private Label",
        "Kontrola projektu od zapytania do wysyłki",
      ],
    },
    {
      title: "Dlaczego firmy nam powierzają projekty",
      body: "Współprace zaczynają się zwykle od jednego modułu — np. wyszukania producenta lub pierwszej wysyłki próbnej. Gdy klient widzi, jak pracujemy, często powierza kolejne etapy. Oferujemy modułowy zakres bez konieczności zamawiania całego pakietu.",
      bullets: [
        "Modułowa współpraca bez sztywnego pakietu",
        "Weryfikacja producenta przed zamówieniem",
        "Pełna dokumentacja zgodna z wymogami importu",
      ],
    },
  ],
  highlights: [
    { label: "lat doświadczenia we współpracy z Chinami", value: "17" },
    { label: "obsłużonych klientów", value: "275+" },
    { label: "dostarczonych kontenerów", value: "110+" },
    { label: "operacje i wsparcie w Foshan", value: "Chiny" },
  ],
  cta: {
    primary: { label: "Działamy w Chinach", href: "/zespol-w-chinach" },
    secondary: { label: "Opisz projekt", href: "/kontakt" },
  },
};
