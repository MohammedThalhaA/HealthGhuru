'use client';

import React from 'react';
import { Target, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Goal } from '@/lib/types';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdateProgress }) => {
  // Determine if higher is better or lower is better
  const isLowerBetter = goal.targetValue < goal.startValue;
  
  // Calculate current value (last history entry or start value)
  const currentValue = goal.history.length > 0 
    ? goal.history[goal.history.length - 1].value 
    : goal.startValue;

  // Calculate percentage progress
  const totalChangeNeeded = Math.abs(goal.startValue - goal.targetValue);
  const currentChange = Math.abs(goal.startValue - currentValue);
  let progressPercentage = totalChangeNeeded === 0 ? 100 : (currentChange / totalChangeNeeded) * 100;
  
  // Cap at 100% or 0% depending on direction
  if (isLowerBetter && currentValue < goal.targetValue) progressPercentage = 100;
  if (!isLowerBetter && currentValue > goal.targetValue) progressPercentage = 100;
  if (isLowerBetter && currentValue > goal.startValue) progressPercentage = 0;
  if (!isLowerBetter && currentValue < goal.startValue) progressPercentage = 0;

  progressPercentage = Math.max(0, Math.min(100, progressPercentage));

  const isGoingWell = isLowerBetter ? currentValue <= goal.startValue : currentValue >= goal.startValue;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-surface-alt text-primary rounded-full flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-500 capitalize">{goal.category.replace('_', ' ')}</p>
          </div>
        </div>
        <div className={`flex items-center text-sm font-medium ${isGoingWell ? 'text-primary' : 'text-orange-500'}`}>
          {isGoingWell ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
          {Math.abs(currentValue - goal.startValue).toFixed(1)} {goal.unit}
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm font-medium text-gray-700">
        <span>{currentValue} {goal.unit}</span>
        <span>{goal.targetValue} {goal.unit} Target</span>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6 relative">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${progressPercentage >= 100 ? 'bg-secondary' : 'bg-primary-light'}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-auto flex gap-3">
        <button 
          onClick={() => onUpdateProgress(goal)}
          className="flex-1 flex items-center justify-center px-4 py-2.5 bg-surface-alt text-primary-dark font-medium rounded-xl hover:bg-surface transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> Log Progress
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
