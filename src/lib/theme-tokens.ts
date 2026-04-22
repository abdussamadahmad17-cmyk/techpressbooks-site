/**
 * THEME TOKENS SYSTEM
 *
 * This file defines the ONLY way to use colors in this app.
 *
 * Every component must use these patterns—nothing else.
 *
 * WHY: Prevents dark-first drift that breaks light mode.
 *
 * RULE: If a color isn't here, add it. Don't invent new color uses.
 */

/**
 * SURFACE TOKENS
 *
 * Use these for container backgrounds, cards, panels, etc.
 */
export const surfaceTokens = {
  /** Default surface (cards, backgrounds) */
  default:
    'border border-border-default bg-surface-default',

  /** Strong surface (emphasized containers, sections) */
  strong:
    'border border-slate-200 bg-surface-strong',

  /** Soft surface (secondary backgrounds) */
  soft:
    'bg-surface-soft',

  /** Glass effect (frosted/overlay containers) */
  glass:
    'border border-border-default bg-surface-overlay backdrop-blur',
}

/**
 * CARD PATTERNS
 *
 * Use these for card components with premium styling.
 */
export const cardPatterns = {
  /** Standard card: clean, minimal with subtle lift on hover */
  default: () => [
    'rounded-lg-premium',
    'border',
    'bg-surface-default',
    'border-border-default',
    'p-6',
    'transition duration-300',
    'hover:shadow-md',
    'hover:border-border-accent',
  ].join(' '),

  /** Elevated card: more prominent with stronger shadow */
  elevated: () => [
    'rounded-lg-premium',
    'bg-surface-default',
    'border border-border-default',
    'p-6',
    'shadow-md',
    'transition duration-300',
    'hover:shadow-lg',
  ].join(' '),

  /** Strong/emphasis card: white background with subtle border */
  strong: () => [
    'rounded-lg-premium',
    'border',
    'bg-surface-strong',
    'border-border-default',
    'p-6',
    'transition duration-300',
  ].join(' '),

  /** Glass effect: frosted appearance */
  glass: () => [
    'rounded-lg-premium',
    'border',
    'bg-surface-overlay',
    'border-border-default',
    'p-6',
    'backdrop-blur-sm',
  ].join(' '),
}

/**
 * TEXT TOKENS
 *
 * Use these for text color + sizing combinations with premium typography.
 */
export const textTokens = {
  /** Primary text (headers, emphasis) */
  primary: 'text-text-primary',

  /** Secondary text (subheaders, descriptions) */
  secondary: 'text-text-secondary',

  /** Muted text (metadata, timestamps) */
  muted: 'text-text-muted',

  /** Page Hero Title - XL weight, tight tracking */
  heroTitle: 'text-5xl sm:text-6xl font-bold tracking-tight text-text-primary leading-tight',

  /** Page Title - Large, semibold */
  h1: 'text-5xl font-bold tracking-tight text-text-primary sm:text-6xl leading-tight',

  /** Section Title - Premium weight */
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight text-text-primary',

  /** Subsection Title */
  h3: 'text-2xl font-semibold tracking-tight text-text-primary',

  /** Card Title - Medium weight */
  h4: 'text-xl font-semibold text-text-primary',

  /** Body text - optimized for reading */
  body: 'text-base leading-8 text-text-secondary',

  /** Body large - more spacious */
  bodyLarge: 'text-lg leading-8 text-text-secondary',

  /** Lead text - large intro/summary (blog posts, landing) */
  lead: 'text-lg sm:text-xl leading-relaxed text-text-secondary',

  /** Small text (captions, labels) */
  sm: 'text-sm leading-6 text-text-secondary',

  /** Extra small text (metadata) */
  xs: 'text-xs uppercase tracking-widest text-text-muted',

  /** Label - for form labels and UI text */
  label: 'text-sm font-semibold text-text-primary',

  /** Metadata - timestamps, categories */
  meta: 'text-xs tracking-wider text-text-muted uppercase',
}

/**
 * BORDER TOKENS
 */
export const borderTokens = {
  /** Default border (sections, cards) */
  default: 'border border-border-default',

  /** Card border (neutral gray, low contrast) */
  card: 'border border-slate-200',

  /** Dashed border (empty states) */
  dashed: 'border border-dashed border-border-default',
}

