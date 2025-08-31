'use client';

import React from 'react';
import { SampleComponent } from '../../components/SampleComponent';
import Link from 'next/link';
import { Button } from '@cnx/ui';

/**
 * UI Demo page that showcases the shared UI components
 * 
 * This page demonstrates the integration of the shared UI package (@cnx/ui)
 * in the cognexus app.
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
            CogNexus.io UI Component Demo
          </h1>
          
          <p className="text-gray-600 mb-8">
            This page demonstrates the shared UI components from the @cnx/ui package.
            These components are used across both the main platform and the Forge vertical.
          </p>
        </div>
        
        {/* Sample component that uses shared UI components */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <SampleComponent />
        </div>
        
        {/* Use neutral tint instead of blue to stay on brand */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About the Shared UI Package</h2>
          <p>
            The @cnx/ui package contains reusable UI components that maintain consistent 
            styling and behavior across all apps in the CogNexus.io platform. This approach:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Ensures brand consistency</li>
            <li>Reduces code duplication</li>
            <li>Simplifies maintenance</li>
            <li>Speeds up development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// This page serves as a demonstration of the shared UI components.
// It imports the SampleComponent which uses components from the @cnx/ui package.
// The page has a clean, white background to contrast with the main app's dark theme.
