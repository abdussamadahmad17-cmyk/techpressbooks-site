import Container from "@/components/layout/container"
import { textTokens } from "@/lib/theme-tokens"

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
    <section className="py-20 sm:py-28 border-b border-border-default">
      <Container>
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            {eyebrow ? (
              <p className={textTokens.meta}>
                {eyebrow}
              </p>
            ) : null}

            <h2 className={textTokens.h2}>
              {title}
            </h2>

            {description ? (
              <p className={`${textTokens.body} text-text-secondary max-w-2xl`}>
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
