'use client';

import React from 'react';
import { Button, Card } from '@cnx/ui';

/**
 * Sample component demonstrating the usage of shared UI components
 * 
 * This component showcases how to import and use components from the @cnx/ui package
 * within the cognexus app.
 */
export const SampleComponent: React.FC = () => {
  // Sample click handler for demonstration
  const handleClick = () => {
    alert('Button clicked in cognexus app!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shared UI Components Demo</h2>
      
      {/* Card component from shared UI package */}
      <Card 
        title="Shared Card Component" 
        hoverable 
        borderColor="blue"
        footer={
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => console.log('Cancel clicked')}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClick} className="ml-2">
              Submit
            </Button>
          </div>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          This card is imported from the shared UI package (@cnx/ui).
          It demonstrates how components can be shared across multiple apps in the monorepo.
        </p>
      </Card>
      
      {/* Button variants from shared UI package */}
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" onClick={handleClick}>
          Primary Button
        </Button>
        
        <Button variant="ghost" onClick={handleClick}>
          Ghost Button
        </Button>
        
        <Button variant="accent" onClick={handleClick}>
          Accent Button
        </Button>
        
        <Button variant="primary" isLoading onClick={handleClick}>
          Loading Button
        </Button>
      </div>
    </div>
  );
};

// This component demonstrates how to use the shared UI components from @cnx/ui
// in the cognexus app. It shows different button variants and a card with a title,
// content, and footer.
