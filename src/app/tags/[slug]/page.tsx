import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import BookGrid from "@/components/books/book-grid"
import { getAllBooks } from "@/features/books/service"
import {
  getBooksByTagSlug,
  getTagBySlug,
  getTagsFromBooks
} from "@/features/books/tags"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const books = await getAllBooks()
  const tags = getTagsFromBooks(books)

  return tags.map((tag) => ({
    slug: tag.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const books = await getAllBooks()
  const tag = getTagBySlug(books, slug)

  if (!tag) {
    return {
      title: "Tag Not Found"
    }
  }

  return {
    title: tag.title,
    description: `Browse ${tag.count} ${
      tag.count === 1 ? "book" : "books"
    } tagged with ${tag.title}.`
  }
}

export default async function TagDetailPage({ params }: Props) {
  const { slug } = await params
  const books = await getAllBooks()

  const tag = getTagBySlug(books, slug)

  if (!tag) {
    notFound()
  }

  const tagBooks = getBooksByTagSlug(books, slug)

  return (
    <>
      <PageHeader
        eyebrow="Tag"
        title={tag.title}
        description={`Browse ${tag.count} ${
          tag.count === 1 ? "book" : "books"
        } connected to this topic.`}
      />

      <section className="py-14 sm:py-16">
        <Container>
          <BookGrid books={tagBooks} />
        </Container>
      </section>
    </>
  )
}