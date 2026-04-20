import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { DownloadItem } from "@/types/book"
import { Download, FileArchive } from "lucide-react"

interface BookDownloadsProps {
  downloads?: DownloadItem[]
}

export default function BookDownloads({ downloads }: BookDownloadsProps) {
  if (!downloads || downloads.length === 0) {
    return null
  }

  return (
    <BookHubSection
      eyebrow="Downloads"
      title="Download companion assets"
      description="Access code packs, templates, worksheets, diagrams, and downloadable files for this book."
    >
      <div className="space-y-4">
        {downloads.map((item) => (
          <article
            key={`${item.title}-${item.fileUrl}`}
            className="rounded-2xl border border-border-default bg-surface-elevated p-5 shadow-sm transition-all duration-300 hover:border-border-strong hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary-soft border border-brand-primary/10 shrink-0">
                  <FileArchive className="w-6 h-6 text-brand-primary" />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {item.title}
                    </h3>

                    {item.version && (
                      <span className="inline-flex items-center rounded-full bg-surface-soft px-2.5 py-0.5 text-xs font-medium text-text-muted border border-border-subtle">
                        {item.version}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <Link
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-medium text-text-inverse shadow-sm transition-all hover:bg-brand-primary-hover hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Download
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
