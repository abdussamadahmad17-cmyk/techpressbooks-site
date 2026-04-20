'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"
import { surfaceTokens, textTokens } from "@/lib/theme-tokens"

interface PostEndCtaProps {
  title?: string
  description?: string
}

export default function PostEndCta({
  title = "Keep learning with the full library",
  description = "This article is part of a bigger learning path. Explore practical books and technical resources built for real-world engineering."
}: PostEndCtaProps) {
  const handleBrowseBooks = useCallback(() => {
    event({
      action: 'cta_click',
      category: 'conversion',
      label: 'Browse books (post-end-cta)'
    });
  }, []);

  const handleExploreCategories = useCallback(() => {
    event({
      action: 'cta_click',
      category: 'engagement',
      label: 'Explore categories (post-end-cta)'
    });
  }, []);

  return (
    <section className={`${surfaceTokens.glass} space-y-5 p-8 rounded-[2rem]`}>
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-red-400">
          Next step
        </p>
        <h2 className={textTokens.h3}>{title}</h2>
        <p className={textTokens.body}>{description}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button 
          href="/books" 
          variant="primary"
          onClick={handleBrowseBooks}
        >
          Browse books
        </Button>
        <Button 
          href="/categories" 
          variant="secondary"
          onClick={handleExploreCategories}
        >
          Explore categories
        </Button>
      </div>
    </section>
  )
}