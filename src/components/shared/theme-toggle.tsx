"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

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
        className="inline-flex items-center gap-1 rounded-xl border border-slate-200/70 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:text-slate-200"
      >
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-300/60 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5">
      <ThemeButton
        label="Light"
        icon={<Sun className="h-4 w-4" />}
        active={currentTheme === "light" && theme !== "system"}
        onClick={() => setTheme("light")}
      />
      <ThemeButton
        label="Dark"
        icon={<Moon className="h-4 w-4" />}
        active={currentTheme === "dark" && theme !== "system"}
        onClick={() => setTheme("dark")}
      />
      <ThemeButton
        label="System"
        icon={<Monitor className="h-4 w-4" />}
        active={theme === "system"}
        onClick={() => setTheme("system")}
      />
    </div>
  )
}

interface ThemeButtonProps {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

function ThemeButton({ label, icon, active, onClick }: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
      ].join(" ")}
      title={`${label} mode`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
