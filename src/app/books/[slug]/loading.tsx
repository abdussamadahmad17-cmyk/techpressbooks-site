import Container from "@/components/layout/container"

export default function BookDetailLoading() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid animate-pulse gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start">
          <div className="aspect-[3/4] rounded-[2rem] bg-slate-800" />

          <div className="space-y-6">
            <div className="h-4 w-40 rounded bg-slate-800" />
            <div className="h-12 w-4/5 rounded bg-slate-700" />
            <div className="h-6 w-2/3 rounded bg-slate-800" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-800" />
              <div className="h-4 w-11/12 rounded bg-slate-800" />
              <div className="h-4 w-3/4 rounded bg-slate-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-full bg-slate-800" />
              <div className="h-8 w-24 rounded-full bg-slate-800" />
              <div className="h-8 w-16 rounded-full bg-slate-800" />
            </div>
            <div className="h-12 w-40 rounded-2xl bg-slate-700" />
          </div>
        </div>
      </Container>
    </section>
  )
}