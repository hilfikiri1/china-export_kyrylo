import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type ONasCtaBandProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function ONasCtaBand({
  eyebrow,
  title,
  body,
  image,
  primary,
  secondary,
}: ONasCtaBandProps) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/80"
        aria-hidden
      />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-light" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent-light" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-light">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-4 max-w-md leading-relaxed text-white/65">{body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center gap-3 bg-accent-light px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {primary.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-accent-light/50 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
