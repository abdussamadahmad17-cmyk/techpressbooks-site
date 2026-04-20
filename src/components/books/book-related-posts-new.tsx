import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { Post } from "@/types/post"

interface BookRelatedPostsProps {
  posts?: Post[]
}

export default function BookRelatedPosts({ posts }: BookRelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <BookHubSection
      eyebrow="Related Articles"
      title="Read supporting technical articles"
      description="These articles expand on ideas, patterns, and implementation topics related to this book."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[1.5rem] border border-slate-200/70 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                {post.categories?.length ? (
                  <p className="text-xs uppercase tracking-[0.18em] text-red-400">
                    {post.categories[0]}
                  </p>
                ) : null}

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-red-300">
                    {post.title}
                  </Link>
                </h3>

                {post.excerpt ? (
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
