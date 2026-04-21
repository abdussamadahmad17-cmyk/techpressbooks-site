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
  try {
    const books = await sanityFetch<SanityBook[]>({
      query: allBooksQuery,
    })

    return books.map(mapSanityBookToBook)
  } catch (error) {
    console.warn('Failed to fetch books from Sanity:', error)
    return []
  }
}

export async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const books = await sanityFetch<SanityBook[]>({
      query: featuredBooksQuery,
    })

    return books.map(mapSanityBookToBook)
  } catch (error) {
    console.warn('Failed to fetch featured books from Sanity:', error)
    return []
  }
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const book = await sanityFetch<SanityBook | null>({
      query: bookBySlugQuery,
      params: { slug },
    })

    if (!book) {
      return null
    }

    return mapSanityBookToBook(book)
  } catch (error) {
    console.warn('Failed to fetch book from Sanity:', error)
    return null
  }
}

export async function getAllBookSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allBookSlugsQuery,
    })

    return slugs.map((item) => item.slug)
  } catch (error) {
    console.warn('Failed to fetch book slugs from Sanity:', error)
    return []
  }
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
