import Link from "next/link"
import { Code2, BookOpen, Globe } from "lucide-react"
import BookHubSection from "@/components/books/book-hub-section"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"
import type { ResourceLink } from "@/types/book"

interface BookResourcesProps {
  resources?: ResourceLink[]
}

const typeIcons: Record<string, React.ReactNode> = {
  github: <Code2 className="w-5 h-5" />,
  documentation: <BookOpen className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={`${resource.title}-${resource.url}`}
            className={cardPatterns.default()}
          >
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                {resource.type && typeIcons[resource.type] ? (
                  <div className="text-brand-primary flex-shrink-0 mt-1">
                    {typeIcons[resource.type]}
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  {resource.type ? (
                    <p className={`${textTokens.xs} text-text-muted mb-2`}>
                      {resource.type}
                    </p>
                  ) : null}
                  <h3 className={textTokens.h4}>
                    {resource.title}
                  </h3>
                </div>
              </div>

              {resource.description ? (
                <p className={`${textTokens.sm} text-text-secondary leading-relaxed`}>
                  {resource.description}
                </p>
              ) : null}

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-light transition"
              >
                View resource →
              </a>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
