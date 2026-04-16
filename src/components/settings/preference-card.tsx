interface PreferenceCardProps {
  title: string
  description: string
  status: string
}

export default function PreferenceCard({
  title,
  description,
  status
}: PreferenceCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <span className="rounded-full border border-slate-200/70 px-3 py-1 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
            {status}
          </span>
        </div>

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}
