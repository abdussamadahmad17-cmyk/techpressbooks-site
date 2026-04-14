export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    author->{
      name,
      "slug": slug.current
    },
    publishedAt,
    categories[]->{title},
    tags[]->{title},
    body,
    relatedBooks[]->{
      title,
      "slug": slug.current,
      coverImage
    },
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    author->{
      name,
      "slug": slug.current
    },
    publishedAt,
    categories[]->{title},
    tags[]->{title},
    body,
    relatedBooks[]->{
      title,
      "slug": slug.current,
      coverImage
    },
    seo{
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage
    }
  }
`

export const allPostSlugsQuery = `
  *[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }
`