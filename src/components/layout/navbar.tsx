"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)]" />
          <span className="text-base font-semibold uppercase tracking-[0.18em] text-white">
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
                  "text-sm font-medium transition",
                  active ? "text-white" : "text-slate-300 hover:text-white"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/become-an-author" variant="secondary" size="sm">
            Become an Author
          </Button>
          <Button href="/books" variant="primary" size="sm">
            Browse Books
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-white/10 lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={`${item.label}-${item.href}-mobile`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                <Button href="/become-an-author" variant="secondary" size="sm">
                  Become an Author
                </Button>
                <Button href="/books" variant="primary" size="sm">
                  Browse Books
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}