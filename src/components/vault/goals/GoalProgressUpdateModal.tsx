"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Goal } from '@/lib/types';

interface GoalProgressUpdateModalProps {
  goal: Goal;
  onClose: () => void;
  onUpdate: (value: number, note: string) => void;
}

export function GoalProgressUpdateModal({ goal, onClose, onUpdate }: GoalProgressUpdateModalProps) {
  const currentVal = goal.history.length > 0 ? goal.history[goal.history.length - 1].value : goal.startValue;
  const [value, setValue] = useState(currentVal);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(value, note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface">
          <h2 className="font-heading font-bold text-xl text-dark">Update Progress</h2>
          <button onClick={onClose} className="text-text-muted hover:text-dark transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-surface-alt p-4 rounded-xl border border-border mb-4">
            <p className="text-sm font-medium text-text-primary mb-1">{goal.title}</p>
            <p className="text-xs text-text-muted">Target: {goal.targetValue}{goal.unit}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">New Value ({goal.unit})</label>
            <input 
              type="number" 
              step="0.1"
              value={value}
              onChange={e => setValue(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Note (Optional)</label>
            <textarea 
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="How are you feeling about this?"
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Log Progress</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
