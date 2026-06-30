import {
  Eye,
  Layers,
  MapPin,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type TrustFactor = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

/**
 * Trust cards (Polish master). Translations live in i18n messages under
 * "trust.cards". Avoid absolute promises ("zero ryzyka", "gwarantowana jakość").
 */
export const trustFactors: TrustFactor[] = [
  {
    id: "local-operations",
    icon: MapPin,
    label: "Działamy na miejscu w Chinach",
    description:
      "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
  },
  {
    id: "verification",
    icon: ShieldCheck,
    label: "Weryfikujemy producentów",
    description:
      "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
  },
  {
    id: "quality",
    icon: Eye,
    label: "Kontrolujemy towar przed wysyłką",
    description:
      "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką.",
  },
  {
    id: "logistics",
    icon: Truck,
    label: "Organizujemy dostawę od fabryki do magazynu",
    description:
      "Koordynujemy eksport, transport morski, kolejowy, lotniczy lub drogowy, odprawę celną i dostawę końcową.",
  },
  {
    id: "flexible",
    icon: Layers,
    label: "Pełny proces lub wybrana usługa",
    description:
      "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
  },
];
