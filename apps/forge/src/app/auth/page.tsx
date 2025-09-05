'use client';

import React from 'react';
import ModernAuth from '../_components/ModernAuth';

// Auth page component for Forge app - serves the modern auth UI
// This route handles both /auth and /auth?mode=signup and /auth?mode=signin
export default function AuthPage() {
  return <ModernAuth />;
}
