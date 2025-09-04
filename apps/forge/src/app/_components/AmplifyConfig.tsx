'use client';

import React from 'react';

export default function AmplifyConfig() {
  React.useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('aws-amplify').then(({ Amplify }) => {
      // Use the correct Amplify v6 configuration format
      const amplifyConfig = {
        Auth: {
          Cognito: {
            userPoolId: 'us-east-1_by7tu6raq',
            userPoolClientId: '5qb2qupgofj0vpd6l8pfmn3ln2',
          },
        },
      };

      try {
        Amplify.configure(amplifyConfig);
        console.log('✅ Amplify configured with v6 format for better token persistence');
        console.log('🔑 Using SPA client:', amplifyConfig.Auth.Cognito.userPoolClientId);
      } catch (error) {
        console.error('❌ Amplify configuration failed:', error);
      }
    });
  }, []);

  return null;
}
