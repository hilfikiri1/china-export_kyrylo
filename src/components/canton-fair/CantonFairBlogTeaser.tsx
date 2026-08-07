import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { CANTON_FAIR_BLOG_SLUG } from "@/content/canton-fair";
import type { Locale } from "@/i18n/config";
import { getBlogPostBySlug } from "@/lib/blog/posts";

type CantonFairBlogTeaserProps = {
  locale: Locale;
};

export async function CantonFairBlogTeaser({ locale }: CantonFairBlogTeaserProps) {
  const post = await getBlogPostBySlug(CANTON_FAIR_BLOG_SLUG, locale);
  const href = `/${locale}/blog/${CANTON_FAIR_BLOG_SLUG}`;

  const title =
    post?.title ??
    "Canton Fair 2026 z B&BS Poland – organizujemy grupowy wyjazd biznesowy do Chin";
  const excerpt =
    post?.excerpt ??
    "W październiku organizujemy grupowe wyjazdy dla przedsiębiorców z Polski na Canton Fair w Guangzhou — z wsparciem sourcingu, wizytami w fabrykach i realizacją zamówień.";
  const coverImage = post?.coverImage ?? "/image/business_trips.jpg";
  const date = post?.date ?? "2026-08-07";

  return (
    <section aria-labelledby="canton-blog-heading" className="pt-10 sm:pt-12">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035]">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-[220px] border-b border-white/10 lg:min-h-[280px] lg:border-b-0 lg:border-r">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-surface-deep/80 via-surface-deep/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface-deep/30"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              <Newspaper className="h-4 w-4" aria-hidden />
              Na blogu B&BS
            </p>
            <h2 id="canton-blog-heading" className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{excerpt}</p>
            <p className="mt-4 text-xs text-white/35">{date}</p>
            <Link
              href={href}
              className="mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl border border-accent-light/20 bg-accent-light/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light/20"
            >
              Przeczytaj wpis o grupowym wyjeździe
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
