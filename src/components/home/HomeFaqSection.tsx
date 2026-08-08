"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getHomeFaq } from "@/content/i18n/home-sections";
import { useLocale, useMessages } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const deliveryAnswers: Record<Locale, string> = {
  pl: "Orientacyjnie, licząc od odbioru gotowego towaru z fabryki: transport lotniczy 5–12 dni, drogowy 14–24 dni, kolejowy 18–30 dni, a morski 45–75 dni. To nie obejmuje czasu produkcji. Termin zależy od trasy, rodzaju ładunku, Incoterm, sezonu i odprawy celnej — przed zamówieniem podajemy kalkulację dla konkretnej trasy.",
  en: "As a guideline, counted from collection of finished goods at the factory: air freight 5–12 days, road 14–24 days, rail 18–30 days and sea freight 45–75 days. Production time is not included. The actual lead time depends on the route, cargo, Incoterm, season and customs clearance; we confirm the timeline for the specific route before the order.",
  uk: "Орієнтовно, від моменту забору готового товару з фабрики: авіа 5–12 днів, автотранспорт 14–24 дні, залізниця 18–30 днів, море 45–75 днів. Час виробництва сюди не входить. Строк залежить від маршруту, типу вантажу, Incoterm, сезону та митного оформлення — перед замовленням ми надаємо розрахунок для конкретного маршруту.",
  ru: "Ориентировочно, с момента забора готового товара с фабрики: авиа 5–12 дней, автотранспорт 14–24 дня, железная дорога 18–30 дней, море 45–75 дней. Время производства сюда не входит. Срок зависит от маршрута, типа груза, Incoterm, сезона и таможенного оформления — до заказа мы даём расчёт по конкретному маршруту.",
  de: "Als Richtwert ab Abholung der fertigen Ware im Werk: Luftfracht 5–12 Tage, Straße 14–24 Tage, Bahn 18–30 Tage und Seefracht 45–75 Tage. Die Produktionszeit ist nicht enthalten. Die tatsächliche Laufzeit hängt von Route, Ladung, Incoterm, Saison und Zollabfertigung ab; vor der Bestellung bestätigen wir den Zeitplan für die konkrete Route.",
  zh: "参考时效（从工厂提取已完成货物开始计算）：空运约5–12天，公路约14–24天，铁路约18–30天，海运约45–75天，不含生产时间。实际时效取决于路线、货物类型、Incoterm、旺季情况及清关；下单前我们会按具体路线确认预计时间。",
};

export function HomeFaqSection() {
  const messages = useMessages();
  const { locale } = useLocale();
  const content = getHomeFaq(messages);
  const [openId, setOpenId] = useState<string | null>(content.items[0]?.id ?? null);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={content.ariaLabel}
    >
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {content.eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{content.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{content.lead}</p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openId === item.id;
            const answer = item.id === "delivery" ? deliveryAnswers[locale] : item.answer;
            return (
              <motion.div
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...headerTransition, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-accent-light transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-5 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-white/65">{answer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
