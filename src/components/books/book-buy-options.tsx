import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { Book, PurchaseOption } from "@/types/book"

interface BookBuyOptionsProps {
  book: Book
}

export default function BookBuyOptions({ book }: BookBuyOptionsProps) {
  const buyOptions =
    book.buyOptions && book.buyOptions.length > 0
      ? book.buyOptions
      : book.amazonUrl
      ? [
          {
            label: "Buy on Amazon",
            url: book.amazonUrl,
            type: "physical",
            isPrimary: true,
            note: "Print edition"
          } satisfies PurchaseOption
        ]
      : []

  if (buyOptions.length === 0) {
    return null
  }

  return (
    <BookHubSection
      eyebrow="Buy Options"
      title="Choose how you want to get this book"
      description="Use the options below to access the print edition, digital edition, or external purchase channels."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {buyOptions.map((option) => (
          <article
            key={`${option.label}-${option.url}`}
            className={[
              "rounded-3xl border p-6 backdrop-blur transition",
              option.isPrimary
                ? "border-red-500/40 bg-red-500/10 shadow-sm"
                : "border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
            ].join(" ")}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-red-400">
                  {option.type ?? "purchase"}
                </p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {option.label}
                </h3>

                {option.priceText ? (
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {option.priceText}
                  </p>
                ) : null}

                {option.note ? (
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {option.note}
                  </p>
                ) : null}
              </div>

              <Link
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex rounded-xl px-4 py-2 text-sm font-medium transition",
                  option.isPrimary
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "border border-slate-200/70 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                ].join(" ")}
              >
                Open option
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
