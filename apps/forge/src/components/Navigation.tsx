'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Chip } from '@cnx/ui';

/**
 * Navigation component for the Forge app
 * 
 * This component provides navigation links for the Forge vertical,
 * with visual indicators for the active page and smooth animations.
 */
export const Navigation: React.FC = () => {
  // Get current pathname to determine active link
  const pathname = usePathname();
  
  // Navigation links
  // Updated: remove "Home" to avoid redundant entry point in the app navigation
  const navLinks = [
    { href: '/ui-demo', label: 'UI Demo' },
  ];
  
  // External links
  const externalLinks = [
    { href: 'https://cognexus.io', label: 'Main Platform' },
  ];
  
  return (
    <nav className="bg-black/20 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              {/* Placeholder wordmark logo (replace when official logo lands) */}
              <Image
                src="/forge-logo-placeholder.svg"
                alt="Forge logo"
                width={140}
                height={30}
                priority
              />
              {/* Badge: With the power of CogNexus */}
              <Chip
                className="hidden sm:inline-flex"
                leading={<span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--cnx-accent)' }} />}
              >
                With the power of CogNexus
              </Chip>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--cnx-accent)]"
                        layoutId="navigation-underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* External links */}
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// This component provides a responsive navigation bar for the Forge app.
// It includes links to the main pages and external links to the CogNexus.io platform.
// The active page is highlighted with an animated underline using Framer Motion.
// The navigation is responsive and includes a mobile menu for smaller screens.
