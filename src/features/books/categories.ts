import type { Book } from "@/types/book"
import type { Category } from "@/types/category"

function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export { slugifyCategory }

export function getCategoriesFromBooks(books: Book[]): Category[] {
  const counts = new Map<string, number>()

  for (const book of books) {
    for (const category of book.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([title, count]) => ({
      title,
      slug: slugifyCategory(title),
      count
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getCategoryBySlug(
  books: Book[],
  slug: string
): Category | null {
  const categories = getCategoriesFromBooks(books)
  return categories.find((category) => category.slug === slug) ?? null
}

export function getBooksByCategorySlug(
  books: Book[],
  slug: string
): Book[] {
  return books.filter((book) =>
    book.categories.some((category) => slugifyCategory(category) === slug)
  )
}