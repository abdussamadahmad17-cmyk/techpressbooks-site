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
    buyOptions[]{
      label,
      url,
      type,
      isPrimary,
      priceText,
      note
    },
    resourceLinks[]{
      title,
      url,
      type,
      description
    },
    downloads[]{
      title,
      "fileUrl": file.asset->url,
      description,
      version
    },
    relatedPosts[]-> {
      title,
      "slug": slug.current,
      excerpt,
      categories[]->{title},
      tags[]->{title}
    },
    updates[]{
      title,
      date,
      type,
      body
    },
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
