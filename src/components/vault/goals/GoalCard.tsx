import React from 'react';
import { PillBadge } from '@/components/ui/PillBadge';
import { Goal } from '@/lib/types';
import { Target, Activity, Trash2 } from 'lucide-react';
import { IconAction, IconButton } from '@/components/ui/IconAction';
import { useVault } from '@/lib/context/VaultContext';
import { useDialog } from '@/components/providers/DialogProvider';
import { useToast } from '@/components/providers/ToastProvider';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (goal: Goal) => void;
}

export function GoalCard({ goal, onUpdateProgress }: GoalCardProps) {
  const { deleteGoal } = useVault();
  const { confirm } = useDialog();
  const { toast } = useToast();

  const getCategoryName = (cat: string) => {
    return cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const handleDelete = async () => {
    const isConfirmed = await confirm({
      title: 'Delete Goal',
      description: `Are you sure you want to permanently delete "${goal.title}"? This action cannot be undone.`,
      confirmLabel: 'Delete Permanently',
      variant: 'danger',
    });
    
    if (isConfirmed) {
      deleteGoal(goal.id);
      toast.success('Goal deleted permanently');
    }
  };

  const currentVal = goal.history.length > 0 ? goal.history[goal.history.length - 1].value : goal.startValue;
  
  // Calculate percentage
  let percentage = 0;
  if (goal.startValue < goal.targetValue) {
    percentage = ((currentVal - goal.startValue) / (goal.targetValue - goal.startValue)) * 100;
  } else {
    percentage = ((goal.startValue - currentVal) / (goal.startValue - goal.targetValue)) * 100;
  }
  percentage = Math.max(0, Math.min(100, Math.round(percentage)));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };

  const lastUpdateDate = goal.history.length > 0 ? new Date(goal.history[goal.history.length - 1].date) : new Date();
  const timeSinceUpdate = Math.floor((new Date().getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white border border-border rounded-xl md:rounded-[14px] p-4 md:p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <PillBadge className="bg-surface-alt border-border text-xs px-2.5 py-1">
          {getCategoryName(goal.category)}
        </PillBadge>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md uppercase tracking-wider">
            {goal.status}
          </span>
          <div className="text-text-muted hover:text-red-500 transition-colors">
            <IconButton 
              icon={Trash2} 
              onClick={handleDelete} 
              label="Delete Goal" 
              size={18} 
            />
          </div>
        </div>
      </div>

      <h3 className="font-heading font-bold text-lg md:text-xl text-dark leading-tight mb-2 md:mb-3">
        {goal.title}
      </h3>

      <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm text-text-secondary mb-3 md:mb-4 bg-surface-alt p-2.5 md:p-3 rounded-lg border border-border">
        <div>
          <span className="block text-xs text-text-muted uppercase tracking-wider font-semibold mb-0.5">Starting</span>
          <span className="font-mono text-dark font-medium">{goal.startValue}{goal.unit}</span>
        </div>
        <div>
          <span className="block text-xs text-text-muted uppercase tracking-wider font-semibold mb-0.5">Target</span>
          <span className="font-mono text-dark font-medium">{goal.targetValue}{goal.unit}</span>
        </div>
        <div className="ml-auto text-right">
          <span className="block text-xs text-text-muted uppercase tracking-wider font-semibold mb-0.5">By</span>
          <span className="text-dark font-medium">{formatDate(goal.targetDate)}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm font-medium text-dark flex items-center gap-1.5">
            <IconAction context="decorative"><Activity size={14} className="text-secondary" /></IconAction> Current: <span className="font-mono">{currentVal}{goal.unit}</span>
          </span>
          <span className="font-mono font-bold text-primary">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <p className="text-xs text-text-muted mb-6 flex items-center gap-1">
        <IconAction context="decorative"><Target size={12} /></IconAction> Last updated: {timeSinceUpdate === 0 ? 'Today' : `${timeSinceUpdate} days ago`}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <button 
          onClick={() => onUpdateProgress(goal)}
          className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors flex-1 text-center"
        >
          + Update Progress
        </button>
      </div>
    </div>
  );
}
