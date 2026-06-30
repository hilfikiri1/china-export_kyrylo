"use client";

import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { contactPeople, type ContactPerson } from "@/config/team";

/**
 * Renders a verified regional contact person. Returns null when no person is
 * configured, so the UI never shows placeholder/invented people.
 */
export function RegionalContactPerson({ person }: { person?: ContactPerson }) {
  const resolved = person ?? contactPeople[0];
  if (!resolved || !resolved.name) return null;

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-navy-light/50 p-5">
      {resolved.photo && (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10">
          <Image src={resolved.photo} alt={resolved.name} fill className="object-cover" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{resolved.name}</p>
        {resolved.role && <p className="text-xs text-white/55">{resolved.role}</p>}
        {resolved.intro && (
          <p className="mt-2 text-sm leading-relaxed text-white/65">{resolved.intro}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          {resolved.phone && (
            <a href={`tel:${resolved.phone}`} className="flex items-center gap-1.5 text-accent-light hover:underline">
              <Phone className="h-3.5 w-3.5" aria-hidden /> {resolved.phone}
            </a>
          )}
          {resolved.whatsapp && (
            <a href={resolved.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent-light hover:underline">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp
            </a>
          )}
          {resolved.email && (
            <a href={`mailto:${resolved.email}`} className="flex items-center gap-1.5 text-accent-light hover:underline">
              <Mail className="h-3.5 w-3.5" aria-hidden /> {resolved.email}
            </a>
          )}
        </div>
        {resolved.languages && resolved.languages.length > 0 && (
          <p className="mt-2 text-xs text-white/45">{resolved.languages.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}
