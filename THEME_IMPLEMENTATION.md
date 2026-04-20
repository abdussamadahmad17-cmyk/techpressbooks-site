# 🚀 Quick Implementation Guide

Use this file to apply the theme system to critical components one by one.

## How to Use This Guide

1. Pick a file from the list below
2. Copy the import statement
3. Replace the `className` values
4. Test light/dark mode
5. Move to next file

---

## File 1: page-header.tsx

**Impact:** Used on 8+ pages  
**Import:**
```tsx
import { sectionPatterns, textTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<section className="border-b border-white/10 py-16 sm:py-20">
  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
  <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">

// AFTER
<section className={sectionPatterns.header()}>
  <h1 className={textTokens.h1}>
  <p className={textTokens.body}>
```

---

## File 2: post-card.tsx

**Impact:** Blog page, homepage  
**Import:**
```tsx
import { cardPatterns, textTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
  <h2 className="text-2xl font-semibold tracking-tight text-white">
  <div className="flex flex-wrap gap-3 text-sm text-slate-500">
  <p className="text-sm leading-7 text-slate-400">
  <Link className="inline-flex text-sm font-medium text-slate-200 transition hover:text-white">

// AFTER
<article className={cardPatterns.default()}>
  <h2 className={textTokens.h3}>
  <div className="flex flex-wrap gap-3 text-sm text-text-muted">
  <p className={textTokens.secondary}>
  <Link className={`inline-flex text-sm font-medium transition ${textTokens.secondary} hover:${textTokens.primary}`}>
```

---

## File 3: author-card.tsx

**Impact:** Authors page  
**Import:**
```tsx
import { cardPatterns, textTokens, surfaceTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
  <h2 className="text-2xl font-semibold tracking-tight text-white">
  <p className="text-sm text-slate-400">
  <p className="text-sm text-slate-500">
  <p className="text-sm leading-7 text-slate-400">

// AFTER
<article className={cardPatterns.default()}>
  <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border ${surfaceTokens.default.split(' ')[1]} bg-surface-soft`}>
  <h2 className={textTokens.h3}>
  <p className={textTokens.secondary}>
  <p className={textTokens.muted}>
  <p className={textTokens.secondary}>
```

---

## File 4: section-cta.tsx

**Impact:** CTA sections  
**Import:**
```tsx
import { surfaceTokens, textTokens, sectionPatterns } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<section className="py-20 sm:py-24">
  <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur sm:px-12">
    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
    <p className="text-base leading-8 text-slate-300">

// AFTER
<section className={sectionPatterns.cta()}>
  <div className={`${surfaceTokens.glass} px-8 py-12 rounded-[2rem] sm:px-12`}>
    <h2 className={textTokens.h2}>
    <p className={textTokens.body}>
```

---

## File 5: featured-book-cta.tsx

**Impact:** Homepage CTA  
**Import:**
```tsx
import { surfaceTokens, textTokens, sectionPatterns } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<section className="py-20 sm:py-24">
  <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-800">
    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
    <p className="text-base leading-8 text-slate-300">
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
      <h3 className="mt-2 text-2xl font-semibold text-white">

// AFTER
<section className={sectionPatterns.cta()}>
  <div className={`grid gap-8 ${surfaceTokens.glass} p-8 rounded-[2rem] lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center`}>
    <div className={`relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border ${surfaceTokens.default.split(' ')[1]} bg-surface-soft`}>
    <h2 className={textTokens.h2}>
    <p className={textTokens.body}>
    <div className={`rounded-[1.5rem] border ${surfaceTokens.default.split(' ')[1]} bg-surface-strong p-5`}>
      <h3 className={textTokens.h3}>
