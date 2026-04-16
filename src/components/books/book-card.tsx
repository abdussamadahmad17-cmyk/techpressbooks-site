import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
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

  return (
    <article className="group rounded-3xl border border-slate-200/70 bg-white p-4 transition duration-300 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
      <div className="flex gap-4">
        <Link
          href={`/books/${book.slug}`}
          className="relative block h-40 w-[110px] shrink-0 overflow-hidden rounded-xl border border-slate-200/70 bg-slate-100 dark:border-white/10 dark:bg-slate-800"
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="110px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-2">
            {primaryCategory ? (
              <Link
                href={`/categories/${slugifyCategory(primaryCategory)}`}
                className="inline-block text-[11px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300"
              >
                {primaryCategory}
              </Link>
            ) : null}

            <div className="space-y-1">
              <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                <Link
                  href={`/books/${book.slug}`}
                  className="transition hover:text-red-500 dark:hover:text-red-300"
                >
                  {book.title}
                </Link>
              </h3>

              {book.subtitle ? (
                <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {book.subtitle}
                </p>
              ) : null}

              {book.author ? (
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  By{" "}
                  <Link
                    href={`/authors/${book.author.slug}`}
                    className="transition hover:text-slate-900 dark:hover:text-white"
                  >
                    {book.author.name}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {book.shortDescription}
          </p>

          {book.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {book.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyBookTag(tag)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={`/books/${book.slug}`}
              className="inline-flex rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
              View book
            </Link>

            {book.amazonUrl ? (
              <Link
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
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
