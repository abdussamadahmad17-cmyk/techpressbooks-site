import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Container from "@/components/layout/container"
import PortableTextRenderer from "@/components/portable-text/portable-text-renderer"
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/features/posts/service"
import { getRelatedPosts } from "@/features/posts/utils"
import PostEndCta from "@/components/marketing/post-end-cta"
import RelatedPosts from "@/components/blog/related-posts"
import Button from "@/components/shared/button"
import Link from "next/link"
import Image from "next/image"

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

  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts()
  ])

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  return (
    <>
      <article className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-5">
            {post.categories.length > 0 ? (
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                {post.categories.join(" • ")}
              </p>
            ) : null}

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              {post.author ? (
                <Link
                  href={`/authors/${post.author.slug}`}
                  className="transition hover:text-white"
                >
                  By {post.author.name}
                </Link>
              ) : null}

              {post.publishedAt ? (
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              ) : null}
            </div>

            {post.excerpt ? (
              <p className="text-lg leading-8 text-slate-300">{post.excerpt}</p>
            ) : null}
          </header>

          <PortableTextRenderer value={post.body} />

          {post.relatedBooks.length > 0 ? (
            <section className="space-y-6 border-t border-white/10 pt-10">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                  Related Books
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Go deeper with these titles
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {post.relatedBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/books/${book.slug}`}
                    className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
                  >
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {book.title}
                      </h3>
                      <Button href={`/books/${book.slug}`} variant="secondary" size="sm">
                        View book
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </article>

    <Container>
      <PostEndCta />
    </Container>

    <RelatedPosts posts={relatedPosts} />
    </>
  )
}