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
  const authors = await sanityFetch<SanityAuthor[]>({
    query: allAuthorsQuery
  })

  return authors.map(mapSanityAuthorToAuthor)
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const author = await sanityFetch<SanityAuthor | null>({
    query: authorBySlugQuery,
    params: { slug }
  })

  if (!author) {
    return null
  }

  return mapSanityAuthorToAuthor(author)
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: allAuthorSlugsQuery
  })

  return slugs.map((item) => item.slug)
}
