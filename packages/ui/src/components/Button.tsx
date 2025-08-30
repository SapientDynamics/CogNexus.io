import React from 'react';

// Define the available button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';

// Define the props interface for the Button component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   * - primary: Main call-to-action style (default)
   * - ghost: Subtle, borderless style
   * - accent: Highlighted, attention-grabbing style
   */
  variant?: ButtonVariant;
  
  /**
   * Optional icon to display before the button text
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
}

/**
 * Button component for user interactions
 * 
 * This component provides a consistent button styling across the application
 * with support for different visual variants and states.
 *
 * THEME-AWARE: The base styling reads from CSS variables defined at the app level
 * (e.g., in `apps/cognexus/src/app/globals.css`). This allows us to swap the
 * theme (fonts, colors, radii, shadows, motion) without changing component code.
 * We still retain Tailwind-based variant fallbacks for safety.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      icon,
      fullWidth = false,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    /**
     * Base classes for all button variants.
     * We use Tailwind utilities + arbitrary values to connect to CSS variables.
     * - text-[var(--cnx-btn-font-size)] binds the font size to the token
     * - px/py/rounded/bg/text/shadow read from tokens too
     * - transition-all uses inline style for duration/easing from tokens
     */
    const baseClasses = [
      'inline-flex select-none items-center justify-center',
      // Radius from token (fallback to Tailwind rounded-md via variants if missing)
      'rounded-[var(--cnx-btn-radius)]',
      // Padding from tokens (x/y)
      'px-[var(--cnx-btn-padding-x)]',
      'py-[var(--cnx-btn-padding-y)]',
      // Font sizing and weight
      'text-[var(--cnx-btn-font-size)] font-medium',
      // We will append color/shadow overrides later to ensure they win over variants
      // Transitions + focus ring for accessibility
      'transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
    ].join(' ');
    
    /**
     * Variant-specific fallbacks using Tailwind.
     * These apply when tokens are not set or when a different look is desired.
     * They also provide sensible hover/focus colors out of the box.
     */
    const variantClasses = {
      // Primary is our main CTA; tokens will override its colors/shadow to match the theme.
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      // Secondary is a white pill with a subtle border + soft shadow (Orb-like).
      // We intentionally do NOT apply token overrides to secondary so it can remain white
      // even if the primary tokens change. This yields the black/white CTA pair.
      secondary: [
        'bg-white text-black',
        'border border-black/10',
        // Soft layered shadow approximating Orb secondary buttons
        'shadow-[0_1px_1px_rgba(0,0,0,.06),0_6px_12px_rgba(0,0,0,.06)]',
        'hover:bg-neutral-100',
        'focus:ring-black/40'
      ].join(' '),
      // Ghost remains a very light-weight option for links or minimal CTAs
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      // Accent is available for highlight usage (kept from scaffold)
      accent: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    } as const;

    // Classes for full width and disabled states
    const widthClasses = fullWidth ? 'w-full' : '';
    const disabledClasses = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';

    // Append token-based overrides last so they take precedence over variant fallbacks.
    // IMPORTANT: We only apply these for the 'primary' variant to allow other
    // variants (e.g., a white secondary button) to style independently without
    // being forced to adopt the global token colors.
    const tokenOverrideClasses = [
      'text-[var(--cnx-btn-text)]',
      'bg-[var(--cnx-btn-bg)]',
      'shadow-[var(--cnx-btn-shadow)]',
      // Hover overrides sourced from tokens
      'hover:text-[var(--cnx-btn-text-hover)]',
      'hover:bg-[var(--cnx-btn-bg-hover)]',
      'hover:shadow-[var(--cnx-btn-shadow-hover)]',
      // Focus ring color from token
      'focus:ring-[var(--cnx-focus-ring)]',
    ].join(' ');
    const tokenAppliedForVariant = variant === 'primary' ? tokenOverrideClasses : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${tokenAppliedForVariant} ${className}`}
        disabled={disabled || isLoading}
        // Inline style allows variable-driven motion tokens (duration/easing)
        style={{
          transitionDuration: 'var(--cnx-duration)',
          transitionTimingFunction: 'var(--cnx-ease)',
        }}
        {...props}
      >
        {/* Optional loading spinner shown left of content */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {/* Optional leading icon when not loading */}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}

        {/* Button label */}
        {children}
      </button>
    );
  }
);

// Set display name for better debugging
Button.displayName = 'Button';

// This component provides a reusable button with different style variants
// and supports loading states, icons, and full width options.
// It uses Tailwind CSS + CSS variables to enable drop-in theming.
// and is fully typed with TypeScript.
