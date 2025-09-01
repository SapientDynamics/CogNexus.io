'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@cnx/ui';

/**
 * LandingHome
 *
 * Forge's marketing/landing page that now lives at the root path "/".
 * It introduces the product, reinforces brand, and drives users to /auth.
 *
 * Key behavior:
 * - Primary CTA: "Enter Forge" → "/auth?mode=signup" (create account)
 * - Secondary CTA: "Sign in" → "/auth?mode=signin"
 * - Simple, performant layout with a dark blueprint background and legible content.
 * - Uses shared @cnx/ui Button for consistent styling.
 */
export default function LandingHome() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1C1E22] text-white">
      {/* Header with logo + subheading for brand reinforcement */}
      <header className="relative z-10 bg-[#1C1E22]/80 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-2">
            {/* Logo is served from apps/forge/public as "/FORGE_logo_crop_trans.png" */}
            <img src="/FORGE_logo_crop_trans.png" alt="Forge" className="block h-10 w-auto select-none drop-shadow" draggable={false} />
            <span className="block -ml-1 text-xs sm:text-sm leading-none text-white/70 pb-[1px]">With the power of CogNexus</span>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-white/80 sm:flex">
            <Link href="https://cognexus.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">Main Platform</Link>
          </nav>
        </div>
      </header>

      {/* Decorative blueprint grid and subtle vignette for depth, kept very lightweight */}
      <div className="relative flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(45,106,160,0.35) 0 1px, transparent 1px 100%),\n' +
              'linear-gradient(90deg, rgba(45,106,160,0.35) 0 1px, transparent 1px 100%)',
            backgroundSize: '48px 48px, 48px 48px',
          }}
        />

        {/* Main hero content */}
        <div className="relative z-10">
          <section className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            {/* Headline + supporting copy */}
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
                Decision‑ready answers for construction teams
              </h1>
              <p className="mt-4 text-white/80 text-lg">
                Ingest drawings, specs, RFIs, and field notes. Ask in plain language and get cited answers.
                Align plans, catch risks early, and keep work moving.
              </p>
            </div>

            {/* Primary/secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Primary: route to Create Account view on /auth */}
              <Link href="/auth?mode=signup" passHref>
                <Button className="!bg-[#FF6B35] !text-white hover:!bg-[#E65A28] !shadow-none">
                  Enter Forge
                </Button>
              </Link>
              {/* Secondary: route to Sign In view on /auth */}
              <Link href="/auth?mode=signin" className="text-white/80 hover:text-white">
                Already have access? <span className="underline">Sign in</span>
              </Link>
            </div>

            {/* Feature highlights for quick scannability */}
            <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/80 sm:grid-cols-2 md:grid-cols-3">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Spec & Drawing Q&A (cited)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Pull Planning & Forecasting
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Submittals & Document Control
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                RFIs & Field Notes
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Trends & Risk Signals
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Meeting Agents & Summaries
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer with compact links */}
      <footer className="relative z-10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} CogNexus</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/auth?mode=signin" className="hover:text-white">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
