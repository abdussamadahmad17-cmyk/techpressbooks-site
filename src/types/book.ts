import type { AuthorRef } from "@/types/author-ref"

export interface Book {
  title: string
  slug: string
  subtitle?: string
  author?: AuthorRef
  shortDescription: string
  description?: unknown
  coverImage: string
  isbn?: string
  amazonUrl?: string
  featured: boolean
  categories: string[]
  tags: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
  }
}
