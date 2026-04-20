"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { Book } from "@/types/book"
import BookGrid from "@/components/books/book-grid"
import EmptyState from "@/components/shared/empty-state"
import Button from "@/components/shared/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  filterBooks,
  getUniqueCategories,
  getUniqueTags,
  type BookFilterState
} from "@/features/books/filter"

interface BookDiscoveryProps {
  books: Book[]
}

const defaultFilters: BookFilterState = {
  query: "",
  category: "",
  tag: "",
  sort: "featured"
}

const DEBOUNCE_DELAY = 300

function getFiltersFromSearchParams(
  searchParams: URLSearchParams
): BookFilterState {
  const sort = searchParams.get("sort")

  return {
    query: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    tag: searchParams.get("tag") ?? "",
    sort:
      sort === "title-asc" || sort === "title-desc" || sort === "featured"
        ? sort
        : "featured"
  }
}

export default function BookDiscovery({ books }: BookDiscoveryProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [filters, setFilters] = useState<BookFilterState>(() =>
    getFiltersFromSearchParams(searchParams)
  )

  useEffect(() => {
    setFilters(getFiltersFromSearchParams(searchParams))
  }, [searchParams])

  const categories = useMemo(() => getUniqueCategories(books), [books])
  const tags = useMemo(() => getUniqueTags(books), [books])

  const filteredBooks = useMemo(() => {
    return filterBooks(books, filters)
  }, [books, filters])

  const hasActiveFilters =
    filters.query.length > 0 ||
    filters.category.length > 0 ||
    filters.tag.length > 0 ||
    filters.sort !== "featured"

  const activeFilterCount = [
    filters.query,
    filters.category,
    filters.tag,
    filters.sort !== "featured" ? filters.sort : ""
  ].filter(Boolean).length

  const updateUrl = useCallback((nextFilters: BookFilterState) => {
    const params = new URLSearchParams()

    if (nextFilters.query) {
      params.set("q", nextFilters.query)
    }

    if (nextFilters.category) {
      params.set("category", nextFilters.category)
    }

    if (nextFilters.tag) {
      params.set("tag", nextFilters.tag)
    }

    if (nextFilters.sort !== "featured") {
      params.set("sort", nextFilters.sort)
    }

    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname

    startTransition(() => {
      router.replace(url, { scroll: false })
    })
  }, [pathname, router])

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      updateUrl(filters)
    }, DEBOUNCE_DELAY)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [filters, updateUrl])

  function updateFilters(patch: Partial<BookFilterState>) {
    const nextFilters = { ...filters, ...patch }
    setFilters(nextFilters)
  }

  function resetFilters() {
    setFilters(defaultFilters)
  }

  return (
    <div className="space-y-8">
      {/* Filter panel */}
      <div className="rounded-2xl border border-border-default bg-surface-elevated p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border-subtle">
          <SlidersHorizontal className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-medium text-text-primary">Filters</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-primary text-[10px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_180px_180px_180px_auto] lg:items-end">
          {/* Search input */}
          <div className="space-y-2">
            <label
              htmlFor="book-search"
              className="text-sm font-medium text-text-primary"
            >
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="book-search"
                type="text"
                value={filters.query}
                onChange={(event) =>
                  updateFilters({ query: event.target.value })
                }
                placeholder="Search books..."
                className="w-full rounded-xl border border-border-default bg-surface-strong pl-10 pr-4 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-all placeholder:text-text-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>

          {/* Category select */}
          <div className="space-y-2">
            <label
              htmlFor="book-category"
              className="text-sm font-medium text-text-primary"
            >
              Category
            </label>
            <select
              id="book-category"
              value={filters.category}
              onChange={(event) =>
                updateFilters({ category: event.target.value })
              }
              className="w-full rounded-xl border border-border-default bg-surface-strong px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tag select */}
          <div className="space-y-2">
            <label
              htmlFor="book-tag"
              className="text-sm font-medium text-text-primary"
            >
              Tag
            </label>
            <select
              id="book-tag"
              value={filters.tag}
              onChange={(event) => updateFilters({ tag: event.target.value })}
              className="w-full rounded-xl border border-border-default bg-surface-strong px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="">All tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Sort select */}
          <div className="space-y-2">
            <label
              htmlFor="book-sort"
              className="text-sm font-medium text-text-primary"
            >
              Sort
            </label>
            <select
              id="book-sort"
              value={filters.sort}
              onChange={(event) =>
                updateFilters({
                  sort: event.target.value as BookFilterState["sort"]
                })
              }
              className="w-full rounded-xl border border-border-default bg-surface-strong px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="featured">Featured first</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex items-center justify-center gap-1.5 h-[42px] px-4 text-sm font-medium transition-all border rounded-xl border-border-default bg-surface-strong text-text-secondary hover:bg-surface-soft hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{filteredBooks.length}</span>{" "}
          of <span className="font-medium text-text-primary">{books.length}</span> books
          {isPending && (
            <span className="ml-2 text-text-muted">Updating...</span>
          )}
        </p>

        {/* Active filter badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full border-border-default bg-surface-soft text-text-secondary">
                Search: {filters.query}
                <button
                  onClick={() => updateFilters({ query: "" })}
                  className="hover:text-text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full border-border-default bg-surface-soft text-text-secondary">
                Category: {filters.category}
                <button
                  onClick={() => updateFilters({ category: "" })}
                  className="hover:text-text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.tag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full border-border-default bg-surface-soft text-text-secondary">
                Tag: {filters.tag}
                <button
                  onClick={() => updateFilters({ tag: "" })}
                  className="hover:text-text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.sort !== "featured" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full border-border-default bg-surface-soft text-text-secondary">
                Sort: {filters.sort === "title-asc" ? "A-Z" : "Z-A"}
                <button
                  onClick={() => updateFilters({ sort: "featured" })}
                  className="hover:text-text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredBooks.length > 0 ? (
        <BookGrid books={filteredBooks} />
      ) : (
        <EmptyState
          title="No matching books found"
          description="Try a different search term, remove a filter, or clear everything to browse the full library again."
          action={
            <Button type="button" onClick={resetFilters}>
              Reset filters
            </Button>
          }
        />
      )}
    </div>
  )
}
