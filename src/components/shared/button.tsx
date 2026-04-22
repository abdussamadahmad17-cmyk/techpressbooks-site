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
    "bg-brand-primary text-white hover:shadow-lg hover:bg-opacity-90 transition duration-300",
  secondary:
    "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition duration-300",
  ghost: "text-brand-primary hover:text-brand-light transition duration-300"
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm rounded-premium",
  md: "px-5 py-3 text-sm rounded-lg-premium font-semibold",
  lg: "px-6 py-3.5 text-base rounded-lg-premium font-semibold"
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
