import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BookHero from "@/components/books/book-hero"
import BookBuyOptions from "@/components/books/book-buy-options"
import BookResources from "@/components/books/book-resources"
import BookDownloads from "@/components/books/book-downloads"
import BookRelatedPosts from "@/components/books/book-related-posts"
import BookUpdates from "@/components/books/book-updates"
import RelatedBooks from "@/components/books/related-books"
import Container from "@/components/layout/container"
import PortableTextRenderer from "@/components/portable-text/portable-text-renderer"
import {
  getAllBookSlugs,
  getAllBooks,
  getBookBySlug
} from "@/features/books/service"
import { getRelatedBooks } from "@/features/books/utils"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBookSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    return {
      title: "Book Not Found"
    }
  }

  const title = book.seo?.metaTitle || book.title
  const description = book.seo?.metaDescription || book.shortDescription
  const ogTitle = book.seo?.ogTitle || title
  const ogDescription = book.seo?.ogDescription || description
  const ogImage = book.seo?.ogImage || book.coverImage

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: book.title
            }
          ]
        : undefined
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined
    }
  }
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params

  const [book, allBooks] = await Promise.all([
    getBookBySlug(slug),
    getAllBooks()
  ])

  if (!book) {
    notFound()
  }

  const relatedBooks = getRelatedBooks(book, allBooks, 3)

  return (
    <>
      <BookHero book={book} />

      {book.description && (
        <section className="py-14 sm:py-16 border-t border-border-subtle">
          <Container>
            <div className="max-w-3xl space-y-6">
              <div className="space-y-3">
                <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                  About this book
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  A deeper look
                </h2>
              </div>

              <div className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline max-w-none">
                <PortableTextRenderer value={book.description} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <BookBuyOptions book={book} />
      <BookResources resources={book.resourceLinks} />
      <BookDownloads downloads={book.downloads} />
      <BookRelatedPosts posts={book.relatedPosts} />
      <BookUpdates updates={book.updates} />

      <RelatedBooks books={relatedBooks} />
    </>
  )
}
