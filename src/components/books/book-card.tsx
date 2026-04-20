import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
import { slugifyBookTag } from "@/features/books/tags"
import { ArrowRight, Star } from "lucide-react"

function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const primaryCategory = book.categories[0]

  return (
    <article className="group relative rounded-2xl border border-border-default bg-surface-elevated p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border-strong">
      <div className="flex gap-5">
        {/* Book cover */}
        <Link
          href={`/books/${book.slug}`}
          className="relative block h-44 w-[120px] shrink-0 overflow-hidden rounded-xl border border-border-default bg-surface-soft shadow-sm"
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="120px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {book.featured && (
            <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary shadow-md">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
            </div>
          )}
        </Link>

        {/* Book info */}
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            {/* Category */}
            {primaryCategory && (
              <Link
                href={`/categories/${slugifyCategory(primaryCategory)}`}
                className="inline-flex items-center rounded-full bg-brand-primary-soft px-2.5 py-1 text-xs font-medium text-brand-primary transition hover:bg-brand-primary/20"
              >
                {primaryCategory}
              </Link>
            )}

            {/* Title and subtitle */}
            <div className="space-y-1">
              <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-text-primary">
                <Link
                  href={`/books/${book.slug}`}
                  className="transition hover:text-brand-primary"
                >
                  {book.title}
                </Link>
              </h3>

              {book.subtitle && (
                <p className="line-clamp-1 text-sm text-text-secondary">
                  {book.subtitle}
                </p>
              )}

              {book.author && (
                <p className="text-sm text-text-muted">
                  By{" "}
                  <Link
                    href={`/authors/${book.author.slug}`}
                    className="text-text-secondary transition hover:text-text-primary"
                  >
                    {book.author.name}
                  </Link>
                </p>
              )}
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {book.shortDescription}
            </p>
          </div>

          {/* Tags and actions */}
          <div className="mt-4 space-y-3">
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {book.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${slugifyBookTag(tag)}`}
                    className="rounded-full border border-border-default bg-surface-soft px-2.5 py-1 text-xs text-text-muted transition hover:border-border-strong hover:bg-surface-inset hover:text-text-secondary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/books/${book.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-sm font-medium text-text-inverse shadow-sm transition-all hover:bg-brand-primary-hover hover:shadow-md"
              >
                View book
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {book.amazonUrl && (
                <Link
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-border-strong bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition-all hover:bg-surface-soft"
                >
                  Buy on Amazon
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
