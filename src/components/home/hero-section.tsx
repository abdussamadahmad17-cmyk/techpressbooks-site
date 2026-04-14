'use client';

import { useCallback } from 'react';
import Container from "@/components/layout/container"
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"

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
    <section className="relative overflow-hidden border-b border-white/10 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.10),transparent_25%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_30%)]" />

      <Container className="relative">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Premium Technical Publishing
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">
              Engineering knowledge for the real world.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {siteDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button 
              href={primaryCta.href} 
              variant="primary" 
              size="lg"
              onClick={handlePrimaryCta}
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
        </div>
      </Container>
    </section>
  )
}
