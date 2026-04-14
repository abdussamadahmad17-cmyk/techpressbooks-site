export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function pageview(url: string) {
  if (!GA_ID || typeof window.gtag !== "function") return

  window.gtag("config", GA_ID, {
    page_path: url
  })
}

export function event({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label?: string
  value?: number
}) {
  if (!GA_ID || typeof window.gtag !== "function") return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value
  })
}