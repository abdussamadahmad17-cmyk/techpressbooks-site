import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import PortableTextRenderer from "@/components/portable-text/portable-text-renderer"
import { getAllPostSlugs, getPostBySlug } from "@/features/posts/service"

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found"
    }
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt || ""
  const ogTitle = post.seo?.ogTitle || title
  const ogDescription = post.seo?.ogDescription || description
  const ogImage = post.seo?.ogImage

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
              alt: post.title
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-5">
            {post.categories.length > 0 ? (
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                {post.categories.join(" • ")}
              </p>
            ) : null}

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              {post.author ? (
                <Link
                  href={`/authors/${post.author.slug}`}
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  By {post.author.name}
                </Link>
              ) : null}

              {post.publishedAt ? (
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              ) : null}
            </div>

            {post.excerpt ? (
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                {post.excerpt}
              </p>
            ) : null}
          </header>

          <PortableTextRenderer value={post.body} />

          {post.relatedBooks.length > 0 ? (
            <section className="space-y-4 border-t border-slate-200/70 pt-10 dark:border-white/10">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                  Related Books
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Go deeper with these titles
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {post.relatedBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/books/${book.slug}`}
                    className="rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                  >
                    {book.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </article>
  )
}