export interface SiteNavigationItem {
  label: string
  href: string
}

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  footerText: string
  favicon?: string
  primaryCta?: {
    label: string
    href: string
  }
  navigation: SiteNavigationItem[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
  }
}