import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { ResourceLink } from "@/types/book"

interface BookResourcesProps {
  resources?: ResourceLink[]
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
        {resources.map((resource) => (
          <article
            key={`${resource.title}-${resource.url}`}
            className="rounded-[1.5rem] border border-slate-200/70 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                {resource.type ? (
                  <p className="text-xs uppercase tracking-[0.18em] text-red-400">
                    {resource.type}
                  </p>
                ) : null}

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {resource.title}
                </h3>

                {resource.description ? (
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {resource.description}
                  </p>
                ) : null}
              </div>

              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Open resource
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
