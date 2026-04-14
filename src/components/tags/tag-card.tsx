import Link from "next/link"
import type { Tag } from "@/types/tag"

interface TagCardProps {
  tag: Tag
}

export default function TagCard({ tag }: TagCardProps) {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="group block rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-red-400">Tag</p>

        <h2 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-red-300">
          {tag.title}
        </h2>

        <p className="text-sm text-slate-400">
          {tag.count} {tag.count === 1 ? "book" : "books"}
        </p>
      </div>
    </Link>
  )
}