'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'completed';
  progress: number;
  budget: number;
  spent: number;
  safetyScore: number;
  teamSize: number;
  deadline: string;
}

export default function ProjectSummaries() {
  const projects: Project[] = [
    {
      id: '1',
      name: 'Downtown Office Complex',
      status: 'active',
      progress: 75,
      budget: 2500000,
      spent: 1875000,
      safetyScore: 85,
      teamSize: 24,
      deadline: 'Dec 2024'
    },
    {
      id: '2',
      name: 'Residential Tower A',
      status: 'active',
      progress: 45,
      budget: 3200000,
      spent: 1440000,
      safetyScore: 92,
      teamSize: 18,
      deadline: 'Mar 2025'
    },
    {
      id: '3',
      name: 'Industrial Warehouse',
      status: 'planning',
      progress: 15,
      budget: 1800000,
      spent: 270000,
      safetyScore: 78,
      teamSize: 12,
      deadline: 'Jun 2025'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'planning': return 'text-blue-400';
      case 'completed': return 'text-gray-400';
      default: return 'text-slate-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Active Projects</h3>
        <Link
          href="/projects"
          className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer"
            onClick={() => console.log(`Navigate to project ${project.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium text-sm truncate">{project.name}</h4>
              <span className={`text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Project Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-400">Budget</div>
                <div className="text-white font-medium">{formatCurrency(project.budget)}</div>
              </div>
              <div>
                <div className="text-slate-400">Spent</div>
                <div className="text-green-400 font-medium">{formatCurrency(project.spent)}</div>
              </div>
              <div>
                <div className="text-slate-400">Safety Score</div>
                <div className="text-white font-medium">{project.safetyScore}%</div>
              </div>
              <div>
                <div className="text-slate-400">Team Size</div>
                <div className="text-white font-medium">{project.teamSize}</div>
              </div>
            </div>

            {/* Deadline */}
            <div className="mt-3 pt-3 border-t border-slate-600/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Deadline</span>
                <span className="text-orange-400 font-medium">{project.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
