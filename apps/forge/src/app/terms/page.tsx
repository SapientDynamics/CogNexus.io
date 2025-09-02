/*
  Terms of Service Page (stub)
  - Purpose: Provide a placeholder for Terms content referenced across the app (e.g., links in auth and footer).
  - This prevents 404s and offers a basic structure until legal copy is finalized.
  - Uses semantic HTML for accessibility and easy future content replacement.
*/

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms • Forge',
  description: 'Terms of Service for Forge by CogNexus.io.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-[#A6ADBB]">Last updated: To be determined</p>
        </header>

        {/* Intro copy */}
        <p className="text-[#D2D7DE]">
          These Terms of Service ("Terms") are a placeholder while our legal language is finalized. By using Forge,
          you agree to operate in good faith. A full, legally binding version of these Terms will be published prior to
          general availability.
        </p>

        {/* Example sections to be replaced with real content */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">1. Use of Service</h2>
          <p className="text-[#D2D7DE]">
            You agree to use Forge responsibly and comply with all applicable laws. You are responsible for your
            account and any content you submit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">2. Data and Privacy</h2>
          <p className="text-[#D2D7DE]">
            We value your data and privacy. Please review our <Link href="/privacy" className="underline">Privacy Policy</Link>
            to understand how information is collected and used.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">3. Availability and Changes</h2>
          <p className="text-[#D2D7DE]">
            Features may evolve during beta. We may update these Terms and will post changes to this page.
          </p>
        </section>

        <footer className="pt-4">
          <Link href="/" className="text-[#A6ADBB] underline hover:text-white">Return to home</Link>
        </footer>
      </div>
    </main>
  );
}
