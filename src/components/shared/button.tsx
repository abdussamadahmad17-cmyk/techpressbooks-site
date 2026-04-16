import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface BaseButtonProps {
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

interface LinkButtonProps extends BaseButtonProps {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}

interface NativeButtonProps
  extends BaseButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
}

type ButtonProps = LinkButtonProps | NativeButtonProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-red-600 text-white hover:bg-red-500 shadow-[0_10px_30px_rgba(127,29,29,0.35)]",
  secondary:
    "border border-slate-200/70 bg-slate-50 text-slate-900 hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10",
  ghost: "text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm rounded-xl",
  md: "px-5 py-3 text-sm rounded-2xl",
  lg: "px-6 py-3.5 text-sm rounded-2xl"
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md"
  } = props

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if ("href" in props && props.href) {
    const linkProps = props as LinkButtonProps

    return (
      <Link href={linkProps.href} className={classes} onClick={linkProps.onClick}>
        {linkProps.children}
      </Link>
    )
  }

  const buttonProps = props as NativeButtonProps

  return (
    <button {...buttonProps} className={classes}>
      {buttonProps.children}
    </button>
  )
}