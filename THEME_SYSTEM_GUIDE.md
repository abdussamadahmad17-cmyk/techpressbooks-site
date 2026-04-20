# 🎨 Global Theme System - Complete Guide

## The Problem We Solved

You had:
- Dark-first components (old system)
- Dual-theme components (new system)
- Result: Light mode was broken

**The Fix:** A unified semantic token system that enforces parity by design.

---

## How It Works

### The Token Stack

```
CSS Variables (globals.css)
        ↓
Theme Colors (tailwind.config.ts)
        ↓
Semantic Patterns (src/lib/theme-tokens.ts)
        ↓
Component Usage (your components)
```

Each layer enforces that light and dark are **always paired**.

---

## The System

### 1. CSS Variables (globals.css)

Defined for **light mode** and **dark mode**:

```css
:root {
  /* Light mode */
  --color-surface-default: rgb(255 255 255 / 0.7);
  --color-text-primary: rgb(15 23 42 / 1);
  --color-border-default: rgb(203 213 225 / 0.7);
}

html.dark {
  /* Dark mode - AUTOMATICALLY switches */
  --color-surface-default: rgb(255 255 255 / 0.05);
  --color-text-primary: rgb(248 250 252 / 1);
  --color-border-default: rgb(255 255 255 / 0.1);
}
```

**Key insight:** The browser automatically swaps values when `.dark` class is present. No conditional logic needed.

---

### 2. Theme Tokens (src/lib/theme-tokens.ts)

Named exports that map to these variables:

```typescript
// Light mode shows this
bg-surface-default  → rgb(255 255 255 / 0.7)   (white/70)

// Dark mode shows this (automatic)
bg-surface-default  → rgb(255 255 255 / 0.05)  (white/5)
```

No developer has to think about both modes—they just use `bg-surface-default`.

---

## Usage Pattern

### ❌ BEFORE (What broke)

```tsx
// This is the problem:
<article className="border-white/10 bg-white/5 text-white">
  {/* Hard-coded dark only. Light mode = invisible. */}
</article>
```

### ✅ AFTER (What works)

```tsx
import { cardPatterns, textTokens } from '@/lib/theme-tokens'

<article className={cardPatterns.default()}>
  <h3 className={textTokens.h3}>Title</h3>
  <p className={textTokens.body}>Description</p>
</article>
```

**What happens:**
- Light mode: white/70 bg, slate-900 text, slate-200/70 border
- Dark mode: white/5 bg, white text, white/10 border
- **Automatic.** No if/else.

---

## Component Rewrite Template

Here's how to fix any component using the system:

### Pattern 1: Card Component

```tsx
import { cardPatterns, textTokens, buildThemeClass } from '@/lib/theme-tokens'

export function MyCard({ title, description, children }) {
  return (
    <article className={cardPatterns.default()}>
      <h3 className={textTokens.h3}>{title}</h3>
      <p className={textTokens.body}>{description}</p>
      {children}
    </article>
  )
}
```

### Pattern 2: Section Header

```tsx
import { sectionPatterns, textTokens } from '@/lib/theme-tokens'

export function PageHeader({ title, description }) {
  return (
    <section className={sectionPatterns.header()}>
      <h1 className={textTokens.h1}>{title}</h1>
      {description && (
        <p className={textTokens.body}>{description}</p>
      )}
    </section>
  )
}
```

### Pattern 3: Form Inputs

```tsx
import { formPatterns } from '@/lib/theme-tokens'

export function SearchInput() {
  return (
    <div className="space-y-2">
      <label className={formPatterns.label}>Search</label>
      <input 
        className={formPatterns.input}
        placeholder="Type here..."
      />
    </div>
  )
}
```

### Pattern 4: CTA Section

```tsx
import { surfaceTokens, textTokens, sectionPatterns } from '@/lib/theme-tokens'

export function CtaSection() {
  return (
    <section className={sectionPatterns.cta()}>
      <div className={`${surfaceTokens.glass} p-8 rounded-2xl`}>
        <h2 className={textTokens.h2}>Ready to go?</h2>
        <p className={textTokens.secondary}>Description here</p>
      </div>
    </section>
  )
}
```

---

## Available Tokens

### Surface Tokens

| Token | Light | Dark |
|-------|-------|------|
| `surface-default` | white/70 | white/5 |
| `surface-strong` | white | slate-950/60 |
| `surface-soft` | slate-50 | slate-950/40 |
| `surface-overlay` | white/5 | white/5 (glass) |

### Text Tokens

| Token | Light | Dark |
|-------|-------|------|
| `text-primary` | slate-900 | white |
| `text-secondary` | slate-600 | slate-400 |
| `text-muted` | slate-500 | slate-500 |

### Border

| Token | Light | Dark |
|-------|-------|------|
| `border-default` | slate-200/70 | white/10 |

---

## Pre-Built Patterns

### `cardPatterns`

```typescript
cardPatterns.default()  // Standard card with border
cardPatterns.strong()   // Emphasized card
```

### `textTokens`

