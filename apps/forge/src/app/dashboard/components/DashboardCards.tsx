'use client';

import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: 'orange' | 'blue' | 'green';
}

function DashboardCard({ title, children, className = '', accentColor = 'orange' }: DashboardCardProps) {
  const accentClasses = {
    orange: 'border-orange-500/30 shadow-orange-500/10 bg-slate-800/50',
    blue: 'border-blue-500/30 shadow-blue-500/10 bg-slate-800/50',
    green: 'border-green-500/30 shadow-green-500/10 bg-slate-800/50',
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function DashboardCards() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
          Welcome to Your Forge Dashboard
        </h1>
        <p className="text-slate-400 text-lg">
          You're successfully authenticated! 🎉
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Project Overview */}
        <DashboardCard title="Project Overview">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Status</span>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Progress</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-slate-700 rounded-none overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 w-3/4"></div>
                </div>
                <span className="text-orange-400 text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Team Size</span>
              <span className="text-white font-semibold">24 Members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Deadline</span>
              <span className="text-white font-semibold">Dec 2024</span>
            </div>
          </div>
        </DashboardCard>

        {/* Active Tasks */}
        <DashboardCard title="Active Tasks">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-none border border-slate-600">
              <div>
                <div className="text-white font-medium">Foundation Inspection</div>
                <div className="text-slate-400 text-sm">Due: Today</div>
              </div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-none border border-slate-600">
              <div>
                <div className="text-white font-medium">Steel Delivery</div>
                <div className="text-slate-400 text-sm">Due: Tomorrow</div>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-none border border-slate-600">
              <div>
                <div className="text-white font-medium">Electrical Wiring</div>
                <div className="text-slate-400 text-sm">Due: Friday</div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </DashboardCard>

        {/* Document Q&A */}
        <DashboardCard title="Document Q&A">
          <div className="space-y-4">
            <div className="text-slate-300 text-sm">
              Ask questions about your project documents and get instant answers powered by AI.
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask about blueprints, specs..."
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white text-sm rounded-none focus:border-orange-500 focus:outline-none"
              />
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-none transition-colors">
                Ask
              </button>
            </div>
            <div className="text-xs text-slate-500">
              Recent: "What are the load requirements for the foundation?"
            </div>
          </div>
        </DashboardCard>

        {/* Team Collaboration */}
        <DashboardCard title="Team Collaboration">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-none border border-slate-600">
              <div className="w-8 h-8 bg-slate-600 rounded-none flex items-center justify-center">
                <span className="text-white font-bold text-xs">JD</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">John Doe</div>
                <div className="text-slate-400 text-xs">Project Manager</div>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-none border border-slate-600">
              <div className="w-8 h-8 bg-slate-600 rounded-none flex items-center justify-center">
                <span className="text-white font-bold text-xs">SM</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Sarah Miller</div>
                <div className="text-slate-400 text-xs">Site Engineer</div>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Recent Activity */}
        <DashboardCard title="Recent Activity">
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-none">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <div className="text-white text-sm font-medium">New safety inspection completed</div>
                <div className="text-slate-400 text-xs">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-none">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <div className="text-white text-sm font-medium">Material delivery received</div>
                <div className="text-slate-400 text-xs">4 hours ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-none">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-white text-sm font-medium">Team meeting scheduled</div>
                <div className="text-slate-400 text-xs">6 hours ago</div>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Weather & Conditions */}
        <DashboardCard title="Site Conditions">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Weather</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold">72°F</span>
                <span className="text-slate-400">Sunny</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Wind</span>
              <span className="text-white font-semibold">8 mph</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Safety Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-slate-700 rounded-none overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-4/5"></div>
                </div>
                <span className="text-green-400 text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Optimal conditions for construction work today.
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <DashboardCard title="Quick Actions" className="col-span-full" accentColor="orange">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-white text-sm font-medium">New Task</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white text-sm font-medium">Schedule</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-white text-sm font-medium">Reports</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-white text-sm font-medium">Team</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-white text-sm font-medium">Analytics</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-none border border-slate-600 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white text-sm font-medium">Settings</span>
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
