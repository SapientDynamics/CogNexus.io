'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log('🔍 Starting authentication check...');
    
    // First check sessionStorage backup
    const isAuthenticatedBackup = sessionStorage.getItem('forge_authenticated');
    const userBackup = sessionStorage.getItem('forge_user');
    
    if (isAuthenticatedBackup === 'true' && userBackup) {
      console.log('✅ Found authentication backup in sessionStorage');
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }
    
    try {
      // Dynamic import to avoid SSR issues
      const { getCurrentUser } = await import('aws-amplify/auth');
      console.log('📦 Amplify auth module loaded');
      
      const user = await getCurrentUser();
      console.log('✅ User authenticated successfully:', user);
      console.log('🔑 User details:', {
        username: user.username,
        userId: user.userId,
        signInDetails: user.signInDetails
      });
      
      // Store backup in sessionStorage
      sessionStorage.setItem('forge_authenticated', 'true');
      sessionStorage.setItem('forge_user', JSON.stringify(user));
      
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log('❌ Authentication failed:', error);
      console.log('🔍 Error details:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack
      });
      
      // Clear any stale backup data
      sessionStorage.removeItem('forge_authenticated');
      sessionStorage.removeItem('forge_user');
      
      // User is not authenticated, redirect to login
      router.replace('/');
    } finally {
      console.log('🏁 Authentication check completed');
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // In a real app, you'd call signOut from aws-amplify/auth
      // For now, just redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Forge Dashboard</h1>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Forge Dashboard
          </h2>
          <p className="text-xl text-slate-300">
            You're successfully authenticated! 🎉
          </p>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
            <p className="text-slate-400">View your construction projects and progress</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">Document Q&A</h3>
            <p className="text-slate-400">Ask questions about your project documents</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">Team Collaboration</h3>
            <p className="text-slate-400">Work with your team in real-time</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 inline-block">
            <p className="text-green-300 font-medium">
              ✅ Successfully authenticated with AWS Cognito!
            </p>
            <p className="text-green-400 text-sm mt-2">
              Your Forge authentication system is now working
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p>© 2024 CogNexus. Powered by Forge.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
