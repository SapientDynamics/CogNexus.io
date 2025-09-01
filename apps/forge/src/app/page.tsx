'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, Card } from '@cnx/ui';
import LandingHome from './_components/LandingHome';

// Home page component for Forge app
export default function Home() {
  // Route root (/) to the new marketing landing page component.
  // Unified auth UI moved to /auth via AuthShell; deep-linking supported.
  return <LandingHome />;

  /**
   * Auth mode toggles the form between "Sign In" and "Create Account".
   * We do not wire a backend here; this is a presentational/auth-entry screen.
   * The submit handlers are placeholders that can be replaced with real auth later.
   */
  const [mode, setMode] = React.useState<'sign-in' | 'sign-up'>('sign-up');
  // Controlled field state for mockup-aligned UX behaviors
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Derive a helpful hint from the email domain (mockup feature)
  const companyHint = React.useMemo(() => {
    const at = email.indexOf('@');
    if (at === -1) return 'Use your work email';
    const domain = email.slice(at + 1).trim();
    if (!domain) return 'Use your work email';
    return `We\u2019ll connect you to ${domain} if it\u2019s already on CogNexus`;
  }, [email]);

  // Simple password strength score (0-4) used by a visual meter in sign-up mode
  const passwordScore = React.useMemo(() => strength(password), [password]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="relative flex-1 w-full px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-8 lg:pb-10 bg-[#1C1E22] text-white">
      {/* Brushed steel vignette per mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          // Brushed steel vignette per mockup spec (exact stops and position)
          background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 60%)',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        initial={{ backgroundPosition: '0px 0px' }}
        animate={{ backgroundPosition: ['0px 0px', '120px 60px', '0px 0px'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          // Blueprint grid with minor (24px) and major (120px) lines for a technical drawing feel.
          // Minor lines are subtle; major lines are slightly stronger to aid layout without distracting.
          backgroundImage:
            'linear-gradient(0deg, rgba(45,106,160,0.42) 0 2px, transparent 2px 100%),\n' +
            'linear-gradient(90deg, rgba(45,106,160,0.42) 0 2px, transparent 2px 100%),\n' +
            'linear-gradient(0deg, rgba(45,106,160,0.58) 0 2px, transparent 2px 100%),\n' +
            'linear-gradient(90deg, rgba(45,106,160,0.58) 0 2px, transparent 2px 100%)',
          // Sizes map 1:1 to each gradient layer above (minorX, minorY, majorX, majorY)
          backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px',
        }}
      />
      {/* Left scrim to soften the grid under the auth card for better legibility. Placed above the grid, below content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[62%]"
        style={{
          background:
            'linear-gradient(90deg, rgba(28,30,34,0.85) 0%, rgba(28,30,34,0.45) 40%, rgba(28,30,34,0.12) 70%, rgba(28,30,34,0.00) 100%)'
        }}
      />
      {/* Soft blueprint-blue auras: one faint top-left, one stronger bottom-right to add depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 z-0 h-[40rem] w-[40rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,106,160,0.12) 0%, rgba(45,106,160,0) 60%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6rem] right-[-6rem] z-0 h-[52rem] w-[52rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(158,170,180,0.20) 0%, rgba(158,170,180,0) 60%)' }}
      />

      {/* Responsive grid: left column = auth card, right column (lg+) = brand pillars */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Auth container with subtle entrance animation */}
        <motion.div
          className="w-full max-w-xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
        {/* Main auth card: uses shared Card component with theme variables from globals.css */}
        <motion.div variants={itemVariants}>
          {/* Concrete card with dark text per mockup (#F4F4F2 / #1C1E22); border per mockup */}
          <Card
            variant="raised"
            // Stronger separation from the dark blueprint: clearer border and deeper shadow.
            className="rounded-2xl !border !border-[#D8D8D6] !bg-[#F4F4F2] !text-[#1C1E22] shadow-[0_24px_80px_rgba(0,0,0,0.45),0_2px_10px_rgba(0,0,0,0.18)]"
          >
            <div className="p-6 sm:p-8">
              {/* Card header with title/subtitle and Beta badge */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{mode === 'sign-in' ? 'Enter Forge' : 'Create Access'}</h1>
                  <p className="text-sm text-[#6E7681]">Unified Intelligence for Construction</p>
                </div>
                <span className="rounded-full border border-[#D8D8D6] bg-[#E8E8E6] px-2 py-1 text-xs text-[#1C1E22]">Beta</span>
              </div>
            {/* Mode toggle: accessible two-segment control */}
            <div className="mb-5">
              <div className="grid grid-cols-2 rounded-[6px] border border-[#D8D8D6] bg-[#EDEDEA] p-1" role="tablist" aria-label="Authentication mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'sign-in'}
                  className={`rounded-[6px] px-3 py-[6px] text-sm font-medium transition ${
                    mode === 'sign-in' ? 'bg-white text-[#1C1E22] shadow-[0_2px_6px_rgba(0,0,0,0.08)] ring-1 ring-[#E0E0DE]' : 'text-[#6E7681] hover:text-[#1C1E22]'
                  }`}
                  onClick={() => setMode('sign-in')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'sign-up'}
                  className={`rounded-[6px] px-3 py-[6px] text-sm font-medium transition ${
                    mode === 'sign-up' ? 'bg-white text-[#1C1E22] shadow-[0_2px_6px_rgba(0,0,0,0.08)] ring-1 ring-[#E0E0DE]' : 'text-[#6E7681] hover:text-[#1C1E22]'
                  }`}
                  onClick={() => setMode('sign-up')}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* SSO buttons (circular icon badges per screenshot) */}
            <div className="mb-2 grid grid-cols-1 gap-3">
              <button type="button" className="inline-flex w-full items-center justify-center rounded-[6px] border border-[#E0E0DE] bg-white px-4 py-[6.75px] text-base font-medium text-[#1C1E22] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#F7F7F6]">
                <span aria-hidden className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white ring-1 ring-[#E0E0DE]">
                  <span className="grid grid-cols-2 gap-px">
                    <span className="h-2 w-2 bg-[#F25022]" />
                    <span className="h-2 w-2 bg-[#7FBA00]" />
                    <span className="h-2 w-2 bg-[#00A4EF]" />
                    <span className="h-2 w-2 bg-[#FFB900]" />
                  </span>
                </span>
                Continue with Microsoft
              </button>
              <button type="button" className="inline-flex w-full items-center justify-center rounded-[6px] border border-[#E0E0DE] bg-white px-4 py-[6.75px] text-base font-medium text-[#1C1E22] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#F7F7F6]">
                <span aria-hidden className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white ring-1 ring-[#E0E0DE]">
                  {/* Google multi-color G */}
                  <svg width="16" height="16" viewBox="0 0 533.5 544.3" aria-hidden>
                    <path d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.2h146.9c-6.3 34-25.3 62.7-54 82v68h86.9c50.8-46.8 81.7-115.8 81.7-194.9z" fill="#4285F4"/>
                    <path d="M272 544.3c73.9 0 136.1-24.5 181.5-66.6l-86.9-68c-24.1 16.1-55 25.7-94.6 25.7-72.7 0-134.3-49.1-156.3-115.1H25.5v72.2C71 493.7 165.2 544.3 272 544.3z" fill="#34A853"/>
                    <path d="M115.7 320.3c-10.5-31.4-10.5-65.5 0-96.9V151.2H25.5c-42.1 83.5-42.1 182.6 0 266.1l90.2-96.9z" fill="#FBBC05"/>
                    <path d="M272 107.7c40.2-.6 78.8 14.7 108.3 42.7l81.3-81.3C404.4-6.2 332.2-17.5 272 17.5 165.2 17.5 71 68.1 25.5 178.4l90.2 72.2C137.7 156.8 199.3 107.7 272 107.7z" fill="#EA4335"/>
                  </svg>
                </span>
                Continue with Google
              </button>
            </div>

            {/* Divider chip */}
            <div className="relative my-5">
              <hr className="border-[#D8D8D6]" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8D8D6] bg-[#F4F4F2] px-3 py-1 text-xs text-[#6E7681] shadow-sm">
                or continue with email
              </span>
            </div>

            {/* Auth form: fields change slightly based on mode */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Placeholder submit: integrate real auth here (Cognito, Auth.js, etc.)
                console.log(`[Forge] submit`, { mode, email });
              }}
              className="space-y-4"
            >
              {/* Name field only for sign-up */}
              {mode === 'sign-up' && (
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm text-[#495059]">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="w-full rounded-[6px] border border-[#D8D8D6] bg-white px-4 py-[6.75px] text-[#1C1E22] placeholder:text-[#8A8F95] outline-none shadow-sm focus:border-[#CFCFCC] focus:ring-2 focus:ring-[#EDEDEA]"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-[#495059]">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[6px] border border-[#D8D8D6] bg-white px-4 py-[6.75px] text-[#1C1E22] placeholder:text-[#8A8F95] outline-none shadow-sm focus:border-[#CFCFCC] focus:ring-2 focus:ring-[#EDEDEA]"
                />
                {/* Company hint derived from email domain (mockup feature) */}
                <p className="mt-1 text-[11px] text-[#6E7681]">{companyHint}</p>
              </div>

              {/* Password */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm text-[#495059]">Password</label>
                  {mode === 'sign-in' && (
                    <Link href="/forgot" className="text-xs text-[#6E7681] hover:text-[#1C1E22]">Forgot?</Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'sign-in' ? 'Enter your password' : 'Create a strong password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[6px] border border-[#D8D8D6] bg-white px-4 py-[6.75px] pr-14 text-[#1C1E22] placeholder:text-[#8A8F95] outline-none shadow-sm focus:border-[#CFCFCC] focus:ring-2 focus:ring-[#EDEDEA]"
                  />
                  {/* Password visibility toggle as circular control per mockup */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((s: boolean) => !s)}
                    className="absolute inset-y-0 right-2 my-1 grid h-7 w-7 place-items-center rounded-full border border-[#D8D8D6] bg-[#EDEDEA] text-[#6E7681] hover:text-[#1C1E22]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      // EyeOff icon (inline SVG to avoid deps)
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.46-1.06 1.12-2.06 1.94-2.94" />
                        <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" />
                        <path d="M1 1l22 22" />
                      </svg>
                    ) : (
                      // Eye icon (inline SVG to avoid deps)
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password strength meter appears in sign-up mode */}
                {mode === 'sign-up' && <PasswordMeter score={passwordScore} />}
              </div>

              {/* Confirm password for sign-up */}
              {mode === 'sign-up' && (
                <div>
                  <label htmlFor="confirm" className="mb-1 block text-sm text-[#495059]">Confirm password</label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    required
                    className="w-full rounded-[6px] border border-[#D8D8D6] bg-white px-4 py-[6.75px] text-[#1C1E22] placeholder:text-[#8A8F95] outline-none shadow-sm focus:border-[#CFCFCC] focus:ring-2 focus:ring-[#EDEDEA]"
                  />
                </div>
              )}

              {/* Terms acceptance for signup (simple checkbox styling) */}
              {mode === 'sign-up' && (
                <div className="flex items-start gap-2">
                  <input id="terms" type="checkbox" className="mt-0.5 h-4 w-4 rounded border border-[#A7ACB1] accent-[#1C1E22]" />
                  <label htmlFor="terms" className="text-xs text-[#495059]">
                    I agree to the <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                  </label>
                </div>
              )}

              {/* Submit button uses shared Button; radius/padding from tokens (6px radius, 6.75px vertical) in globals.css */}
              <Button fullWidth className="group !bg-[#FF6B35] !text-white hover:!bg-[#E65A28] !shadow-none">
                <span className="inline-flex items-center justify-center w-full">
                  {mode === 'sign-in' ? (
                    <>
                      {/* Lock icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" aria-hidden>
                        <rect x="4" y="11" width="16" height="9" rx="2" ry="2"></rect>
                        <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>
                      </svg>
                      Enter Forge
                    </>
                  ) : (
                    <>Create Access</>
                  )}
                  {/* ChevronRight icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Button>

              {/* Switch helper inside card per mockup */}
              <p className="text-center text-sm text-[#495059]">
                {mode === 'sign-in' ? (
                  <>New here? <button type="button" className="underline" onClick={() => setMode('sign-up')}>Create account</button></>
                ) : (
                  <>Already have access? <button type="button" className="underline" onClick={() => setMode('sign-in')}>Sign in</button></>
                )}
              </p>
            </form>
            </div>
          </Card>
          {/* Reassurance moved below the form per request */}
          <div className="mt-3 flex items-center gap-3 text-white/70">
            <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full border border-white/30 text-xs">
              {/* Shield icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <span className="text-xs">Secure by default. SSO-ready. Encrypted in transit.</span>
          </div>
        </motion.div>
        {/* Bottom switch helper removed; handled inside card to match mockup */}
        </motion.div>

        {/* Right column: Brand pillars (visible on lg+). Constrain width to reduce line length and visual density. */}
        <aside className="hidden lg:flex flex-col max-w-xl">
          <div>
            {/* Brand subheading group above headline to match the navbar's large logo + subheading combo.
                We intentionally remove the pill styling for a clean, text-only subheading next to the logo.
                Update: remove extra bottom margin; switch to black drop shadow with increased blur for more presence. */}
            <div className="mb-2 flex items-end gap-2">
              {/* Logo is served from apps/forge/public as "/FORGE_logo_crop_trans.png" */}
              {/* Black drop shadow with increased blur (optical "spread") to help the logo pop on the dark background */}
              <img src="/FORGE_logo_crop_trans.png" alt="Forge" className="block h-20 w-auto select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" draggable={false} />
              {/* Nudge subheading left slightly to compensate for transparent padding in the PNG; reduces perceived gap */}
              <span className="block -ml-1 text-xs sm:text-sm leading-none text-white/70 pb-[1px]">With the power of CogNexus</span>
            </div>
            {/* Punchier headline and subhead aligned with cognexus.io language */}
            <h2 className="mb-3 text-4xl font-semibold leading-snug tracking-tight">Bring decision‑ready answers to your team.</h2>
            <p className="mb-8 max-w-lg text-white/80">Put submittals, drawings, and T&M on rails. Ask in plain language and get cited answers. Keep meetings aligned and move field work forward—fast.</p>

            <ul className="grid max-w-xl grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Each card now shows a purpose-fit inline SVG icon (no extra deps). */}
              {/* Removed: T&M Tracking card per UX request */}
              <Feature
                title="Pull Planning"
                caption="Forecast work & risks."
                emphasis="risks."
                icon={<IconGantt />}
              />
              <Feature
                title="Trends"
                caption="Spot delays before they bite."
                icon={<IconTrendUp />}
              />
              {/* Removed: Meetings card per UX request */}
              {/* Additional use cases pulled from platform language */}
              <Feature
                title="Submittals"
                caption="Extract, validate, and flag issues fast."
                icon={<IconDocCheck />}
              />
              <Feature
                title="Specs Q&A"
                caption="Ask drawings/specs. Get cited answers."
                emphasis="cited answers."
                icon={<IconBlueprint />}
              />
              <Feature
                title="Scope & Change"
                caption="Surface gaps and change impacts."
                emphasis="change impacts."
                icon={<IconLayersAlert />}
              />
              <Feature
                title="RFIs"
                caption="Capture and close questions faster."
                emphasis="faster."
                icon={<IconQuestion />}
              />
            </ul>
          </div>

        </aside>
      </div>
      </main>
      <SiteFooter />
    </div>
  );
}

// This code renders a modern, accessible authentication entry for Forge with a dark theme.
// It leverages shared @cnx/ui components (Card, Button) which are themed via CSS
// variables defined in apps/forge/src/app/globals.css. The layout is responsive, focus
// states have high contrast, and decorative motion is minimal and respectful of user prefs.

/**
 * Visual indicator for password strength based on a score (0-4).
 * Matches the mockup exactly with blueprint-blue gradient and concrete track.
 */
function PasswordMeter({ score }: { score: number }) {
  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const widths = ['w-1/12', 'w-3/12', 'w-6/12', 'w-9/12', 'w-full'];
  const idx = Math.max(0, Math.min(score, 4));
  return (
    <div className="mt-2">
      {/* Track uses concrete gray (#E0E0DE) per mockup; overflow-hidden to clip the fill radius */}
      <div className="h-1.5 w-full rounded-full bg-[#E0E0DE] overflow-hidden">
        <div
          className={`h-full ${widths[idx]} bg-gradient-to-r from-[#2D6AA0] via-[#5C8FBE] to-[#9DB9D6] transition-all`}
        />
      </div>
      {/* Label uses steel gray (#6E7681) per mockup */}
      <div className="mt-1 text-[11px] text-[#6E7681]">{labels[idx]}</div>
    </div>
  );
}

/** Lightweight password strength heuristic matching the mockup behavior. */
function strength(pw: string) {
  let s = 0;
  if (!pw) return 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  // Normalize to 0..4
  return Math.min(4, Math.max(0, s - 1));
}

/** Feature list item used in the right-hand brand pillars panel. */
function Feature({ title, caption, emphasis, icon }: { title: string; caption: string; emphasis?: string; icon?: React.ReactNode }) {
  // If an emphasis term is provided and found in the caption, render that substring in a highlight color
  const captionNode = React.useMemo(() => {
    if (!emphasis || !caption.includes(emphasis)) return caption;
    const i = caption.indexOf(emphasis);
    const before = caption.slice(0, i);
    const after = caption.slice(i + emphasis.length);
    return (
      <>
        {before}
        <span className="text-emerald-400">{emphasis}</span>
        {after}
      </>
    );
  }, [caption, emphasis]);

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F1418] to-[#0B0F13] p-4 text-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      {/* Icon container: fixed 32px square with a light ring and tiny accent dot (construction teal) */}
      <span className="relative grid h-9 w-9 place-items-center rounded-md bg-white/10 ring-1 ring-white/10" aria-hidden>
        {/* Render provided icon if present; otherwise fall back to the minimal placeholder square. */}
        {icon ? (
          <span className="text-white/90">{icon}</span>
        ) : (
          <span className="h-4 w-4 rounded-sm bg-white/20" />
        )}
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--cnx-accent)' }} />
      </span>
      <div>
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="text-sm text-white/70">{captionNode}</div>
      </div>
    </li>
  );
}

/** Inline SVG icons (decorative); sized to fit a 32px container and inherit currentColor. */
// Removed IconStopwatch (unused after T&M Tracking card removal).

function IconGantt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* Tracks */}
      <path d="M3 6h6" />
      <path d="M3 12h8" />
      <path d="M3 18h5" />
      {/* Bars */}
      <rect x="10" y="5" width="8" height="2" rx="1" />
      <rect x="12" y="11" width="6" height="2" rx="1" />
      <rect x="9" y="17" width="10" height="2" rx="1" />
    </svg>
  );
}

function IconTrendUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* Axes */}
      <path d="M3 21h18" />
      <path d="M3 21V3" />
      {/* Line */}
      <path d="M5 15l5-5 4 4 6-6" />
      <path d="M20 8h-4v4" />
    </svg>
  );
}

// Removed IconChat (unused after Meetings card removal).

/** Additional icons for new use cases (decorative only). */
function IconDocCheck(props: React.SVGProps<SVGSVGElement>) {
  // Represents a submittal/doc with a validated check mark.
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* Document sheet */}
      <path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M14 2v4h4" />
      {/* Check */}
      <path d="M8 14l2.5 2.5L16 11" />
    </svg>
  );
}

