export const allBooksQuery = `
  *[_type == "book"] | order(title asc) {
    title,
    "slug": slug.current,
    subtitle,
    author->{
      name,
      "slug": slug.current
    },
    shortDescription,
    description,
    coverImage,
    isbn,
    amazonUrl,
    featured,
    categories[]->{title},
    tags[]->{title},
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`

export const featuredBooksQuery = `
  *[_type == "book" && featured == true] | order(title asc) {
    title,
    "slug": slug.current,
    subtitle,
    author->{
      name,
      "slug": slug.current
    },
    shortDescription,
    description,
    coverImage,
    isbn,
    amazonUrl,
    featured,
    categories[]->{title},
    tags[]->{title},
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`

export const bookBySlugQuery = `
  *[_type == "book" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    subtitle,
    author->{
      name,
      "slug": slug.current
    },
    shortDescription,
    description,
    coverImage,
    isbn,
    amazonUrl,
    featured,
    categories[]->{title},
    tags[]->{title},
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`

export const allBookSlugsQuery = `
  *[_type == "book" && defined(slug.current)][]{
    "slug": slug.current
  }
`
