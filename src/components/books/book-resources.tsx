import type { ResourceLink } from '@/types/book'
import Button from '@/components/shared/button'
import Container from '@/components/layout/container'

interface BookResourcesProps {
  resourceLinks?: ResourceLink[]
}

export default function BookResources({ resourceLinks }: BookResourcesProps) {
  if (!resourceLinks?.length) {
    return null
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Learning resources
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Useful repo links and docs
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Share the most important resources readers need for the book, including GitHub repos and reference documentation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {resourceLinks.map((resource) => (
              <div
                key={resource.url}
                className="rounded-4xl border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-4 pb-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {resource.title}
                    </p>
                    {resource.type ? (
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {resource.type}
                      </p>
                    ) : null}
                  </div>
                </div>

                {resource.description ? (
                  <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {resource.description}
                  </p>
                ) : null}

                <Button href={resource.url} variant="secondary" size="md">
                  Open resource
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
