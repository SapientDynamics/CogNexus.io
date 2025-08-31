import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer
 * A shared site footer rendered on all pages via the root layout.
 *
 * Design goals:
 * - Keep the black/white brand aesthetic (no blues).
 * - Include the CogNexus logo and primary nav shortcuts.
 * - Clearly attribute that CogNexus is by Sapient Dynamics with an external link.
 * - Provide placeholders for legal links (Terms, Privacy) for future wiring.
 */
export const Footer: React.FC = () => {
  // Compute the current year for the copyright line.
  const year = new Date().getFullYear();

  return (
    // Elevate footer above the fixed hero (which uses z-0) so it can receive pointer events.
    // Using a local stacking context with relative + z-10 prevents the hero from blocking clicks.
    <footer className="relative z-10 mt-24 bg-transparent text-neutral-700 border-t border-neutral-200">
      {/* Constrain content to the site width and provide generous vertical spacing */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top row: 3-column layout (Left: brand/byline, Center: nav, Right: social) */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:items-center">
          {/* Brand mark with inline attribution: "CogNexus by Sapient Dynamics" */}
          <div className="flex items-center gap-2">
            {/* Logo links to home */}
            <Link href="/" className="flex items-center" aria-label="Home">
              <Image
                src="/brand/CXCogNexus_crop_trans.png"
                alt="CogNexus logo"
                width={140}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>
            {/* Inline attribution following the logo */}
            <span className="text-sm text-neutral-500">by</span>
            <a
              href="https://www.sapientdynamics.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-800 hover:text-black underline decoration-neutral-300 hover:decoration-neutral-600 underline-offset-4"
            >
              Sapient Dynamics
            </a>
          </div>

          {/* Primary footer navigation: centered, uppercase, spaced like the reference */}
          <nav
            aria-label="Footer navigation"
            // Force all links to stay on a single line (no wrapping)
            className="md:col-start-2 flex flex-nowrap items-center justify-center gap-x-6 sm:gap-x-8 text-[12px] tracking-wider uppercase whitespace-nowrap"
          >
            {/**
             * Match header navbar order and labels exactly for consistency:
             * About → How it Works → Platforms → Trust
             * Use '/#' anchors so links work from any route (footer is global in layout).
             */}
            <Link href="/#founder-quote" className="hover:text-black transition-colors">About</Link>
            <Link href="/#how-it-works" className="hover:text-black transition-colors">How it Works</Link>
            <Link href="/#platforms" className="hover:text-black transition-colors">Platforms</Link>
            <Link href="/#trust" className="hover:text-black transition-colors">Trust</Link>
          </nav>

          {/* Right: Social icons (placeholders), aligned to the right on desktop */}
          <div className="md:col-start-3 flex items-center justify-center md:justify-end gap-4 text-neutral-500">
            {/* NOTE: Replace href="#" with real social URLs when available. */}
            <a href="#" aria-label="Twitter" className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
              {/* Simple "X" (Twitter) mark */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.243 3H21l-6.54 7.47L22 21h-6.828l-4.51-5.41L5.293 21H2.535l7.02-8.02L2 3h6.828l4.18 5.02L18.243 3zm-1.2 16h1.62L8.13 5h-1.62l10.533 14z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.84v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.7c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.73-2.57 3.53V23h-4V8z" />
              </svg>
            </a>
            <a href="#" aria-label="RSS" className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0zM1.82 8.55v3.27c5.92 0 10.73 4.81 10.73 10.73h3.27C15.82 15.1 8.27 7.55 1.82 8.55zM1.82 2v3.27c9.87 0 17.82 7.95 17.82 17.82H23C23 11.6 13.4 2 1.82 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider for visual separation (thin, light) */}
        <div className="mt-10 h-px bg-neutral-200" />

        {/* Bottom row: centered copyright with subtle text + legal (optional) */}
        <div className="mt-6 flex flex-col items-center gap-3 text-[12px] text-neutral-500">
          <p className="text-center">© {year} Sapient Dynamics, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* Placeholder legal links; wire real routes when available */}
            <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
            <span className="text-neutral-300">|</span>
            <Link href="#" className="hover:text-black transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
