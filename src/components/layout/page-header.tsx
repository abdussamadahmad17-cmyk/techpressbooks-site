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
    <section className="border-b border-white/10 py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl space-y-4">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description ? (
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}