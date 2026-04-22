import Container from "@/components/layout/container"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"

interface TrustStripItem {
  title: string
  description: string
  icon?: React.ReactNode
}

interface TrustStripProps {
  items: TrustStripItem[]
}

export default function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="py-24 sm:py-32 border-b border-border-default">
      <Container>
        <div className="space-y-4 mb-16">
          <h2 className={textTokens.h2}>
            Why TechPressBooks
          </h2>
          <p className="max-w-3xl text-text-secondary text-lg">
            Premium technical publishing built on these principles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className={cardPatterns.elevated()}
            >
              {item.icon && (
                <div className="mb-4 text-brand-primary text-3xl">
                  {item.icon}
                </div>
              )}

              <h3 className={`${textTokens.h4} mb-2`}>
                {item.title}
              </h3>

              <p className={`${textTokens.sm} text-text-secondary`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
