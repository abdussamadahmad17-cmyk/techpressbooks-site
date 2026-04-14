import type { Post } from "@/types/post"
import Container from "@/components/layout/container"
import PostGrid from "@/components/blog/post-grid"

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="pb-24">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Related Articles
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Continue reading
            </h2>
            <p className="max-w-2xl text-slate-400">
              More articles connected to this topic and technical domain.
            </p>
          </div>

          <PostGrid posts={posts} />
        </div>
      </Container>
    </section>
  )
}