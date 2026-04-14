import type { Book } from '@/types/book'
import type { Category } from '@/types/category'
import type { SanityBook } from './types'
import { sanityFetch } from '@/lib/sanity/fetch'
import {
  allBooksQuery,
  allBookSlugsQuery,
  bookBySlugQuery,
  featuredBooksQuery,
} from '@/lib/sanity/queries/books'
import { mapSanityBookToBook } from './mapper'
import {
  getCategoriesFromBooks,
  getCategoryBySlug as getCategoryBySlugHelper,
  getBooksByCategorySlug as getBooksByCategorySlugHelper,
  slugifyCategory
} from './categories'

export async function getAllBooks(): Promise<Book[]> {
  const books = await sanityFetch<SanityBook[]>({
    query: allBooksQuery,
  })

  return books.map(mapSanityBookToBook)
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const books = await sanityFetch<SanityBook[]>({
    query: featuredBooksQuery,
  })

  return books.map(mapSanityBookToBook)
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const book = await sanityFetch<SanityBook | null>({
    query: bookBySlugQuery,
    params: { slug },
  })

  if (!book) {
    return null
  }

  return mapSanityBookToBook(book)
}

export async function getAllBookSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: allBookSlugsQuery,
  })

  return slugs.map((item) => item.slug)
}

// Category-related functions
export async function getBooks(): Promise<Book[]> {
  return getAllBooks()
}

export async function getCategories(): Promise<Category[]> {
  const books = await getAllBooks()
  return getCategoriesFromBooks(books)
}

export { getCategoriesFromBooks }

export function getCategoryBySlug(books: Book[], slug: string): Category | null {
  return getCategoryBySlugHelper(books, slug)
}

export function getBooksByCategorySlug(books: Book[], slug: string): Book[] {
  return getBooksByCategorySlugHelper(books, slug)
}

export { slugifyCategory }
