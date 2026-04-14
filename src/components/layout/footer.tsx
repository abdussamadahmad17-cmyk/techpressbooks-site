import Link from "next/link"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import type { SiteSettings } from "@/types/site-settings"

interface FooterProps {
  siteSettings: SiteSettings
}

export default function Footer({ siteSettings }: FooterProps) {
  const navigation =
    siteSettings.navigation.length > 0
      ? siteSettings.navigation
      : [
          { label: "Home", href: "/" },
          { label: "Books", href: "/books" },
          { label: "Blog", href: "/blog" },
          { label: "Categories", href: "/categories" }
        ]

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container className="py-12">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Explore the platform
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Practical technical publishing for modern engineers
              </h2>
              <p className="text-sm leading-7 text-slate-400">
                Browse books, read technical articles, and explore the library by
                category or topic.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/books" variant="primary">
                Browse books
              </Button>
              <Button href="/blog" variant="secondary">
                Read the blog
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {siteSettings.siteTitle}
            </p>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              {siteSettings.footerText}
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-red-400">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={`${item.label}-${item.href}-footer`}
                  href={item.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteSettings.siteTitle}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}