/**
 * Design System Tokens
 * Centralized constants for consistent UI
 */

export const tokens = {
  // Transition durations
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
  
  // Easing functions
  ease: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Border radius (maps to CSS vars)
  radius: {
    sm: 'var(--r-sm)',
    md: 'var(--r-md)',
    lg: 'var(--r-lg)',
    xl: 'var(--r-xl)',
  },
} as const;
