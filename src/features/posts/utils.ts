import type { Post } from "@/types/post"

function countSharedValues(a: string[], b: string[]) {
  const setB = new Set(b)
  return a.filter((value) => setB.has(value)).length
}

export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit = 3
): Post[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedCategories = countSharedValues(
        currentPost.categories,
        post.categories
      )
      const sharedTags = countSharedValues(currentPost.tags, post.tags)

      const score = sharedCategories * 3 + sharedTags * 2

      return { post, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}