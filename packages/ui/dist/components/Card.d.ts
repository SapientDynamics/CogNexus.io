import React from 'react';
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
export declare const Card: React.FC<CardProps>;
