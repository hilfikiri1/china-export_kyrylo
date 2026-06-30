import { procesPage } from "@/content/pages/proces";
import { statistics } from "@/content/statistics";

export type ProcesStepIcon =
  | "file-text"
  | "search"
  | "clipboard-list"
  | "shield-check"
  | "truck";

export type ProcesStepTheme = {
  accent: string;
  glow: string;
  glowBorder: string;
};

export type ProcesStep = {
  num: string;
  icon: ProcesStepIcon;
  theme: ProcesStepTheme;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
};

export type ProcesStat = {
  value: string;
  label: string;
};

export const procesLayout = {
  hero: {
    eyebrow: procesPage.hero.eyebrow,
    titleLead: "Import z Chin",
    titleAccent: "krok po kroku",
    lead: procesPage.hero.lead,
    stats: [
      { value: `${statistics.experience.value}+`, label: "lat doświadczenia" },
      { value: statistics.clients.value, label: "obsłużonych klientów" },
      { value: statistics.containers.value, label: "dostarczonych kontenerów" },
    ] satisfies ProcesStat[],
  },
  steps: [
    {
      num: "01",
      icon: "file-text",
      theme: {
        accent: "#dbaa47",
        glow: "rgba(219,170,71,0.12)",
        glowBorder: "rgba(219,170,71,0.28)",
      },
      title: "Brief i wycena",
      tagline: "Od pomysłu do oferty w 48 godzin",
      body: "Opisujesz produkt, a my przygotowujemy szczegółową wycenę z analizą chińskiego rynku dostawców. Żadnych ukrytych kosztów, żadnych zobowiązań.",
      bullets: [
        "Darmowa konsultacja i analiza produktu",
        "Porównanie 3–5 zweryfikowanych fabryk",
        "Pełna kalkulacja z logistyką i cłami",
      ],
    },
    {
      num: "02",
      icon: "search",
      theme: {
        accent: "#4ade80",
        glow: "rgba(74,222,128,0.12)",
        glowBorder: "rgba(74,222,128,0.28)",
      },
      title: "Weryfikacja dostawców",
      tagline: "Transparentność na każdym etapie",
      body: "Każdy dostawca przechodzi wieloetapową weryfikację — od sprawdzenia rejestracji firmy po fizyczny audyt zakładu produkcyjnego.",
      bullets: [
        "Audyt fabryki z dokumentacją fotograficzną",
        "Weryfikacja historii eksportu i referencji",
        "Negocjacje warunków i zabezpieczenie kontraktu",
      ],
    },
    {
      num: "03",
      icon: "clipboard-list",
      theme: {
        accent: "#60a5fa",
        glow: "rgba(96,165,250,0.12)",
        glowBorder: "rgba(96,165,250,0.28)",
      },
      title: "Zamówienie i produkcja",
      tagline: "Nadzór przez cały cykl wytwarzania",
      body: "Składamy zamówienie i monitorujemy każdy etap produkcji. Cotygodniowe raporty ze zdjęciami bezpośrednio z fabryki — zawsze wiesz, co się dzieje.",
      bullets: [
        "Stały kontakt z fabryką w Twoim imieniu",
        "Cotygodniowe raporty postępu ze zdjęciami",
        "Zarządzanie próbkami i zatwierdzeniami",
      ],
    },
    {
      num: "04",
      icon: "shield-check",
      theme: {
        accent: "#a78bfa",
        glow: "rgba(167,139,250,0.12)",
        glowBorder: "rgba(167,139,250,0.28)",
      },
      title: "Kontrola jakości",
      tagline: "Zero kompromisów przed wysyłką",
      body: "Przed wysyłką każda partia przechodzi rygorystyczną inspekcję przez naszych inspektorów na miejscu w Chinach. Nic nie jedzie bez Twojej zgody.",
      bullets: [
        "Inspekcja 100% lub próbkowanie statystyczne",
        "Szczegółowy raport z pomiarami i zdjęciami",
        "Prawo weta — Ty decydujesz o każdej wysyłce",
      ],
    },
    {
      num: "05",
      icon: "truck",
      theme: {
        accent: "#22d3ee",
        glow: "rgba(34,211,238,0.12)",
        glowBorder: "rgba(34,211,238,0.28)",
      },
      title: "Transport i odprawa celna",
      tagline: "Towar prosto do Twojego magazynu",
      body: "Organizujemy transport morski lub lotniczy, obsługujemy pełną odprawę celną i dowozimy towar bezpośrednio pod wskazany adres.",
      bullets: [
        "Transport morski LCL/FCL lub lotniczy",
        "Pełna obsługa celna i dokumentacja importowa",
        "Śledzenie przesyłki w czasie rzeczywistym",
      ],
    },
  ] satisfies ProcesStep[],
  cta: {
    eyebrow: "Gotowy na swój pierwszy import?",
    title: "Zacznij bez ryzyka",
    body: "Pierwsza konsultacja i wycena są bezpłatne. Zero zobowiązań.",
    ...procesPage.cta,
  },
} as const;

export { procesPage };
