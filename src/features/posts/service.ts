import { sanityFetch } from "@/lib/sanity/fetch"
import {
  allPostsQuery,
  allPostSlugsQuery,
  postBySlugQuery
} from "@/lib/sanity/queries/posts"
import { mapSanityPostToPost } from "@/features/posts/mapper"
import type { SanityPost } from "@/features/posts/types"
import type { Post } from "@/types/post"

export async function getAllPosts(): Promise<Post[]> {
  const posts = await sanityFetch<SanityPost[]>({
    query: allPostsQuery
  })

  return posts.map(mapSanityPostToPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug }
  })

  if (!post) {
    return null
  }

  return mapSanityPostToPost(post)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: allPostSlugsQuery
  })

  return slugs.map((item) => item.slug)
}