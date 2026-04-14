'use client';

import Image from "next/image"
import Link from "next/link"
import { useCallback } from 'react'
import type { Book } from "@/types/book"
import { event } from "@/lib/analytics/gtag"
import { slugifyBookTag } from "@/features/books/tags"

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

  const handleBookClick = useCallback(() => {
    event({
      action: 'book_view',
      category: 'engagement',
      label: book.title
    });
  }, [book.title]);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <Link href={`/books/${book.slug}`} className="block" onClick={handleBookClick}>
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          {primaryCategory ? (
            <Link
              href={`/categories/${slugifyCategory(primaryCategory)}`}
              className="inline-block text-xs uppercase tracking-[0.2em] text-red-400 hover:text-red-300"
            >
              {primaryCategory}
            </Link>
          ) : null}

          <h3 className="text-xl font-semibold tracking-tight text-white">
            <Link
              href={`/books/${book.slug}`}
              className="transition hover:text-red-300"
            >
              {book.title}
            </Link>
          </h3>

          {book.subtitle ? (
            <p className="text-sm text-slate-400">{book.subtitle}</p>
          ) : null}

          {book.author ? (
            <p className="text-sm text-slate-300">
              By{" "}
              <Link
                href={`/authors/${book.author.slug}`}
                className="transition hover:text-white"
              >
                {book.author.name}
              </Link>
            </p>
          ) : null}
        </div>

        <p className="text-sm leading-7 text-slate-400">
          {book.shortDescription}
        </p>

        {book.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {book.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugifyBookTag(tag)}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
