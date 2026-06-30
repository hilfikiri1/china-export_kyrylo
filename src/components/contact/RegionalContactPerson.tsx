import Image from "next/image";
import { regionalContactPersons } from "@/config/contacts";
import type { Locale } from "@/i18n/config";

type RegionalContactPersonProps = {
  locale: Locale;
  region?: string;
};

export function RegionalContactPerson({
  locale,
  region,
}: RegionalContactPersonProps) {
  const persons = regionalContactPersons.filter(
    (p) =>
      p.name &&
      p.photo &&
      (!region || p.region[locale].toLowerCase().includes(region.toLowerCase())),
  );

  if (persons.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {persons.map((person) => (
        <article
          key={person.name}
          className="flex gap-4 rounded-2xl border border-white/10 bg-navy-light p-6"
        >
          <Image
            src={person.photo}
            alt={person.name}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-white">{person.name}</h3>
            <p className="text-sm text-accent-light">{person.role[locale]}</p>
            <p className="mt-2 text-sm text-white/60">{person.introduction[locale]}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a
                href={`tel:${person.phone}`}
                className="text-white/80 hover:text-white"
              >
                {person.phone}
              </a>
              {person.whatsapp && (
                <a
                  href={person.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-light hover:underline"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
