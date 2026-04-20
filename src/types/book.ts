import type { AuthorRef } from "@/types/author-ref"
import type { Post } from "@/types/post"

export interface PurchaseOption {
  label: string
  url: string
  type?: string
  isPrimary?: boolean
  priceText?: string
  note?: string
}

export interface ResourceLink {
  title: string
  url: string
  type?: string
  description?: string
}

export interface DownloadItem {
  title: string
  fileUrl: string
  description?: string
  version?: string
}

export interface BookUpdate {
  title: string
  date: string
  type?: string
  body: string
}

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
  buyOptions?: PurchaseOption[]
  resourceLinks?: ResourceLink[]
  downloads?: DownloadItem[]
  relatedPosts?: Post[]
  updates?: BookUpdate[]
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

