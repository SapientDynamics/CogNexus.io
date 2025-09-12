'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import dashboard components
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import ProjectSummaries from './components/ProjectSummaries';
import QuickTools from './components/QuickTools';
import RecentActivity from './components/RecentActivity';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if device is mobile
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const checkAuthStatus = async () => {
    console.log('🔍 Starting authentication check...');

    // Check sessionStorage for authentication data
    const isAuthenticatedBackup = sessionStorage.getItem('forge_authenticated');
    const userBackup = sessionStorage.getItem('forge_user');

    if (isAuthenticatedBackup === 'true' && userBackup) {
      console.log('✅ Found authentication data in sessionStorage');
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    console.log('❌ No authentication data found');
    
    // Clear any stale backup data
    sessionStorage.removeItem('forge_authenticated');
    sessionStorage.removeItem('forge_user');

    // User is not authenticated, redirect to login
    router.replace('/auth');
    setIsLoading(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleSignOut = async () => {
    try {
      // Clear session data
      sessionStorage.removeItem('forge_authenticated');
      sessionStorage.removeItem('forge_user');

      // Redirect to home
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background elements matching login page */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-orange-500/10" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <TopNavigation
          onSignOut={handleSignOut}
          onMobileMenuToggle={isMobile ? handleMobileMenuToggle : undefined}
        />

        {/* Main Layout */}
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isMobile={isMobile}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={handleMobileSidebarClose}
          />

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 w-full max-w-none pt-16 ${
            isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}>
            <div className="p-6 w-full max-w-none">
              {/* Welcome Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
                  Welcome to Forge Dashboard
                </h1>
                <p className="text-slate-400 text-lg">
                  Ask questions, manage projects, and access all your construction intelligence.
                </p>
              </div>

              {/* Main Dashboard Content */}
              <div className="space-y-6 w-full max-w-none mb-24">
                <QuickTools />
                <RecentActivity />
              </div>

              {/* AI Chat - Bottom of page (Full width) */}
              <AIChat
                sidebarCollapsed={sidebarCollapsed}
                isMobile={isMobile}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
