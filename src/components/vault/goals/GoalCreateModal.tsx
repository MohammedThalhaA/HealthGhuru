'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { GoalCategory } from '@/lib/types';

interface GoalCreateModalProps {
  onClose: () => void;
}

const GoalCreateModal: React.FC<GoalCreateModalProps> = ({ onClose }) => {
  const { addGoal, activeMember } = useVault();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GoalCategory>('weight');
  const [startValue, setStartValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('kg');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      id: `goal-${Date.now()}`,
      memberId: activeMember.id,
      title,
      category,
      startValue: parseFloat(startValue),
      targetValue: parseFloat(targetValue),
      unit,
      targetDate,
      status: 'active',
      history: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Create New Goal</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Lose 5kg" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as GoalCategory)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light">
                <option value="weight">Weight</option>
                <option value="blood_sugar">Blood Sugar</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="fitness">Fitness</option>
                <option value="sleep">Sleep</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input type="text" required value={unit} onChange={e => setUnit(e.target.value)} placeholder="e.g. kg, %, mmHg" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Starting Value</label>
              <input type="number" step="0.1" required value={startValue} onChange={e => setStartValue(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
              <input type="number" step="0.1" required value={targetValue} onChange={e => setTargetValue(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
            <input type="date" required value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow">
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalCreateModal;
