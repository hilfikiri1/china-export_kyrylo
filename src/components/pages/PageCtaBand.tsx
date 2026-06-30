import { Link } from "@/i18n/navigation";

const goldCtaClassName =
  "inline-flex justify-center rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47]";

const mutedCtaClassName =
  "inline-flex justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";

type PageCtaBandProps = {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function PageCtaBand({ primary, secondary }: PageCtaBandProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={primary.href} className={goldCtaClassName}>
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className={
              secondary.label === "Umów konsultację"
                ? goldCtaClassName
                : mutedCtaClassName
            }
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
