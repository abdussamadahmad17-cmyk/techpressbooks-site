import { Suspense } from "react"
import type { Metadata } from "next"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import BookDiscovery from "@/components/books/book-discovery"
import { getAllBooks } from "@/features/books/service"

export const metadata: Metadata = {
  title: "Books",
  description: "Browse all TechPressBooks titles."
}

function LoadingState() {
  return (
    <div className="space-y-8">
      {/* Filter skeleton */}
      <div className="rounded-2xl border border-border-default bg-surface-elevated p-5 animate-pulse">
        <div className="h-4 w-20 bg-surface-soft rounded mb-5" />
        <div className="grid gap-5 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-surface-soft rounded" />
              <div className="h-10 bg-surface-soft rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Results skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border-default bg-surface-elevated p-5 animate-pulse">
            <div className="flex gap-5">
              <div className="h-44 w-[120px] rounded-xl bg-surface-soft" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-24 bg-surface-soft rounded-full" />
                <div className="h-6 w-3/4 bg-surface-soft rounded" />
                <div className="h-4 w-1/2 bg-surface-soft rounded" />
                <div className="h-16 w-full bg-surface-soft rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function BooksPage() {
  const books = await getAllBooks()

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Practical technical books for modern engineers"
        description="Explore premium technical books for cybersecurity, system design, automation, and AI engineering."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <Suspense fallback={<LoadingState />}>
            <BookDiscovery books={books} />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
