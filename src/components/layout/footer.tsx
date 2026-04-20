import Link from "next/link"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import type { SiteSettings } from "@/types/site-settings"
import { ArrowRight } from "lucide-react"

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
    <footer className="border-t border-border-subtle bg-surface-soft/50">
      <Container className="py-12 lg:py-16">
        {/* CTA Banner */}
        <div className="mb-14 rounded-3xl border border-border-default bg-surface-elevated p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Explore the platform
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary text-balance">
                Practical technical publishing for modern engineers
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary">
                Browse books, read technical articles, explore authors, and
                discover content by topic and category.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/books" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Browse Books
              </Button>
              <Button href="/blog" variant="secondary">
                Read the Blog
              </Button>
            </div>
          </div>
        </div>

        {/* Footer links grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-text-primary">
                {siteSettings.siteTitle}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              {siteSettings.footerText}
            </p>
          </div>

          <FooterColumn title="Explore" links={footerSections.explore} />
          <FooterColumn title="Contributors" links={footerSections.contributors} />
          <FooterColumn title="Company" links={footerSections.company} />
          <FooterColumn title="Legal" links={footerSections.legal} />
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border-subtle pt-6">
          <p className="text-xs text-text-muted">
            {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.
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
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
        {title}
      </p>

      <nav className="flex flex-col gap-2.5">
        {links.map((item) => (
          <Link
            key={`${title}-${item.label}-${item.href}`}
            href={item.href}
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
