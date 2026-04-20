import Container from "@/components/layout/container"

interface BookHubSectionProps {
  eyebrow?: string
  title: string
  description?: string
  children: React.ReactNode
}

export default function BookHubSection({
  eyebrow,
  title,
  description,
  children
}: BookHubSectionProps) {
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            {eyebrow ? (
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>

            {description ? (
              <p className="text-base leading-8 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            ) : null}
          </div>

          {children}
        </div>
      </Container>
    </section>
  )
}