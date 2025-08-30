'use client';

import React from 'react';
import { Button, Card } from '@cnx/ui';

/**
 * Sample component demonstrating the usage of shared UI components
 * 
 * This component showcases how to import and use components from the @cnx/ui package
 * within the forge app.
 */
export const SampleComponent: React.FC = () => {
  // Sample click handler for demonstration
  const handleClick = () => {
    alert('Button clicked in forge app!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Forge UI Components Demo</h2>
      
      {/* Card component from shared UI package */}
      <Card 
        title="Construction Project Details" 
        hoverable 
        borderColor="orange"
        footer={
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => console.log('Back clicked')}>
              Back
            </Button>
            <Button variant="accent" onClick={handleClick} className="ml-2">
              View Project
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            This card uses the shared UI package (@cnx/ui) components.
            The same component library is used across both the main platform and the Forge vertical.
          </p>
          <ul className="list-disc pl-5">
            <li>Project Name: Riverside Tower</li>
            <li>Location: San Francisco, CA</li>
            <li>Status: In Progress</li>
            <li>Completion: 65%</li>
          </ul>
        </div>
      </Card>
      
      {/* Button variants from shared UI package */}
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" onClick={handleClick}>
          View Documents
        </Button>
        
        <Button variant="ghost" onClick={handleClick}>
          Project Timeline
        </Button>
        
        <Button variant="accent" onClick={handleClick}>
          Record Meeting
        </Button>
        
        <Button variant="primary" isLoading onClick={handleClick}>
          Generating Report...
        </Button>
      </div>
    </div>
  );
};

// This component demonstrates how to use the shared UI components from @cnx/ui
// in the forge app. It shows different button variants and a card with construction
// project details, styled with the Forge brand colors.
