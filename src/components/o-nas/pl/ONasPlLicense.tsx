import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { AboutPlContent } from "@/content/i18n/about-page-pl";

type ONasPlLicenseProps = {
  license: AboutPlContent["license"];
};

export function ONasPlLicense({ license }: ONasPlLicenseProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{license.title}</h2>
          <p className="mt-3 text-base text-slate-600">{license.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
          <Image
            src={license.imageSrc}
            alt={license.imageAlt}
            width={1600}
            height={900}
            className="h-auto w-full rounded-lg"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="mx-auto mt-6 max-w-3xl text-center text-sm text-slate-600">
          <p className="font-medium text-slate-800">{license.companyName}</p>
          <p className="mt-1">
            Unified Social Credit Code:{" "}
            <span className="font-mono text-slate-700">{license.registrationCode}</span>
          </p>
          <Link
            href={license.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-light hover:underline"
          >
            <FileText className="h-4 w-4" aria-hidden />
            Pobierz licencję (PDF)
          </Link>
        </div>
      </div>
    </section>
  );
}
