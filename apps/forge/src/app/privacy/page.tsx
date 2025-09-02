/*
  Privacy Policy Page (stub)
  - Purpose: Provide a placeholder for the Privacy Policy referenced in auth and footer links.
  - This avoids 404s and sets up a clear structure for future legal content.
  - Uses accessible typography and semantic sections for clarity.
*/

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy • Forge',
  description: 'Privacy Policy for Forge by CogNexus.io.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-[#A6ADBB]">Last updated: To be determined</p>
        </header>

        <p className="text-[#D2D7DE]">
          This Privacy Policy is a placeholder while our legal text is finalized. We are committed to transparency and
          protecting your information. A full policy will be posted prior to general availability.
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-[#D2D7DE]">
            During beta, we may collect limited product usage information to improve Forge. We do not sell your data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">2. How We Use Information</h2>
          <p className="text-[#D2D7DE]">We use information to operate, secure, and improve the service, and to support users.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">3. Contact</h2>
          <p className="text-[#D2D7DE]">For privacy inquiries, please contact your account representative.</p>
        </section>

        <footer className="pt-4">
          <Link href="/" className="text-[#A6ADBB] underline hover:text-white">Return to home</Link>
        </footer>
      </div>
    </main>
  );
}
