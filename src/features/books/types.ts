export interface SanityBook {
  title: string
  slug: string
  subtitle?: string
  author?: {
    name?: string
    slug?: string
  }
  shortDescription: string
  description?: unknown
  coverImage?: {
    asset?: {
      _ref: string
      _type: "reference"
    }
  }
  isbn?: string
  amazonUrl?: string
  featured?: boolean
  categories?: Array<{ title?: string }>
  tags?: Array<{ title?: string }>
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
