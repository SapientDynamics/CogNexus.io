'use client';

import React from 'react';

/**
 * Fixed Amplify configuration component that properly initializes AWS Amplify
 * This component ensures AWS Amplify is configured correctly before any auth operations
 */
export default function FixedAmplifyConfig() {
  React.useEffect(() => {
    const configureAmplify = async () => {
      try {
        // Import the necessary modules
        const { Amplify } = await import('aws-amplify');
        
        // Configure Amplify with the correct format for v6
        Amplify.configure({
          Auth: {
            Cognito: {
              userPoolId: 'us-east-1_by7tu6raq',
              userPoolClientId: '5qb2qupgofj0vpd6l8pfmn3ln2',
              region: 'us-east-1',
            }
          }
        });
        
        console.log('✅ Amplify configured successfully with v6 format');
        
        // Verify configuration by importing auth
        const auth = await import('aws-amplify/auth');
        console.log('✅ Auth module imported successfully:', !!auth);
        
        // Test if signIn function exists
        if (typeof auth.signIn === 'function') {
          console.log('✅ signIn function exists');
        } else {
          console.error('❌ signIn function does not exist');
        }
      } catch (error) {
        console.error('❌ Amplify configuration failed:', error);
      }
    };
    
    configureAmplify();
  }, []);

  return null;
}
