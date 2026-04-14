export const allAuthorsQuery = `
  *[_type == "author"] | order(name asc) {
    name,
    "slug": slug.current,
    role,
    bio,
    image,
    "books": *[_type == "book" && author._ref == ^._id] | order(title asc) {
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
    },
    "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
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
  }
`

export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    role,
    bio,
    image,
    "books": *[_type == "book" && author._ref == ^._id] | order(title asc) {
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
    },
    "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
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
  }
`

export const allAuthorSlugsQuery = `
  *[_type == "author" && defined(slug.current)][]{
    "slug": slug.current
  }
`
