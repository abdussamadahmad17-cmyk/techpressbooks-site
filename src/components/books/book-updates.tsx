import BookHubSection from "@/components/books/book-hub-section"
import type { BookUpdate } from "@/types/book"

interface BookUpdatesProps {
  updates?: BookUpdate[]
}

export default function BookUpdates({ updates }: BookUpdatesProps) {
  if (!updates || updates.length === 0) {
    return null
  }

  return (
    <BookHubSection
      eyebrow="Updates"
      title="Updates and errata"
      description="Check corrections, clarifications, and updates related to this book."
    >
      <div className="space-y-4">
        {updates.map((update) => (
          <article
            key={`${update.title}-${update.date}`}
            className="rounded-[1.5rem] border border-slate-200/70 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-red-400">
                  {update.type ?? "update"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(update.date).toLocaleDateString()}
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {update.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                {update.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
