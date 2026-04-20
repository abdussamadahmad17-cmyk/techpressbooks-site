'use client';

import { useCallback } from 'react';
import Image from "next/image"
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import type { Book } from "@/types/book"
import { event } from "@/lib/analytics/gtag"
import { surfaceTokens, textTokens } from "@/lib/theme-tokens"

interface FeaturedBookCtaProps {
  book: Book
  eyebrow?: string
  title?: string
  description?: string
}

export default function FeaturedBookCta({
  book,
  eyebrow = "Featured Book",
  title = "Go deeper with a practical technical guide",
  description = "Move beyond short-form content and study the full system with a structured, production-focused book."
}: FeaturedBookCtaProps) {
  const handleViewBook = useCallback(() => {
    event({
      action: 'featured_book_view',
      category: 'engagement',
      label: book.title
    });
  }, [book.title]);

  const handleBuyBook = useCallback(() => {
    event({
      action: 'featured_book_purchase',
      category: 'conversion',
      label: book.title
    });
  }, [book.title]);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className={`grid gap-8 ${surfaceTokens.glass} p-8 rounded-[2rem] lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center`}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-border-default bg-surface-soft">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              {eyebrow}
            </p>

            <div className="space-y-3">
              <h2 className={textTokens.h2}>
                {title}
              </h2>
              <p className={textTokens.body}>
                {description}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-border-default bg-surface-strong p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-text-secondary">
                {book.categories[0] ?? "Book"}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-text-primary">
                {book.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                {book.shortDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button 
                  href={`/books/${book.slug}`} 
                  variant="primary"
                  onClick={handleViewBook}
                >
                  View book
                </Button>

                {book.amazonUrl ? (
                  <Button 
                    href={book.amazonUrl} 
                    variant="secondary"
                    onClick={handleBuyBook}
                  >
                    Buy on Amazon
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}