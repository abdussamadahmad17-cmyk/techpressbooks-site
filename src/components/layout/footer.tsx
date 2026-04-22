import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"
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
    <footer className="border-t border-border-default bg-surface-soft">
      <Container className="py-20 sm:py-28">
        {/* CTA Section */}
        <div className={`${cardPatterns.elevated()} mb-16 bg-gradient-to-br from-brand-primary/5 to-brand-primary/2 border-2 border-brand-primary`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className={textTokens.meta}>
                Explore the platform
              </p>
              <h2 className={textTokens.h2}>
                Practical technical publishing for modern engineers
              </h2>
              <p className={`${textTokens.body} text-text-secondary max-w-xl`}>
                Browse books, read technical articles, explore authors, and discover content by topic and category.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 flex-shrink-0">
              <Button href="/books" variant="primary">
                Browse Books
              </Button>
              <Button href="/blog" variant="secondary">
                Read the Blog
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="mb-12 grid gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
              <p className={`${textTokens.xs} text-text-primary`}>
                {siteSettings.siteTitle}
              </p>
            </div>
            <p className={`${textTokens.sm} max-w-md text-text-secondary leading-relaxed`}>
              {siteSettings.footerText}
            </p>
          </div>

          {/* Navigation Sections */}
          <FooterColumn title="Explore" links={footerSections.explore} />
          <FooterColumn title="Contributors" links={footerSections.contributors} />
          <FooterColumn title="Company" links={footerSections.company} />
          <FooterColumn title="Legal" links={footerSections.legal} />
        </div>

        {/* Bottom */}
        <div className="border-t border-border-default pt-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${textTokens.xs} text-text-muted`}>
              © {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className={`${textTokens.xs} text-text-muted hover:text-brand-primary transition`}>
                GitHub
              </a>
              <a href="#" className={`${textTokens.xs} text-text-muted hover:text-brand-primary transition`}>
                Twitter
              </a>
              <a href="#" className={`${textTokens.xs} text-text-muted hover:text-brand-primary transition`}>
                LinkedIn
              </a>
            </div>
          </div>
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
    <div className="space-y-4">
      <p className={textTokens.meta}>
        {title}
      </p>

      <nav className="flex flex-col gap-2.5">
        {links.map((item) => (
          <Link
            key={`${title}-${item.label}-${item.href}`}
            href={item.href}
            className={`${textTokens.sm} text-text-secondary transition hover:text-brand-primary`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
