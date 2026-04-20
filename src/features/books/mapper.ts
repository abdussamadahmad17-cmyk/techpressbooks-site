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
    buyOptions: book.buyOptions?.map((option) => ({
      label: option.label ?? '',
      url: option.url ?? '',
      type: option.type,
      isPrimary: option.isPrimary,
      priceText: option.priceText,
      note: option.note
    })),
    resourceLinks: book.resourceLinks?.map((resource) => ({
      title: resource.title ?? '',
      url: resource.url ?? '',
      type: resource.type,
      description: resource.description
    })),
    downloads: book.downloads?.map((download) => ({
      title: download.title ?? '',
      fileUrl: download.fileUrl ?? '',
      description: download.description,
      version: download.version
    })),

    relatedPosts: book.relatedPosts?.map((post) => ({
      title: post.title ?? '',
      slug: post.slug ?? '',
      excerpt: post.excerpt,
      categories: (post.categories ?? [])
        .map((item) => item.title)
        .filter((value): value is string => Boolean(value)),
      tags: (post.tags ?? [])
        .map((item) => item.title)
        .filter((value): value is string => Boolean(value)),
      relatedBooks: []
    })),
    updates: book.updates?.map((update) => ({
      title: update.title ?? '',
      date: update.date ?? '',
      type: update.type,
      body: update.body ?? ''
    })),
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
