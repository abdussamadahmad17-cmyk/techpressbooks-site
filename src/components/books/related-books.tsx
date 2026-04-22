import type { Book } from "@/types/book"
import Container from "@/components/layout/container"
import BookGrid from "@/components/books/book-grid"
import { textTokens } from "@/lib/theme-tokens"

interface RelatedBooksProps {
  books: Book[]
}

export default function RelatedBooks({ books }: RelatedBooksProps) {
  if (books.length === 0) {
    return null
  }

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className={textTokens.meta}>
              Related Titles
            </p>
            <h2 className={textTokens.h2}>
              Continue exploring
            </h2>
            <p className={`${textTokens.body} text-text-secondary max-w-2xl`}>
              More books related to this topic and technical domain.
            </p>
          </div>

          <BookGrid books={books} />
        </div>
      </Container>
    </section>
  )
}
