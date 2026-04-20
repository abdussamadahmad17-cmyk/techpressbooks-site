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
        'brand-primary-hover': 'var(--color-brand-primary-hover)',
        'brand-primary-soft': 'var(--color-brand-primary-soft)',
        'brand-primary-muted': 'var(--color-brand-primary-muted)',

        // Semantic surface colors
        'surface-default': 'var(--color-surface-default)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-soft': 'var(--color-surface-soft)',
        'surface-overlay': 'var(--color-surface-overlay)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-inset': 'var(--color-surface-inset)',

        // Semantic border colors
        'border-default': 'var(--color-border-default)',
        'border-strong': 'var(--color-border-strong)',
        'border-subtle': 'var(--color-border-subtle)',

        // Semantic text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',

        // Accent colors
        'accent-success': 'var(--color-accent-success)',
        'accent-warning': 'var(--color-accent-warning)',
        'accent-info': 'var(--color-accent-info)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
      },
      borderRadius: {
        'DEFAULT': 'var(--radius)',
        'lg': 'calc(var(--radius) * 1.5)',
        'xl': 'calc(var(--radius) * 2)',
        '2xl': 'calc(var(--radius) * 2.5)',
        '3xl': 'calc(var(--radius) * 3)',
      },
    },
  },
  plugins: [],
}

export default config
