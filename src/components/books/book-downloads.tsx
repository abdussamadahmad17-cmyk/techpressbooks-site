import Link from "next/link"
import { Download } from "lucide-react"
import BookHubSection from "@/components/books/book-hub-section"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"
import type { DownloadItem } from "@/types/book"

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
            className={cardPatterns.default()}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className={textTokens.h4}>
                    {item.title}
                  </h3>

                  {item.version ? (
                    <span className="rounded-premium border border-border-subtle bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
                      v{item.version}
                    </span>
                  ) : null}
                </div>

                {item.description ? (
                  <p className={`${textTokens.sm} text-text-secondary`}>
                    {item.description}
                  </p>
                ) : null}
              </div>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-premium bg-brand-primary text-white font-semibold hover:shadow-lg transition hover:bg-opacity-90"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
