import { sanityFetch } from '@/lib/sanity/fetch'
import { siteSettingsQuery } from '@/lib/sanity/queries/siteSettings'
import { mapSanitySiteSettingsToSiteSettings } from '@/features/site-settings/mapper'
import type { SanitySiteSettings } from '@/features/site-settings/types'
import type { SiteSettings } from '@/types/site-settings'

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery
  })

  return mapSanitySiteSettingsToSiteSettings(settings)
}