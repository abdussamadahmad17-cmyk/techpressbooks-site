'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import { event } from "@/lib/analytics/gtag"

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
    <section className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur sm:px-12">
          <div className="max-w-3xl space-y-5">
            {eyebrow ? (
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="text-base leading-8 text-slate-300">
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