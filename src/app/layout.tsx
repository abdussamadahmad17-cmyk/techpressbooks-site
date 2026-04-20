import type { Metadata } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ThemeProvider from "@/components/providers/theme-provider"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { getSiteSettings } from "@/features/site-settings/service"
import { GA_ID } from "@/lib/analytics/gtag"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  const title = siteSettings.seo?.metaTitle || siteSettings.siteTitle
  const description =
    siteSettings.seo?.metaDescription || siteSettings.siteDescription
  const ogTitle = siteSettings.seo?.ogTitle || title
  const ogDescription = siteSettings.seo?.ogDescription || description
  const ogImage = siteSettings.seo?.ogImage

  return {
    title: {
      default: title,
      template: `%s | ${siteSettings.siteTitle}`
    },
    description,
    icons: siteSettings.favicon
      ? {
          icon: siteSettings.favicon
        }
      : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: siteSettings.siteTitle
            }
          ]
        : undefined
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined
    }
  }
}

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const siteSettings = await getSiteSettings()

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {GA_ID && <PageViewTracker />}
          <Navbar siteSettings={siteSettings} />
          <main>{children}</main>
          <Footer siteSettings={siteSettings} />
        </ThemeProvider>
      </body>
    </html>
  )
}
