import React from 'react';
/**
 * Chip component: a small, pill-shaped label with soft shadow and subtle border.
 *
 * This mirrors Orb-style raised chips used for benefits/tags. The component
 * respects CSS variables so host apps can theme without changing the component:
 *  - --cnx-chip-radius   : border-radius (defaults to pill)
 *  - --cnx-chip-bg       : background-color
 *  - --cnx-chip-border   : border-color
 *  - --cnx-chip-shadow   : box-shadow
 *  - --cnx-focus-ring    : focus ring color
 *
 * Usage examples:
 *  <Chip>Real-Time Insights</Chip>
 *  <Chip leading={<span className="h-2 w-2 rounded-full bg-black inline-block" />}>
 *    Benefits
 *  </Chip>
 */
export interface ChipProps {
    /** Chip content */
    children: React.ReactNode;
    /** Optional leading element (icon/dot) */
    leading?: React.ReactNode;
    /** Optional trailing element (icon/badge) */
    trailing?: React.ReactNode;
    /** Optional extra classes */
    className?: string;
    /** Button semantics when clickable */
    as?: 'span' | 'button';
    /** onClick handler when used as button */
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}
export declare const Chip: React.FC<ChipProps>;
export default Chip;
