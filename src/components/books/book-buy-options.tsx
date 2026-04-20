import type { PurchaseOption } from '@/types/book'
import Button from '@/components/shared/button'
import Container from '@/components/layout/container'

interface BookBuyOptionsProps {
  buyOptions?: PurchaseOption[]
}

export default function BookBuyOptions({ buyOptions }: BookBuyOptionsProps) {
  if (!buyOptions?.length) {
    return null
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Purchase options
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Buy the book your way
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Offer readers multiple ways to purchase the book, including digital, physical, and external storefront options.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {buyOptions.map((option) => (
              <div
                key={option.url}
                className="rounded-4xl border border-slate-200/70 bg-slate-50 p-6 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-4 pb-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {option.label}
                    </p>
                    {option.type ? (
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {option.type}
                      </p>
                    ) : null}
                  </div>
                  {option.priceText ? (
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {option.priceText}
                    </p>
                  ) : null}
                </div>

                {option.note ? (
                  <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {option.note}
                  </p>
                ) : null}

                <Button
                  href={option.url}
                  variant={option.isPrimary ? 'primary' : 'secondary'}
                  size="md"
                >
                  {option.isPrimary ? 'Buy now' : 'View option'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
