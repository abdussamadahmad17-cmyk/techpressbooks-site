function required(name: string, value: string | undefined, defaultValue?: string) {
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value || defaultValue || ''
}

export const sanityProjectId = required(
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'development'
)

export const sanityDataset = required(
  'NEXT_PUBLIC_SANITY_DATASET',
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'development'
)

export const sanityApiVersion = required(
  'NEXT_PUBLIC_SANITY_API_VERSION',
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  '2024-01-01'
)
