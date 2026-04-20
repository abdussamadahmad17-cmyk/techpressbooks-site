"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { Book } from "@/types/book"
import BookGrid from "@/components/books/book-grid"
import EmptyState from "@/components/shared/empty-state"
import Button from "@/components/shared/button"
import { formPatterns, surfaceTokens, textTokens } from "@/lib/theme-tokens"
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
      <div className={`rounded-4xl ${surfaceTokens.default} p-5 backdrop-blur sm:p-6`}>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_220px_220px_220px_auto] xl:items-end">
          <div className="space-y-2">
            <label
              htmlFor="book-search"
              className={formPatterns.label}
            >
              Search
            </label>
            <input
              id="book-search"
              type="text"
              value={filters.query}
              onChange={(event) =>
                updateFilters({ query: event.target.value })
              }
              placeholder="Search by title, author, category, or tag"
              className={formPatterns.input}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="book-category"
              className={formPatterns.label}
            >
              Category
            </label>
            <select
              id="book-category"
              value={filters.category}
              onChange={(event) =>
                updateFilters({ category: event.target.value })
              }
              className={formPatterns.select}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="book-tag"
              className={formPatterns.label}
            >
              Tag
            </label>
            <select
              id="book-tag"
              value={filters.tag}
              onChange={(event) => updateFilters({ tag: event.target.value })}
              className={formPatterns.select}
            >
              <option value="">All tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="book-sort"
              className={formPatterns.label}
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
              className={formPatterns.select}
            >
              <option value="featured">Featured first</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex items-center justify-center h-12 px-5 text-sm font-medium transition border rounded-2xl border-border-default bg-surface-strong text-text-primary hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{filteredBooks.length}</span>{" "}
          of <span className="font-medium text-text-primary">{books.length}</span> books
          {isPending ? (
            <span className="ml-2 text-text-muted">Updating…</span>
          ) : null}
        </p>

        {hasActiveFilters ? (
          <div className="flex flex-wrap gap-2">
            {filters.query ? (
              <span className="px-3 py-1 text-xs border rounded-full border-border-default bg-surface-default text-text-secondary">
                Search: {filters.query}
              </span>
            ) : null}

            {filters.category ? (
              <span className="px-3 py-1 text-xs border rounded-full border-border-default bg-surface-default text-text-secondary">
                Category: {filters.category}
              </span>
            ) : null}

            {filters.tag ? (
              <span className="px-3 py-1 text-xs border rounded-full border-border-default bg-surface-default text-text-secondary">
                Tag: {filters.tag}
              </span>
            ) : null}

            {filters.sort !== "featured" ? (
              <span className="px-3 py-1 text-xs border rounded-full border-border-default bg-surface-default text-text-secondary">
                Sort: {filters.sort}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

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