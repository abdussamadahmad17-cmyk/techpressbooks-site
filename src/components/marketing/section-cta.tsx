'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import { event } from "@/lib/analytics/gtag"
import { surfaceTokens, sectionPatterns, textTokens } from "@/lib/theme-tokens"

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
        <div className={`${surfaceTokens.glass} px-8 py-12 rounded-[2rem] sm:px-12`}>
          <div className="max-w-3xl space-y-5">
            {eyebrow ? (
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                {eyebrow}
              </p>
            ) : null}

            <h2 className={textTokens.h2}>
              {title}
            </h2>

            <p className={textTokens.body}>
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                href={primaryAction.href} 
                variant="primary" 
                size="lg"
                onClick={handlePrimaryClick}
              >
                {primaryAction.label}
              </Button>

              {secondaryAction ? (
                <Button 
                  href={secondaryAction.href} 
                  variant="secondary" 
                  size="lg"
                  onClick={handleSecondaryClick}
                >
                  {secondaryAction.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}