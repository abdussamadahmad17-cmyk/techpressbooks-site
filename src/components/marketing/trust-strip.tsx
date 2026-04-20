import Container from "@/components/layout/container"

interface TrustStripItem {
  title: string
  description: string
}

interface TrustStripProps {
  items: TrustStripItem[]
}

export default function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-8 border rounded-3xl border-slate-200 bg-white/20 backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}