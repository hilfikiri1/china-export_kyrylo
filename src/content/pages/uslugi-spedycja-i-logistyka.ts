import type { DedicatedPageContent } from "./types";

export const spedycjaILogistykaPage: DedicatedPageContent = {
  id: "uslugi-spedycja-i-logistyka",
  meta: {
    title: "Transport, odprawa celna i dostawa",
    description:
      "Dobieramy sposób transportu, koordynujemy fracht, dokumentację, odprawę celną oraz dostawę końcową — morską, kolejową, lotniczą, drogową i multimodalną.",
  },
  hero: {
    eyebrow: "Logistyka",
    title: "Transport, odprawa celna i dostawa",
    lead: "Dobieramy sposób transportu, koordynujemy fracht i dokumentację oraz organizujemy odprawę celną i dostawę końcową — morską, kolejową, lotniczą, drogową i multimodalną.",
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
        "Aktualizacje statusu ładunku na każdym etapie",
      ],
    },
    {
      title: "Typowy czas tranzytu",
      body: "Morski FCL z Chin do Polski: zwykle 28–35 dni. Lotniczy: 5–8 dni. Dokładny czas zależy od portu załadunku, sezonu i wybranego przewoźnika.",
    },
  ],
  cta: {
    primary: { label: "Wyceń transport", href: "/kalkulator" },
    secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
  },
};
