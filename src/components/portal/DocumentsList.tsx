import { FileText, Download } from "lucide-react";
import type { ProjectDocument } from "@/lib/portal/types";

const fileTypeLabel: Record<string, string> = {
  pdf: "PDF",
  xlsx: "Excel",
  xls: "Excel",
  docx: "Word",
  doc: "Word",
  jpg: "Zdjęcie",
  jpeg: "Zdjęcie",
  png: "Zdjęcie",
  zip: "ZIP",
};

export function DocumentsList({ documents }: { documents: ProjectDocument[] }) {
  if (documents.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
        Dokumenty
      </h3>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id}>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/6"
            >
              <FileText
                className="h-5 w-5 shrink-0 text-accent-light/60"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {doc.name}
                </p>
                <p className="text-xs text-white/40">
                  {fileTypeLabel[doc.fileType.toLowerCase()] ?? doc.fileType.toUpperCase()} · {doc.uploadedAt}
                </p>
              </div>
              <Download
                className="h-4 w-4 shrink-0 text-white/30"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
