import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import BookGrid from "@/components/books/book-grid"
import PostGrid from "@/components/blog/post-grid"
import { getAllAuthorSlugs, getAuthorBySlug } from "@/features/authors/service"

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
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-start">
            <div className="relative h-40 w-40 overflow-hidden rounded-4xl border border-slate-200/70 bg-slate-100 dark:border-white/10 dark:bg-slate-800">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Author
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {author.name}
              </h1>

              {author.role ? (
                <p className="text-lg text-slate-400">{author.role}</p>
              ) : null}

              {author.bio ? (
                <p className="max-w-3xl text-base leading-8 text-slate-300">
                  {author.bio}
                </p>
              ) : null}

              <p className="text-sm text-slate-500">
                {author.books.length} {author.books.length === 1 ? "book" : "books"} ·{" "}
                {author.posts.length} {author.posts.length === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {author.books.length > 0 ? (
        <section className="py-14 sm:py-16">
          <Container>
            <div className="mb-8 space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Books
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Books by {author.name}
              </h2>
            </div>

            <BookGrid books={author.books} />
          </Container>
        </section>
      ) : null}

      {author.posts.length > 0 ? (
        <section className="pb-20 sm:pb-24">
          <Container>
            <div className="mb-8 space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Articles
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Articles by {author.name}
              </h2>
            </div>

            <PostGrid posts={author.posts} />
          </Container>
        </section>
      ) : null}
    </>
  )
}
