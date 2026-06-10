"use client";

import React, { useState, useEffect } from 'react';
import { Dumbbell, Activity, Target } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';
import { CALORIES_PER_MINUTE } from '@/lib/mockData';

export default function WorkoutLogger({ onLogSuccess }: { onLogSuccess?: () => void }) {
  const { today, updateToday } = useDashboard();
  const { addToast } = useToast();

  const [type, setType] = useState('Cycling');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'intense'>('moderate');
  const [estimatedCalories, setEstimatedCalories] = useState(0);

  // Recalculate estimated calories live
  useEffect(() => {
    const baseCals = CALORIES_PER_MINUTE[type] || 6;
    const mins = Number(duration) || 0;
    const multiplier = intensity === 'light' ? 0.8 : intensity === 'intense' ? 1.3 : 1.0;
    setEstimatedCalories(Math.round(baseCals * mins * multiplier));
  }, [type, duration, intensity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app we'd save the full log object to an array in localStorage.
    // For this mockup, we'll update today's total workout minutes.
    updateToday({ 
      workoutMinutes: today.workoutMinutes + Number(duration),
      caloriesConsumed: today.caloriesConsumed + estimatedCalories // Actually workout burns cals, but keeping to spec for today object
    });
    
    addToast('Workout logged! 💪', 'success');
    if (onLogSuccess) onLogSuccess();
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden h-full">
      <div className="bg-surface-alt px-6 py-4 flex items-center gap-2 border-b border-border">
        <Dumbbell size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-dark uppercase tracking-wide">Log Today's Workout</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
        
        {/* Exercise Type */}
        <div>
          <label className="text-sm font-bold text-dark mb-2 block flex items-center gap-2">
            <Activity size={16} className="text-accent" /> Exercise Type
          </label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow appearance-none"
          >
            {Object.keys(CALORIES_PER_MINUTE).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-bold text-dark mb-2 block flex items-center gap-2">
            <Target size={16} className="text-accent" /> Duration (minutes)
          </label>
          <input 
            type="number" 
            min="1" 
            max="300" 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
          />
        </div>

        {/* Intensity */}
        <div>
          <label className="text-sm font-bold text-dark mb-2 block">Intensity</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'Light' },
              { id: 'moderate', label: 'Moderate' },
              { id: 'intense', label: 'Intense' },
            ].map(int => (
              <button
                key={int.id}
                type="button"
                onClick={() => setIntensity(int.id as any)}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-all border ${
                  intensity === int.id 
                    ? 'border-accent bg-accent/10 text-accent shadow-[0_0_0_1px_#F9A825]' 
                    : 'border-border bg-surface text-text-muted hover:border-accent/50'
                }`}
              >
                {int.id === intensity ? '◉' : '○'} {int.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-bold text-dark mb-2 block">Notes (Optional)</label>
          <textarea 
            rows={2}
            placeholder="e.g. Felt great today!"
            className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow resize-none"
          />
        </div>

        {/* Estimated Calories & Submit */}
        <div className="mt-2 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted block font-medium">Estimated Burn</span>
            <span className="font-mono text-xl font-bold text-dark">{estimatedCalories} <span className="text-sm font-body font-normal text-text-secondary">kcal</span></span>
          </div>
          
          <button 
            type="submit"
            className="bg-accent text-dark font-bold py-3 px-8 rounded-full shadow-[0_4px_0_#F57F17] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all"
          >
            Log Workout
          </button>
        </div>

      </form>
    </div>
  );
}
