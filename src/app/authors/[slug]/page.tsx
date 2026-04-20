import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import BookGrid from "@/components/books/book-grid"
import PostGrid from "@/components/blog/post-grid"
import { getAllAuthorSlugs, getAuthorBySlug } from "@/features/authors/service"
import { BookOpen, FileText } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return {
      title: "Author Not Found"
    }
  }

  return {
    title: author.name,
    description: author.bio || `Explore books and posts by ${author.name}.`
  }
}

export default async function AuthorDetailPage({ params }: Props) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  return (
    <>
      {/* Author header */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-border-subtle">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start lg:gap-12">
            {/* Avatar */}
            <div className="relative h-40 w-40 lg:h-[180px] lg:w-[180px] mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-border-default bg-surface-soft shadow-lg">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-brand-primary-soft">
                  <span className="text-5xl font-semibold text-brand-primary">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-5 text-center lg:text-left">
              <div className="space-y-3">
                <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                  Author
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary text-balance">
                  {author.name}
                </h1>

                {author.role && (
                  <p className="text-lg text-text-secondary">{author.role}</p>
                )}
              </div>

              {author.bio && (
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary mx-auto lg:mx-0">
                  {author.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2 text-text-muted">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-soft border border-border-subtle">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm">
                    <span className="font-semibold text-text-primary">{author.books.length}</span>{" "}
                    {author.books.length === 1 ? "book" : "books"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-soft border border-border-subtle">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm">
                    <span className="font-semibold text-text-primary">{author.posts.length}</span>{" "}
                    {author.posts.length === 1 ? "article" : "articles"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Books section */}
      {author.books.length > 0 && (
        <section className="py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-10 space-y-3">
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Books
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Books by {author.name}
              </h2>
            </div>

            <BookGrid books={author.books} />
          </Container>
        </section>
      )}

      {/* Articles section */}
      {author.posts.length > 0 && (
        <section className="py-14 sm:py-16 lg:py-20 border-t border-border-subtle">
          <Container>
            <div className="mb-10 space-y-3">
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Articles
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Articles by {author.name}
              </h2>
            </div>

            <PostGrid posts={author.posts} />
          </Container>
        </section>
      )}
    </>
  )
}
