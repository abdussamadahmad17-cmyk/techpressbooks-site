import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
import { slugifyBookTag } from "@/features/books/tags"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"

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
    <article className={`group ${cardPatterns.elevated()}`}>
      <div className="flex flex-col gap-5">
        {/* Cover Image */}
        <Link
          href={`/books/${book.slug}`}
          className="relative aspect-[3/4] overflow-hidden rounded-premium bg-surface-soft shadow-md"
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="100%"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <div className="space-y-4">
          {/* Category */}
          {primaryCategory ? (
            <Link
              href={`/categories/${slugifyCategory(primaryCategory)}`}
              className="inline-block text-xs font-semibold tracking-widest text-brand-primary uppercase transition hover:text-brand-light"
            >
              {primaryCategory}
            </Link>
          ) : null}

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h3 className={`${textTokens.h4} line-clamp-3`}>
              <Link
                href={`/books/${book.slug}`}
                className="transition hover:text-brand-primary"
              >
                {book.title}
              </Link>
            </h3>

            {book.subtitle ? (
              <p className={`${textTokens.sm} text-text-secondary line-clamp-2`}>
                {book.subtitle}
              </p>
            ) : null}
          </div>

          {/* Author */}
          {book.author ? (
            <p className={`${textTokens.sm} text-text-secondary`}>
              By{" "}
              <Link
                href={`/authors/${book.author.slug}`}
                className="font-semibold text-text-primary transition hover:text-brand-primary"
              >
                {book.author.name}
              </Link>
            </p>
          ) : null}

          {/* Description */}
          <p className={`${textTokens.sm} text-text-secondary line-clamp-3 leading-relaxed`}>
            {book.shortDescription}
          </p>

          {/* Tags */}
          {book.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {book.tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyBookTag(tag)}`}
                  className="rounded-premium border border-border-subtle bg-surface-soft px-3 py-1.5 text-xs text-text-secondary transition hover:border-border-accent hover:bg-surface-strong"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border-subtle">
            <Link
              href={`/books/${book.slug}`}
              className="inline-flex rounded-premium bg-brand-primary text-white text-sm font-semibold px-4 py-2.5 transition hover:shadow-lg hover:bg-opacity-90"
            >
              View book
              <span aria-hidden="true">→</span>
            </Link>

            {book.amazonUrl ? (
              <Link
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-premium border border-brand-primary text-brand-primary text-sm font-semibold px-4 py-2.5 transition hover:bg-brand-primary hover:text-white"
              >
                Buy on Amazon
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
