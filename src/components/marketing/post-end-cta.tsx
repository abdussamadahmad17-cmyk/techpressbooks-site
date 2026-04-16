'use client';

import { useCallback } from 'react';
import Button from "@/components/shared/button"
import { event } from "@/lib/analytics/gtag"

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
    <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-red-400">
          Next step
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-base leading-8 text-slate-700 dark:text-slate-300">{description}</p>
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