import { CheckCircle2 } from "lucide-react";
import type { LocalizedCaseStudy } from "@/lib/cases/types";
import { ZoomableCaseImage } from "./ZoomableCaseImage";

type Labels = {
  challenge: string;
  requirements: string;
  scope: string;
  products: string;
  result: string;
  photos: string;
};

type Props = {
  caseStudy: LocalizedCaseStudy;
  labels: Labels;
  previewBanner?: string;
};

export function CaseStudyArticle({ caseStudy: cs, labels, previewBanner }: Props) {
  const gallery = cs.gallery.filter((image) => image.src !== cs.coverImage);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
      {previewBanner && (
        <div className="mb-6 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          {previewBanner}
        </div>
      )}

      <div className="mb-8">
        <span className="mb-3 inline-block rounded-full border border-accent-light/30 bg-accent-light/10 px-3 py-1 text-xs font-medium text-accent-light">
          {cs.category}
        </span>
        <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{cs.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-white/60">{cs.summary}</p>
      </div>

      {cs.coverImage && (
        <ZoomableCaseImage
          src={cs.coverImage}
          alt={cs.title}
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="relative mb-8 aspect-video w-full rounded-2xl border border-white/10 bg-white/5"
        />
      )}

      {cs.challenge && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">{labels.challenge}</h2>
          <p className="text-sm leading-relaxed text-white/70">{cs.challenge}</p>
        </section>
      )}

      {cs.requirements && cs.requirements.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">{labels.requirements}</h2>
          <ul className="space-y-2">
            {cs.requirements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs.scope.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">{labels.scope}</h2>
          <ul className="space-y-2">
            {cs.scope.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs.products && cs.products.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">{labels.products}</h2>
          <ul className="space-y-2">
            {cs.products.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8 rounded-2xl border border-accent-light/20 bg-accent-light/5 p-5 sm:p-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-light/60">{labels.result}</h2>
        <p className="text-sm leading-relaxed text-white/80">{cs.result}</p>
      </section>

      {gallery.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">{labels.photos}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((img, index) => (
              <ZoomableCaseImage
                key={`${img.src}-${index}`}
                src={img.src}
                alt={img.alt}
                sizes="(max-width: 640px) 50vw, 33vw"
                className="relative aspect-video rounded-xl border border-white/8 bg-white/5"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
