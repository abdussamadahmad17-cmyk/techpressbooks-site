import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import BookCardSkeleton from "@/components/books/book-card-skeleton"

export default function BooksLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Practical technical books for modern engineers"
        description="Loading the library..."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}