import React from 'react';

// Define the props interface for the Card component
export interface CardProps {
  /**
   * The content to be displayed inside the card
   */
  children: React.ReactNode;
  
  /**
   * Optional title for the card
   */
  title?: string;
  
  /**
   * Optional footer content for the card
   */
  footer?: React.ReactNode;
  
  /**
   * Whether the card should have a hover effect
   */
  hoverable?: boolean;
  
  /**
   * Visual variant of the card. "raised" uses a stronger, layered shadow to
   * match Orb-style elevated tiles. Defaults to "base".
   */
  variant?: 'base' | 'raised';

  /**
   * Optional additional CSS classes
   */
  className?: string;
  
  /**
   * Optional border color variant
   */
  borderColor?: 'default' | 'blue' | 'orange' | 'none';
}

/**
 * Card component for displaying content in a contained, styled box
 * 
 * THEME-AWARE: This Card supports CSS variable overrides coming from the app
 * (e.g., `apps/cognexus/src/app/globals.css`). We keep Tailwind defaults so the
 * component looks good immediately, while allowing optional runtime overrides:
 * - --cnx-card-radius    -> border-radius
 * - --cnx-card-shadow    -> box-shadow
 * - --cnx-card-bg        -> background-color
 * - --cnx-card-border    -> border-color
 * If any variable is not defined, the corresponding inline style is ignored and
 * the Tailwind default remains in effect.
 * 
 * This component provides a consistent card styling across the application
 * with support for titles, footers, and hover effects.
 * 
 * @example
 * ```tsx
 * <Card title="Important Information" hoverable>
 *   <p>This is the card content.</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  hoverable = false,
  variant = 'base',
  className = '',
  borderColor = 'default',
}) => {
  // Base classes for all cards (Tailwind defaults act as fallbacks)
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden';
  
  // Classes for hover effect
  const hoverClasses = hoverable ? 'transition-transform duration-300 hover:scale-[1.02]' : '';
  
  // Classes for border color
  const borderClasses = {
    default: 'border border-gray-200 dark:border-gray-700',
    blue: 'border-2 border-blue-500',
    orange: 'border-2 border-orange-500',
    none: '',
  } as const;

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${borderClasses[borderColor]} ${className}`}
      // Inline styles read optional CSS variables to override look at runtime.
      // If a var is missing, the property is ignored by the browser, so the
      // Tailwind fallback from classes above continues to apply.
      style={{
        borderRadius: 'var(--cnx-card-radius)',
        // Use a stronger, layered shadow when variant="raised"; otherwise
        // default to the base card shadow. Both are themeable via CSS vars.
        boxShadow: variant === 'raised'
          ? 'var(--cnx-card-shadow-raised, var(--cnx-card-shadow))'
          : 'var(--cnx-card-shadow)',
        backgroundColor: 'var(--cnx-card-bg)',
        // Using borderColor enables soft theming without removing Tailwind fallback
        borderColor: 'var(--cnx-card-border)'
      }}
      // Data attribute enables host apps to target variants in CSS if needed
      data-variant={variant}
    >
      {/* Card title */}
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      
      {/* Card content */}
      <div className="px-6 py-4">
        {children}
      </div>
      
      {/* Card footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

// This component provides a reusable card container with optional title and footer sections.
// It supports hover effects and different border color options.
// Tailwind CSS supplies sensible defaults; CSS variables allow runtime theming.
// The card is fully typed with TypeScript.
