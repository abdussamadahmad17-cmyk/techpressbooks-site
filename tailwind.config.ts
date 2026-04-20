import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic surface colors (replaces magic bg-white/70 dark:bg-white/5)
        'surface-default': 'var(--color-surface-default)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-soft': 'var(--color-surface-soft)',
        'surface-overlay': 'var(--color-surface-overlay)',

        // Semantic border colors
        'border-default': 'var(--color-border-default)',

        // Semantic text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
}

export default config
