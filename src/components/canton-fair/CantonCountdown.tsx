"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { cantonFairPhases } from "@/content/canton-fair";

type CountdownSnapshot = {
  phaseNumber: number | null;
  mode: "before" | "active" | "finished";
  targetIso: string | null;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function splitRemaining(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

function getSnapshot(now: number): CountdownSnapshot {
  const activePhase = cantonFairPhases.find((phase) => {
    const start = Date.parse(phase.startIso);
    const end = Date.parse(phase.endIso);
    return now >= start && now < end;
  });

  if (activePhase) {
    return {
      phaseNumber: activePhase.number,
      mode: "active",
      targetIso: activePhase.endIso,
      ...splitRemaining(Date.parse(activePhase.endIso) - now),
    };
  }

  const nextPhase = cantonFairPhases.find((phase) => now < Date.parse(phase.startIso));

  if (nextPhase) {
    return {
      phaseNumber: nextPhase.number,
      mode: "before",
      targetIso: nextPhase.startIso,
      ...splitRemaining(Date.parse(nextPhase.startIso) - now),
    };
  }

  return {
    phaseNumber: null,
    mode: "finished",
    targetIso: null,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function getStatus(snapshot: CountdownSnapshot | null) {
  if (!snapshot) {
    return {
      eyebrow: "Odliczamy do 140. Canton Fair",
      title: "15 października 2026",
    };
  }

  if (snapshot.mode === "finished") {
    return {
      eyebrow: "140. Canton Fair zakończona",
      title: "Zapytaj nas o kolejną edycję",
    };
  }

  if (snapshot.mode === "active") {
    return {
      eyebrow: `Faza ${snapshot.phaseNumber} trwa teraz`,
      title: `Do zakończenia fazy ${snapshot.phaseNumber}`,
    };
  }

  return {
    eyebrow:
      snapshot.phaseNumber === 1
        ? "Do otwarcia 140. Canton Fair"
        : `Do rozpoczęcia fazy ${snapshot.phaseNumber}`,
    title:
      snapshot.phaseNumber === 1
        ? "15 października 2026 · Guangzhou"
        : `Następna: faza ${snapshot.phaseNumber}`,
  };
}

export function CantonCountdown() {
  const [snapshot, setSnapshot] = useState<CountdownSnapshot | null>(null);

  useEffect(() => {
    const update = () => setSnapshot(getSnapshot(Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const status = getStatus(snapshot);

  const values = snapshot ?? {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const timerLabel = snapshot
    ? `${values.days} dni, ${values.hours} godzin, ${values.minutes} minut i ${values.seconds} sekund`
    : "Ładowanie odliczania";

  return (
    <section
      aria-labelledby="canton-countdown-heading"
      className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-accent-light/25 bg-[linear-gradient(145deg,rgba(200,146,42,0.10),rgba(255,255,255,0.025)_45%,rgba(185,28,28,0.08))] px-5 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-28 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-light/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-red-500/10 blur-3xl"
      />

      <div className="relative z-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-accent-light/20 bg-accent-light/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
          {status.eyebrow}
        </p>
        <h2
          id="canton-countdown-heading"
          className="mt-4 text-xl font-bold text-white sm:text-2xl"
        >
          {status.title}
        </h2>

        <div
          role="timer"
          aria-live="off"
          aria-label={timerLabel}
          className="mt-7 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-9"
        >
          <div className="relative flex h-52 w-52 shrink-0 items-center justify-center rounded-full border border-accent-light/35 bg-[radial-gradient(circle_at_center,rgba(200,146,42,0.13),rgba(255,255,255,0.02)_58%,transparent_60%)] shadow-[0_0_70px_rgba(200,146,42,0.14)] sm:h-60 sm:w-60">
            <div
              aria-hidden="true"
              className="absolute inset-2 rounded-full border border-dashed border-accent-light/30 motion-safe:animate-[spin_36s_linear_infinite]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-5 rounded-full border border-white/10"
            />
            <div className="relative">
              <span className="block text-6xl font-bold tabular-nums tracking-tight text-white sm:text-7xl">
                {snapshot ? values.days : "—"}
              </span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                dni
              </span>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-3 gap-2.5 sm:gap-3">
            {[
              [snapshot ? pad(values.hours) : "—", "godzin"],
              [snapshot ? pad(values.minutes) : "—", "minut"],
              [snapshot ? pad(values.seconds) : "—", "sekund"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-2 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5"
              >
                <span className="block text-2xl font-bold tabular-nums text-white sm:text-3xl">
                  {value}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white/55">
          Najlepsze spotkania z wystawcami i wizyty w fabrykach planuje się przed
          wylotem. Im bliżej targów, tym mniej dogodnych terminów zostaje.
        </p>
      </div>
    </section>
  );
}
