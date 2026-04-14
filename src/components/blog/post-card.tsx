import Link from "next/link"
import type { Post } from "@/types/post"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="space-y-4">
        {post.categories.length > 0 ? (
          <p className="text-xs uppercase tracking-[0.2em] text-red-400">
            {post.categories[0]}
          </p>
        ) : null}

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            <Link href={`/blog/${post.slug}`} className="hover:text-red-300">
              {post.title}
            </Link>
          </h2>

          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            {post.publishedAt ? (
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            ) : null}

            {post.author ? (
              <Link
                href={`/authors/${post.author.slug}`}
                className="transition hover:text-white"
              >
                By {post.author.name}
              </Link>
            ) : null}
          </div>
        </div>

        {post.excerpt ? (
          <p className="text-sm leading-7 text-slate-400">{post.excerpt}</p>
        ) : null}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex text-sm font-medium text-slate-200 transition hover:text-white"
        >
          Read article →
        </Link>
      </div>
    </article>
  )
}