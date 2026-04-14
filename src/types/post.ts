import type { AuthorRef } from "@/types/author-ref"

export interface Post {
  title: string
  slug: string
  excerpt?: string
  author?: AuthorRef
  publishedAt?: string
  categories: string[]
  tags: string[]
  body?: unknown
  relatedBooks: {
    title: string
    slug: string
    coverImage: string
  }[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
  }
}