import { company } from "@/config/company";
import { cn } from "@/lib/utils";

/**
 * Brand lockup for Buy & Bring Solutions.
 *
 * TODO (owner): drop the official Buy & Bring Solutions logo SVG/PNG into
 * /public/brand/ and swap this typographic lockup for an <Image>. See
 * CONTENT_EDITING_GUIDE.md.
 */
export function BrandLogo({
  className,
  showName = true,
  tone = "light",
}: {
  className?: string;
  showName?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-accent-light px-1.5 text-[11px] font-bold leading-none text-navy"
      >
        {company.logoMark}
      </span>
      {showName && (
        <span
          className={cn(
            "hidden text-sm font-semibold sm:block",
            tone === "light" ? "text-white" : "text-navy",
          )}
        >
          {company.name}
        </span>
      )}
    </span>
  );
}
