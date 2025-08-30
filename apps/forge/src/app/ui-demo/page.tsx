'use client';

import React from 'react';
import { SampleComponent } from '../../components/SampleComponent';
import Link from 'next/link';
import { Button } from '@cnx/ui';

/**
 * UI Demo page that showcases the shared UI components
 * 
 * This page demonstrates the integration of the shared UI package (@cnx/ui)
 * in the forge app.
 */
export default function UiDemoPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">
              ← Back to Home
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mt-4 mb-6">
            Forge UI Component Demo
          </h1>
          
          <p className="text-gray-600 mb-8">
            This page demonstrates the shared UI components from the @cnx/ui package
            as implemented in the Forge vertical app.
          </p>
        </div>
        
        {/* Sample component that uses shared UI components */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <SampleComponent />
        </div>
        
        <div className="mt-8 p-4 bg-orange-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Construction-Specific UI</h2>
          <p>
            While Forge uses the same shared UI components as the main platform,
            we've customized the styling to match the construction vertical's branding.
            Notice how the accent colors and card styling reflect the Forge identity
            while maintaining the same component structure.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Orange accent colors instead of blue</li>
            <li>Construction-specific terminology</li>
            <li>Same component API across both apps</li>
            <li>Consistent user experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// This page serves as a demonstration of the shared UI components in the Forge app.
// It imports the SampleComponent which uses components from the @cnx/ui package.
// The page has a clean, white background to contrast with the main app's dark theme,
// but uses orange accents to match the Forge branding.
