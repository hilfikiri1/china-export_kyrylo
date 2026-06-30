import type { DedicatedPageContent } from "./types";

export const spedycjaILogistykaPage: DedicatedPageContent = {
  id: "uslugi-spedycja-i-logistyka",
  meta: {
    title: "Spedycja i logistyka — Buy & Bring Solutions",
    description:
      "Spedycja i transport z Chin — fracht morski i lotniczy, konsolidacja ładunków, śledzenie i optymalizacja trasy.",
  },
  hero: {
    eyebrow: "Logistyka",
    title: "Spedycja i transport z Chin do Europy",
    lead: "Rezerwujemy fracht, optymalizujemy trasę i śledzimy ładunek w czasie rzeczywistym — morskim, lotniczym i multimodalnym.",
  },
  sections: [
    {
      title: "Tryby transportu",
      body: "Dobieramy tryb do pilności, wagi i budżetu. Dla większości ładunków B2B optymalny jest fracht morski FCL/LCL; lotniczy stosujemy przy próbkach i pilnych dostawach.",
      bullets: [
        "FCL — pełny kontener (20'/40'/40'HC)",
        "LCL — ładunek drobnica, konsolidacja w portcie",
        "Lotniczy — express i standard air freight",
        "Multimodal — morski + kolej + droga (Chiny–Europa)",
      ],
    },
    {
      title: "Co robimy po stronie logistycznej",
      body: "Od odbioru z fabryki po załadunek w porcie — koordynujemy cały łańcuch po stronie chińskiej, a po dotarciu do UE przejmujemy odprawę i last mile.",
      bullets: [
        "Odbiór z fabryki i transport do portu / lotniska",
        "Konsolidacja ładunków z wielu dostawców",
        "Rezerwacja frachtu i dokumentacja B/L / AWB",
        "Tracking ładunku i alerty o opóźnieniach",
      ],
    },
    {
      title: "Typowy czas tranzytu",
      body: "Czas transportu zależy od portu załadunku, sposobu przewozu (morski, lotniczy, kolejowy, drogowy), sezonu i przewoźnika. Dokładny termin ustalamy po znaniu wagi, objętości i adresów.",
    },
  ],
  cta: {
    primary: { label: "Wyceń transport", href: "/kalkulator" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
};
