import type { Book } from "@/types/book"
import Container from "@/components/layout/container"
import BookGrid from "@/components/books/book-grid"

interface RelatedBooksProps {
  books: Book[]
}

export default function RelatedBooks({ books }: RelatedBooksProps) {
  if (books.length === 0) {
    return null
  }

  return (
    <section className="pb-24">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Related Titles
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Continue exploring
            </h2>
            <p className="max-w-2xl text-slate-400">
              More books related to this topic and technical domain.
            </p>
          </div>

          <BookGrid books={books} />
        </div>
      </Container>
    </section>
  )
}