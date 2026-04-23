import Image from "next/image"
import Link from "next/link"
import { BookMarked } from "lucide-react"
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
      {/* Updated via shadow system */}
      <Container>
        <div className="grid gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* Book Cover - Elevated for prominence */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg-premium bg-surface-soft shadow-2xl">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                {/* Highlight ring */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-lg-premium pointer-events-none" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tr from-brand-primary/20 to-transparent rounded-full blur-2xl -z-10" />
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
                    className="inline-block px-3 py-1.5 rounded-premium shadow-sm bg-brand-primary/10 text-xs font-semibold tracking-widest text-brand-primary uppercase"
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
                      className="rounded-premium shadow-sm bg-surface-soft px-4 py-2 text-sm text-text-secondary transition hover:shadow-md hover:bg-surface-strong"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Trust Signals & Metadata */}
            {book.isbn && (
              <div className="space-y-2 py-6 border-y border-border-subtle">
                <p className={`${textTokens.xs} text-text-muted flex items-center gap-1.5`}>
                  <BookMarked className="w-4 h-4" />
                  ISBN
                </p>
                <p className={`${textTokens.sm} font-semibold`}>
                  {book.isbn}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-2">
              <BuyButton href={book.amazonUrl} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
