import Container from "@/components/layout/container"
import { sectionPatterns, textTokens } from "@/lib/theme-tokens"

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
    <section className={sectionPatterns.header()}>
      <Container>
        <div className="max-w-3xl space-y-4">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              {eyebrow}
            </p>
          ) : null}

          <h1 className={textTokens.h1}>
            {title}
          </h1>

          {description ? (
            <p className={textTokens.body}>
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}