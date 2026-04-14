import type { Metadata } from "next"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import TagGrid from "@/components/tags/tag-grid"
import { getAllBooks } from "@/features/books/service"
import { getTagsFromBooks } from "@/features/books/tags"

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse books by tag."
}

export default async function TagsPage() {
  const books = await getAllBooks()
  const tags = getTagsFromBooks(books)

  return (
    <>
      <PageHeader
        eyebrow="Tags"
        title="Explore books by topic and keyword"
        description="Browse the library through technical themes, subjects, and recurring concepts."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <TagGrid tags={tags} />
        </Container>
      </section>
    </>
  )
}