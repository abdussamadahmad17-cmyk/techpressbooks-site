interface CodeBlockProps {
  value: {
    language?: string
    filename?: string
    code?: string
  }
}

export default function CodeBlock({ value }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
      {value.filename ? (
        <div className="border-b border-white/10 px-4 py-2 text-xs text-slate-400">
          {value.filename}
        </div>
      ) : null}

      <pre className="overflow-x-auto p-4 text-sm text-slate-200">
        <code>{value.code}</code>
      </pre>
    </div>
  )
}