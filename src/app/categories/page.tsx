import { Metadata } from "next"
import { getBooks, getCategoriesFromBooks } from "@/features/books/service"
import CategoryGrid from "@/components/categories/category-grid"
import PageHeader from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Categories | TechPress Books",
  description: "Browse books by category to find exactly what you're looking for.",
}

export default async function CategoriesPage() {
  const books = await getBooks()
  const categories = getCategoriesFromBooks(books)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Categories"
          description="Browse books by category to find exactly what you're looking for."
        />

        <div className="mt-12">
          <CategoryGrid categories={categories} />
        </div>
      </div>
    </div>
  )
}