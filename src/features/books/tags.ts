import type { Book } from "@/types/book"
import type { Tag } from "@/types/tag"

function slugifyTag(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getTagsFromBooks(books: Book[]): Tag[] {
  const counts = new Map<string, number>()

  for (const book of books) {
    for (const tag of book.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([title, count]) => ({
      title,
      slug: slugifyTag(title),
      count
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getTagBySlug(books: Book[], slug: string): Tag | null {
  const tags = getTagsFromBooks(books)
  return tags.find((tag) => tag.slug === slug) ?? null
}

export function getBooksByTagSlug(books: Book[], slug: string): Book[] {
  return books.filter((book) =>
    book.tags.some((tag) => slugifyTag(tag) === slug)
  )
}

export function slugifyBookTag(value: string): string {
  return slugifyTag(value)
}