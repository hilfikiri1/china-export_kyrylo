import { ExternalLink, MapPin, Package2, Truck } from "lucide-react";
import type { ProjectDelivery } from "@/lib/portal/types";
import { CopyButton } from "./CopyButton";

function isSafeUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const p = new URL(url);
    return p.protocol === "https:" || p.protocol === "http:";
  } catch {
    return false;
  }
}

function Row({
  icon: Icon,
  label,
  value,
  copyable,
  link,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  copyable?: boolean;
  link?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 text-white/30">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/40">{label}</p>
        <div className="mt-0.5 flex items-center gap-1">
          <p className="min-w-0 break-all text-sm font-medium text-white">
            {value}
          </p>
          {copyable && <CopyButton value={value} label={`Kopiuj ${label}`} />}
          {isSafeUrl(link) && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Śledź przesyłkę: ${value}`}
              className="ml-1 shrink-0 text-accent-light/60 hover:text-accent-light"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function DeliveryCard({ delivery }: { delivery: ProjectDelivery }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40">
        Dostawa
      </h3>

      <div className="space-y-4">
        <Row icon={Truck} label="Metoda transportu" value={delivery.method} />

        <Row
          icon={MapPin}
          label="Kraj i adres docelowy"
          value={[delivery.destinationCountry, delivery.destinationAddress]
            .filter(Boolean)
            .join(", ")}
        />

        {delivery.containerNumber && (
          <Row
            icon={Package2}
            label="Numer kontenera"
            value={delivery.containerNumber}
            copyable
          />
        )}

        {delivery.trackingNumber && (
          <Row
            icon={Package2}
            label="Numer śledzenia"
            value={delivery.trackingNumber}
            copyable
            link={delivery.trackingUrl}
          />
        )}

        {delivery.estimatedArrival && (
          <div className="mt-3 rounded-lg border border-accent-light/10 bg-accent-light/5 px-4 py-2.5">
            <p className="text-xs text-accent-light/60">
              Szacowana data dostawy
            </p>
            <p className="mt-0.5 font-semibold text-accent-light">
              {delivery.estimatedArrival}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
