import Link from "next/link"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"
import type { Post } from "@/types/post"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={cardPatterns.default()}>
      <div className="space-y-4">
        {post.categories.length > 0 ? (
          <p className="text-xs uppercase tracking-[0.2em] text-red-400">
            {post.categories[0]}
          </p>
        ) : null}

        <div className="space-y-2">
          <h2 className={textTokens.h3}>
            <Link href={`/blog/${post.slug}`} className="hover:text-red-300">
              {post.title}
            </Link>
          </h2>

          <div className="flex flex-wrap gap-3 text-sm text-text-muted">
            {post.publishedAt ? (
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            ) : null}

            {post.author ? (
              <Link
                href={`/authors/${post.author.slug}`}
                className="transition text-text-secondary hover:text-text-primary"
              >
                By {post.author.name}
              </Link>
            ) : null}
          </div>
        </div>

        {post.excerpt ? (
          <p className="text-sm leading-7 text-text-secondary">{post.excerpt}</p>
        ) : null}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex text-sm font-medium text-text-secondary transition hover:text-text-primary"
        >
          Read article →
        </Link>
      </div>
    </article>
  )
}