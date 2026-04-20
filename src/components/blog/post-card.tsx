import Link from "next/link"
import type { Post } from "@/types/post"
import { ArrowRight, Calendar, User } from "lucide-react"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-2xl border border-border-default bg-surface-elevated p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border-strong">
      <div className="space-y-4">
        {/* Category badge */}
        {post.categories.length > 0 && (
          <span className="inline-flex items-center rounded-full bg-brand-primary-soft px-2.5 py-1 text-xs font-medium text-brand-primary">
            {post.categories[0]}
          </span>
        )}

        {/* Title and meta */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-text-primary">
            <Link 
              href={`/blog/${post.slug}`} 
              className="transition hover:text-brand-primary"
            >
              {post.title}
            </Link>
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}

            {post.author && (
              <Link
                href={`/authors/${post.author.slug}`}
                className="flex items-center gap-1.5 text-text-secondary transition hover:text-text-primary"
              >
                <User className="w-3.5 h-3.5" />
                {post.author.name}
              </Link>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-brand-primary group/link"
        >
          Read article
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
