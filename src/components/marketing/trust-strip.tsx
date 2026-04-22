import { Zap, Shield, Code } from "lucide-react"
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
  // Default icons if not provided
  const defaultIcons = [
    <Zap className="w-6 h-6" key="zap" />,
    <Shield className="w-6 h-6" key="shield" />,
    <Code className="w-6 h-6" key="code" />
  ]

  return (
    <section className="py-24 sm:py-32 lg:py-40 border-b border-border-default">
      <Container>
        <div className="space-y-4 mb-20">
          <h2 className={textTokens.h2}>
            Why TechPressBooks
          </h2>
          <p className="max-w-3xl text-text-secondary text-lg leading-relaxed">
            Premium technical publishing built on these principles. We focus on real-world engineering, not academic theory.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className={`${cardPatterns.elevated()} group hover:shadow-lg transition-all duration-300 cursor-default`}
            >
              {/* Icon container with background */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 text-brand-primary group-hover:shadow-md transition">
                {item.icon || defaultIcons[idx]}
              </div>

              <h3 className={`${textTokens.h4} mb-3`}>
                {item.title}
              </h3>

              <p className={`${textTokens.sm} text-text-secondary leading-relaxed`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
