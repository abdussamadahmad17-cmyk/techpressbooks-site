import { urlFor } from "@/lib/sanity/image"
import type { Author } from "@/types/author"
import type { SanityAuthor } from "@/features/authors/types"
import { mapSanityBookToBook } from "@/features/books/mapper"
import { mapSanityPostToPost } from "@/features/posts/mapper"

export function mapSanityAuthorToAuthor(author: SanityAuthor): Author {
  return {
    name: author.name,
    slug: author.slug,
    role: author.role,
    bio: author.bio,
    image: author.image
      ? urlFor(author.image).width(600).height(600).url()
      : undefined,
    books: (author.books ?? []).map(mapSanityBookToBook),
    posts: (author.posts ?? []).map(mapSanityPostToPost)
  }
}
