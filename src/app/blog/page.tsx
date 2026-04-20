import type { Metadata } from "next"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import PostGrid from "@/components/blog/post-grid"
import { getAllPosts } from "@/features/posts/service"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read practical articles on cybersecurity, system design, automation, and modern engineering."
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Technical writing for real-world engineering"
        description="Practical articles that teach clearly, build trust, and connect readers to deeper technical books."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <PostGrid posts={posts} />
        </Container>
      </section>
    </>
  )
}
