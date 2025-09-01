import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
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
export const Button = React.forwardRef(({ children, variant = 'primary', icon, fullWidth = false, isLoading = false, className = '', disabled, ...props }, ref) => {
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
        primary: 'bg-black text-white hover:bg-neutral-900 focus:ring-black/40',
        // Secondary matches mockup: white surface, subtle gray border, soft layered shadow, hover lift.
        // We intentionally do NOT apply token overrides to secondary so it can remain white
        // even if the primary tokens change. This yields the black/white CTA pair.
        secondary: [
            'bg-white text-neutral-900',
            'border border-[#e9e9e7]',
            // Layered soft shadow to echo mockup buttons (non-inset for clean white surface)
            'shadow-[0_6px_18px_rgba(0,0,0,.12),_0_28px_56px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)]',
            'hover:shadow-[0_12px_28px_rgba(0,0,0,.14),_0_36px_72px_rgba(0,0,0,.12)]',
            'hover:bg-neutral-100',
            'focus:ring-black/40'
        ].join(' '),
        // Ghost remains a very light-weight option for links or minimal CTAs
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        // Accent is available for highlight usage (kept from scaffold)
        accent: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    };
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
    return (_jsxs("button", { ref: ref, className: `${baseClasses} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${tokenAppliedForVariant} ${className}`, disabled: disabled || isLoading, 
        // Inline style allows variable-driven motion tokens (duration/easing)
        style: {
            transitionDuration: 'var(--cnx-duration)',
            transitionTimingFunction: 'var(--cnx-ease)',
        }, ...props, children: [isLoading && (_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", role: "img", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })), icon && !isLoading && _jsx("span", { className: "mr-2", children: icon }), children] }));
});
// Set display name for better debugging
Button.displayName = 'Button';
