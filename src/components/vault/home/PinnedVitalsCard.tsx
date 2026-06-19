"use client";

import React from 'react';
import { Activity, Heart, Droplets } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';

export function PinnedVitalsCard() {
  const { goals, activeMemberId } = useVault();
  const memberGoals = goals.filter(g => g.memberId === activeMemberId);
  
  // Find latest progress for a goal category
  const getLatestValue = (category: string) => {
    const goal = memberGoals.find(g => g.category === category);
    if (!goal || goal.history.length === 0) return '--';
    return goal.history[goal.history.length - 1].value;
  };

  const getUnit = (category: string) => {
    const goal = memberGoals.find(g => g.category === category);
    return goal ? goal.unit : '';
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-lg text-dark">Pinned Vitals</h3>
        <button className="text-xs text-secondary hover:underline font-medium">Edit</button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Weight */}
        <div className="bg-surface-alt rounded-xl p-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Activity size={16} />
            <span className="text-sm font-medium">Weight</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold text-dark">{getLatestValue('weight')}</span>
            <span className="text-sm text-text-muted">{getUnit('weight') || 'kg'}</span>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="bg-surface-alt rounded-xl p-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Droplets size={16} className="text-red-500" />
            <span className="text-sm font-medium">A1C</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold text-dark">{getLatestValue('blood_sugar')}</span>
            <span className="text-sm text-text-muted">{getUnit('blood_sugar') || '%'}</span>
          </div>
        </div>

        {/* BP (Mocked for now since not in data) */}
        <div className="bg-surface-alt rounded-xl p-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Heart size={16} className="text-pink-500" />
            <span className="text-sm font-medium">Blood Pressure</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold text-dark">120/80</span>
            <span className="text-sm text-text-muted">mmHg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
