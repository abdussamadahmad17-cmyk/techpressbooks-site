import Link from "next/link"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import type { SiteSettings } from "@/types/site-settings"

interface FooterProps {
  siteSettings: SiteSettings
}

const footerSections = {
  explore: [
    { label: "Books", href: "/books" },
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/categories" },
    { label: "Tags", href: "/tags" },
    { label: "Authors", href: "/authors" }
  ],
  contributors: [
    { label: "Become an Author", href: "/become-an-author" },
    { label: "Meet the Authors", href: "/authors" }
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Settings", href: "/settings" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
}

export default function Footer({ siteSettings }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container className="py-12">
        <div className="mb-12 rounded-4xl border border-slate-200/70 bg-white/70 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Explore the platform
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Practical technical publishing for modern engineers
              </h2>
              <p className="text-sm leading-7 text-slate-400">
                Browse books, read technical articles, explore authors, and
                discover content by topic and category.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/books" variant="primary">
                Browse Books
              </Button>
              <Button href="/blog" variant="secondary">
                Read the Blog
              </Button>
              <Button href="/become-an-author" variant="secondary">
                Become an Author
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {siteSettings.siteTitle}
            </p>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              {siteSettings.footerText}
            </p>
          </div>

          <FooterColumn title="Explore" links={footerSections.explore} />
          <FooterColumn title="Contributors" links={footerSections.contributors} />
          <FooterColumn title="Company" links={footerSections.company} />
          <FooterColumn title="Legal" links={footerSections.legal} />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-red-400">
        {title}
      </p>

      <nav className="flex flex-col gap-3">
        {links.map((item) => (
          <Link
            key={`${title}-${item.label}-${item.href}`}
            href={item.href}
            className="text-sm text-slate-300 transition hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}