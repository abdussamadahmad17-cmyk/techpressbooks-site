import Link from "next/link"
import { BookOpen, Pen, ArrowRight } from "lucide-react"
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
import { textTokens, ctaPatterns } from "@/lib/theme-tokens"

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
              "Books and articles built around real systems, real constraints, and operational tradeoffs."
          },
          {
            title: "Security-minded",
            description:
              "Clear explanations shaped by practical threat models, architecture risks, and engineering realism."
          },
          {
            title: "Engineer-friendly",
            description:
              "Structured, readable, and useful technical writing without academic fluff or vague abstractions."
          }
        ]}
      />

      <section className="py-24 sm:py-32 lg:py-40 border-b border-border-default">
        <Container>
          <div className="space-y-4 mb-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-premium bg-brand-primary/10">
              <BookOpen className="w-4 h-4 text-brand-primary" />
              <p className={`${textTokens.xs} text-brand-primary font-semibold`}>
                Featured Titles
              </p>
            </div>
            <h2 className={textTokens.h2}>
              Start with the flagship books
            </h2>
            <p className={`${textTokens.bodyLarge} text-text-secondary leading-relaxed`}>
              Hand-picked, production-focused technical guides that go beyond tutorials. Each book is curated for engineers building real systems.
            </p>
          </div>

          <div className="flex items-end justify-between mb-12">
            <div />
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-light transition font-semibold group"
            >
              View all books
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <BookGrid books={featuredBooks} />
        </Container>
      </section>

      {featuredBook ? <FeaturedBookCta book={featuredBook} /> : null}

      {latestPosts.length > 0 ? (
        <section className="py-24 sm:py-32 lg:py-40 border-b border-border-default">
          <Container>
            <div className="space-y-4 mb-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-premium bg-brand-primary/10">
                <Pen className="w-4 h-4 text-brand-primary" />
                <p className={`${textTokens.xs} text-brand-primary font-semibold`}>
                  Latest Articles
                </p>
              </div>
              <h2 className={textTokens.h2}>
                Learn through practical technical writing
              </h2>
              <p className={`${textTokens.bodyLarge} text-text-secondary leading-relaxed`}>
                In-depth explorations and practical guides from industry professionals. Real-world insights you can apply immediately.
              </p>
            </div>

            <div className="flex items-end justify-between mb-12">
              <div />
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-light transition font-semibold group"
              >
                Visit the blog
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <PostGrid posts={latestPosts} />
          </Container>
        </section>
      ) : null}

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
