import Image from "next/image"
import Link from "next/link"
import { cardPatterns, surfaceTokens, textTokens } from "@/lib/theme-tokens"
import type { Author } from "@/types/author"

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <article className={cardPatterns.default()}>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border-default bg-surface-soft">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="space-y-2">
            <h2 className={textTokens.h3}>
              <Link href={`/authors/${author.slug}`} className="hover:text-red-300">
                {author.name}
              </Link>
            </h2>

            {author.role ? (
              <p className={textTokens.secondary}>{author.role}</p>
            ) : null}

            <p className="text-sm text-text-muted">
              {author.books.length} {author.books.length === 1 ? "book" : "books"} ·{" "}
              {author.posts.length} {author.posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>

        {author.bio ? (
          <p className="text-sm leading-7 text-text-secondary">{author.bio}</p>
        ) : null}
      </div>
    </article>
  )
}
