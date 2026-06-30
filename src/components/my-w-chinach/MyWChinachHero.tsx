"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

type MyWChinachHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  headingId?: string;
  imageOverlayTitle: string;
  imageOverlayBody: string;
};

export function MyWChinachHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  headingId = "my-w-chinach-hero-heading",
  imageOverlayTitle,
  imageOverlayBody,
}: MyWChinachHeroProps) {
  const [imageError, setImageError] = useState(false);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-12 lg:pt-12"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-accent-light uppercase">
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="text-4xl leading-[0.95] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {lead}
          </p>
        </motion.div>

        <motion.div
          className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[24rem] lg:min-h-[28rem]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...headerTransition, delay: 0.1 }}
        >
          {!imageError ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-surface-deep"
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-accent-light uppercase">
              {imageOverlayTitle}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
              {imageOverlayBody}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
