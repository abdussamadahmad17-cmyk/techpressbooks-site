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
        // Brand colors
        'brand-primary': 'var(--color-brand-primary)',
        'brand-light': 'var(--color-brand-light)',

        // Semantic surface colors
        'surface-default': 'var(--color-surface-default)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-soft': 'var(--color-surface-soft)',
        'surface-overlay': 'var(--color-surface-overlay)',

        // Semantic border colors
        'border-default': 'var(--color-border-default)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-accent': 'var(--color-border-accent)',

        // Semantic text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',

        // Accent colors
        'accent-success': 'var(--color-accent-success)',
        'accent-warning': 'var(--color-accent-warning)',
        'accent-error': 'var(--color-accent-error)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'elevation': 'var(--shadow-elevation)',
      },
      borderRadius: {
        'premium': '1.5rem',
        'lg-premium': '1.75rem',
      },
    },
  },
  plugins: [],
}

export default config
