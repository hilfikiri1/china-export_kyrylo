import { regionalContactPerson } from "@/config/regional-contact";

export function RegionalContactCard() {
  if (!regionalContactPerson.name) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-navy-light p-6 text-white/80">
      <h2 className="text-lg font-semibold text-white">Kontakt regionalny</h2>
      <p className="mt-2 text-sm">{regionalContactPerson.name}</p>
      <p className="text-sm text-white/60">{regionalContactPerson.role}</p>
      <p className="mt-3 text-sm text-white/70">{regionalContactPerson.intro}</p>
    </section>
  );
}
