import type { Book } from '@/types/book'
import BookCard from '@/components/books/book-card'
import EmptyState from '@/components/shared/empty-state'

interface BookGridProps {
  books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <EmptyState
        title="No books found"
        description="Add books in Sanity Studio and they will appear here."
      />
    )
  }

  return (
    <div className="space-y-5">
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  )
}
