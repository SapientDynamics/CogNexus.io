'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@cnx/ui';

/**
 * Navigation component for the CogNexus.io platform
 * 
 * This component provides navigation links for the main platform,
 * with visual indicators for the active page and smooth animations.
 */
export const Navigation: React.FC = () => {
  // Get current pathname to determine active link
  const pathname = usePathname();

  // Navigation links shown in the center of the pill bar
  // Keep only known routes to prevent 404s during development
  const navLinks = (
    pathname === '/'
      ? [
          // When on the home page, expose section anchors to demonstrate smooth scrolling
          { href: '#hero', label: 'Home' },
          { href: '#features', label: 'Features' },
          { href: '#how-it-works', label: 'How it Works' },
          { href: '#trust', label: 'Trust' },
          { href: '/forge', label: 'Forge' },
        ]
      : [
          // When on other routes, link back home and to Forge
          { href: '/', label: 'Home' },
          { href: '/forge', label: 'Forge' },
        ]
  );

  return (
    <>
      {/* Desktop (md+): Full-width translucent glass bar with subtle bottom border */}
      <nav className="hidden md:block sticky top-0 z-50">
        {/* The glass background spans the full width; inner content is centered */}
        <div className="navbar-glass">
          {/* Full-width inner bar: ends pinned to screen edges, center links remain centered */}
          <div className="px-4 md:px-6 h-16 w-full flex items-center relative">
            {/* Left: Logo pinned left */}
            <div className="flex-1 flex items-center">
              <Link href="/" className="flex items-center whitespace-nowrap">
                <span className="text-lg font-bold text-black">CogNexus</span>
              </Link>
            </div>

            {/* Center: Nav links (absolutely centered, independent of left/right widths) */}
            {/* Increase gap to give a bit more breathing room between links */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || link.href.startsWith('#') && pathname === '/';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    /*
                     * Transparent pill links (no background) so they inherit the navbar glass blur.
                     * On hover, apply your specified inset dual-shadow for a depressed look:
                     *   box-shadow: inset 2px 2px 5px rgba(0,0,0,0.3), inset -2px -2px 5px rgba(255,255,255,0.7)
                     * No hover background color to keep the glassy feel intact.
                     */
                    className={`
                      text-[15px] px-3 py-1.5 rounded-lg font-medium
                      bg-transparent text-black
                      hover:bg-transparent
                      hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),_inset_-2px_-2px_5px_rgba(255,255,255,0.7)]
                      active:translate-y-px
                      transition-[box-shadow,background-color,color,transform] duration-300 ease-out
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40
                      ${isActive ? '' : ''}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Primary CTA pinned right (black pill with strong drop shadow, Orb-like) */}
            <div className="flex-1 flex items-center justify-end">
              <Link href="/forge">
                {/**
                 * Override base Button styles to match the reference:
                 * - Black rounded pill with white text
                 * - Strong soft outer shadow that deepens on hover
                 * - Subtle press translate and accessible focus ring
                 */}
                <Button
                  variant="ghost"
                  /* Heavier shadow as the default; tighter, less-blurred shadow on hover */
                  /* Slightly reduced size for a tighter pill */
                  className="rounded-xl px-3 py-1.5 text-[14px] !bg-black !text-white
                             hover:!bg-black focus:!bg-black active:!bg-black
                             shadow-[0_6px_16px_rgba(0,0,0,0.38),0_3px_8px_rgba(0,0,0,0.22)]
                             hover:shadow-[0_4px_12px_rgba(0,0,0,0.28),0_2px_6px_rgba(0,0,0,0.18)]
                             transition-shadow duration-300 ease-out active:translate-y-px
                             focus-visible:ring-white/60"
                  /* Inline style guarantees background stays black regardless of theme tokens */
                  style={{ backgroundColor: '#000' }}
                >
                  Create Your Nexus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile (<md): Floating pill centered near the top, translucent with blur */}
      <nav className="md:hidden fixed top-4 inset-x-0 z-50 flex justify-center">
        <div className="navbar-pill px-4 sm:px-6 py-2 w-full max-w-[calc(100%-2rem)]">
          <div className="flex items-center gap-4 justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center whitespace-nowrap">
              <span className="text-base font-bold text-black">CogNexus</span>
            </Link>

            {/* Center: hide links on small for simplicity; Orb uses burger here */}
            <div className="hidden" />

            {/* Right: Primary CTA (match desktop style) */}
            <div className="flex items-center">
              <Link href="/forge">
                <Button
                  variant="ghost"
                  aria-label="Create Your Nexus"
                  /* Heavier shadow as the default; tighter, less-blurred shadow on hover */
                  /* Slightly reduced size for a tighter pill */
                  className="rounded-xl px-2 py-1 text-[13px] !bg-black !text-white
                             hover:!bg-black focus:!bg-black active:!bg-black
                             shadow-[0_12px_28px_rgba(0,0,0,0.45),0_4px_10px_rgba(0,0,0,0.25)]
                             hover:shadow-[0_6px_16px_rgba(0,0,0,0.30),0_2px_6px_rgba(0,0,0,0.18)]
                             transition-shadow duration-300 ease-out active:translate-y-px
                             focus-visible:ring-white/60"
                  /* Inline style guarantees background stays black regardless of theme tokens */
                  style={{ backgroundColor: '#000' }}
                >
                  Create Your Nexus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// This component provides a responsive navigation bar for the CogNexus.io platform.
// It includes links to the main pages and external links to the Forge app.
// The active page is highlighted with an animated underline using Framer Motion.
// The navigation is responsive and includes a mobile menu for smaller screens.
