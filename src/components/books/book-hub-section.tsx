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
    <section className="py-14 sm:py-16 border-t border-border-subtle">
      <Container>
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            {eyebrow && (
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {eyebrow}
              </span>
            )}

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
              {title}
            </h2>

            {description && (
              <p className="text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>
      </Container>
    </section>
  )
}
