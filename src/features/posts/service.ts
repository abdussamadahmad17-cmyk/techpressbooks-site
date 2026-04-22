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
  try {
    const posts = await sanityFetch<SanityPost[]>({
      query: allPostsQuery
    })

    return posts.map(mapSanityPostToPost)
  } catch (error) {
    console.warn('Failed to fetch posts from Sanity:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await sanityFetch<SanityPost | null>({
      query: postBySlugQuery,
      params: { slug }
    })

    if (!post) {
      return null
    }

    return mapSanityPostToPost(post)
  } catch (error) {
    console.warn('Failed to fetch post from Sanity:', error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allPostSlugsQuery
    })

    return slugs.map((item) => item.slug)
  } catch (error) {
    console.warn('Failed to fetch post slugs from Sanity:', error)
    return []
  }
}
