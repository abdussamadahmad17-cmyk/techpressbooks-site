'use client';

import { useCallback } from 'react';
import { ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import { event } from "@/lib/analytics/gtag"
import { cardPatterns, sectionPatterns, textTokens } from "@/lib/theme-tokens"

interface SectionCtaProps {
  eyebrow?: string
  title: string
  description: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export default function SectionCta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction
}: SectionCtaProps) {
  const handlePrimaryClick = useCallback(() => {
    event({
      action: 'cta_click',
      category: 'conversion',
      label: primaryAction.label
    });
  }, [primaryAction.label]);

  const handleSecondaryClick = useCallback(() => {
    event({
      action: 'cta_click',
      category: 'conversion',
      label: secondaryAction?.label || ''
    });
  }, [secondaryAction]);

  return (
    <section className={sectionPatterns.cta()}>
      <Container>
        <div className={`${cardPatterns.elevated()} relative px-8 py-20 rounded-lg-premium sm:px-12 lg:px-20 overflow-hidden`}>
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-full blur-3xl -z-10 opacity-50" />
          
          <div className="max-w-3xl space-y-10 relative z-10">
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-premium bg-brand-primary/10">
                <Lightbulb className="w-4 h-4 text-brand-primary" />
                <p className={`${textTokens.xs} text-brand-primary font-semibold`}>
                  {eyebrow}
                </p>
              </div>
            ) : null}

            <h2 className={textTokens.h2}>
              {title}
            </h2>

            <p className={`${textTokens.bodyLarge} text-text-secondary max-w-2xl leading-relaxed`}>
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              <a 
                href={primaryAction.href} 
                className="inline-flex items-center gap-2 rounded-lg-premium bg-brand-primary text-white text-base font-semibold px-8 py-4 shadow-lg transition hover:shadow-xl hover:bg-opacity-90 group"
                onClick={handlePrimaryClick}
              >
                {primaryAction.label}
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </a>

              {secondaryAction ? (
                <a 
                  href={secondaryAction.href} 
                  className="inline-flex items-center gap-2 rounded-lg-premium border-2 border-brand-primary text-brand-primary text-base font-semibold px-8 py-4 transition hover:bg-brand-primary hover:text-white hover:shadow-lg"
                  onClick={handleSecondaryClick}
                >
                  <BookOpen className="w-4 h-4" />
                  {secondaryAction.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
