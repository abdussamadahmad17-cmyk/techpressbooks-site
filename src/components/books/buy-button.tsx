'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"
import { ShoppingCart, Clock } from "lucide-react"

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
      <Button 
        type="button" 
        variant="secondary" 
        size="lg" 
        disabled
        icon={<Clock className="w-4 h-4" />}
        iconPosition="left"
      >
        Coming soon
      </Button>
    )
  }

  return (
    <Button 
      href={href} 
      variant="primary" 
      size="lg"
      onClick={handleBuyClick}
      icon={<ShoppingCart className="w-4 h-4" />}
      iconPosition="left"
    >
      Buy on Amazon
    </Button>
  )
}
