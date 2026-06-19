'use client';

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import ActivityTimelineCard from './ActivityTimelineCard';
import PinnedVitalsCard from './PinnedVitalsCard';
import NudgeCard from './NudgeCard';
import QuickAddMenu from './QuickAddMenu';
import Link from 'next/link';
import { ArrowRight, FileText, Target } from 'lucide-react';

const BentoGrid: React.FC = () => {
  const { records, goals, userPlan } = useVault();

  const activeGoals = goals.filter(g => g.status === 'active');
  const nearestGoal = activeGoals.length > 0 
    ? activeGoals.sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())[0]
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[160px]">
      
      {/* Col Span 2, Row Span 2 */}
      <div className="md:col-span-2 lg:col-span-2 row-span-2">
        <ActivityTimelineCard />
      </div>

      {/* Row Span 1 */}
      <div className="row-span-1">
        <PinnedVitalsCard />
      </div>

      {/* Row Span 1 */}
      <div className="row-span-1">
        <NudgeCard />
      </div>

      {/* Small Card: Goals Snapshot */}
      <div className="w-full h-full min-h-[160px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold">
            <Target className="w-5 h-5 text-secondary" />
            <h3>Active Goals ({activeGoals.length})</h3>
          </div>
        </div>
        
        {nearestGoal ? (
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-800 truncate mb-2">{nearestGoal.title}</p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div className="h-full bg-secondary rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-gray-500 text-right">45% there</p>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            No active goals
          </div>
        )}

        <Link href="/goals" className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 mt-2 transition-colors">
          View All Goals <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      {/* Small Card: Records Snapshot */}
      <div className="w-full h-full min-h-[160px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-gray-900 font-semibold">
            <FileText className="w-5 h-5 text-primary-light" />
            <h3>Records</h3>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {userPlan.tier === 'pro' ? 'Unlimited' : `${records.length}/${userPlan.recordsLimit}`}
          </span>
        </div>
        
        <div className="flex-1 flex items-center space-x-2 overflow-hidden py-2">
          {records.length > 0 ? records.slice(0, 3).map((rec, i) => (
            <div key={rec.id} className={`w-12 h-16 rounded bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm -ml-${i > 0 ? '4' : '0'} relative z-${10 - i}`}>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
          )) : (
            <div className="w-full text-center text-sm text-gray-400">Vault is empty</div>
          )}
        </div>

        <Link href="/records" className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 mt-2 transition-colors">
          View All Records <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      {/* Small Card: Quick Add */}
      <div className="row-span-1">
        <QuickAddMenu />
      </div>

    </div>
  );
};

export default BentoGrid;
