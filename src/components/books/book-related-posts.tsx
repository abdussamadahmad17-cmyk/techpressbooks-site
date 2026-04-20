import Link from 'next/link'
import type { Post } from '@/types/post'
import Container from '@/components/layout/container'

interface BookRelatedPostsProps {
  relatedPosts?: Post[]
}

export default function BookRelatedPosts({ relatedPosts }: BookRelatedPostsProps) {
  if (!relatedPosts?.length) {
    return null
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Related blog posts
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Learn more from related writing
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Drive deeper engagement by linking readers to posts that expand on the book’s themes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-4xl border border-slate-200/70 bg-slate-50 p-6 transition hover:border-slate-300 dark:border-white/10 dark:bg-slate-900"
              >
                <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-red-600">
                  {post.title}
                </p>
                {post.excerpt ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
