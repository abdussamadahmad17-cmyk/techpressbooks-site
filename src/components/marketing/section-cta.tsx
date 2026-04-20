'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import Container from "@/components/layout/container"
import { event } from "@/lib/analytics/gtag"
import { ArrowRight } from "lucide-react"

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
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border-default bg-surface-elevated p-8 sm:p-12 lg:p-16">
          {/* Subtle gradient accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-brand-primary/[0.03] via-transparent to-transparent" />
          </div>

          <div className="relative max-w-3xl">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-primary mb-4">
                {eyebrow}
              </span>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-text-primary text-balance mb-4">
              {title}
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary mb-8 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button 
                href={primaryAction.href} 
                variant="primary" 
                size="lg"
                onClick={handlePrimaryClick}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {primaryAction.label}
              </Button>

              {secondaryAction && (
                <Button 
                  href={secondaryAction.href} 
                  variant="secondary" 
                  size="lg"
                  onClick={handleSecondaryClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
