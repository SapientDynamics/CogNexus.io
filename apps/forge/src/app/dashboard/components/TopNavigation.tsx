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
      <header className="bg-slate-800/98 backdrop-blur-xl border-b-2 border-orange-500/40 shadow-2xl relative z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo and Project Dropdown */}
            <div className="flex items-center space-x-8">
              {/* Forge Logo */}
              <div className="flex items-center">
                <img
                  src="/brand/FORGE_chat_logo_trans.png"
                  alt="Forge Logo"
                  className="h-16 w-auto hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Project Selector */}
              <div className="relative">
                <button
                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                  className="flex items-center space-x-4 bg-slate-700/60 hover:bg-slate-600/60 px-5 py-3 rounded-none border-2 border-slate-600/60 hover:border-orange-500/40 transition-all duration-300 group shadow-md"
                >
                  <div className="text-left">
                    <div className="text-sm text-slate-400 font-medium group-hover:text-orange-400 transition-colors">Project</div>
                    <div className="text-white font-bold text-lg truncate max-w-52 group-hover:text-orange-100 transition-colors">
                      {currentProject.name}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors ${
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
                  <div className="absolute top-full left-0 mt-3 w-80 bg-slate-800/95 backdrop-blur-xl border-2 border-slate-600 shadow-2xl z-50 rounded-none">
                    <div className="py-3">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          className="w-full px-5 py-4 text-left hover:bg-slate-700/80 hover:border-l-4 hover:border-orange-500 transition-all duration-200 border-b border-slate-700/50 last:border-b-0 group"
                          onClick={() => {
                            setProjectDropdownOpen(false);
                            // Handle project selection
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-semibold text-base group-hover:text-orange-100 transition-colors">{project.name}</div>
                              <div className="text-slate-400 text-sm group-hover:text-orange-300 transition-colors">{project.status}</div>
                            </div>
                            {project.id === currentProject.id && (
                              <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>
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
              {/* Progress Indicator */}
              <div className="flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm px-4 py-1.5 rounded-none border border-slate-600/50">
                <div className="text-left">
                  <div className="text-xs text-slate-400 font-medium">Progress</div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-16 h-1.5 bg-slate-600 rounded-none overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 w-3/4 shadow-sm"></div>
                    </div>
                    <div className="text-orange-400 font-semibold text-sm">75%</div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700/50 rounded-none border border-transparent hover:border-orange-500/30 transition-all duration-300 relative group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v6h5l-5 5v-5H9V7h6z" />
                  </svg>
                  {/* Notification dot */}
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-sm animate-pulse"></div>
                </button>

                {notificationsOpen && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-slate-800/95 backdrop-blur-xl border-2 border-slate-600 shadow-2xl z-50 rounded-none">
                    <div className="px-5 py-4 border-b-2 border-slate-700">
                      <h3 className="text-white font-bold text-lg">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-5 py-4 hover:bg-slate-700/80 border-b border-slate-700/50 transition-colors group">
                        <div className="text-white text-sm font-medium group-hover:text-orange-100">New message from team lead</div>
                        <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">2 minutes ago</div>
                      </div>
                      <div className="px-5 py-4 hover:bg-slate-700/80 border-b border-slate-700/50 transition-colors group">
                        <div className="text-white text-sm font-medium group-hover:text-orange-100">Project deadline updated</div>
                        <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">1 hour ago</div>
                      </div>
                      <div className="px-5 py-4 hover:bg-slate-700/80 transition-colors group">
                        <div className="text-white text-sm font-medium group-hover:text-orange-100">Safety inspection completed</div>
                        <div className="text-slate-400 text-xs mt-1 group-hover:text-orange-300">3 hours ago</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700/50 rounded-none border border-transparent hover:border-orange-500/30 transition-all duration-300 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm px-3 py-1.5 rounded-none border border-slate-600/50 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="text-right">
                  <div className="text-sm text-white font-semibold group-hover:text-orange-100 transition-colors">John Doe</div>
                  <div className="text-xs text-slate-400 group-hover:text-orange-300 transition-colors">Project Manager</div>
                </div>
                <div className="w-8 h-8 bg-slate-600 rounded-none flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                  <span className="text-white font-bold text-xs group-hover:text-orange-100 transition-colors">JD</span>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={onSignOut}
                className="px-5 py-3 bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 hover:text-white border-2 border-slate-600/60 hover:border-orange-500/40 rounded-none transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced progress rail */}
        <div className="h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/60 via-orange-400/60 to-orange-500/0 shadow-lg"></div>
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
