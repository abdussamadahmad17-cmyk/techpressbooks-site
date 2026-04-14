import type { Metadata } from "next"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import AuthorGrid from "@/components/authors/author-grid"
import { getAllAuthors } from "@/features/authors/service"

export const metadata: Metadata = {
  title: "Authors",
  description: "Meet the authors publishing on TechPressBooks."
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <>
      <PageHeader
        eyebrow="Authors"
        title="Meet the minds behind the writing"
        description="Explore authors, their books, and their technical articles."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <AuthorGrid authors={authors} />
        </Container>
      </section>
    </>
  )
}
