import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
import Container from "@/components/layout/container"
import BuyButton from "@/components/books/buy-button"
import { slugifyBookTag } from "@/features/books/tags"
import { Star, BookOpen, User } from "lucide-react"

interface BookHeroProps {
  book: Book
}

export default function BookHero({ book }: BookHeroProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-gradient-to-br from-brand-primary/[0.03] via-transparent to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start lg:gap-14">
          {/* Book cover */}
          <div className="relative mx-auto lg:mx-0">
            <div className="relative aspect-[3/4] w-[280px] sm:w-[320px] lg:w-[340px] overflow-hidden rounded-2xl border border-border-default bg-surface-soft shadow-xl">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 1024px) 320px, 340px"
                className="object-cover"
              />
            </div>
            
            {/* Featured badge */}
            {book.featured && (
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-brand-primary px-3 py-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-semibold text-white">Featured</span>
              </div>
            )}
          </div>

          {/* Book info */}
          <div className="space-y-6">
            {/* Categories */}
            {book.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category) => (
                  <span 
                    key={category}
                    className="inline-flex items-center rounded-full bg-brand-primary-soft px-3 py-1 text-xs font-medium text-brand-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title and subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary text-balance leading-tight">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="text-lg sm:text-xl text-text-secondary">
                  {book.subtitle}
                </p>
              )}

              {book.author && (
                <p className="flex items-center gap-2 text-base text-text-muted">
                  <User className="w-4 h-4" />
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
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
              {book.shortDescription}
            </p>

            {/* Tags */}
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${slugifyBookTag(tag)}`}
                    className="rounded-full border border-border-default bg-surface-soft px-3 py-1.5 text-sm text-text-secondary transition hover:border-border-strong hover:bg-surface-inset hover:text-text-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <BuyButton href={book.amazonUrl} title={book.title} />

              {book.isbn && (
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <BookOpen className="w-4 h-4" />
                  <span>ISBN: {book.isbn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
