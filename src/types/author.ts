import type { Book } from "@/types/book"
import type { Post } from "@/types/post"

export interface Author {
  name: string
  slug: string
  role?: string
  bio?: string
  image?: string
  books: Book[]
  posts: Post[]
}
