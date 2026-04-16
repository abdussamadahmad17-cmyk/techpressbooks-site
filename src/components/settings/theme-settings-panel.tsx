"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const options = [
  {
    value: "light",
    title: "Light",
    description: "Bright interface for daytime reading and browsing."
  },
  {
    value: "dark",
    title: "Dark",
    description: "Low-glare interface for focused reading and night use."
  },
  {
    value: "system",
    title: "System",
    description: "Automatically follows the device or browser theme."
  }
] as const

export default function ThemeSettingsPanel() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="rounded-4xl border border-slate-200/70 bg-white/70 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-red-400">
          Appearance
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Theme preferences
        </h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
          Choose how the platform should look while browsing books, posts, and author pages.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {options.map((option) => {
          const active = mounted && theme === option.value
          const previewTheme =
            option.value === "system" ? resolvedTheme ?? "dark" : option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={[
                "rounded-3xl border p-5 text-left transition",
                active
                  ? "border-red-500/60 bg-red-500/10"
                  : "border-slate-200/70 bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-white/20"
              ].join(" ")}
            >
              <div
                className={[
                  "mb-4 h-24 rounded-xl border p-3",
                  previewTheme === "light"
                    ? "border-slate-200 bg-white"
                    : "border-white/10 bg-slate-950"
                ].join(" ")}
              >
                <div
                  className={[
                    "mb-2 h-3 w-20 rounded",
                    previewTheme === "light" ? "bg-slate-200" : "bg-slate-700"
                  ].join(" ")}
                />
                <div
                  className={[
                    "mb-2 h-3 w-14 rounded",
                    previewTheme === "light" ? "bg-slate-100" : "bg-slate-800"
                  ].join(" ")}
                />
                <div
                  className={[
                    "h-8 rounded",
                    previewTheme === "light" ? "bg-slate-50" : "bg-slate-900"
                  ].join(" ")}
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {option.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {option.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
