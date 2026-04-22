"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import ThemeToggle from "@/components/shared/theme-toggle"
import { cn } from "@/lib/cn"
import type { SiteSettings } from "@/types/site-settings"

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
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-default/80 backdrop-blur-lg">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-lg" />
          <span className="text-sm font-bold uppercase tracking-widest text-text-primary">
            {siteSettings.siteTitle}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition relative pb-1",
                  active 
                    ? "text-text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-primary" 
                    : "text-text-secondary hover:text-text-primary"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Button href="/become-an-author" variant="secondary" size="sm">
            Contribute
          </Button>
          <Button href="/books" variant="primary" size="sm">
            Explore Books
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center rounded-premium border border-border-default px-3 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-border-default lg:hidden">
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
                      "rounded-premium px-4 py-2.5 text-sm font-semibold transition",
                      active
                        ? "bg-surface-soft text-text-primary"
                        : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-4">
                <ThemeToggle />
                <Button href="/become-an-author" variant="secondary" size="sm">
                  Contribute
                </Button>
                <Button href="/books" variant="primary" size="sm">
                  Explore Books
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
