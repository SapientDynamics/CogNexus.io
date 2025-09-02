/*
  Forgot Password Page (stub)
  - Purpose: Prevent 404s from the "Forgot?" link in `apps/forge/src/app/auth/AuthShell.tsx` during early deployment.
  - This page is a non-functional placeholder that explains password reset is not yet wired.
  - Styling follows the Forge dark theme defined in `globals.css`.
  - When backend/email integration is added, replace this stub with a real form.
*/

import type { Metadata } from 'next';
import Link from 'next/link';

// Basic page metadata for browser and sharing context
export const metadata: Metadata = {
  title: 'Forgot Password • Forge',
  description: 'Password reset help for Forge by CogNexus.io.',
};

// Default export for the /forgot route. As a server component, it renders static content.
export default function ForgotPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      {/* Simple card-like container with accessible contrast on dark background */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
        <p className="mt-2 text-sm text-[#A6ADBB]">
          Password reset is not available yet. Were finishing up the authentication backend. If you need
          help accessing your account, please contact your workspace admin or check back soon.
        </p>

        <div className="mt-6">
          <Link
            href="/auth?mode=sign-in"
            className="inline-flex items-center gap-2 rounded-[6px] bg-white px-4 py-2 text-[#1C1E22] hover:bg-[#F2F2F0] transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
