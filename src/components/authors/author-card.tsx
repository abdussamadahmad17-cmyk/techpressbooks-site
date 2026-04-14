import Image from "next/image"
import Link from "next/link"
import type { Author } from "@/types/author"

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
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
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              <Link href={`/authors/${author.slug}`} className="hover:text-red-300">
                {author.name}
              </Link>
            </h2>

            {author.role ? (
              <p className="text-sm text-slate-400">{author.role}</p>
            ) : null}

            <p className="text-sm text-slate-500">
              {author.books.length} {author.books.length === 1 ? "book" : "books"} ·{" "}
              {author.posts.length} {author.posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>

        {author.bio ? (
          <p className="text-sm leading-7 text-slate-400">{author.bio}</p>
        ) : null}
      </div>
    </article>
  )
}
