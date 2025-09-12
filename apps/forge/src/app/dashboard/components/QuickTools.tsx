'use client';

import React from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
}

export default function QuickTools() {
  const tools: Tool[] = [
    {
      id: 'lessons-learned',
      name: 'Lessons Learned',
      description: 'Access project insights and best practices',
      href: '/lessons-learned',
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/10 hover:bg-blue-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'rfis',
      name: 'RFI Management',
      description: 'Track and manage requests for information',
      href: '/rfis',
      color: 'text-green-400',
      bgColor: 'bg-green-600/10 hover:bg-green-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'time-tracking',
      name: 'Time & Materials',
      description: 'Track labor and material costs',
      href: '/time-tracking',
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/10 hover:bg-orange-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'meetings',
      name: 'Meeting Agents',
      description: 'Record and summarize project meetings',
      href: '/meetings',
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/10 hover:bg-purple-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'pull-planning',
      name: 'Pull Planning',
      description: 'Collaborative project scheduling',
      href: '/pull-planning',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-600/10 hover:bg-indigo-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'forecasting',
      name: 'Forecasting',
      description: 'Predict delays and optimize schedules',
      href: '/forecasting',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-600/10 hover:bg-cyan-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4" style={{ width: '100% !important', maxWidth: 'none !important' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Quick Tools</h3>
        <Link
          href="/tools"
          className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className={`p-3 rounded-lg border border-slate-600/30 ${tool.bgColor} transition-all duration-200 group`}
          >
            <div className={`w-8 h-8 ${tool.color} mb-2 group-hover:scale-110 transition-transform duration-200`}>
              {tool.icon}
            </div>
            <h4 className="text-white font-medium text-sm mb-1">{tool.name}</h4>
            <p className="text-slate-400 text-xs leading-tight">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
