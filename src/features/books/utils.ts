import type { Book } from "@/types/book"

function countSharedValues(a: string[], b: string[]) {
  const setB = new Set(b)
  return a.filter((value) => setB.has(value)).length
}

export function getRelatedBooks(currentBook: Book, allBooks: Book[], limit = 3): Book[] {
  return allBooks
    .filter((book) => book.slug !== currentBook.slug)
    .map((book) => {
      const sharedCategories = countSharedValues(
        currentBook.categories,
        book.categories
      )
      const sharedTags = countSharedValues(currentBook.tags, book.tags)

      const score = sharedCategories * 3 + sharedTags * 2

      return { book, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.book)
}