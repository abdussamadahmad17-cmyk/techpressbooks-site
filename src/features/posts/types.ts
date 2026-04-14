export interface SanityPost {
  title: string
  slug: string
  excerpt?: string
  author?: {
    name?: string
    slug?: string
  }
  publishedAt?: string
  categories?: Array<{ title?: string }>
  tags?: Array<{ title?: string }>
  body?: unknown
  relatedBooks?: Array<{
    title?: string
    slug?: string
    coverImage?: {
      asset?: {
        _ref: string
        _type: "reference"
      }
    }
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: {
      asset?: {
        _ref: string
        _type: "reference"
      }
    }
  }
}