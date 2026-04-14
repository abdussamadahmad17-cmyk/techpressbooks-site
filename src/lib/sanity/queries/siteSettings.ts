export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    siteTitle,
    siteDescription,
    footerText,
    primaryCta,
    navigation[]{
      label,
      href
    },
    favicon,
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`