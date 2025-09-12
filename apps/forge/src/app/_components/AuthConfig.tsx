'use client';

import React from 'react';

/**
 * Authentication configuration component that switches between local and AWS modes
 * Uses environment variables to determine which authentication method to use
 */

// Check if we're in production/AWS environment
const isAWSEnvironment = () => {
  // Check for AWS-specific environment variables or deployment indicators
  return (
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_AWS_REGION ||
    process.env.VERCEL_ENV === 'production' ||
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  );
};

export const useAuthConfig = () => {
  const [isAWS, setIsAWS] = React.useState(false);

  React.useEffect(() => {
    setIsAWS(isAWSEnvironment());
  }, []);

  return {
    isAWS,
    // Manual override for testing (can be controlled via localStorage)
    toggleMode: () => {
      const newMode = !isAWS;
      setIsAWS(newMode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('forge_auth_mode', newMode ? 'aws' : 'local');
      }
    },
    getAuthMode: () => isAWS ? 'aws' : 'local'
  };
};

// Wait for Amplify to be configured
const waitForAmplifyConfig = async (maxWaitTime = 5000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const { Amplify } = await import('aws-amplify');
      // Check if Amplify is configured by trying to get the config
      const config = Amplify.getConfig();
      if (config.Auth?.Cognito?.userPoolId) {
        return true;
      }
    } catch (error) {
      // Amplify not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Amplify configuration timeout');
};

// Authentication service that handles both local and AWS modes
export const authService = {
  async signIn(email: string, password: string) {
    const isAWS = isAWSEnvironment();
    
    if (isAWS) {
      // Wait for Amplify to be configured
      await waitForAmplifyConfig();
      
      // AWS Amplify authentication
      try {
        const auth = await import('aws-amplify/auth');
        const result = await auth.signIn({
          username: email,
          password,
        });
        
        // Store in sessionStorage as backup
        sessionStorage.setItem('forge_authenticated', 'true');
        sessionStorage.setItem('forge_user', JSON.stringify({ username: email }));
        
        return { success: true, user: result };
      } catch (error) {
        console.error('AWS sign in error:', error);
        throw error;
      }
    } else {
      // Local development mode - simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      sessionStorage.setItem('forge_authenticated', 'true');
      sessionStorage.setItem('forge_user', JSON.stringify({ username: email }));
      
      return { success: true, user: { username: email } };
    }
  },

  async signUp(email: string, password: string, fullName: string) {
    const isAWS = isAWSEnvironment();
    
    if (isAWS) {
      // Wait for Amplify to be configured
      await waitForAmplifyConfig();
      
      // AWS Amplify sign up
      try {
        const auth = await import('aws-amplify/auth');
        const result = await auth.signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              name: fullName,
            },
          },
        });
        
        return { success: true, result };
      } catch (error) {
        console.error('AWS sign up error:', error);
        throw error;
      }
    } else {
      // Local development mode - simulate sign up
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      return { success: true, message: 'Account created successfully! Please sign in.' };
    }
  },

  async signOut() {
    const isAWS = isAWSEnvironment();
    
    if (isAWS) {
      try {
        const auth = await import('aws-amplify/auth');
        await auth.signOut();
      } catch (error) {
        console.error('AWS sign out error:', error);
      }
    }
    
    // Clear local storage in both modes
    sessionStorage.removeItem('forge_authenticated');
    sessionStorage.removeItem('forge_user');
  },

  async getCurrentUser() {
    const isAWS = isAWSEnvironment();
    
    // First check sessionStorage (works for both modes)
    const isAuthenticated = sessionStorage.getItem('forge_authenticated') === 'true';
    const userString = sessionStorage.getItem('forge_user');
    
    if (isAuthenticated && userString) {
      return JSON.parse(userString);
    }
    
    if (isAWS) {
      // Wait for Amplify to be configured
      await waitForAmplifyConfig();
      
      // Try AWS Amplify
      try {
        const auth = await import('aws-amplify/auth');
        const user = await auth.getCurrentUser();
        
        // Store backup in sessionStorage
        sessionStorage.setItem('forge_authenticated', 'true');
        sessionStorage.setItem('forge_user', JSON.stringify(user));
        
        return user;
      } catch (error) {
        console.error('AWS getCurrentUser error:', error);
        throw error;
      }
    }
    
    throw new Error('Not authenticated');
  }
};

export default function AuthConfig() {
  React.useEffect(() => {
    const configureAWS = async () => {
      if (isAWSEnvironment()) {
        try {
          const { Amplify } = await import('aws-amplify');
          
          Amplify.configure({
            Auth: {
              Cognito: {
                userPoolId: 'us-east-1_by7tu6raq',
                userPoolClientId: '5qb2qupgofj0vpd6l8pfmn3ln2',
                loginWith: {
                  email: true,
                },
              }
            }
          });
          
          console.log('✅ AWS Amplify configured for production');
        } catch (error) {
          console.error('❌ AWS Amplify configuration failed:', error);
        }
      } else {
        console.log('🔧 Running in local development mode - AWS Amplify disabled');
      }
    };
    
    configureAWS();
  }, []);

  return null;
}
