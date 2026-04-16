"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-400 dark:text-slate-200"
      >
        Theme
      </button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5">
      <ThemeButton
        label="Light"
        active={currentTheme === "light" && theme !== "system"}
        onClick={() => setTheme("light")}
      />
      <ThemeButton
        label="Dark"
        active={currentTheme === "dark" && theme !== "system"}
        onClick={() => setTheme("dark")}
      />
      <ThemeButton
        label="System"
        active={theme === "system"}
        onClick={() => setTheme("system")}
      />
    </div>
  )
}

interface ThemeButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

function ThemeButton({ label, active, onClick }: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
      ].join(" ")}
    >
      {label}
    </button>
  )
}
