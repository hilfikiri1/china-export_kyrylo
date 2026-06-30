import {
  Building2,
  FlaskConical,
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

export const trustFactors: TrustFactor[] = [
  {
    id: "local-china",
    icon: MapPin,
    label: "Działamy na miejscu w Chinach",
    description:
      "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
  },
  {
    id: "verification",
    icon: Building2,
    label: "Weryfikujemy producentów",
    description:
      "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
  },
  {
    id: "quality",
    icon: ShieldCheck,
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
    icon: FlaskConical,
    label: "Pełny proces lub wybrana usługa",
    description:
      "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
  },
];
