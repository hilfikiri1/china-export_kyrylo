import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { contacts } from "@/config/contacts";
import { localizedPath, routes } from "@/i18n/routing";
import { getMessageObject } from "@/i18n/translate";

export type AboutPlGallerySlide = {
  src: string;
  alt: string;
};

export type AboutPlContent = {
  hero: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    bullets: string[];
    portraitSrc: string;
    portraitAlt: string;
    primaryCta: { label: string; href: string };
    phoneCta: { label: string; href: string };
  };
  intro: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    body: string;
  };
  pillars: Array<{ title: string; description: string }>;
  gallery: {
    title: string;
    slides: AboutPlGallerySlide[];
  };
  license: {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    pdfHref: string;
    companyName: string;
    registrationCode: string;
  };
};

type AboutPlMessages = {
  hero: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    bullets: string[];
    portraitAlt: string;
    primaryCta: string;
  };
  intro: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    body: string;
  };
  pillars: Array<{ title: string; description: string }>;
  gallery: {
    title: string;
    slides: Array<{ alt: string }>;
  };
  license: {
    title: string;
    subtitle: string;
    imageAlt: string;
    companyName: string;
    registrationCode: string;
  };
};

const galleryImages = [
  "/image/about/gallery-factory-visit.jpg",
  "/image/about/gallery-production.jpg",
  "/image/about/gallery-warehouse.jpg",
] as const;

export function getAboutPlContent(
  messages: Messages,
  locale: Locale,
): AboutPlContent | null {
  if (locale !== "pl") return null;

  const content = getMessageObject<AboutPlMessages>(messages, "pages.about.plLayout");
  if (!content) return null;

  return {
    hero: {
      titleBefore: content.hero.titleBefore,
      titleHighlight: content.hero.titleHighlight,
      titleAfter: content.hero.titleAfter,
      lead: content.hero.lead,
      bullets: content.hero.bullets,
      portraitSrc: "/image/about/hero.jpg",
      portraitAlt: content.hero.portraitAlt,
      primaryCta: {
        label: content.hero.primaryCta,
        href: localizedPath(locale, routes.contact),
      },
      phoneCta: {
        label: contacts.phones.poland.display,
        href: `tel:${contacts.phones.poland.tel}`,
      },
    },
    intro: {
      titleBefore: content.intro.titleBefore,
      titleHighlight: content.intro.titleHighlight,
      titleAfter: content.intro.titleAfter,
      subtitle: content.intro.subtitle,
      body: content.intro.body,
    },
    pillars: content.pillars,
    gallery: {
      title: content.gallery.title,
      slides: content.gallery.slides.map((slide, index) => ({
        src: galleryImages[index] ?? galleryImages[0],
        alt: slide.alt,
      })),
    },
    license: {
      title: content.license.title,
      subtitle: content.license.subtitle,
      imageSrc: "/image/about/license.png",
      imageAlt: content.license.imageAlt,
      pdfHref: "/documents/bbs-china-license.pdf",
      companyName: content.license.companyName,
      registrationCode: content.license.registrationCode,
    },
  };
}
