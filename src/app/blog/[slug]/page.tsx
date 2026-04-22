import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowRight } from "lucide-react"
import Container from "@/components/layout/container"
import PortableTextRenderer from "@/components/portable-text/portable-text-renderer"
import PostEndCta from "@/components/marketing/post-end-cta"
import { textTokens, cardPatterns } from "@/lib/theme-tokens"
import { getAllPostSlugs, getPostBySlug } from "@/features/posts/service"

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
    <article className="bg-surface-default">
      {/* Header Section */}
      <div className="border-b border-border-default py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            {/* Categories */}
            {post.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-premium bg-brand-primary/10 text-brand-primary text-xs font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Title */}
            <h1 className={`${textTokens.h1} text-text-primary`}>
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm">
              {post.author ? (
                <Link
                  href={`/authors/${post.author.slug}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition"
                >
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </Link>
              ) : null}

              {post.publishedAt ? (
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              ) : null}
            </div>

            {/* Excerpt */}
            {post.excerpt ? (
              <p className={`${textTokens.lead} text-text-secondary max-w-2xl`}>
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <PortableTextRenderer value={post.body} />
            </div>
          </div>
        </Container>
      </div>

      {/* Related Books Section */}
      {post.relatedBooks.length > 0 ? (
        <section className="border-t border-border-default py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-3">
                <p className={textTokens.meta}>
                  Related Books
                </p>
                <h2 className={textTokens.h3}>
                  Go deeper with these titles
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {post.relatedBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/books/${book.slug}`}
                    className={`${cardPatterns.default()} group`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`${textTokens.sm} text-text-secondary mb-1`}>Related Book</p>
                        <h3 className={`${textTokens.h4} group-hover:text-brand-primary transition`}>
                          {book.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-brand-primary transition flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Post End CTA */}
      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <PostEndCta />
          </div>
        </Container>
      </div>
    </article>
  )
}
