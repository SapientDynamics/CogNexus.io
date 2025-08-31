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

  // Mobile menu open/close state (used for the grow-down dropdown on small screens)
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close on Escape (no body scroll lock needed for dropdown)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
                const isActive = pathname === link.href || (link.href.startsWith('#') && pathname === '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
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
          {/* Close the relative wrapper */}
        </div>
      </nav>

      {/* Mobile (<md): Floating pill centered near the top, translucent with blur */}
      <nav className="md:hidden fixed top-4 inset-x-0 z-50 flex justify-center">
        {/* Wrapper ensures the dropdown can anchor below the pill via absolute top-full */}
        <div className="relative w-full max-w-[calc(100%-2rem)]">
          {/* Slightly tighter horizontal padding, a bit taller for touch targets; respect iOS safe areas */}
          <div
            className={`navbar-pill px-3 sm:px-4 py-2.5 w-full transition-[border-radius] duration-300`}
            style={{
              paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
              paddingRight: 'max(1rem, env(safe-area-inset-right))',
              borderRadius: mobileOpen ? '20px 20px 8px 8px' : '20px',
            }}
          >
            <div className="flex items-center gap-4 justify-between">
            {/* Left: Logo (larger hit area via negative margin technique) */}
            <Link href="/" className="flex items-center whitespace-nowrap p-2 -m-2">
              <span className="text-base font-bold text-black">CogNexus</span>
            </Link>

            {/* Center: hide links on small for simplicity; Orb uses burger here */}
            <div className="hidden" />

            {/* Right: Hamburger trigger button (rotates/morphs into X on open) */}
            <div className="flex items-center">
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-dropdown"
                onClick={() => setMobileOpen((v) => !v)}
                className="p-3 -m-3 rounded-lg hover:bg-black/5 active:bg-black/10
                           focus:outline-none focus:ring-2 focus:ring-black/40 transition-colors"
              >
                {/* Animated hamburger -> X using 3 bars */}
                <span className="relative block h-6 w-6">
                  <span
                    className={`absolute left-0 right-0 top-1/2 h-[2px] bg-black rounded transition-transform duration-300 ease-out ${mobileOpen ? 'translate-y-0 rotate-45' : '-translate-y-2 rotate-0'}`}
                  />
                  <span
                    className={`absolute left-0 right-0 top-1/2 h-[2px] bg-black rounded transition-opacity duration-200 ease-out ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <span
                    className={`absolute left-0 right-0 top-1/2 h-[2px] bg-black rounded transition-transform duration-300 ease-out ${mobileOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2 rotate-0'}`}
                  />
                </span>
              </button>
            </div>
          </div>
          {/* Connected grow-down content inside the pill */}
          <div
            id="mobile-dropdown"
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${mobileOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            aria-hidden={!mobileOpen}
          >
            <div className="overflow-hidden">
              {/* Links */}
              <div className="px-5 py-3 space-y-5">
                {/* Apply the same hover treatment as desktop nav links: transparent pill + inset dual-shadow on hover */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      block text-[18px] leading-7 text-black font-medium
                      px-3 py-1.5 rounded-lg bg-transparent
                      hover:bg-transparent
                      hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),_inset_-2px_-2px_5px_rgba(255,255,255,0.7)]
                      active:translate-y-px
                      transition-[box-shadow,background-color,color,transform] duration-300 ease-out
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              {/* Bottom CTA */}
              <div className="px-5 pb-4 pt-1">
                <Link href="/forge" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl px-4 py-3 text-[15px] !bg-black !text-white
                               hover:!bg-black focus:!bg-black active:!bg-black
                               shadow-[0_6px_16px_rgba(0,0,0,0.38),0_3px_8px_rgba(0,0,0,0.22)]
                               hover:shadow-[0_4px_12px_rgba(0,0,0,0.28),0_2px_6px_rgba(0,0,0,0.18)]
                               transition-shadow duration-300 ease-out active:translate-y-px
                               focus-visible:ring-white/60"
                    style={{ backgroundColor: '#000' }}
                  >
                    Create Your Nexus
                  </Button>
                </Link>
              </div>
            </div>
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
