import Link from "next/link";
import { HeroTooltip } from "@/components/hero/HeroTooltip";
import { useCurrentLocale } from "@/i18n/use-current-locale";
import { prefixPathWithLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HeroButtonVariant = "primary" | "secondary" | "tertiary";

const variants: Record<HeroButtonVariant, string> = {
  primary:
    "bg-accent-light hover:bg-[#dbaa47] text-white shadow-lg shadow-accent-light/25 border border-accent-light/20",
  secondary:
    "bg-white/10 hover:bg-white/15 text-white border border-white/30 backdrop-blur-sm",
  tertiary:
    "bg-transparent hover:bg-white/5 text-white/80 hover:text-white border border-transparent underline-offset-4 hover:underline",
};

function HeroButton({
  variant,
  href,
  children,
  className,
}: {
  variant: HeroButtonVariant;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function HeroCTAs({ className }: { className?: string }) {
  const locale = useCurrentLocale();

  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-4", className)}>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        <HeroButton
          variant="primary"
          href={prefixPathWithLocale("/kontakt", locale)}
          className="sm:min-w-[180px]"
        >
          Opisz swój projekt
        </HeroButton>
        <HeroButton
          variant="secondary"
          href={prefixPathWithLocale("/kalkulator", locale)}
          className="sm:min-w-[180px]"
        >
          Oblicz orientacyjny koszt importu
        </HeroButton>
        <HeroButton
          variant="primary"
          href={prefixPathWithLocale("/konsultacja", locale)}
          className="sm:min-w-[180px]"
        >
          Umów konsultację
        </HeroButton>
      </div>
      <HeroTooltip
        text="Powierz nam cały proces albo wybierz jeden etap."
        className="justify-center"
      />
    </div>
  );
}
