import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { ResourceLink } from "@/types/book"
import { ExternalLink, Github, FileText, Link2 } from "lucide-react"

interface BookResourcesProps {
  resources?: ResourceLink[]
}

const typeIcons: Record<string, typeof Github> = {
  repository: Github,
  documentation: FileText,
  default: Link2,
}

export default function BookResources({ resources }: BookResourcesProps) {
  if (!resources || resources.length === 0) {
    return null
  }

  return (
    <BookHubSection
      eyebrow="Resources"
      title="Companion resources and code"
      description="Explore repositories, technical documentation, and companion materials related to this book."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => {
          const IconComponent = typeIcons[resource.type?.toLowerCase() ?? 'default'] || typeIcons.default
          
          return (
            <article
              key={`${resource.title}-${resource.url}`}
              className="group rounded-2xl border border-border-default bg-surface-elevated p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border-strong"
            >
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-soft border border-border-subtle">
                      <IconComponent className="w-5 h-5 text-text-muted" />
                    </div>
                    {resource.type && (
                      <span className="text-xs font-medium uppercase tracking-wider text-brand-primary">
                        {resource.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {resource.description}
                    </p>
                  )}
                </div>

                <Link
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary transition-all hover:bg-surface-soft"
                >
                  Open resource
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </BookHubSection>
  )
}
