import { urlFor } from "@/lib/sanity/image"
import type { Post } from "@/types/post"
import type { SanityPost } from "@/features/posts/types"

export function mapSanityPostToPost(post: SanityPost): Post {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author:
      post.author?.name && post.author?.slug
        ? {
            name: post.author.name,
            slug: post.author.slug
          }
        : undefined,
    publishedAt: post.publishedAt,
    categories: (post.categories ?? [])
      .map((item) => item.title)
      .filter((value): value is string => Boolean(value)),
    tags: (post.tags ?? [])
      .map((item) => item.title)
      .filter((value): value is string => Boolean(value)),
    body: post.body,
    relatedBooks: (post.relatedBooks ?? [])
      .filter(
        (book): book is {
          title: string
          slug: string
          coverImage?: {
            asset?: {
              _ref: string
              _type: "reference"
            }
          }
        } => Boolean(book?.title && book?.slug)
      )
      .map((book) => ({
        title: book.title,
        slug: book.slug,
        coverImage: book.coverImage
          ? urlFor(book.coverImage).width(600).height(800).url()
          : "/images/books/fallback-cover.jpg"
      })),
    seo: post.seo
      ? {
          metaTitle: post.seo.metaTitle,
          metaDescription: post.seo.metaDescription,
          ogTitle: post.seo.ogTitle,
          ogDescription: post.seo.ogDescription,
          ogImage: post.seo.ogImage
            ? urlFor(post.seo.ogImage).width(1200).height(630).url()
            : undefined
        }
      : undefined
  }
}