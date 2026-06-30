"use client";

import { getTrustFactors } from "@/content/trust-factors";
import { useMessages } from "@/i18n/LocaleProvider";

export function PageTrustGrid() {
  const messages = useMessages();
  const trustFactors = getTrustFactors(messages);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustFactors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div
              key={factor.id}
              className="rounded-xl border border-white/10 bg-navy-light/50 p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">{factor.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
