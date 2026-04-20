import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
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
            className="rounded-[1.5rem] border border-slate-200/70 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  {item.version ? (
                    <span className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      {item.version}
                    </span>
                  ) : null}
                </div>

                {item.description ? (
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                ) : null}
              </div>

              <Link
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
              >
                Download
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
