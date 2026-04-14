import type { SanityBook } from "@/features/books/types"
import type { SanityPost } from "@/features/posts/types"

export interface SanityAuthor {
  name: string
  slug: string
  role?: string
  bio?: string
  image?: {
    asset?: {
      _ref: string
      _type: "reference"
    }
  }
  books?: SanityBook[]
  posts?: SanityPost[]
}
