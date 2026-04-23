'use client';

import { useCallback } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"
import { textTokens, ctaPatterns } from "@/lib/theme-tokens"

interface HeroSectionProps {
  siteDescription: string
  primaryCta: {
    label: string
    href: string
  }
}

export default function HeroSection({ siteDescription, primaryCta }: HeroSectionProps) {
  const handlePrimaryCta = useCallback(() => {
    event({
      action: 'hero_cta_click',
      category: 'conversion',
      label: primaryCta.label
    });
  }, [primaryCta.label]);

  const handleBlogCta = useCallback(() => {
    event({
      action: 'hero_cta_click',
      category: 'engagement',
      label: 'Read the blog'
    });
  }, []);

  return (
    <section className="relative py-32 overflow-hidden border-b border-border-default sm:py-40 lg:py-48">
      <Container className="relative">
        <div className="max-w-4xl space-y-12">
          {/* Premium badge with enhanced styling */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-premium shadow-sm bg-gradient-to-r from-brand-primary/10 to-brand-primary/5">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">
              Premium Technical Publishing
            </span>
          </div>

          {/* Hero headline with improved spacing */}
          <div className="space-y-8">
            <h1 className={`${textTokens.heroTitle}`}>
              Engineering knowledge for the real world.
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {siteDescription}
            </p>
          </div>

          {/* Enhanced CTA buttons with icons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href={primaryCta.href}
              className={`${ctaPatterns.primary()} inline-flex items-center gap-2 group`}
              onClick={handlePrimaryCta}
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="/blog"
              className={`${ctaPatterns.secondary()} inline-flex items-center gap-2`}
              onClick={handleBlogCta}
            >
              Read the blog
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
