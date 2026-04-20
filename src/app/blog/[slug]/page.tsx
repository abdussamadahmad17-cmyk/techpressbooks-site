import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import PortableTextRenderer from "@/components/portable-text/portable-text-renderer"
import { getAllPostSlugs, getPostBySlug } from "@/features/posts/service"
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
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
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {/* Header */}
            <header className="space-y-6 border-b border-border-subtle pb-10">
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span 
                      key={category}
                      className="inline-flex items-center rounded-full bg-brand-primary-soft px-3 py-1 text-xs font-medium text-brand-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary text-balance leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                {post.author && (
                  <Link
                    href={`/authors/${post.author.slug}`}
                    className="flex items-center gap-1.5 text-text-secondary transition hover:text-text-primary"
                  >
                    <User className="w-4 h-4" />
                    {post.author.name}
                  </Link>
                )}

                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-code:text-brand-primary prose-code:bg-surface-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-surface-inset prose-pre:border prose-pre:border-border-default prose-pre:rounded-xl prose-img:rounded-xl prose-img:border prose-img:border-border-default">
              <PortableTextRenderer value={post.body} />
            </div>

            {/* Related Books */}
            {post.relatedBooks.length > 0 && (
              <section className="space-y-6 border-t border-border-subtle pt-10">
                <div className="space-y-2">
                  <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                    Related Books
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                    Go deeper with these titles
                  </h2>
                </div>

                <div className="space-y-3">
                  {post.relatedBooks.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/books/${book.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-border-default bg-surface-elevated px-5 py-4 transition-all duration-300 hover:border-border-strong hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary-soft border border-brand-primary/10">
                          <BookOpen className="w-5 h-5 text-brand-primary" />
                        </div>
                        <span className="font-medium text-text-primary">
                          {book.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-primary" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Container>
      </div>
    </article>
  )
}
