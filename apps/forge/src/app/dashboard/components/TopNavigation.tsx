'use client';

import React from 'react';
import Link from 'next/link';

interface TopNavigationProps {
  onSignOut: () => void;
  onMobileMenuToggle?: () => void;
}

export default function TopNavigation({ onSignOut, onMobileMenuToggle }: TopNavigationProps) {
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const projects = [
    { id: '1', name: 'Downtown Office Complex', status: 'Active' },
    { id: '2', name: 'Residential Tower A', status: 'Planning' },
    { id: '3', name: 'Industrial Warehouse', status: 'Completed' },
  ];

  const currentProject = projects[0]; // Default to first project

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 z-50 shadow-lg shadow-slate-900/20">
        <div className="h-full px-6 flex items-center">
          {/* Mobile Menu Button */}
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden mr-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-300 group/btn backdrop-blur-sm"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/brand/forge_logo_crop_trans.png"
                alt="Forge Logo"
                className="h-8 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-lg tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Forge
              </span>
              <div className="text-xs text-blue-400 font-medium tracking-wider">AI POWERED</div>
            </div>
          </div>

          {/* Center - Project Selector */}
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <button
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/40 hover:border-blue-500/50 transition-all duration-300 group/btn backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <div className="text-white font-medium text-sm truncate max-w-48 group-hover/btn:text-blue-100 transition-colors">
                  {currentProject.name}
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 group-hover/btn:text-blue-400 transition-all duration-300 ${
                    projectDropdownOpen ? 'rotate-180 scale-110' : 'group-hover/btn:scale-110'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Project Dropdown */}
              {projectDropdownOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-slate-800/95 backdrop-blur-sm border border-slate-600/40 shadow-lg z-50 rounded-lg">
                  <div className="py-2">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700/60 transition-colors duration-200 group"
                        onClick={() => {
                          setProjectDropdownOpen(false);
                          // Handle project selection
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium text-sm group-hover:text-orange-100 transition-colors">{project.name}</div>
                            <div className="text-slate-400 text-xs group-hover:text-orange-300 transition-colors">{project.status}</div>
                          </div>
                          {project.id === currentProject.id && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - User Controls */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative group">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/60 rounded-xl transition-all duration-300 group/btn backdrop-blur-sm"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v6h5l-5 5v-5H9V7h6z" />
                </svg>
                {/* Notification dot with glow */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-red-500/50">
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </button>

              {notificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-sm border border-slate-600/40 shadow-lg z-50 rounded-lg">
                  <div className="px-4 py-3 border-b border-slate-700/60">
                    <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-slate-700/60 transition-colors group">
                      <div className="text-white text-sm font-medium group-hover:text-orange-100">New message from team lead</div>
                      <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">2 minutes ago</div>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-700/60 transition-colors group">
                      <div className="text-white text-sm font-medium group-hover:text-orange-100">Project deadline updated</div>
                      <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">1 hour ago</div>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-700/60 transition-colors group">
                      <div className="text-white text-sm font-medium group-hover:text-orange-100">Safety inspection completed</div>
                      <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">3 hours ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 ml-2 group p-1 rounded-lg hover:bg-slate-700/40 transition-all duration-300"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm">
                  <span className="text-white font-bold text-sm group-hover:text-blue-100 transition-colors">JD</span>
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-white font-medium text-sm group-hover:text-blue-100 transition-colors">John Doe</div>
                  <div className="text-slate-400 text-xs">Project Manager</div>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300 ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm border border-slate-600/40 shadow-lg z-50 rounded-lg">
                  <div className="px-4 py-3 border-b border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">JD</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">John Doe</div>
                        <div className="text-slate-400 text-xs">Project Manager</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700/60 transition-colors duration-200 group flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-white font-medium group-hover:text-red-100 transition-colors">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for dropdowns */}
      {(projectDropdownOpen || notificationsOpen || userDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setProjectDropdownOpen(false);
            setNotificationsOpen(false);
            setUserDropdownOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
