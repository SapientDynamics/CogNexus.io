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

export const Chip: React.FC<ChipProps> = ({
  children,
  leading,
  trailing,
  className = '',
  as = 'span',
  onClick,
}) => {
  const base = `inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-900
    border bg-white rounded-full shadow-sm
    border-neutral-200/90
    select-none
    transition-[transform,box-shadow] duration-200 ease-out
    hover:translate-y-[-1px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--cnx-focus-ring,rgba(0,0,0,0.4))] focus-visible:ring-offset-white`;

  const style: React.CSSProperties = {
    borderRadius: 'var(--cnx-chip-radius, 9999px)',
    backgroundColor: 'var(--cnx-chip-bg, rgba(255,255,255,0.95))',
    borderColor: 'var(--cnx-chip-border, rgba(0,0,0,0.08))',
    boxShadow: 'var(--cnx-chip-shadow, 0 2px 6px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06))',
  };

  const content = (
    <span className={`${base} ${className}`} style={style}>
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </span>
  );

  if (as === 'button') {
    return (
      <button type="button" onClick={onClick} className="focus:outline-none">
        {content}
      </button>
    );
  }

  return content;
};

export default Chip;
