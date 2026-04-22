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
        <div className="max-w-4xl space-y-6">
          {eyebrow ? (
            <p className={textTokens.meta}>
              {eyebrow}
            </p>
          ) : null}

          <h1 className={textTokens.h1}>
            {title}
          </h1>

          {description ? (
            <p className={`${textTokens.bodyLarge} text-text-secondary max-w-2xl`}>
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
