import Link from "next/link"
import Container from "@/components/layout/container"

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="text-base leading-8 text-slate-400">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500"
          >
            Return home
          </Link>
        </div>
      </Container>
    </section>
  )
}