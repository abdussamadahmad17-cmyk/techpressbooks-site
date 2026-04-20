/**
 * PREMIUM THEME TOKENS SYSTEM - TechPressBooks
 *
 * This file defines the ONLY way to use colors in this app.
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
  default: 'bg-surface-default border border-border-default',

  /** Strong surface (emphasized containers, solid backgrounds) */
  strong: 'bg-surface-strong border border-border-default',

  /** Soft surface (secondary backgrounds, subtle areas) */
  soft: 'bg-surface-soft',

  /** Elevated surface (floating cards, dropdowns) */
  elevated: 'bg-surface-elevated border border-border-default shadow-lg',

  /** Glass effect (frosted/overlay containers) */
  glass: 'bg-surface-overlay backdrop-blur-xl border border-border-default',

  /** Inset surface (recessed areas, code blocks) */
  inset: 'bg-surface-inset border border-border-subtle',

  /** Brand surface (primary color background) */
  brand: 'bg-brand-primary text-text-inverse',

  /** Brand soft surface (subtle brand background) */
  brandSoft: 'bg-brand-primary-soft border border-brand-primary-muted',
}

/**
 * CARD PATTERNS
 *
 * Use these for card components with pre-built hover states.
 */
export const cardPatterns = {
  /** Standard card: elevated surface with hover lift */
  default: () => [
    'rounded-2xl',
    'border border-border-default',
    'bg-surface-elevated',
    'p-6',
    'shadow-sm',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1',
    'hover:shadow-lg',
    'hover:border-border-strong',
  ].join(' '),

  /** Glass card: frosted effect with subtle hover */
  glass: () => [
    'rounded-2xl',
    'border border-border-default',
    'bg-surface-overlay',
    'backdrop-blur-xl',
    'p-6',
    'transition-all duration-300 ease-out',
    'hover:bg-surface-elevated',
    'hover:border-border-strong',
  ].join(' '),

  /** Strong card: solid background, emphasis */
  strong: () => [
    'rounded-2xl',
    'border border-border-default',
    'bg-surface-strong',
    'p-6',
    'shadow-md',
    'transition-all duration-300',
  ].join(' '),

  /** Interactive card: enhanced hover state for clickable items */
  interactive: () => [
    'rounded-2xl',
    'border border-border-default',
    'bg-surface-elevated',
    'p-6',
    'shadow-sm',
    'cursor-pointer',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1',
    'hover:shadow-xl',
    'hover:border-brand-primary/30',
  ].join(' '),

  /** Featured card: brand accent border */
  featured: () => [
    'rounded-2xl',
    'border-2 border-brand-primary/20',
    'bg-surface-elevated',
    'p-6',
    'shadow-glow',
    'transition-all duration-300',
    'hover:border-brand-primary/40',
  ].join(' '),
}

/**
 * TEXT TOKENS
 *
 * Use these for text color + sizing combinations.
 */
export const textTokens = {
  /** Primary text (headers, emphasis) */
  primary: 'text-text-primary',

  /** Secondary text (subheaders, descriptions) */
  secondary: 'text-text-secondary',

  /** Muted text (metadata, timestamps) */
  muted: 'text-text-muted',

  /** Inverse text (on dark backgrounds) */
  inverse: 'text-text-inverse',

  /** Brand text (accent color) */
  brand: 'text-brand-primary',

  /** Display heading - Hero titles */
  display: 'text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary text-balance',

  /** H1 heading */
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary text-balance',

  /** H2 heading */
  h2: 'text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary text-balance',

  /** H3 heading */
  h3: 'text-xl sm:text-2xl font-semibold tracking-tight text-text-primary',

  /** H4 heading */
  h4: 'text-lg font-semibold text-text-primary',

  /** Body text (base paragraph) */
  body: 'text-base leading-relaxed text-text-secondary',

  /** Body large (intro paragraphs) */
  bodyLarge: 'text-lg leading-relaxed text-text-secondary',

  /** Small text (captions, labels) */
  sm: 'text-sm leading-relaxed text-text-secondary',

  /** Extra small text (metadata, eyebrows) */
  xs: 'text-xs font-medium uppercase tracking-wider text-text-muted',

  /** Eyebrow text (section labels) */
  eyebrow: 'text-xs font-semibold uppercase tracking-widest text-brand-primary',
}

/**
 * BORDER TOKENS
 */
export const borderTokens = {
  /** Default border (sections, cards) */
  default: 'border border-border-default',

  /** Strong border (emphasized) */
  strong: 'border border-border-strong',

  /** Subtle border (very light) */
  subtle: 'border border-border-subtle',

  /** Brand border (accent) */
  brand: 'border border-brand-primary',

  /** Dashed border (empty states) */
  dashed: 'border border-dashed border-border-default',
}

/**
 * BUTTON PATTERNS
 *
 * Pre-built button styles for consistent CTAs.
 */
