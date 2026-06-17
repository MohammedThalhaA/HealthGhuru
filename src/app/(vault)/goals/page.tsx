'use client';

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { Plus, Target } from 'lucide-react';
import GoalCard from '@/components/vault/goals/GoalCard';
import GoalCreateModal from '@/components/vault/goals/GoalCreateModal';
import GoalProgressUpdateModal from '@/components/vault/goals/GoalProgressUpdateModal';
import GoalLinkedArticles from '@/components/vault/goals/GoalLinkedArticles';
import LockedFeatureCard from '@/components/ui/LockedFeatureCard';
import EmptyState from '@/components/ui/EmptyState';
import { Goal } from '@/lib/types';

export default function GoalsPage() {
  const { goals, canAddGoal } = useVault();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGoalForUpdate, setSelectedGoalForUpdate] = useState<Goal | null>(null);

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Goals & Milestones</h2>
          <p className="text-gray-500 mt-2">Track what matters most to your health journey.</p>
        </div>
        
        {canAddGoal ? (
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Goal
          </button>
        ) : (
          <LockedFeatureCard 
            title="Goal Limit Reached" 
            description="You can only track 1 active goal on the Free plan." 
            className="py-3 px-6 max-w-sm flex-row text-left !p-4"
          />
        )}
      </div>

      {activeGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGoals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdateProgress={(g) => setSelectedGoalForUpdate(g)} 
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Target}
          title="No active goals"
          description="Setting a goal is the first step towards better health."
          actionLabel={canAddGoal ? "Create your first goal" : undefined}
          onAction={() => setIsCreateModalOpen(true)}
          className="mt-4"
        />
      )}

      {completedGoals.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            Completed Goals
            <span className="ml-3 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {completedGoals.length}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
            {completedGoals.map(goal => (
              <div key={goal.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm grayscale transition-all hover:grayscale-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-through decoration-gray-300">{goal.title}</h3>
                    <p className="text-sm text-gray-500">Achieved on {goal.history[goal.history.length-1]?.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <GoalLinkedArticles />

      {isCreateModalOpen && <GoalCreateModal onClose={() => setIsCreateModalOpen(false)} />}
      {selectedGoalForUpdate && (
        <GoalProgressUpdateModal 
          goal={selectedGoalForUpdate} 
          onClose={() => setSelectedGoalForUpdate(null)} 
        />
      )}
    </div>
  );
}
