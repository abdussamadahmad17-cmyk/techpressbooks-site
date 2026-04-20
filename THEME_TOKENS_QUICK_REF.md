# 🎨 Theme System - Quick Reference Card

Print this. Bookmark it. Use it every day.

---

## Token Quick Reference

### Surfaces (Backgrounds)

```typescript
// Card-like containers
surfaceTokens.default         // bg-white/70 dark:bg-white/5
surfaceTokens.strong          // bg-white dark:bg-slate-950/60
surfaceTokens.soft            // bg-slate-50 dark:bg-slate-950/40

// Glass effect
surfaceTokens.glass           // + backdrop-blur + border
```

### Text Colors

```typescript
textTokens.primary            // Main text (dark text in light, white in dark)
textTokens.secondary          // Secondary (gray in light, light-gray in dark)
textTokens.muted              // Very subtle (gray-500)

// With sizing
textTokens.h1                 // 4xl font-semibold text-slate-900 dark:text-white
textTokens.h2                 // 3xl font-semibold ...
textTokens.h3                 // 2xl font-semibold ...
textTokens.body               // 16px with line-height
textTokens.sm                 // Small text
textTokens.xs                 // Extra small (labels)
```

### Borders

```typescript
borderTokens.default          // border-slate-200/70 dark:border-white/10
borderTokens.dashed           // Same but dashed
```

---

## Pre-Built Patterns

### Cards

```typescript
cardPatterns.default()        // Rounded, border, shadow on hover
cardPatterns.strong()         // Same but stronger background
```

### Sections

```typescript
sectionPatterns.header()      // Border-bottom, py-16 sm:py-20
sectionPatterns.content()     // py-14 sm:py-16
sectionPatterns.cta()         // py-20 sm:py-24 (bigger padding)
```

### Forms

```typescript
formPatterns.input            // Full input styling (all states)
formPatterns.select           // Select dropdown styling
formPatterns.label            // Label styling
```

### Empty States

```typescript
emptyStatePattern             // Dashed border + soft background
```

---

## Copy-Paste Templates

### Template 1: Card Component

```tsx
import { cardPatterns, textTokens } from '@/lib/theme-tokens'

export function MyCard() {
  return (
    <div className={cardPatterns.default()}>
      <h3 className={textTokens.h3}>Title</h3>
      <p className={textTokens.body}>Description</p>
    </div>
  )
}
```

### Template 2: Form Group

```tsx
import { formPatterns } from '@/lib/theme-tokens'

<div className="space-y-2">
  <label className={formPatterns.label}>Label</label>
  <input className={formPatterns.input} placeholder="..." />
</div>
```

### Template 3: Page Header

```tsx
import { sectionPatterns, textTokens } from '@/lib/theme-tokens'

<section className={sectionPatterns.header()}>
  <h1 className={textTokens.h1}>Title</h1>
  <p className={textTokens.body}>Description</p>
</section>
```

### Template 4: CTA Container

```tsx
import { surfaceTokens, textTokens, sectionPatterns } from '@/lib/theme-tokens'

<section className={sectionPatterns.cta()}>
  <div className={`${surfaceTokens.glass} p-8 rounded-2xl`}>
    <h2 className={textTokens.h2}>Call to action</h2>
    <p className={textTokens.body}>Description</p>
  </div>
</section>
```

---

## ❌ Never Do This

```tsx
// ❌ FORBIDDEN - Hardcoded colors break light mode
className="text-white"
className="bg-white/5"
className="border-white/10"
className="text-slate-400"

// ❌ FORBIDDEN - Manual dark variants
className="text-slate-900 dark:text-white"

// Keep this style for component-specific styling
className="text-red-500"  // Accent colors
className="hover:bg-red-500"  // Interactions
```

---

## ✅ Always Do This

```tsx
// ✅ Import tokens
import { cardPatterns, textTokens } from '@/lib/theme-tokens'

// ✅ Use them
className={cardPatterns.default()}
className={textTokens.primary}

// ✅ Or combine with custom classes
className={`${surfaceTokens.default} rounded-2xl p-4`}
```

---

## Common Replacements

| Old (Broken) | New (Fixed) |
|------|-------|
| `text-white` | `textTokens.primary` |
| `text-slate-400` | `textTokens.secondary` |
| `text-slate-500` | `textTokens.muted` |
| `border-white/10 bg-white/5` | `surfaceTokens.default` |
| `border-white/10 bg-white/5 p-6` | `{cardPatterns.default()}` |
| `rounded-2xl border border-white/10` | (use surfaceTokens + border-radius) |

---

## CSS Variables (Behind The Scenes)

These auto-switch when theme changes:

```css
--color-surface-default: rgb(255 255 255 / 0.7)    /* light */
--color-surface-default: rgb(255 255 255 / 0.05)   /* dark */

--color-text-primary: rgb(15 23 42 / 1)            /* light */
--color-text-primary: rgb(248 250 252 / 1)         /* dark */
```

**You don't use these directly. Tokens use them for you.**

---

## Testing Checklist

After updating a component:

- [ ] Light mode: Text readable?
- [ ] Dark mode: Text readable?
- [ ] Light mode: Buttons visible?
- [ ] Dark mode: Buttons visible?
- [ ] Light mode: Borders visible?
- [ ] Dark mode: Borders visible?
- [ ] No raw colors in code?

---

## Debug This

**"My component looks wrong in light mode"**

1. Check imports:
   ```tsx
   import { ... } from '@/lib/theme-tokens'
   ```

2. Check for hardcoded colors:
   ```tsx
   text-white          // ❌ Replace with textTokens
   bg-white/5          // ❌ Replace with surfaceTokens
   border-white/10     // ❌ Replace with borderTokens
   ```

3. Hard refresh browser (Ctrl+Shift+R)

4. Verify CSS variables are loading:
   - Open DevTools → Application → CSS Variables
   - Look for `--color-surface-default` etc
   - Should change when you toggle theme

---

## Files to Reference

- **How it works:** `THEME_SYSTEM_GUIDE.md`
- **Step by step:** `THEME_IMPLEMENTATION.md`
- **Before/after:** `THEME_BEFORE_AFTER.md`
- **Tokens code:** `src/lib/theme-tokens.ts`
- **CSS variables:** `src/app/globals.css`
- **Tailwind config:** `tailwind.config.ts`

---

## Pro Tips

**Tip 1:** Copy `cardPatterns.default()` into new card components  
**Tip 2:** Use `sectionPatterns.header()` on every page header  
**Tip 3:** Always import tokens at the top (not inline)  
**Tip 4:** Test both modes before committing  
**Tip 5:** If unsure, ask "what would `cardPatterns.default()` do?"

---

## One-Line Rules

- Use tokens, not colors ✅
- Import from `@/lib/theme-tokens` ✅
- Test both light/dark ✅
- Never hardcode `text-white` ❌
- When new, check existing similar component ✅

---

## Save This File

Bookmark: `README_THEME_SYSTEM.md` in repo root  
Reference: This file (`THEME_TOKENS_QUICK_REF.md`)  
Code: `src/lib/theme-tokens.ts`

---

**Last Updated:** April 20, 2026  
**Status:** Production Ready ✅