```

---

## File 6: post-end-cta.tsx

**Impact:** Blog post end  
**Import:**
```tsx
import { surfaceTokens, textTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
  <h2 className="text-2xl font-semibold text-white">
  <p className="text-base leading-8 text-slate-300">

// AFTER
<section className={`space-y-5 ${surfaceTokens.glass} p-8 rounded-[2rem]`}>
  <h2 className={textTokens.h3}>
  <p className={textTokens.body}>
```

---

## File 7: book-discovery.tsx

**Impact:** Book library filters  
**Import:**
```tsx
import { formPatterns, surfaceTokens, textTokens, borderTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE - Form labels
<label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">

// AFTER - Form labels
<label className={formPatterns.label}>

// BEFORE - Input fields
<input 
  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-500"
/>

// AFTER - Input fields
<input 
  className={formPatterns.input}
/>

// BEFORE - Select fields
<select 
  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
>

// AFTER - Select fields
<select 
  className={formPatterns.select}
>

// BEFORE - Filter pills
<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">

// AFTER - Filter pills
<span className={`rounded-full border border-border-default bg-surface-soft px-3 py-1 text-xs ${textTokens.secondary}`}>

// BEFORE - Clear button
<button className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 px-5 text-sm font-medium text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50">

// AFTER - Clear button
<button className={`inline-flex h-12 items-center justify-center rounded-2xl border border-border-default bg-surface-strong px-5 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${textTokens.secondary}`}>

// BEFORE - Results counter
<p className="text-sm text-slate-400">

// AFTER - Results counter
<p className={`text-sm ${textTokens.secondary}`}>
```

---

## File 8: /categories/page.tsx

**Impact:** Categories page (currently ALL dark)  
**Change:**

Remove the hardcoded dark gradient wrapper:

```tsx
// BEFORE
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <div className="container mx-auto px-4 py-16">
    {/* content */}
  </div>
</div>

// AFTER
<>
  <div className="container mx-auto px-4 py-16">
    {/* content */}
  </div>
</>
```

The gradient was forcing dark mode appearance. Remove it—page inherits from layout.

---

## File 9: /categories/[slug]/page.tsx

**Impact:** Category detail pages (currently ALL dark)  
**Change:** Same as File 8—remove the gradient wrapper.

---

## File 10: /authors/[slug]/page.tsx

**Impact:** Author detail pages  
**Import:**
```tsx
import { sectionPatterns, textTokens, surfaceTokens } from '@/lib/theme-tokens'
```

**Changes:**

```tsx
// BEFORE
<section className="border-b border-white/10 py-16 sm:py-20">
  <div className="relative h-40 w-40 overflow-hidden rounded-4xl border border-slate-200/70 bg-slate-100 dark:border-white/10 dark:bg-slate-800">
  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
  <p className="text-lg text-slate-400">
  <p className="max-w-3xl text-base leading-8 text-slate-300">
  <p className="text-sm text-slate-500">
  <h2 className="text-3xl font-semibold tracking-tight text-white">

// AFTER
<section className={sectionPatterns.header()}>
  <div className={`relative h-40 w-40 overflow-hidden rounded-4xl border border-border-default bg-surface-soft`}>
  <h1 className={textTokens.h1}>
  <p className={textTokens.body}>
  <p className={textTokens.body}>
  <p className={textTokens.muted}>
  <h2 className={textTokens.h2}>
```

---

## Testing After Each File

After updating each file:

1. Run dev server: `npm run dev`
2. Navigate to the page
3. Check light mode ✅
4. Click theme toggle
5. Check dark mode ✅
6. Move to next file

**If something looks broken:**
- Check you imported the tokens
- Check you're using the token variables, not raw colors
- Check globals.css has the CSS variable definitions

---

## Order Matters

Apply in this order (high → low impact):

1. `page-header.tsx` — fixes 8+ pages
2. `post-card.tsx` — fixes blog + homepage
3. `author-card.tsx` — fixes author grid
4. `section-cta.tsx` → `featured-book-cta.tsx` → `post-end-cta.tsx`
5. `book-discovery.tsx` — largest component, fix last
6. Category pages (2 files)
7. `authors/[slug]/page.tsx`

---

## Done! 

When all files are updated:
- ✅ Light mode works everywhere
- ✅ Dark mode works everywhere
- ✅ No hardcoded colors
- ✅ System prevents future drift
