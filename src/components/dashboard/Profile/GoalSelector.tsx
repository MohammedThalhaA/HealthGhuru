"use client";

import React, { useState } from 'react';
import { Target, Check } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';
import { HealthGoal } from '@/lib/types';

export default function GoalSelector() {
  const { user, updateUser } = useDashboard();
  const { addToast } = useToast();
  
  const [selectedGoals, setSelectedGoals] = useState<HealthGoal[]>(user.goals);

  const availableGoals: { id: HealthGoal; label: string; icon: string }[] = [
    { id: 'lose_weight', label: 'Lose Weight', icon: '⚖️' },
    { id: 'build_muscle', label: 'Gain Muscle', icon: '💪' },
    { id: 'eat_healthier', label: 'Eat Healthier', icon: '🥗' },
    { id: 'sleep_better', label: 'Sleep Better', icon: '😴' },
    { id: 'reduce_stress', label: 'Reduce Stress', icon: '🧘' },
    { id: 'more_active', label: 'More Active', icon: '🏃' },
  ];

  const toggleGoal = (id: HealthGoal) => {
    let newGoals;
    if (selectedGoals.includes(id)) {
      newGoals = selectedGoals.filter(g => g !== id);
    } else {
      newGoals = [...selectedGoals, id];
    }
    setSelectedGoals(newGoals);
  };

  const handleSave = () => {
    updateUser({ goals: selectedGoals });
    addToast('Wellness goals updated! 🎯', 'success');
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden h-full flex flex-col">
      <div className="bg-surface-alt px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
        <h3 className="font-heading font-bold text-dark uppercase tracking-wide flex items-center gap-2">
          <Target size={18} className="text-accent" /> Wellness Goals
        </h3>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm text-text-secondary mb-4">
          Select the areas you want to focus on. HealthGhuru will personalize your learning recommendations based on these.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {availableGoals.map(goal => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border-2 ${
                  isSelected 
                    ? 'border-accent bg-accent/10 text-dark shadow-sm' 
                    : 'border-border bg-surface text-text-muted hover:border-accent/50'
                }`}
              >
                <span>{goal.icon}</span>
                {goal.label}
                {isSelected && <Check size={14} className="text-accent ml-1" />}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-border flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-dark text-white font-bold py-2.5 px-6 rounded-lg hover:bg-dark/80 transition-colors"
          >
            Update Goals
          </button>
        </div>
      </div>
    </div>
  );
}
