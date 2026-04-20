import Image from "next/image"
import Link from "next/link"
import type { Author } from "@/types/author"
import { BookOpen, FileText, ArrowRight } from "lucide-react"

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <article className="group rounded-2xl border border-border-default bg-surface-elevated p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border-strong">
      <div className="space-y-5">
        {/* Header with avatar */}
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border-default bg-surface-soft">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-brand-primary-soft">
                <span className="text-xl font-semibold text-brand-primary">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5 min-w-0">
            <h2 className="text-lg font-semibold text-text-primary truncate">
              <Link 
                href={`/authors/${author.slug}`} 
                className="transition hover:text-brand-primary"
              >
                {author.name}
              </Link>
            </h2>

            {author.role && (
              <p className="text-sm text-text-secondary truncate">{author.role}</p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {author.books.length} {author.books.length === 1 ? "book" : "books"}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {author.posts.length} {author.posts.length === 1 ? "post" : "posts"}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {author.bio && (
          <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
            {author.bio}
          </p>
        )}

        {/* View profile link */}
        <Link
          href={`/authors/${author.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-brand-primary group/link"
        >
          View profile
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
