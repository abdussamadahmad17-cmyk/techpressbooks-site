'use client';

import { useCallback } from 'react';
import Image from "next/image"
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
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
    <section className="py-24 sm:py-32 lg:py-40 border-b border-border-default">
      <Container>
        <div className={`grid gap-12 ${cardPatterns.elevated()} lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center lg:gap-16 bg-gradient-to-br from-brand-primary/5 to-transparent`}>
          {/* Book Cover with Enhanced Styling */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg-premium border border-border-default bg-surface-soft shadow-2xl">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-lg-premium" />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-premium bg-brand-primary/10">
              <Star className="w-4 h-4 text-brand-primary" />
              <p className={`${textTokens.xs} text-brand-primary font-semibold`}>
                {eyebrow}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className={textTokens.h2}>
                {title}
              </h2>
              <p className={`${textTokens.bodyLarge} text-text-secondary leading-relaxed`}>
                {description}
              </p>
            </div>

            {/* Book Preview Card */}
            <div className="rounded-lg-premium border border-border-default bg-surface-strong p-8 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-premium bg-brand-primary/10 text-brand-primary text-xs font-semibold">
                    {book.categories[0] ?? "Technical"}
                  </span>
                </div>
                <h3 className={textTokens.h4}>
                  {book.title}
                </h3>
              </div>

              <p className={`${textTokens.sm} text-text-secondary leading-relaxed`}>
                {book.shortDescription}
              </p>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border-subtle">
                <a 
                  href={`/books/${book.slug}`} 
                  className="inline-flex items-center gap-2 rounded-premium bg-brand-primary text-white text-sm font-semibold px-6 py-3 transition hover:shadow-lg hover:bg-opacity-90 group"
                  onClick={handleViewBook}
                >
                  View book
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </a>

                {book.amazonUrl ? (
                  <a 
                    href={book.amazonUrl} 
                    className="inline-flex items-center gap-2 rounded-premium border-2 border-brand-primary text-brand-primary text-sm font-semibold px-6 py-3 transition hover:bg-brand-primary hover:text-white hover:shadow-lg"
                    onClick={handleBuyBook}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
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
