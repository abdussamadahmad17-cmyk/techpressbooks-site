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
  buyOptions?: Array<{
    label?: string
    url?: string
    type?: string
    isPrimary?: boolean
    priceText?: string
    note?: string
  }>
  resourceLinks?: Array<{
    title?: string
    url?: string
    type?: string
    description?: string
  }>
  downloads?: Array<{
    title?: string
    file?: {
      asset?: {
        _ref: string
        _type: "reference"
      }
    }
    fileUrl?: string
    description?: string
    version?: string
  }>
  relatedPosts?: Array<{
    title?: string
    slug?: string
    excerpt?: string
    categories?: Array<{ title?: string }>
    tags?: Array<{ title?: string }>
  }>
  updates?: Array<{
    title?: string
    date?: string
    type?: string
    body?: string
  }>
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
