import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BookHero from "@/components/books/book-hero"
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

      {book.description ? (
        <section className="pb-20">
          <Container>
            <div className="max-w-3xl space-y-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                  About this book
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  A deeper look
                </h2>
              </div>

              <PortableTextRenderer value={book.description} />
            </div>
          </Container>
        </section>
      ) : null}

      <RelatedBooks books={relatedBooks} />
    </>
  )
}