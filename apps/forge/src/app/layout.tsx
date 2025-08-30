import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '../components/Navigation';

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define metadata for the application
export const metadata: Metadata = {
  title: 'Forge by CogNexus.io - Construction Intelligence',
  description: 'Construction intelligence platform that brings clarity, prevents delays, and builds confidence for field teams.',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
