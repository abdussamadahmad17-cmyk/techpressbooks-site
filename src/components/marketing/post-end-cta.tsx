'use client';

import { useCallback } from 'react';
import { BookOpen, FolderOpen } from 'lucide-react';
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"

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
    <section className={`${cardPatterns.elevated()} bg-gradient-to-br from-brand-primary/5 to-brand-primary/2 border-2 border-brand-primary`}>
      <div className="space-y-6">
        <div className="space-y-3">
          <p className={textTokens.meta}>
            Next step
          </p>
          <h2 className={textTokens.h3}>{title}</h2>
          <p className={`${textTokens.body} text-text-secondary`}>{description}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button 
            href="/books" 
            variant="primary"
            onClick={handleBrowseBooks}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Browse books
          </Button>
          <Button 
            href="/categories" 
            variant="secondary"
            onClick={handleExploreCategories}
            className="gap-2"
          >
            <FolderOpen className="w-4 h-4" />
            Explore categories
          </Button>
        </div>
      </div>
    </section>
  )
}
