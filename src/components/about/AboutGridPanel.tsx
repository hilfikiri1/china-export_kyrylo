"use client";

import { useState } from "react";
import Image from "next/image";
import type { AboutGridPanel as AboutGridPanelData } from "@/content/about-grid";
import { cn } from "@/lib/utils";

type AboutGridPanelProps = {
  panel: AboutGridPanelData;
  className?: string;
  variant?: "hero" | "card";
};

export function AboutGridPanel({
  panel,
  className,
  variant = "card",
}: AboutGridPanelProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      id={panel.id}
      className={cn(
        "dark-surface relative overflow-hidden bg-navy",
        variant === "hero"
          ? "min-h-[17.5rem] md:min-h-[20rem]"
          : "min-h-[15rem] md:min-h-[17.5rem]",
        className,
      )}
    >
      {!imageError ? (
        <Image
          src={panel.image}
          alt={panel.imageAlt}
          fill
          sizes={
            variant === "hero"
              ? "(max-width: 1280px) 100vw, 1280px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-surface-deep"
          aria-hidden
        />
      )}

      <div className="about-grid-scrim absolute inset-0" aria-hidden />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-8">
        <h3 className="track-text max-w-lg text-xl font-bold text-gray-100 sm:text-2xl lg:text-3xl">
          {panel.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-200/90 sm:text-base">
          {panel.description}
        </p>
      </div>
    </article>
  );
}
