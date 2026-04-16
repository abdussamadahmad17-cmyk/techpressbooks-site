import { PortableText, type PortableTextComponents } from "@portabletext/react"
import CodeBlock from "@/components/portable-text/code-block"
import Callout from "@/components/portable-text/callout"

interface PortableTextRendererProps {
  value: unknown
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-500/40 pl-4 italic text-slate-700 dark:text-slate-300">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>
  },
  types: {
    codeBlock: ({ value }) => <CodeBlock value={value as any} />,
    callout: ({ value }) => <Callout value={value as any} />
  }
}

export default function PortableTextRenderer({
  value
}: PortableTextRendererProps) {
  if (!value) {
    return null
  }

  return (
    <div className="space-y-6">
      <PortableText value={value as any} components={components} />
    </div>
  )
}