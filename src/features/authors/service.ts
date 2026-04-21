import { sanityFetch } from "@/lib/sanity/fetch"
import {
  allAuthorsQuery,
  allAuthorSlugsQuery,
  authorBySlugQuery
} from "@/lib/sanity/queries/authors"
import { mapSanityAuthorToAuthor } from "@/features/authors/mapper"
import type { SanityAuthor } from "@/features/authors/types"
import type { Author } from "@/types/author"

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const authors = await sanityFetch<SanityAuthor[]>({
      query: allAuthorsQuery
    })

    return authors.map(mapSanityAuthorToAuthor)
  } catch (error) {
    console.warn('Failed to fetch authors from Sanity:', error)
    return []
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const author = await sanityFetch<SanityAuthor | null>({
      query: authorBySlugQuery,
      params: { slug }
    })

    if (!author) {
      return null
    }

    return mapSanityAuthorToAuthor(author)
  } catch (error) {
    console.warn('Failed to fetch author from Sanity:', error)
    return null
  }
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allAuthorSlugsQuery
    })

    return slugs.map((item) => item.slug)
  } catch (error) {
    console.warn('Failed to fetch author slugs from Sanity:', error)
    return []
  }
}
