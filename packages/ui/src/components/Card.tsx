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
  className = '',
  borderColor = 'default',
}) => {
  // Base classes for all cards
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden';
  
  // Classes for hover effect
  const hoverClasses = hoverable ? 'transition-transform duration-300 hover:scale-[1.02]' : '';
  
  // Classes for border color
  const borderClasses = {
    default: 'border border-gray-200 dark:border-gray-700',
    blue: 'border-2 border-blue-500',
    orange: 'border-2 border-orange-500',
    none: '',
  };
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${borderClasses[borderColor]} ${className}`}>
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
// The card uses Tailwind CSS for styling and is fully typed with TypeScript.
