'use client';

import React from 'react';
import Link from 'next/link';

interface TopNavigationProps {
  onSignOut: () => void;
}

export default function TopNavigation({ onSignOut }: TopNavigationProps) {
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const projects = [
    { id: '1', name: 'Downtown Office Complex', status: 'Active' },
    { id: '2', name: 'Residential Tower A', status: 'Planning' },
    { id: '3', name: 'Industrial Warehouse', status: 'Completed' },
  ];

  const currentProject = projects[0]; // Default to first project

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-600/30 z-50 h-16">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo and Project Dropdown */}
            <div className="flex items-center space-x-6">
              {/* Forge Logo */}
              <div className="flex items-center">
                <img
                  src="/brand/forge_logo_crop_trans.png"
                  alt="Forge Logo"
                  className="h-10 w-auto hover:opacity-80 transition-opacity duration-200"
                />
              </div>

              {/* Project Selector */}
              <div className="relative">
                <button
                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-700/40 transition-colors duration-200 group"
                >
                  <div className="text-white font-medium text-sm truncate max-w-48">
                    {currentProject.name}
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors ${
                      projectDropdownOpen ? 'rotate-180' : ''
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
                  <div className="absolute top-full left-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-sm border border-slate-600/40 shadow-lg z-50 rounded-lg">
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
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 relative group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v6h5l-5 5v-5H9V7h6z" />
                  </svg>
                  {/* Notification dot */}
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
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
              <div className="flex items-center space-x-3 ml-2">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center hover:bg-orange-600/20 transition-colors">
                  <span className="text-white font-semibold text-sm">JD</span>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 hover:text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Overlay for dropdowns */}
      {(projectDropdownOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setProjectDropdownOpen(false);
            setNotificationsOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
