import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "secondary" | "ghost" | "link"
type ButtonSize = "sm" | "md" | "lg"

interface BaseButtonProps {
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: "left" | "right"
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
  primary: [
    "bg-brand-primary text-text-inverse",
    "shadow-sm",
    "hover:bg-brand-primary-hover",
    "hover:shadow-md",
    "hover:-translate-y-0.5",
    "active:translate-y-0",
  ].join(" "),
  secondary: [
    "border border-border-strong",
    "bg-surface-elevated",
    "text-text-primary",
    "shadow-sm",
    "hover:bg-surface-soft",
    "hover:border-border-default",
    "hover:-translate-y-0.5",
    "active:translate-y-0",
  ].join(" "),
  ghost: [
    "text-text-secondary",
    "hover:bg-surface-soft",
    "hover:text-text-primary",
  ].join(" "),
  link: [
    "text-brand-primary",
    "hover:text-brand-primary-hover",
    "underline-offset-4",
    "hover:underline",
    "p-0",
  ].join(" "),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-sm rounded-xl gap-2"
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right"
  } = props

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    variant !== "link" && sizeClasses[size],
    className
  )

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  )

  if ("href" in props && props.href) {
    const linkProps = props as LinkButtonProps

    return (
      <Link href={linkProps.href} className={classes} onClick={linkProps.onClick}>
        {content}
      </Link>
    )
  }

  const buttonProps = props as NativeButtonProps
  const { icon: _icon, iconPosition: _pos, ...rest } = buttonProps

  return (
    <button {...rest} className={classes}>
      {content}
    </button>
  )
}
