'use client';

import { useCallback } from 'react';
import Image from "next/image"
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import type { Book } from "@/types/book"
import { event } from "@/lib/analytics/gtag"
import { ArrowRight, ShoppingCart, Star } from "lucide-react"

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
        <div className="relative overflow-hidden rounded-3xl border border-border-default bg-surface-elevated">
          {/* Subtle gradient accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gradient-to-br from-brand-primary/[0.03] via-transparent to-transparent" />
          </div>

          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center lg:gap-12">
            {/* Book cover */}
            <div className="relative mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] w-[200px] sm:w-[220px] overflow-hidden rounded-2xl border border-border-default bg-surface-soft shadow-xl">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              {/* Featured badge */}
              <div className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-semibold text-white">Featured</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">
                  {eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary text-balance mb-3">
                  {title}
                </h2>
                <p className="text-base leading-relaxed text-text-secondary max-w-xl">
                  {description}
                </p>
              </div>

              {/* Book info card */}
              <div className="rounded-2xl border border-border-default bg-surface-strong p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium text-text-secondary">
                      {book.categories[0] ?? "Book"}
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {book.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary max-w-md">
                      {book.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button 
                    href={`/books/${book.slug}`} 
                    variant="primary"
                    onClick={handleViewBook}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    View book
                  </Button>

                  {book.amazonUrl && (
                    <Button 
                      href={book.amazonUrl} 
                      variant="secondary"
                      onClick={handleBuyBook}
                      icon={<ShoppingCart className="w-4 h-4" />}
                    >
                      Buy on Amazon
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
