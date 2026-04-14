import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBooks, getCategoryBySlug, getBooksByCategorySlug } from "@/features/books/service"
import BookGrid from "@/components/books/book-grid"
import PageHeader from "@/components/layout/page-header"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const books = await getBooks()
  const category = getCategoryBySlug(books, slug)

  if (!category) {
    return {
      title: "Category Not Found | TechPress Books",
    }
  }

  return {
    title: `${category.title} | TechPress Books`,
    description: `Browse ${category.count} ${category.count === 1 ? "book" : "books"} in the ${category.title} category.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const books = await getBooks()
  const category = getCategoryBySlug(books, slug)

  if (!category) {
    notFound()
  }

  const categoryBooks = getBooksByCategorySlug(books, slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title={category.title}
          description={`${category.count} ${category.count === 1 ? "book" : "books"} in this category`}
        />

        <div className="mt-12">
          <BookGrid books={categoryBooks} />
        </div>
      </div>
    </div>
  )
}