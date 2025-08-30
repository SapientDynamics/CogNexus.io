import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '../components/Navigation';

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
        {/* Navigation component */}
        <Navigation />
        
        {/* Main content container with padding for the fixed navigation */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
