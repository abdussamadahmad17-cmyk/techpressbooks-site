import type { QueryParams } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<T> {
  return sanityClient.fetch<T>(query, params)
}