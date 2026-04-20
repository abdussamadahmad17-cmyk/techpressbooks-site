import Link from "next/link"
import Container from "@/components/layout/container"
import BookGrid from "@/components/books/book-grid"
import HeroSection from "@/components/home/hero-section"
import TrustStrip from "@/components/marketing/trust-strip"
import SectionCta from "@/components/marketing/section-cta"
import FeaturedBookCta from "@/components/marketing/featured-book-cta"
import { getFeaturedBooks } from "@/features/books/service"
import { getSiteSettings } from "@/features/site-settings/service"
import { getAllPosts } from "@/features/posts/service"
import PostGrid from "@/components/blog/post-grid"
import { ArrowRight } from "lucide-react"

export default async function HomePage() {
  const [featuredBooks, siteSettings, posts] = await Promise.all([
    getFeaturedBooks(),
    getSiteSettings(),
    getAllPosts()
  ])

  const primaryCta = siteSettings.primaryCta ?? {
    label: "Explore the Library",
    href: "/books"
  }

  const featuredBook = featuredBooks[0]
  const latestPosts = posts.slice(0, 2)

  return (
    <>
      <HeroSection 
        siteDescription={siteSettings.siteDescription}
        primaryCta={primaryCta}
      />

      <TrustStrip
        items={[
          {
            title: "Production-focused",
            description:
              "Books and articles built around real systems, real constraints, and operational tradeoffs.",
            icon: "cpu"
          },
          {
            title: "Security-minded",
            description:
              "Clear explanations shaped by practical threat models, architecture risks, and engineering realism.",
            icon: "shield"
          },
          {
            title: "Engineer-friendly",
            description:
              "Structured, readable, and useful technical writing without academic fluff or vague abstractions.",
            icon: "book"
          }
        ]}
      />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col gap-4 mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Featured Titles
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary text-balance">
                Start with the flagship books
              </h2>
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group"
            >
              View all books
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <BookGrid books={featuredBooks} />
        </Container>
      </section>

      {featuredBook && <FeaturedBookCta book={featuredBook} />}

      {latestPosts.length > 0 && (
        <section className="py-20 sm:py-24 lg:py-28 border-t border-border-subtle">
          <Container>
            <div className="flex flex-col gap-4 mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                  Latest Articles
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary text-balance">
                  Learn through practical technical writing
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group"
              >
                Visit the blog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <PostGrid posts={latestPosts} />
          </Container>
        </section>
      )}

      <SectionCta
        eyebrow="Build authority through clarity"
        title="Move from scattered tutorials to structured technical learning"
        description="TechPressBooks exists for readers who want more than surface-level content. Explore practical books and technical writing designed for real-world engineering."
        primaryAction={{ label: "Browse books", href: "/books" }}
        secondaryAction={{ label: "Explore categories", href: "/categories" }}
      />
    </>
  )
}
