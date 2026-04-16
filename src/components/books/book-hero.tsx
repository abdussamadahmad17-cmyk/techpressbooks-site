import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"
import Container from "@/components/layout/container"
import BuyButton from "@/components/books/buy-button"
import { slugifyBookTag } from "@/features/books/tags"

interface BookHeroProps {
  book: Book
}

export default function BookHero({ book }: BookHeroProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start">
          <div className="relative aspect-3/4 overflow-hidden rounded-4xl border border-slate-200/70 bg-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-800 dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {book.categories.length > 0 ? (
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                  {book.categories.join(' • ')}
                </p>
              ) : null}

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {book.title}
                </h1>

                {book.subtitle ? (
                  <p className="text-lg text-slate-700 dark:text-slate-300 sm:text-xl">
                    {book.subtitle}
                  </p>
                ) : null}

                {book.author ? (
                  <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
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

            <p className="max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
              {book.shortDescription}
            </p>

            {book.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${slugifyBookTag(tag)}`}
                    className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-sm text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <BuyButton href={book.amazonUrl} />

              {book.isbn ? (
                <p className="text-sm text-slate-500">ISBN: {book.isbn}</p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
