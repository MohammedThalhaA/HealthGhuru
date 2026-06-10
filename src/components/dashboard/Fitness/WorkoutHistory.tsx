"use client";

import React, { useState } from 'react';
import { MOCK_WORKOUT_HISTORY } from '@/lib/mockData';
import { Trash2, History } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function WorkoutHistory() {
  const [history, setHistory] = useState(MOCK_WORKOUT_HISTORY);
  const { addToast } = useToast();

  const handleDelete = (id: string) => {
    setHistory(history.filter(w => w.id !== id));
    addToast('Workout removed', 'success');
  };

  const getEmojiForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cycling': return '🚴';
      case 'yoga': return '🧘';
      case 'swimming': return '🏊';
      case 'walking': return '🚶';
      case 'running': return '🏃';
      case 'weightlifting': return '🏋️';
      default: return '💪';
    }
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border h-full flex flex-col overflow-hidden">
      <div className="bg-surface-alt px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
        <h3 className="font-heading font-bold text-dark flex items-center gap-2">
          <History size={18} className="text-primary" /> This Week's Workouts
        </h3>
        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
          {history.length} Sessions
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-text-muted text-sm italic">
            No workouts logged this week yet.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {history.map((workout) => (
              <div 
                key={workout.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-surface transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-xl">
                    {getEmojiForType(workout.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">{workout.type}</h4>
                    <span className="text-xs text-text-muted">{new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short'}).format(new Date(workout.date))}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono font-bold text-dark text-sm">{workout.duration} min</p>
                    <p className="text-xs text-text-muted">{workout.calories} kcal</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(workout.id)}
                    className="p-2 text-text-muted/50 hover:text-status-danger hover:bg-status-danger/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
