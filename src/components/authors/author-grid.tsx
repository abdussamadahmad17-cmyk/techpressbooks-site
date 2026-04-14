import type { Author } from "@/types/author"
import AuthorCard from "@/components/authors/author-card"
import EmptyState from "@/components/shared/empty-state"

interface AuthorGridProps {
  authors: Author[]
}

export default function AuthorGrid({ authors }: AuthorGridProps) {
  if (authors.length === 0) {
    return (
      <EmptyState
        title="No authors found"
        description="Add authors in Sanity Studio and they will appear here."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {authors.map((author) => (
        <AuthorCard key={author.slug} author={author} />
      ))}
    </div>
  )
}
