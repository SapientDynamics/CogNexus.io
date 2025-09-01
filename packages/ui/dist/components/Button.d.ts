import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
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
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
