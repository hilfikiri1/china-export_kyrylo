"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ProjectMedia } from "@/lib/portal/types";

function ImageViewer({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      {alt && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/60">
          {alt}
        </p>
      )}
    </div>
  );
}

export function MediaGallery({ media }: { media: ProjectMedia[] }) {
  const [lightbox, setLightbox] = useState<ProjectMedia | null>(null);

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  return (
    <>
      {images.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
            Zdjęcia
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {images.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.caption ?? "Otwórz zdjęcie"}
                onClick={() => setLightbox(item)}
                className="group relative aspect-video overflow-hidden rounded-lg border border-white/8 bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-light"
              >
                <Image
                  src={item.thumbnailUrl ?? item.url}
                  alt={item.caption ?? ""}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div className={images.length > 0 ? "mt-6" : ""}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
            Wideo
          </h3>
          <div className="space-y-3">
            {videos.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg">
                {item.url.startsWith("http") ? (
                  <video
                    src={item.url}
                    controls
                    preload="metadata"
                    className="w-full rounded-lg"
                    aria-label={item.caption ?? "Wideo"}
                  />
                ) : null}
                {item.caption && (
                  <p className="mt-1 text-xs text-white/40">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {lightbox && (
        <ImageViewer
          src={lightbox.url}
          alt={lightbox.caption ?? ""}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