/**
 * SECTION PATTERNS
 *
 * Pre-built patterns for common page sections with premium spacing.
 */
export const sectionPatterns = {
  /** Page header section */
  header: () => [
    'border-b',
    'border-border-default',
    'py-16 sm:py-20 lg:py-24',
  ].join(' '),

  /** Standard content section with generous padding */
  content: () => [
    'py-16 sm:py-20 lg:py-24',
  ].join(' '),

  /** Featured/emphasized section */
  featured: () => [
    'py-20 sm:py-24 lg:py-28',
  ].join(' '),

  /** CTA section - maximum emphasis */
  cta: () => [
    'py-24 sm:py-32 lg:py-40',
  ].join(' '),
}

/**
 * CTA BUTTON PATTERNS
 *
 * Use these for call-to-action buttons.
 */
export const ctaPatterns = {
  /** Primary CTA - brand color, solid */
  primary: () => [
    'inline-flex',
    'items-center',
    'gap-2',
    'px-6 py-3',
    'rounded-premium',
    'bg-brand-primary',
    'text-white',
    'font-semibold',
    'transition duration-300',
    'hover:shadow-lg',
    'hover:bg-opacity-90',
  ].join(' '),

  /** Secondary CTA - outlined */
  secondary: () => [
    'inline-flex',
    'items-center',
    'gap-2',
    'px-6 py-3',
    'rounded-premium',
    'border-2 border-brand-primary',
    'text-brand-primary',
    'font-semibold',
    'transition duration-300',
    'hover:bg-brand-primary',
    'hover:text-white',
  ].join(' '),

  /** Ghost CTA - minimal */
  ghost: () => [
    'inline-flex',
    'items-center',
    'gap-2',
    'px-4 py-2',
    'text-brand-primary',
    'font-semibold',
    'transition duration-300',
    'hover:text-brand-light',
  ].join(' '),
}

/**
 * FORM PATTERNS
 *
 * Input, select, and form element styles.
 */
export const formPatterns = {
  /** Input field */
  input: [
    'w-full',
    'rounded-2xl',
    'border',
    'border-border-default',
    'bg-surface-strong',
    'px-4 py-3',
    'text-sm',
    'text-text-primary',
    'outline-none',
    'transition',
    'placeholder:text-text-muted',
    'focus:border-red-500',
  ].join(' '),

  /** Select field */
  select: [
    'w-full',
    'rounded-2xl',
    'border',
    'border-border-default',
    'bg-surface-strong',
    'px-4 py-3',
    'text-sm',
    'text-text-primary',
    'outline-none',
    'transition',
    'focus:border-red-500',
  ].join(' '),

  /** Form label */
  label: 'text-xs font-medium uppercase tracking-[0.18em] text-text-muted',
}

/**
 * EMPTY STATE PATTERN
 */
export const emptyStatePattern = [
  'rounded-[2rem]',
  'border border-dashed',
  'border-border-default',
  'bg-surface-soft',
  'p-10',
  'text-center',
].join(' ')

/**
 * UTILITY: Build className string from token entries
 *
 * @example
 * const containerClasses = buildThemeClass(
 *   surfaceTokens.default,
 *   'rounded-2xl p-4'
 * )
 */
export function buildThemeClass(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * QUICK REFERENCE — Common Component Patterns
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ CARD WITH TITLE + DESCRIPTION                           │
 * ├─────────────────────────────────────────────────────────┤
 * │ <div className={cardPatterns.default()}>                │
 * │   <h3 className={textTokens.h3}>{title}</h3>            │
 * │   <p className={textTokens.sm}>{description}</p>        │
 * │ </div>                                                  │
 * └───────────────���─────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ SECTION HEADER                                           │
 * ├─────────────────────────────────────────────────────────┤
 * │ <section className={sectionPatterns.header()}>          │
 * │   <h1 className={textTokens.h1}>{titleContent}</h1>     │
 * │   <p className={textTokens.body}>{description}</p>      │
 * │ </section>                                              │
 * └─────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ FORM GROUP                                               │
 * ├─────────────────────────────────────────────────────────┤
 * │ <div className="space-y-2">                              │
 * │   <label className={formPatterns.label}>                │
 * │     Search                                              │
 * │   </label>                                              │
 * │   <input className={formPatterns.input} />              │
 * │ </div>                                                  │
 * └─────────────────────────────────────────────────────────┘
 */
