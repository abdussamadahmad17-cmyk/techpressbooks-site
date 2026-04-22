'use client';

import { useCallback } from 'react';
import Image from "next/image"
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import type { Book } from "@/types/book"
import { event } from "@/lib/analytics/gtag"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"

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
    <section className="py-24 sm:py-32">
      <Container>
        <div className={`grid gap-8 ${cardPatterns.elevated()} lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center lg:gap-12`}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg-premium border border-border-default bg-surface-soft shadow-lg">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className={textTokens.meta}>
              {eyebrow}
            </p>

            <div className="space-y-4">
              <h2 className={textTokens.h2}>
                {title}
              </h2>
              <p className={`${textTokens.body} text-text-secondary`}>
                {description}
              </p>
            </div>

            <div className="rounded-lg-premium border border-border-default bg-surface-strong p-7 space-y-5">
              <div>
                <p className={textTokens.meta}>
                  {book.categories[0] ?? "Book"}
                </p>
                <h3 className={`mt-3 ${textTokens.h4}`}>
                  {book.title}
                </h3>
              </div>

              <p className={`${textTokens.sm} text-text-secondary leading-relaxed`}>
                {book.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-border-subtle">
                <a 
                  href={`/books/${book.slug}`} 
                  className="inline-flex rounded-premium bg-brand-primary text-white text-sm font-semibold px-5 py-2.5 transition hover:shadow-lg hover:bg-opacity-90"
                  onClick={handleViewBook}
                >
                  View book
                  <span aria-hidden="true">→</span>
                </a>

                {book.amazonUrl ? (
                  <a 
                    href={book.amazonUrl} 
                    className="inline-flex rounded-premium border-2 border-brand-primary text-brand-primary text-sm font-semibold px-5 py-2.5 transition hover:bg-brand-primary hover:text-white"
                    onClick={handleBuyBook}
                  >
                    Buy on Amazon
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
