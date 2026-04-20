import Link from "next/link"
import BookHubSection from "@/components/books/book-hub-section"
import type { Book, PurchaseOption } from "@/types/book"
import { ExternalLink, Star } from "lucide-react"

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
            className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              option.isPrimary
                ? "border-brand-primary/30 bg-brand-primary-soft shadow-glow"
                : "border-border-default bg-surface-elevated shadow-sm hover:border-border-strong"
            }`}
          >
            {option.isPrimary && (
              <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 shadow-sm">
                <Star className="w-3 h-3 text-white fill-white" />
                <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Recommended</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="inline-flex text-xs font-medium uppercase tracking-wider text-brand-primary">
                  {option.type ?? "purchase"}
                </span>
                <h3 className="text-xl font-semibold text-text-primary">
                  {option.label}
                </h3>

                {option.priceText && (
                  <p className="text-lg font-semibold text-text-primary">
                    {option.priceText}
                  </p>
                )}

                {option.note && (
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {option.note}
                  </p>
                )}
              </div>

              <Link
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  option.isPrimary
                    ? "bg-brand-primary text-text-inverse shadow-sm hover:bg-brand-primary-hover hover:shadow-md"
                    : "border border-border-strong bg-surface-elevated text-text-primary hover:bg-surface-soft"
                }`}
              >
                Open option
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BookHubSection>
  )
}