```typescript
textTokens.h1       // Heading 1
textTokens.h2       // Heading 2
textTokens.h3       // Heading 3
textTokens.body     // Paragraph text
textTokens.sm       // Small text
textTokens.xs       // Extra small (labels, metadata)
textTokens.primary  // Primary color only
textTokens.secondary // Secondary color only
textTokens.muted    // Muted color only
```

### `sectionPatterns`

```typescript
sectionPatterns.header()   // Page header with border
sectionPatterns.content()  // Standard section padding
sectionPatterns.cta()      // CTA section (larger padding)
```

### `formPatterns`

```typescript
formPatterns.input   // Input field
formPatterns.select  // Select dropdown
formPatterns.label   // Form label
```

---

## Real-World Example: Rewriting post-card.tsx

### BEFORE (Broken)

```tsx
export function PostCard({ post }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">
        {post.title}
      </h2>
      <p className="text-sm text-slate-400">{post.excerpt}</p>
    </article>
  )
}
```

**Problem:** Light mode shows white text on light background—invisible.

### AFTER (Fixed)

```tsx
import { cardPatterns, textTokens } from '@/lib/theme-tokens'

export function PostCard({ post }) {
  return (
    <article className={cardPatterns.default()}>
      <h2 className={textTokens.h3}>
        {post.title}
      </h2>
      <p className={textTokens.secondary}>{post.excerpt}</p>
    </article>
  )
}
```

**Result:**
- Light mode: Dark text on white card ✅
- Dark mode: Light text on dark card ✅
- **Both work. No branching logic.**

---

## Applying This Everywhere

### Step-by-Step Conversion

1. **Import the tokens at the top:**
   ```tsx
   import { cardPatterns, textTokens, surfaceTokens } from '@/lib/theme-tokens'
   ```

2. **Replace hardcoded colors with tokens:**
   ```tsx
   // ❌ Bad
   className="text-white"
   
   // ✅ Good
   className={textTokens.primary}
   ```

3. **Use patterns for common layouts:**
   ```tsx
   // ❌ Bad
   className="border-white/10 bg-white/5 p-8"
   
   // ✅ Good
   className={`${surfaceTokens.glass} p-8`}
   ```

4. **Test both themes:**
   - Switch to light mode → should work
   - Switch to dark mode → should work
   - If one breaks, you used a hardcoded color

---

## Preventing Future Drift

### Rule 1: Never Use Raw Colors

❌ Never do this:

```tsx
className="text-white"
className="bg-slate-950"
className="border-white/10"
```

✅ Always use tokens:

```tsx
className={`${textTokens.primary} ${surfaceTokens.default}`}
```

### Rule 2: If It's Not in Tokens, Add It

Need a new color pattern? Add it to `src/lib/theme-tokens.ts`:

1. Define CSS variable in `globals.css`
2. Add Tailwind color in `tailwind.config.ts`
3. Export pattern in `theme-tokens.ts`
4. Document in this file

### Rule 3: New Components Start with Tokens

When building a new component:

```tsx
import { cardPatterns, textTokens } from '@/lib/theme-tokens'

// Uses tokens from the start—no dark-first drift
```

---

## Debugging

### Light mode looks broken?

Check if the component uses raw colors:

```tsx
// These will fail in light mode:
text-white
bg-white/5
border-white/10
```

Replace with tokens.

### Both modes look the same?

Check if the CSS variables are correctly set in `globals.css`. The browser dev tools will show:

```
Computed: color-surface-default = rgb(...)
```

If it doesn't change between light/dark, check the CSS variable values.

---

## Files to Update

Start with these (high impact):

1. `src/components/layout/page-header.tsx`
2. `src/components/blog/post-card.tsx`
3. `src/components/authors/author-card.tsx`
4. `src/components/marketing/section-cta.tsx`
5. `src/components/marketing/featured-book-cta.tsx`
6. `src/components/marketing/post-end-cta.tsx`
7. `src/components/books/book-discovery.tsx`
8. `src/app/categories/page.tsx` (remove hardcoded gradient)
9. `src/app/categories/[slug]/page.tsx` (remove hardcoded gradient)
10. `src/app/authors/[slug]/page.tsx` (replace hardcoded colors)

---

## Testing Checklist

After updating a component:

- [ ] Light mode: All text readable
- [ ] Dark mode: All text readable
- [ ] Light mode: Buttons have contrast
- [ ] Dark mode: Buttons have contrast
- [ ] Borders visible in both modes
- [ ] Shadows work in both modes (or removed)
- [ ] Hover states work in both

---

## Advanced: Custom Theme Variables

If you need a one-off color:

```tsx
// Inside globals.css
:root {
  --color-my-custom-thing: rgb(239 68 68 / 1);
}

html.dark {
  --color-my-custom-thing: rgb(239 68 68 / 0.7);
}

// In tailwind.config.ts
colors: {
  'my-custom-thing': 'var(--color-my-custom-thing)',
}

// In component:
className="bg-my-custom-thing"
```

But **prefer using existing tokens first**.

---

## Summary

This system ensures:

✅ Light mode always works
✅ Dark mode always works
✅ No drift over time
✅ Easy to add new patterns
✅ Consistent developer experience
✅ CMS-ready (tokens can be externalized later if needed)

**Next step:** Start updating components using the patterns above. Begin with high-impact files.
