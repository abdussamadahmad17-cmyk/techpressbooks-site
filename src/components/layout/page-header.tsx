import Container from "@/components/layout/container"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export default function PageHeader({
  eyebrow,
  title,
  description
}: PageHeaderProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border-subtle">
      <Container>
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
              {eyebrow}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary text-balance">
            {title}
          </h1>

          {description && (
            <p className="text-lg leading-relaxed text-text-secondary max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
