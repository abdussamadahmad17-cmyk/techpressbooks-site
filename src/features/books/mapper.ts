import type { Book } from '@/types/book'
import type { SanityBook } from './types'
import { urlFor } from '@/lib/sanity/image'

export function mapSanityBookToBook(book: SanityBook): Book {
  const coverImage = book.coverImage
    ? urlFor(book.coverImage).width(900).height(1200).url()
    : "/images/books/fallback-cover.jpg"

  return {
    title: book.title,
    slug: book.slug,
    subtitle: book.subtitle,
    author:
      book.author?.name && book.author?.slug
        ? {
            name: book.author.name,
            slug: book.author.slug
          }
        : undefined,
    shortDescription: book.shortDescription,
    description: book.description,
    coverImage,
    isbn: book.isbn,
    amazonUrl: book.amazonUrl,
    featured: Boolean(book.featured),
    categories: (book.categories ?? [])
      .map((item) => item.title)
      .filter((value): value is string => Boolean(value)),
    tags: (book.tags ?? [])
      .map((item) => item.title)
      .filter((value): value is string => Boolean(value)),
    seo: book.seo
      ? {
          metaTitle: book.seo.metaTitle,
          metaDescription: book.seo.metaDescription,
          ogTitle: book.seo.ogTitle,
          ogDescription: book.seo.ogDescription,
          ogImage: book.seo.ogImage
            ? urlFor(book.seo.ogImage).width(1200).height(630).url()
            : coverImage
        }
      : {
          ogImage: coverImage
        }
  }
}
