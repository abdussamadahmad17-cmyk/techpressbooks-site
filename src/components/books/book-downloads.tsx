import type { DownloadItem } from '@/types/book'
import Container from '@/components/layout/container'

interface BookDownloadsProps {
  downloads?: DownloadItem[]
}

export default function BookDownloads({ downloads }: BookDownloadsProps) {
  if (!downloads?.length) {
    return null
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
              Downloads
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Download code and companion assets
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Provide downloadable files that support readers with sample code, templates, and reference materials.
            </p>
          </div>

          <div className="grid gap-4">
            {downloads.map((download) => (
              <div
                key={`${download.title}-${download.version ?? 'latest'}`}
                className="rounded-4xl border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {download.title}
                    </p>
                    {download.version ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Version {download.version}
                      </p>
                    ) : null}
                  </div>

                  <a
                    href={download.fileUrl}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  >
                    Download
                  </a>
                </div>

                {download.description ? (
                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {download.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
