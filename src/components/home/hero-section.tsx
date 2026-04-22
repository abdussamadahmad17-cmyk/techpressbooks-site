'use client';

import { useCallback } from 'react';
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
        <div className="max-w-4xl space-y-10">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-premium border border-border-subtle bg-surface-soft">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-xs font-semibold tracking-widest text-text-primary uppercase">
              Premium Technical Publishing
            </span>
          </div>

          {/* Hero headline */}
          <div className="space-y-6">
            <h1 className={`${textTokens.heroTitle}`}>
              Engineering knowledge for the real world.
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {siteDescription}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={primaryCta.href}
              className={ctaPatterns.primary()}
              onClick={handlePrimaryCta}
            >
              {primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/blog"
              className={ctaPatterns.secondary()}
              onClick={handleBlogCta}
            >
              Read the blog
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
