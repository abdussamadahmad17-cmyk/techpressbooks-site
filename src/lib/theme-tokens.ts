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
 * Use these for card components.
 */
export const cardPatterns = {
  /** Standard card: surface with border, hoverstate + shadow lift */
  default: () => [
    'rounded-[1.75rem]',
    'border',
    'bg-surface-default',
    'border-border-default',
    'p-6',
    'backdrop-blur',
    'transition duration-300',
    'hover:-translate-y-1',
    'hover:shadow-md',
  ].join(' '),

  /** Emphasis card: stronger surface */
  strong: () => [
    'rounded-[1.75rem]',
    'border',
    'bg-surface-strong',
    'border-border-default',
    'p-6',
    'transition',
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

  /** Primary + sizing combo */
  h1: 'text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl',

  h2: 'text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl',

  h3: 'text-2xl font-semibold tracking-tight text-text-primary',

  /** Body text (base paragraph) */
  body: 'text-base leading-8 text-text-secondary',

  /** Small text (captions, labels) */
  sm: 'text-sm leading-7 text-text-secondary',

  /** Extra small text (metadata) */
  xs: 'text-xs uppercase tracking-[0.2em] text-text-muted',
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
 * Pre-built patterns for common page sections.
 */
export const sectionPatterns = {
  /** Page header section */
  header: () => [
    'border-b',
    'border-border-default',
    'py-16 sm:py-20',
  ].join(' '),

  /** Standard content section with padding */
  content: () => [
    'py-14 sm:py-16',
  ].join(' '),

  /** CTA section (emphasized) */
  cta: () => [
    'py-20 sm:py-24',
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
 * └─────────────────────────────────────────────────────────┘
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
