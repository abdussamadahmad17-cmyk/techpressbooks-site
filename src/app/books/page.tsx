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

export default async function BooksPage() {
  const books = await getAllBooks()

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Practical technical books for modern engineers"
        description="Explore premium technical books for cybersecurity, system design, automation, and AI engineering."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading filters...</div>}>
            <BookDiscovery books={books} />
          </Suspense>
        </Container>
      </section>
    </>
  )
}