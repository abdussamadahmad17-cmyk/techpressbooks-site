"use client"

import { useEffect } from "react"
import Container from "@/components/layout/container"

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">
            Something went wrong
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We hit an unexpected error
          </h1>
          <p className="text-base leading-8 text-slate-400">
            Please try again. If the problem continues, review the recent
            changes in the data layer or route components.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      </Container>
    </section>
  )
}