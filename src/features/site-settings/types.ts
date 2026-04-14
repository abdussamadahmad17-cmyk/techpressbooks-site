export interface SanitySiteSettings {
  siteTitle?: string
  siteDescription?: string
  footerText?: string
  primaryCta?: {
    label?: string
    href?: string
  }
  navigation?: Array<{
    label?: string
    href?: string
  }>
  favicon?: {
    asset?: {
      _ref: string
      _type: "reference"
    }
  }
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