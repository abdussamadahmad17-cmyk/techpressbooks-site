import type { ReactNode } from "react"

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-200/70 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-xl font-semibold text-slate-900 dark:text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}