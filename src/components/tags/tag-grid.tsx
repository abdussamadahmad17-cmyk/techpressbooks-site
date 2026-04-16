import type { Tag } from "@/types/tag"
import TagCard from "@/components/tags/tag-card"

interface TagGridProps {
  tags: Tag[]
}

export default function TagGrid({ tags }: TagGridProps) {
  if (tags.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200/70 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/5">
        <p className="text-lg font-medium text-slate-900 dark:text-white">No tags found.</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add tags to your books in Sanity and they will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tags.map((tag) => (
        <TagCard key={tag.slug} tag={tag} />
      ))}
    </div>
  )
}