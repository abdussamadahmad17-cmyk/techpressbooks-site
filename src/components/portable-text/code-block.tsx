interface CodeBlockProps {
  value: {
    language?: string
    filename?: string
    code?: string
  }
}

export default function CodeBlock({ value }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100 dark:border-white/10 dark:bg-slate-950">
      {value.filename ? (
        <div className="border-b border-slate-200/70 px-4 py-2 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          {value.filename}
        </div>
      ) : null}

      <pre className="overflow-x-auto p-4 text-sm text-slate-800 dark:text-slate-200">
        <code>{value.code}</code>
      </pre>
    </div>
  )
}