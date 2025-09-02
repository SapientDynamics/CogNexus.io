import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define metadata for the application (includes PWA and mobile-friendly settings)
export const metadata: Metadata = {
  title: 'Forge by CogNexus.io - Construction Intelligence',
  description:
    'Construction intelligence platform that brings clarity, prevents delays, and builds confidence for field teams.',
  manifest: '/manifest.webmanifest',
  themeColor: '#1C1E22',
  icons: {
    icon: [{ url: '/icons/forge-icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/FORGE_logo_crop_trans.png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Forge',
  },
  formatDetection: { telephone: false },
};

// Mobile viewport for proper safe-area usage and scaling
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
        {/* Page content. Individual pages can render their own headers/footers. */}
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
