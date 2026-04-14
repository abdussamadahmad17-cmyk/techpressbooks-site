import type { Book } from "@/types/book"

export interface BookFilterState {
  query: string
  category: string
  tag: string
  sort: "featured" | "title-asc" | "title-desc"
}

export function filterBooks(books: Book[], filters: BookFilterState): Book[] {
  const query = filters.query.trim().toLowerCase()
  const category = filters.category.trim().toLowerCase()
  const tag = filters.tag.trim().toLowerCase()

  const filtered = books.filter((book) => {
    const matchesQuery =
      query.length === 0 ||
      book.title.toLowerCase().includes(query) ||
      (book.author?.name?.toLowerCase().includes(query) ?? false) ||
      book.shortDescription.toLowerCase().includes(query) ||
      book.categories.some((item) => item.toLowerCase().includes(query)) ||
      book.tags.some((item) => item.toLowerCase().includes(query))

    const matchesCategory =
      category.length === 0 ||
      book.categories.some((item) => item.toLowerCase() === category)

    const matchesTag =
      tag.length === 0 ||
      book.tags.some((item) => item.toLowerCase() === tag)

    return matchesQuery && matchesCategory && matchesTag
  })

  return [...filtered].sort((a, b) => {
    if (filters.sort === "title-asc") {
      return a.title.localeCompare(b.title)
    }

    if (filters.sort === "title-desc") {
      return b.title.localeCompare(a.title)
    }

    if (filters.sort === "featured") {
      if (a.featured === b.featured) {
        return a.title.localeCompare(b.title)
      }

      return a.featured ? -1 : 1
    }

    return 0
  })
}

export function getUniqueCategories(books: Book[]): string[] {
  return Array.from(new Set(books.flatMap((book) => book.categories))).sort(
    (a, b) => a.localeCompare(b)
  )
}

export function getUniqueTags(books: Book[]): string[] {
  return Array.from(new Set(books.flatMap((book) => book.tags))).sort((a, b) =>
    a.localeCompare(b)
  )
}