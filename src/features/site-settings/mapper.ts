import { urlFor } from "@/lib/sanity/image"
import type { SanitySiteSettings } from "@/features/site-settings/types"
import type { SiteSettings } from "@/types/site-settings"

export function mapSanitySiteSettingsToSiteSettings(
  settings: SanitySiteSettings | null
): SiteSettings {
  return {
    siteTitle: settings?.siteTitle ?? "TechPressBooks",
    siteDescription:
      settings?.siteDescription ??
      "Premium technical publishing for cybersecurity, system design, and automation.",
    footerText:
      settings?.footerText ??
      "Premium technical publishing for modern engineers.",
    favicon: settings?.favicon
      ? urlFor(settings.favicon).width(64).height(64).url()
      : undefined,
    primaryCta:
      settings?.primaryCta?.label && settings?.primaryCta?.href
        ? {
            label: settings.primaryCta.label,
            href: settings.primaryCta.href
          }
        : undefined,
    navigation: (settings?.navigation ?? [])
      .filter(
        (item): item is { label: string; href: string } =>
          Boolean(item?.label && item?.href)
      )
      .map((item) => ({
        label: item.label,
        href: item.href
      })),
    seo: settings?.seo
      ? {
          metaTitle: settings.seo.metaTitle,
          metaDescription: settings.seo.metaDescription,
          ogTitle: settings.seo.ogTitle,
          ogDescription: settings.seo.ogDescription,
          ogImage: settings.seo.ogImage
            ? urlFor(settings.seo.ogImage).width(1200).height(630).url()
            : undefined
        }
      : undefined
  }
}