export const buttonPatterns = {
  /** Primary button - main CTA */
  primary: () => [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl',
    'bg-brand-primary text-text-inverse',
    'px-6 py-3',
    'text-sm font-medium',
    'shadow-sm',
    'transition-all duration-200',
    'hover:bg-brand-primary-hover',
    'hover:shadow-md',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  /** Secondary button - secondary CTA */
  secondary: () => [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl',
    'border border-border-strong',
    'bg-surface-elevated',
    'px-6 py-3',
    'text-sm font-medium text-text-primary',
    'shadow-sm',
    'transition-all duration-200',
    'hover:bg-surface-soft',
    'hover:border-border-default',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  /** Ghost button - minimal style */
  ghost: () => [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl',
    'px-4 py-2',
    'text-sm font-medium text-text-secondary',
    'transition-all duration-200',
    'hover:bg-surface-soft',
    'hover:text-text-primary',
  ].join(' '),

  /** Link button - text only */
  link: () => [
    'inline-flex items-center gap-1',
    'text-sm font-medium text-brand-primary',
    'transition-colors duration-200',
    'hover:text-brand-primary-hover',
    'underline-offset-4 hover:underline',
  ].join(' '),
}

/**
 * SECTION PATTERNS
 *
 * Pre-built patterns for common page sections.
 */
export const sectionPatterns = {
  /** Page header section */
  header: () => [
    'border-b border-border-default',
    'py-16 sm:py-20 lg:py-24',
  ].join(' '),

  /** Standard content section with padding */
  content: () => [
    'py-16 sm:py-20 lg:py-24',
  ].join(' '),

  /** Narrow content section */
  contentNarrow: () => [
    'py-12 sm:py-16',
  ].join(' '),

  /** CTA section (emphasized) */
  cta: () => [
    'py-20 sm:py-24 lg:py-32',
  ].join(' '),

  /** Hero section (extra tall) */
  hero: () => [
    'py-20 sm:py-28 lg:py-36',
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
    'rounded-xl',
    'border border-border-default',
    'bg-surface-strong',
    'px-4 py-3',
    'text-sm text-text-primary',
    'shadow-sm',
    'outline-none',
    'transition-all duration-200',
    'placeholder:text-text-muted',
    'focus:border-brand-primary',
    'focus:ring-2 focus:ring-brand-primary/20',
  ].join(' '),

  /** Select field */
  select: [
    'w-full',
    'rounded-xl',
    'border border-border-default',
    'bg-surface-strong',
    'px-4 py-3',
    'text-sm text-text-primary',
    'shadow-sm',
    'outline-none',
    'transition-all duration-200',
    'focus:border-brand-primary',
    'focus:ring-2 focus:ring-brand-primary/20',
  ].join(' '),

  /** Textarea */
  textarea: [
    'w-full',
    'rounded-xl',
    'border border-border-default',
    'bg-surface-strong',
    'px-4 py-3',
    'text-sm text-text-primary',
    'shadow-sm',
    'outline-none',
    'transition-all duration-200',
    'placeholder:text-text-muted',
    'focus:border-brand-primary',
    'focus:ring-2 focus:ring-brand-primary/20',
    'resize-none',
  ].join(' '),

  /** Form label */
  label: 'text-sm font-medium text-text-primary mb-2 block',

  /** Form helper text */
  helper: 'text-xs text-text-muted mt-1.5',

  /** Form error text */
  error: 'text-xs text-red-500 mt-1.5',
}

/**
 * BADGE PATTERNS
 */
export const badgePatterns = {
  /** Default badge */
  default: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-soft text-text-secondary',

  /** Brand badge */
  brand: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary-soft text-brand-primary',

  /** Success badge */
  success: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',

  /** Warning badge */
  warning: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',

  /** New badge */
  new: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary text-text-inverse',
}

/**
 * EMPTY STATE PATTERN
 */
export const emptyStatePattern = [
  'rounded-2xl',
  'border-2 border-dashed border-border-default',
  'bg-surface-soft',
  'p-12',
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
 * CONTAINER WIDTHS
 */
export const containerWidths = {
  /** Narrow content (blog posts, focused reading) */
  narrow: 'max-w-3xl mx-auto px-4 sm:px-6',

  /** Default content width */
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',

  /** Wide content (grids, galleries) */
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

  /** Full width with padding */
  full: 'w-full px-4 sm:px-6 lg:px-8',
}

/**
 * QUICK REFERENCE — Common Component Patterns
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ PREMIUM CARD                                            │
 * ├─────────────────────────────────────────────────────────┤
 * │ <div className={cardPatterns.default()}>                │
 * │   <span className={textTokens.eyebrow}>Category</span>  │
 * │   <h3 className={textTokens.h3}>{title}</h3>            │
 * │   <p className={textTokens.body}>{description}</p>      │
 * │ </div>                                                  │
 * └─────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ SECTION WITH HEADER                                     │
 * ├─────────────────────────────────────────────────────────┤
 * │ <section className={sectionPatterns.content()}>         │
 * │   <div className={containerWidths.default}>             │
 * │     <span className={textTokens.eyebrow}>Section</span> │
 * │     <h2 className={textTokens.h2}>{title}</h2>          │
 * │     <p className={textTokens.bodyLarge}>{desc}</p>      │
 * │   </div>                                                │
 * │ </section>                                              │
 * └─────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │ CTA BUTTON GROUP                                        │
 * ├─────────────────────────────────────────────────────────┤
 * │ <div className="flex items-center gap-4">               │
 * │   <button className={buttonPatterns.primary()}>         │
 * │     Get Started                                         │
 * │   </button>                                             │
 * │   <button className={buttonPatterns.secondary()}>       │
 * │     Learn More                                          │
 * │   </button>                                             │
 * │ </div>                                                  │
 * └─────────────────────────────────────────────────────────┘
 */
