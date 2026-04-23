"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Home, BookOpen, PenTool, FolderOpen, Users, Menu, X } from "lucide-react"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import ThemeToggle from "@/components/shared/theme-toggle"
import { cn } from "@/lib/cn"
import type { SiteSettings } from "@/types/site-settings"

interface NavbarProps {
  siteSettings: SiteSettings
}

const iconMap: Record<string, React.ReactNode> = {
  "/": <Home className="w-4 h-4" />,
  "/books": <BookOpen className="w-4 h-4" />,
  "/blog": <PenTool className="w-4 h-4" />,
  "/categories": <FolderOpen className="w-4 h-4" />,
  "/authors": <Users className="w-4 h-4" />
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

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href)
            const icon = iconMap[item.href]

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-premium text-sm font-semibold transition",
                  active 
                    ? "text-brand-primary bg-brand-primary/10" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-soft"
                )}
                aria-current={active ? "page" : undefined}
              >
                {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
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
          className="inline-flex items-center gap-2 rounded-premium shadow-sm px-3 py-2 text-text-secondary hover:text-text-primary transition lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-border-default bg-gradient-to-b from-surface-default to-surface-soft lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <Container className="py-6">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const active = isActive(item.href)
                const icon = iconMap[item.href]

                return (
                  <Link
                    key={`${item.label}-${item.href}-mobile`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "inline-flex items-center gap-3 rounded-premium px-4 py-3 text-sm font-semibold transition",
                      active
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-text-secondary hover:bg-surface-strong hover:text-text-primary"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-6 space-y-3">
                <div className="py-2">
                  <ThemeToggle />
                </div>
                <Button href="/become-an-author" variant="secondary" size="sm" className="w-full justify-center">
                  Become a Contributor
                </Button>
                <Button href="/books" variant="primary" size="sm" className="w-full justify-center">
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
