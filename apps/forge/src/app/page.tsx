'use client';

import React from 'react';

// Home page component for Forge app - redirects to auth
export default function Home() {
  React.useEffect(() => {
    window.location.href = '/auth';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Redirecting to login...</div>
    </div>
  );
}

// Rest of the code remains the same
