import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type DedicatedPageShellProps = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumbAriaLabel?: string;
};

export function DedicatedPageShell({
  children,
  breadcrumbs,
  breadcrumbAriaLabel = "Breadcrumb",
}: DedicatedPageShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <LogisticsBackdrop variant="formPage" />
      <div className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label={breadcrumbAriaLabel}
            className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
          >
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/50">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-1"
                  >
                    {index > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/30" />
                    )}
                    {isLast || !item.href ? (
                      <span className="text-white/70">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="hover:text-white">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {children}
      </div>
    </div>
  );
}
