'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ModernAuthProps {
  // Optional props for customization
}

export default function ModernAuth(props: ModernAuthProps) {
  // Auth mode state - toggles between sign-in and sign-up
  const [mode, setMode] = React.useState<'sign-in' | 'sign-up'>('sign-up');
  
  // Form state management
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  // Derive company hint from email domain
  const companyHint = React.useMemo(() => {
    const at = email.indexOf('@');
    if (at === -1) return 'Use your work email';
    const domain = email.slice(at + 1).trim();
    if (!domain) return 'Use your work email';
    return `We'll connect you to ${domain} if it's already on CogNexus`;
  }, [email]);

  // Simple password strength calculation
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual auth implementation
    console.log(`[Forge] ${mode} attempt:`, { email, mode });
  };

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background elements */}
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

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <motion.div 
            className="mx-auto w-full max-w-sm lg:w-96"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Logo and branding */}
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <div className="relative flex justify-center mb-6">
                <img 
                  src="/brand/forge_logo_crop_trans.png" 
                  alt="Forge" 
                  className="h-32 w-auto drop-shadow-lg"
                />
                <p className="absolute bottom-0 right-[60px] text-sm text-slate-500">Powered by CogNexus</p>
              </div>
              <p className="text-slate-400">
                {mode === 'sign-in' ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </motion.div>

            {/* Mode toggle */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="flex rounded-xl bg-slate-800/60 backdrop-blur-sm p-1 border border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setMode('sign-in')}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    mode === 'sign-in'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('sign-up')}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    mode === 'sign-up'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </motion.div>

            {/* Social login options */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-3 border border-slate-600 rounded-lg bg-slate-800/50 backdrop-blur-sm text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>

                <button className="flex items-center justify-center px-4 py-3 border border-slate-600 rounded-lg bg-slate-800/50 backdrop-blur-sm text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5 12.2c0-1.1-.1-2.2-.3-3.2H12v6h6.4c-.3 1.6-1.2 2.9-2.5 3.8v3.1h4.1c2.4-2.2 3.8-5.4 3.8-9.2z"/>
                    <path d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4.1-3.1c-1.1.7-2.5 1.2-3.8 1.2-2.9 0-5.4-2-6.3-4.7H1.5v3.1C3.6 21.4 7.5 24 12 24z"/>
                    <path d="M5.7 14.5c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.8H1.5C.5 8.7 0 10.3 0 12s.5 3.3 1.5 5.2l4.2-2.7z"/>
                    <path d="M12 4.8c1.6 0 3.1.6 4.2 1.7l3.1-3.1C17.1 1.7 14.7.5 12 .5 7.5.5 3.6 3.1 1.5 6.8l4.2 2.7C6.6 6.8 9.1 4.8 12 4.8z"/>
                  </svg>
                  Microsoft
                </button>
              </div>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-400">Or continue with email</span>
                </div>
              </div>
            </motion.div>

            {/* Auth form */}
            <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
              {/* Name field for sign-up */}
              {mode === 'sign-up' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
                {email && (
                  <p className="mt-2 text-xs text-slate-400">{companyHint}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'sign-in' ? 'Enter your password' : 'Create a strong password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 pr-12 text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password strength indicator for sign-up */}
                {mode === 'sign-up' && password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength <= 2 ? 'bg-red-500' : 
                            passwordStrength <= 3 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {passwordStrength <= 2 ? 'Weak' : 
                         passwordStrength <= 3 ? 'Good' : 
                         'Strong'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password for sign-up */}
              {mode === 'sign-up' && (
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm px-4 py-3 pr-12 text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Terms checkbox for sign-up */}
              {mode === 'sign-up' && (
                <div className="flex items-start space-x-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-900"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-300">
                    I agree to the{' '}
                    <Link href="/terms" className="text-orange-400 hover:text-orange-300 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-orange-400 hover:text-orange-300 underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}

              {/* Forgot password link for sign-in */}
              {mode === 'sign-in' && (
                <div className="text-right">
                  <Link href="/forgot" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={mode === 'sign-up' && (!acceptTerms || password !== confirmPassword)}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mode === 'sign-in' ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign in to Forge
                  </>
                ) : (
                  <>
                    Create account
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </motion.form>

            {/* Security notice */}
            <motion.div 
              className="mt-8 flex items-center justify-center space-x-2 text-xs text-slate-400"
              variants={itemVariants}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure • Encrypted • SOC 2 Compliant</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Feature showcase (hidden on mobile) */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 xl:px-24">
          <motion.div 
            className="max-w-md"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold text-white mb-6" variants={itemVariants}>
              Transform your construction workflow
            </motion.h2>
            <motion.p className="text-lg text-slate-300 mb-8" variants={itemVariants}>
              Get instant answers from your documents, streamline submittals, and keep your team aligned with AI-powered insights.
            </motion.p>
            
            <div className="space-y-6">
              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Document Intelligence</h3>
                  <p className="text-slate-400">Ask questions about specs, drawings, and RFIs in plain language</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Predictive Insights</h3>
                  <p className="text-slate-400">Spot delays and risks before they impact your timeline</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Team Coordination</h3>
                  <p className="text-slate-400">Keep everyone aligned with automated meeting summaries</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
