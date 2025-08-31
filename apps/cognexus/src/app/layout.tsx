import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

// Define metadata for the application
export const metadata: Metadata = {
  title: 'CogNexus.io - Unified Intelligence Layer',
  description: 'A unified intelligence layer that turns what teams already know into connected, decision-ready answers.',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {/* Global smooth scrolling for in-page anchors */}
        <SmoothScroll />
        {/* Navigation component */}
        <Navigation />
        
        {/* Main content container */}
        {/* On mobile, add extra top padding to clear the fixed floating pill nav. */}
        {/* On desktop, navbar is sticky and occupies its own height, so no extra padding. */}
        <div className="pt-20 md:pt-0">
          {children}
        </div>

        {/* Global footer with brand and nav shortcuts (CogNexus standalone branding) */}
        <Footer />
      </body>
    </html>
  );
}

