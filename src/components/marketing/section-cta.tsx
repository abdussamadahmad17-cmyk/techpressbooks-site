'use client';

import { useCallback } from 'react';
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
        <div className={`${cardPatterns.elevated()} px-8 py-16 rounded-lg-premium sm:px-12 lg:px-16`}>
          <div className="max-w-3xl space-y-8">
            {eyebrow ? (
              <p className={textTokens.meta}>
                {eyebrow}
              </p>
            ) : null}

            <h2 className={textTokens.h2}>
              {title}
            </h2>

            <p className={`${textTokens.bodyLarge} text-text-secondary max-w-2xl`}>
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <a 
                href={primaryAction.href} 
                className="inline-flex rounded-lg-premium bg-brand-primary text-white text-base font-semibold px-7 py-4 transition hover:shadow-lg hover:bg-opacity-90"
                onClick={handlePrimaryClick}
              >
                {primaryAction.label}
                <span aria-hidden="true">→</span>
              </a>

              {secondaryAction ? (
                <a 
                  href={secondaryAction.href} 
                  className="inline-flex rounded-lg-premium border-2 border-brand-primary text-brand-primary text-base font-semibold px-7 py-4 transition hover:bg-brand-primary hover:text-white"
                  onClick={handleSecondaryClick}
                >
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
