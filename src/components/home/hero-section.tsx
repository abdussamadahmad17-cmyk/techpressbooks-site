'use client';

import { useCallback } from 'react';
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"
import { ArrowRight, BookOpen } from "lucide-react"

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
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Subtle gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-brand-primary/[0.04] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-surface-soft/50 via-transparent to-transparent" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-elevated px-4 py-2 shadow-sm mb-8">
            <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Premium Technical Publishing
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary text-balance leading-[1.1] mb-6">
            Engineering knowledge{' '}
            <span className="text-brand-primary">for the real world.</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-text-secondary mb-10">
            {siteDescription}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              href={primaryCta.href} 
              variant="primary" 
              size="lg"
              onClick={handlePrimaryCta}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {primaryCta.label}
            </Button>
            <Button 
              href="/blog" 
              variant="secondary" 
              size="lg"
              onClick={handleBlogCta}
            >
              Read the blog
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-10 border-t border-border-subtle">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <StatItem value="10K+" label="Readers" />
              <StatItem value="5" label="Published Books" />
              <StatItem value="100+" label="Technical Articles" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl sm:text-3xl font-semibold text-text-primary">{value}</span>
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  )
}
