'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Goal } from '@/lib/types';

interface GoalProgressUpdateModalProps {
  goal: Goal;
  onClose: () => void;
  // Note: in a real app, this should probably come from context, but we can fake it or just close for now
}

const GoalProgressUpdateModal: React.FC<GoalProgressUpdateModalProps> = ({ goal, onClose }) => {
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In actual implementation, we would call an update function on context.
    // For mock, we'll just alert and close
    alert(`Logged progress: ${value} ${goal.unit}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Log Progress</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-gray-500 mb-1">{goal.title}</p>
            <p className="text-xs text-gray-400">Target: {goal.targetValue} {goal.unit}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Today's Value ({goal.unit})</label>
            <input type="number" step="0.1" required value={value} onChange={e => setValue(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalProgressUpdateModal;
