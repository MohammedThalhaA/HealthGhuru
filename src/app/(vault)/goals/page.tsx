"use client";

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { GoalCard } from '@/components/vault/goals/GoalCard';
import { GoalCreateModal } from '@/components/vault/goals/GoalCreateModal';
import { GoalProgressUpdateModal } from '@/components/vault/goals/GoalProgressUpdateModal';
import { GoalLinkedArticles } from '@/components/vault/goals/GoalLinkedArticles';
import { AdSlot } from '@/components/ui/AdSlot';
import { LockedFeatureCard } from '@/components/ui/LockedFeatureCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Target, Plus } from 'lucide-react';
import { Goal } from '@/lib/types';

export default function GoalsPage() {
  const { goals, activeMemberId, userPlan, addGoal, updateGoal } = useVault();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<Goal | null>(null);
  
  const memberGoals = goals.filter(g => g.memberId === activeMemberId);
  const activeGoalsCount = memberGoals.filter(g => g.status === 'active').length;
  
  const isFree = userPlan.tier === 'free';
  const hasReachedLimit = isFree && activeGoalsCount >= userPlan.activeGoalsLimit;

  const handleCreateGoal = (data: any) => {
    const newGoal: Goal = {
      ...data,
      id: `g_${Date.now()}`,
      memberId: activeMemberId,
      status: 'active',
      history: []
    };
    addGoal(newGoal);
    setIsCreateModalOpen(false);
  };

  const handleUpdateProgress = (value: number, note: string) => {
    if (!goalToUpdate) return;
    
    const updatedHistory = [...goalToUpdate.history, { date: new Date().toISOString(), value, note }];
    const status = (goalToUpdate.startValue < goalToUpdate.targetValue) 
      ? (value >= goalToUpdate.targetValue ? 'completed' : 'active')
      : (value <= goalToUpdate.targetValue ? 'completed' : 'active');

    const updatedGoal: Goal = { ...goalToUpdate, status: status as 'active' | 'completed', history: updatedHistory };
    updateGoal(updatedGoal);
    setGoalToUpdate(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <ScrollReveal>
          <SectionHeader 
            title="Health Goals" 
            eyebrow="My Vault"
            subtitle="Track and achieve your most important health milestones."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus size={18} /> New Goal
          </Button>
        </ScrollReveal>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full space-y-8">
          {memberGoals.length === 0 ? (
            <ScrollReveal delay={0.2}>
              <EmptyState 
                icon={Target}
                title="No goals yet"
                description="Setting a health goal is the first step to achieving it. What do you want to accomplish?"
                actionText="Create your first goal"
                onAction={() => setIsCreateModalOpen(true)}
              />
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memberGoals.map((goal, index) => (
                <ScrollReveal key={goal.id} delay={0.1 * index} className="h-full">
                  <GoalCard goal={goal} onUpdateProgress={setGoalToUpdate} />
                </ScrollReveal>
              ))}
            </div>
          )}

          <ScrollReveal delay={0.3}>
            <GoalLinkedArticles />
          </ScrollReveal>
        </div>

        {/* Ad Rail (Desktop & Free only) */}
        {isFree && (
          <div className="hidden lg:block w-[300px] shrink-0 sticky top-28">
            <ScrollReveal delay={0.4}>
              <AdSlot />
            </ScrollReveal>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        hasReachedLimit ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
            <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl p-6">
              <LockedFeatureCard 
                message={`Free plan includes ${userPlan.activeGoalsLimit} active goal at a time.`}
                upgradeText="Upgrade to Pro for unlimited goals &rarr;"
                onUpgrade={() => window.location.href = '/profile'}
                className="shadow-none border-dashed"
              />
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        ) : (
          <GoalCreateModal 
            onClose={() => setIsCreateModalOpen(false)} 
            onCreate={handleCreateGoal} 
          />
        )
      )}

      {goalToUpdate && (
        <GoalProgressUpdateModal 
          goal={goalToUpdate}
          onClose={() => setGoalToUpdate(null)}
          onUpdate={handleUpdateProgress}
        />
      )}
    </div>
  );
}
