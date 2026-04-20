"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import ThemeToggle from "@/components/shared/theme-toggle"
import { cn } from "@/lib/cn"
import type { SiteSettings } from "@/types/site-settings"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  siteSettings: SiteSettings
}

const headerFallbackNavigation = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Blog", href: "/blog" },
  { label: "Categories", href: "/categories" },
  { label: "Authors", href: "/authors" }
]

export default function Navbar({ siteSettings }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigation =
    siteSettings.navigation.length > 0
      ? siteSettings.navigation.filter((item) =>
          ["/", "/books", "/blog", "/categories", "/authors"].includes(item.href)
        )
      : headerFallbackNavigation

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-elevated/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-[0_0_16px_rgba(220,38,38,0.5)] transition-shadow group-hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-text-primary">
            {siteSettings.siteTitle}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  active 
                    ? "text-text-primary bg-surface-soft" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-soft/50"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/become-an-author" variant="ghost" size="sm">
            Become an Author
          </Button>
          <Button href="/books" variant="primary" size="sm">
            Browse Books
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border-default bg-surface-elevated text-text-secondary transition hover:bg-surface-soft hover:text-text-primary lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="border-t border-border-default bg-surface-elevated lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={`${item.label}-${item.href}-mobile`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-surface-soft text-text-primary"
                        : "text-text-secondary hover:bg-surface-soft/50 hover:text-text-primary"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-border-subtle pt-4">
                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
                <Button href="/become-an-author" variant="secondary" size="md">
                  Become an Author
                </Button>
                <Button href="/books" variant="primary" size="md">
                  Browse Books
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
