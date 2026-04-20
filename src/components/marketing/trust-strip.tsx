import Container from "@/components/layout/container"
import { Shield, Cpu, BookText } from "lucide-react"

interface TrustStripItem {
  title: string
  description: string
  icon?: "shield" | "cpu" | "book"
}

interface TrustStripProps {
  items: TrustStripItem[]
}

const iconMap = {
  shield: Shield,
  cpu: Cpu,
  book: BookText,
}

export default function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="py-16 sm:py-20 border-y border-border-subtle bg-surface-soft/50">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, index) => {
            const iconKey = item.icon || (["shield", "cpu", "book"][index] as "shield" | "cpu" | "book")
            const IconComponent = iconMap[iconKey]
            
            return (
              <div
                key={item.title}
                className="group relative"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary-soft border border-brand-primary/10">
                  <IconComponent className="w-5 h-5 text-brand-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
