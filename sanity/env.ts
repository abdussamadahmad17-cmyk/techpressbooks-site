function required(name: string, value: string | undefined, defaultValue?: string) {
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value || defaultValue || ''
}

export const apiVersion = required(
  "NEXT_PUBLIC_SANITY_API_VERSION",
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "2024-01-01"
)

export const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "development"
)

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "development"
)
