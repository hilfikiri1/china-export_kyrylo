import { caseStudies, caseStudyCategories } from "@/content/case-studies";
import { companyStatValues } from "@/config/company";

export type RealizacjeTeaserContent = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: { value: string; label: string }[];
  bullets: string[];
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
};

export const realizacjeTeaser: RealizacjeTeaserContent = {
  eyebrow: "Realizacje",
  title: "Wybrane realizacje — od Private Label po maszyny przemysłowe",
  lead: "Realizujemy projekty B2B w wielu obszarach. Ze względu na poufność pokazujemy zakres, proces i rezultaty, bez danych klientów.",
  highlights: [
    { value: String(caseStudies.length), label: "Wybranych realizacji" },
    { value: String(caseStudyCategories.length), label: "Obszarów współpracy" },
    { value: `${companyStatValues.experience} lat`, label: "Doświadczenia z Chinami" },
  ],
  bullets: [
    "Private Label — produkcja pod marką własną klienta",
    "Technologie akumulatorowe — pakiety i systemy BMS",
    "Logistyka i konsolidacja — wysyłki od wielu producentów",
    "Maszyny przemysłowe — dobór, weryfikacja i dostawa",
    "Sourcing w Chinach — wyszukiwanie producentów i targi",
  ],
  image: "/image/plane_shipment.jpg",
  imageAlt: "Kontenery cargo — logistyka i realizacje importu z Chin",
  cta: {
    label: "Zobacz realizacje",
    href: "/realizacje",
  },
};
