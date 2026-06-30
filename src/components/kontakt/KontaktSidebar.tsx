"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import type { KontaktChannel } from "@/content/kontakt-layout";
import { kontaktLayout } from "@/content/kontakt-layout";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

function ContactChannelCard({ channel }: { channel: KontaktChannel }) {
  const Icon = channel.id.startsWith("phone") ? Phone : Mail;
  const inner = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-white/45">
          {channel.label}
        </p>
        <p className="mt-1 text-sm font-medium text-white">{channel.value}</p>
      </div>
    </>
  );

  if (channel.href) {
    return (
      <a
        href={channel.href}
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-navy-light/50 p-4 transition-colors hover:border-white/20 hover:bg-navy-light/80"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-navy-light/50 p-4">
      {inner}
    </div>
  );
}

export function KontaktSidebar() {
  const { hero, guidance, highlights, channels, consultationLink } =
    kontaktLayout;
  const locale = useLocale();
  const t = useT();

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
          {hero.eyebrow}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          {hero.lead}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">{guidance.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          {guidance.body}
        </p>
        <ul className="mt-5 space-y-3">
          {guidance.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light"
                aria-hidden
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-navy-light/50 px-3 py-4 text-center sm:px-4"
          >
            <p className="text-lg font-bold text-accent-light sm:text-xl">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-white/50 sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {channels.map((channel) => (
          <ContactChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-navy-light/30 p-5">
        <p className="text-sm font-medium text-white">{consultationLink.label}</p>
        <p className="mt-1 text-sm text-white/55">{consultationLink.hint}</p>
        <Link
          href={localeHref(locale, consultationLink.href)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-light transition-colors hover:text-[#dbaa47]"
        >
          {t("cta.bookConsultation")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
