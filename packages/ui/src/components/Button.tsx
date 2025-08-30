import React from 'react';

// Define the available button variants
export type ButtonVariant = 'primary' | 'ghost' | 'accent';

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
    // Base classes for all button variants
    const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Classes specific to each variant
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      accent: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    };
    
    // Classes for full width and disabled states
    const widthClasses = fullWidth ? 'w-full' : '';
    const disabledClasses = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

// Set display name for better debugging
Button.displayName = 'Button';

// This component provides a reusable button with different style variants
// and supports loading states, icons, and full width options.
// It uses Tailwind CSS for styling and is fully typed with TypeScript.
