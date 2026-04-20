import type { BookUpdate } from '@/types/book'
import Container from '@/components/layout/container'

interface BookUpdatesProps {
  updates?: BookUpdate[]
}

function formatUpdateDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  } catch {
    return dateString
  }
}

export default function BookUpdates({ updates }: BookUpdatesProps) {
  if (!updates?.length) {
    return null
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Book updates
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Errata and release notes
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Keep readers informed with the latest updates, corrections, and version notes for the book.
            </p>
          </div>

          <div className="grid gap-4">
            {updates.map((update) => (
              <div
                key={`${update.title}-${update.date}`}
                className="rounded-4xl border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {update.title}
                    </p>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {update.type || 'Update'} • {formatUpdateDate(update.date)}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {update.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
