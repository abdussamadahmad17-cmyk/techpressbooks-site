import BookHubSection from "@/components/books/book-hub-section"
import type { BookUpdate } from "@/types/book"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface BookUpdatesProps {
  updates?: BookUpdate[]
}

const typeConfig: Record<string, { icon: typeof AlertCircle; color: string }> = {
  errata: { icon: AlertCircle, color: "text-amber-500" },
  correction: { icon: CheckCircle, color: "text-green-500" },
  update: { icon: Info, color: "text-blue-500" },
  default: { icon: Info, color: "text-brand-primary" },
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
        {updates.map((update) => {
          const config = typeConfig[update.type?.toLowerCase() ?? 'default'] || typeConfig.default
          const IconComponent = config.icon

          return (
            <article
              key={`${update.title}-${update.date}`}
              className="rounded-2xl border border-border-default bg-surface-elevated p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${config.color}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      {update.type ?? "update"}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary">
                  {update.title}
                </h3>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {update.body}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </BookHubSection>
  )
}
