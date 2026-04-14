import type { Post } from "@/types/post"
import PostCard from "@/components/blog/post-card"
import EmptyState from "@/components/shared/empty-state"

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts found"
        description="Add blog posts in Sanity Studio and they will appear here."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}