import type { AboutPlContent } from "@/content/i18n/about-page-pl";

type ONasPlIntroProps = {
  intro: AboutPlContent["intro"];
  pillars: AboutPlContent["pillars"];
};

export function ONasPlIntro({ intro, pillars }: ONasPlIntroProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {intro.titleBefore}
            <span className="text-accent-light">{intro.titleHighlight}</span>
            {intro.titleAfter}
          </h2>
          <p className="mt-4 text-lg font-medium text-slate-700">{intro.subtitle}</p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">{intro.body}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
