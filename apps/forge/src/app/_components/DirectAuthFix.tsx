'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/**
 * Direct authentication fix component that properly handles AWS Amplify authentication
 * This component uses a different approach to avoid the 'loginWith' error
 */
export default function DirectAuthFix() {
  // Auth mode state - toggles between sign-in and sign-up
  const [mode, setMode] = React.useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const router = useRouter();

  // Configure Amplify on component mount
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
      } catch (error) {
        console.error('❌ Amplify configuration failed:', error);
      }
    };
    
    configureAmplify();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (mode === 'sign-up') {
        // Validate form
        if (!fullName) {
          setError('Please enter your full name');
          setIsLoading(false);
          return;
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        if (!acceptTerms) {
          setError('Please accept the terms and privacy policy');
          setIsLoading(false);
          return;
        }
        
        // Import auth module directly
        const authModule = await import('aws-amplify/auth');
        
        // Sign up user
        try {
          const result = await authModule.signUp({
            username: email,
            password,
            options: {
              userAttributes: {
                email,
                name: fullName,
              },
            },
          });
          
          console.log('✅ Sign up successful:', result);
          setSuccessMessage('Account created successfully! Please sign in with your credentials.');
          setMode('sign-in');
          setPassword('');
          setConfirmPassword('');
          setFullName('');
          setAcceptTerms(false);
        } catch (signUpError: any) {
          console.error('❌ Sign up error:', signUpError);
          setError(signUpError.message || 'Failed to create account. Please try again.');
        }
      } else {
        // Sign in user
        try {
          // Import auth module directly
          const authModule = await import('aws-amplify/auth');
          
          // Use signIn method
          const signInResult = await authModule.signIn({
            username: email,
            password,
          });
          
          console.log('✅ Sign in successful:', signInResult);
          
          // Store authentication state in sessionStorage as backup
          sessionStorage.setItem('forge_authenticated', 'true');
          sessionStorage.setItem('forge_user', JSON.stringify({ username: email }));
          
          // Redirect to dashboard
          router.push('/dashboard');
        } catch (signInError: any) {
          console.error('❌ Sign in error:', signInError);
          setError(signInError.message || 'Failed to sign in. Please check your credentials.');
        }
      }
    } catch (err: any) {
      console.error('❌ Authentication error:', err);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'sign-in' ? 'Sign In to Forge' : 'Create Forge Account'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'sign-up' && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required={mode === 'sign-up'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {mode === 'sign-up' && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required={mode === 'sign-up'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                  I accept the terms and privacy policy
                </label>
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === 'sign-in' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{mode === 'sign-in' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {mode === 'sign-in' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