function IconBlueprint(props: React.SVGProps<SVGSVGElement>) {
  // Stylized blueprint/spec page with faint grid lines.
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* Page */}
      <rect x="4" y="3" width="16" height="18" rx="2" />
      {/* Grid lines */}
      <path d="M8 7h8" />
      <path d="M8 10h8" />
      <path d="M8 13h8" />
      <path d="M8 16h6" />
    </svg>
  );
}

function IconLayersAlert(props: React.SVGProps<SVGSVGElement>) {
  // Stacked layers (scope) with an alert indicator (change impact).
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {/* Layers */}
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      {/* Alert (exclamation) */}
      <path d="M12 10v3" />
      <path d="M12 15h.01" />
    </svg>
  );
}

function IconQuestion(props: React.SVGProps<SVGSVGElement>) {
  // RFI as a question bubble/mark.
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1.1-1.5 1.7V14" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/**
 * Top navigation bar per mockup
 *
 * Changes for logo prominence (per request):
  * - Increased header height from h-14 → h-16, and now to h-20 for extra breathing room.
  * - Increased logo image height from h-5 → h-7, and now to h-10 for high visibility.
  * - Added a subtle Tailwind drop-shadow to the logo to improve contrast on the dark, textured background.
  * - Subheading text ("With the power of CogNexus") sits to the right of the logo, aligned to its bottom edge
  *   using a flex container with items-end; styled as plain text (no border/background) for a clean, subheading look.
  * - Logo asset is served from apps/forge/public as "/FORGE_logo_crop_trans.png".
  */
function SiteHeader() {
  return (
    <header className="relative z-10 bg-[#1C1E22]/80 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 text-white sm:px-6 lg:px-8">
        <div className="flex items-end gap-2">
          {/* Left brand area: logo with plain subheading aligned to the bottom */}
          {/* Logo is served from apps/forge/public as "/FORGE_logo_crop_trans.png" */}
          <img src="/FORGE_logo_crop_trans.png" alt="Forge" className="block h-10 w-auto select-none drop-shadow" draggable={false} />
          {/* Nudge subheading left slightly to compensate for transparent padding in the PNG; reduces perceived gap */}
          <span className="block -ml-1 text-xs sm:text-sm leading-none text-white/70 pb-[1px]">With the power of CogNexus</span>
        </div>
        <nav className="hidden items-center gap-5 text-sm text-white/80 sm:flex">
          <Link href="#" className="hover:text-white">UI Demo</Link>
          <Link href="#" className="inline-flex items-center gap-1 hover:text-white">Main Platform</Link>
        </nav>
      </div>
    </header>
  );
}

/** Footer per mockup */
function SiteFooter() {
  return (
    <footer className="relative z-10 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} CogNexus</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-white">Status</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-white">Help</Link>
        </div>
      </div>
    </footer>
  );
}
