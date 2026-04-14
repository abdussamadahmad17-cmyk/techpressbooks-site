import type { Post } from "@/types/post"

export interface PostTag {
  title: string
  slug: string
  count: number
}

function slugifyTag(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getPostTags(posts: Post[]): PostTag[] {
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([title, count]) => ({
      title,
      slug: slugifyTag(title),
      count
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getPostTagBySlug(posts: Post[], slug: string): PostTag | null {
  return getPostTags(posts).find((tag) => tag.slug === slug) ?? null
}

export function getPostsByTagSlug(posts: Post[], slug: string): Post[] {
  return posts.filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === slug)
  )
}