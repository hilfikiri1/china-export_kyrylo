"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  gallery?: GalleryItem[];
  initialIndex?: number;
};

export function ZoomableCaseImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  imageClassName = "object-cover",
  gallery,
  initialIndex = 0,
}: Props) {
  const items = gallery?.length ? gallery : [{ src, alt }];
  const safeInitialIndex = Math.min(Math.max(initialIndex, 0), items.length - 1);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(safeInitialIndex);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + items.length) % items.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % items.length);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (items.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + items.length) % items.length);
      }
      if (items.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % items.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, items.length]);

  const active = items[activeIndex] ?? items[0] ?? { src, alt };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setActiveIndex(safeInitialIndex);
          setOpen(true);
        }}
        className={`group relative block cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${className}`}
        aria-label={`Powiększ zdjęcie: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`${imageClassName} transition-transform duration-300 group-hover:scale-[1.02]`}
          sizes={sizes}
          priority={priority}
        />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-4 w-4" aria-hidden />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Powiększone zdjęcie: ${active.alt}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
            aria-label="Zamknij podgląd zdjęcia"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light sm:left-6"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light sm:right-6"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
              <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                {activeIndex + 1} / {items.length}
              </div>
            </>
          )}

          <div className="relative h-[88vh] w-[96vw] max-w-7xl">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
              sizes="96vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
