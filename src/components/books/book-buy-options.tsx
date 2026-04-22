import Link from "next/link"
import { ShoppingCart, BookOpen, Zap } from "lucide-react"
import BookHubSection from "@/components/books/book-hub-section"
import { cardPatterns, textTokens } from "@/lib/theme-tokens"
import type { Book, PurchaseOption } from "@/types/book"

interface BookBuyOptionsProps {
  book: Book
}

const typeIcons: Record<string, React.ReactNode> = {
  physical: <ShoppingCart className="w-5 h-5" />,
  digital: <BookOpen className="w-5 h-5" />,
  purchase: <Zap className="w-5 h-5" />
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

  const primaryOption = buyOptions.find(opt => opt.isPrimary)
  const secondaryOptions = buyOptions.filter(opt => !opt.isPrimary)

  return (
    <BookHubSection
      eyebrow="Acquisition"
      title="Get Your Copy"
      description="Multiple formats available to suit your learning style."
    >
      <div className="space-y-6">
        {/* Primary option - visually dominant */}
        {primaryOption && (
          <div className={`${cardPatterns.elevated()} bg-gradient-to-br from-brand-primary/5 to-brand-primary/2 border-2 border-brand-primary`}>
            <div className="flex gap-6 items-start">
              <div className="text-brand-primary flex-shrink-0 pt-1">
                {typeIcons[primaryOption.type ?? 'purchase']}
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <p className={textTokens.meta}>
                    Primary Option
                  </p>
                  <h3 className={`${textTokens.h3} text-brand-primary`}>
                    {primaryOption.label}
                  </h3>
                  {primaryOption.priceText ? (
                    <p className="text-lg font-semibold text-text-primary">
                      {primaryOption.priceText}
                    </p>
                  ) : null}
                  {primaryOption.note ? (
                    <p className={`${textTokens.sm} text-text-secondary`}>
                      {primaryOption.note}
                    </p>
                  ) : null}
                </div>
                <a
                  href={primaryOption.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg-premium bg-brand-primary text-white font-semibold shadow-lg hover:shadow-xl transition hover:bg-opacity-90"
                >
                  Buy Now
                  <Zap className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Secondary options */}
        {secondaryOptions.length > 0 && (
          <div>
            <p className={`${textTokens.meta} mb-4`}>
              Other Formats
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {secondaryOptions.map((option) => (
                <article
                  key={`${option.label}-${option.url}`}
                  className={cardPatterns.default()}
                >
                  <div className="flex gap-4">
                    <div className="text-brand-primary flex-shrink-0">
                      {typeIcons[option.type ?? 'purchase']}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className={`${textTokens.xs} text-text-muted mb-1`}>
                          {option.type ?? "purchase"}
                        </p>
                        <h3 className={`${textTokens.h4}`}>
                          {option.label}
                        </h3>
                      </div>
                      {option.priceText ? (
                        <p className="font-semibold text-text-primary">
                          {option.priceText}
                        </p>
                      ) : null}
                      {option.note ? (
                        <p className={`${textTokens.xs} text-text-secondary`}>
                          {option.note}
                        </p>
                      ) : null}
                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-light transition"
                      >
                        Get it →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </BookHubSection>
  )
}
