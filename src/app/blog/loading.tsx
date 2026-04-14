import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"

export default function BlogLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Technical writing for real-world engineering"
        description="Loading articles..."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="space-y-4">
                  <div className="h-3 w-24 rounded bg-slate-700" />
                  <div className="h-8 w-4/5 rounded bg-slate-700" />
                  <div className="h-4 w-32 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-slate-800" />
                    <div className="h-4 w-5/6 rounded bg-slate-800" />
                    <div className="h-4 w-2/3 rounded bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}