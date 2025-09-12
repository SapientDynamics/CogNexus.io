'use client';

import React from 'react';

interface Activity {
  id: string;
  type: 'safety' | 'material' | 'meeting' | 'progress' | 'document';
  title: string;
  description: string;
  project: string;
  timestamp: Date;
  user?: string;
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'safety',
      title: 'Safety inspection completed',
      description: 'Weekly safety audit passed with 95% compliance score',
      project: 'Downtown Office Complex',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      user: 'Sarah Miller'
    },
    {
      id: '2',
      type: 'material',
      title: 'Steel delivery received',
      description: '2,500 lbs of structural steel arrived on site',
      project: 'Residential Tower A',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      user: 'Mike Chen'
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Weekly progress meeting',
      description: 'Discussed foundation work completion and electrical rough-in schedule',
      project: 'Downtown Office Complex',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      user: 'John Doe'
    },
    {
      id: '4',
      type: 'progress',
      title: 'Foundation work 85% complete',
      description: 'Concrete pouring completed, rebar installation in progress',
      project: 'Industrial Warehouse',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      user: 'Lisa Wang'
    },
    {
      id: '5',
      type: 'document',
      title: 'Updated construction drawings',
      description: 'Revised electrical layout for second floor',
      project: 'Residential Tower A',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      user: 'David Kim'
    },
    {
      id: '6',
      type: 'safety',
      title: 'Near-miss incident reported',
      description: 'Worker identified potential fall hazard, corrective action taken',
      project: 'Downtown Office Complex',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      user: 'Tom Anderson'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'safety':
        return (
          <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'material':
        return (
          <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        );
      case 'meeting':
        return (
          <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'progress':
        return (
          <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-slate-600/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6" style={{ width: '100% !important', maxWidth: 'none !important' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        <button className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            {getActivityIcon(activity.type)}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-white font-medium text-sm truncate">{activity.title}</h4>
                <span className="text-slate-400 text-xs whitespace-nowrap ml-2">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-2">{activity.description}</p>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Project: <span className="text-orange-400">{activity.project}</span>
                </span>
                {activity.user && (
                  <span className="text-slate-500">
                    by {activity.user}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
