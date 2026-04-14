'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"

interface BuyButtonProps {
  href?: string
  title?: string
}

export default function BuyButton({ href, title }: BuyButtonProps) {
  const handleBuyClick = useCallback(() => {
    event({
      action: 'purchase_click',
      category: 'conversion',
      label: title || 'Unknown Book'
    });
  }, [title]);

  if (!href) {
    return (
      <Button type="button" variant="secondary" size="md" disabled>
        Purchase link coming soon
      </Button>
    )
  }

  return (
    <Button 
      href={href} 
      variant="primary" 
      size="md"
      onClick={handleBuyClick}
    >
      Buy on Amazon
    </Button>
  )
}
