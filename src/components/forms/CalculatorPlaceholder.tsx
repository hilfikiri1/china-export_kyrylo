import { Link } from "@/i18n/navigation";
import { Calculator } from "lucide-react";

export function CalculatorPlaceholder() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-navy-light p-8 sm:p-12">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Calculator className="h-7 w-7" />
        </div>

        <div className="rounded-xl border border-dashed border-white/20 p-6 text-center text-sm text-white/40">
          Formularz kalkulatora pojawi się tutaj
        </div>

        <Link
          href="/kontakt"
          className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light"
        >
          Wyślij zapytanie o wycenę
        </Link>
      </div>
    </div>
  );
}
