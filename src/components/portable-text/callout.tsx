interface CalloutProps {
  value: {
    tone?: "info" | "warning" | "success" | "danger"
    title?: string
    body?: string
  }
}

const toneStyles: Record<string, string> = {
  info: "border-blue-500/30 bg-blue-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  success: "border-green-500/30 bg-green-500/10",
  danger: "border-red-500/30 bg-red-500/10"
}

export default function Callout({ value }: CalloutProps) {
  const tone = value.tone ?? "info"

  return (
    <div
      className={`rounded-2xl border p-5 ${toneStyles[tone] ?? toneStyles.info}`}
    >
      {value.title ? (
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {value.title}
        </h3>
      ) : null}

      {value.body ? (
        <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
          {value.body}
        </p>
      ) : null}
    </div>
  )
}