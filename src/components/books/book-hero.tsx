import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
import Container from "@/components/layout/container"
import BuyButton from "@/components/books/buy-button"
import { slugifyBookTag } from "@/features/books/tags"
import { textTokens, sectionPatterns } from "@/lib/theme-tokens"

interface BookHeroProps {
  book: Book
}

export default function BookHero({ book }: BookHeroProps) {
  return (
    <section className={`${sectionPatterns.header()} border-b border-border-default`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* Book Cover - Enlarged for prominence */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg-premium border border-border-default bg-surface-soft shadow-elevation">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-8">
            {/* Category/Metadata */}
            {book.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-block px-3 py-1.5 rounded-premium border border-border-accent bg-surface-soft text-xs font-semibold tracking-widest text-brand-primary uppercase"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Title, Subtitle, Author */}
            <div className="space-y-4">
              <div>
                <h1 className={textTokens.h1}>
                  {book.title}
                </h1>
              </div>

              {book.subtitle ? (
                <p className={`${textTokens.bodyLarge} text-text-secondary`}>
                  {book.subtitle}
                </p>
              ) : null}

              {book.author ? (
                <div className="pt-4 border-t border-border-subtle">
                  <p className={textTokens.meta}>Author</p>
                  <p className="mt-2">
                    <Link
                      href={`/authors/${book.author.slug}`}
                      className={`${textTokens.h4} transition hover:text-brand-primary`}
                    >
                      {book.author.name}
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>

            {/* Description */}
            <p className={`${textTokens.body} max-w-2xl leading-relaxed`}>
              {book.shortDescription}
            </p>

            {/* Tags/Topics */}
            {book.tags.length > 0 ? (
              <div className="space-y-3">
                <p className={textTokens.meta}>Topics</p>
                <div className="flex flex-wrap gap-2">
                  {book.tags.slice(0, 6).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${slugifyBookTag(tag)}`}
                      className="rounded-premium border border-border-subtle bg-surface-soft px-4 py-2 text-sm text-text-secondary transition hover:border-border-accent hover:bg-surface-strong"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* CTA and Metadata */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border-subtle">
              <BuyButton href={book.amazonUrl} />

              <div className="space-y-1">
                {book.isbn ? (
                  <p className={textTokens.meta}>ISBN</p>
                ) : null}
                {book.isbn ? (
                  <p className={textTokens.sm}>
                    {book.isbn}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
