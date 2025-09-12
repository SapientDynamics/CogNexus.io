'use client';

import React from 'react';

export default function AmplifyConfig() {
  React.useEffect(() => {
    const configureAmplify = async () => {
      try {
        // Import the necessary modules
        const { Amplify } = await import('aws-amplify');
        
        // Configure Amplify with the v6 format
        Amplify.configure({
          Auth: {
            Cognito: {
              userPoolId: 'us-east-1_by7tu6raq',
              userPoolClientId: '5qb2qupgofj0vpd6l8pfmn3ln2',
            }
          }
        });
        
        console.log('✅ Amplify configured successfully with v6 format');
      } catch (error) {
        console.error('❌ Amplify configuration failed:', error);
      }
    };
    
    configureAmplify();
  }, []);

  return null;
}
