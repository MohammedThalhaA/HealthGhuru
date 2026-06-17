"use client";

import React, { useState } from 'react';
import { Droplets, Utensils, Dumbbell, Moon, Star } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';

export default function QuickLogBar() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { today, updateToday } = useDashboard();
  const { addToast } = useToast();

  const handleWaterLog = () => {
    if (today.waterGlasses < 8) {
      updateToday({ waterGlasses: today.waterGlasses + 1 });
      addToast('Water logged! 💧', 'success');
      setActiveModal(null);
    }
  };

  const handleSleepLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const hours = Number(fd.get('hours'));
    updateToday({ sleepHours: today.sleepHours + hours });
    addToast('Sleep logged! 😴', 'success');
    setActiveModal(null);
  };

  const handleWorkoutLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const duration = Number(fd.get('duration'));
    updateToday({ workoutMinutes: today.workoutMinutes + duration });
    addToast('Workout logged! 💪', 'success');
    setActiveModal(null);
  };

  const handleMealLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToast('Meal logged! 🍽️', 'success');
    setActiveModal(null);
  };

  const buttons = [
    { id: 'water', icon: Droplets, label: 'Log Water', color: 'text-[#29B6F6]' },
    { id: 'meal', icon: Utensils, label: 'Log Meal', color: 'text-primary' },
    { id: 'workout', icon: Dumbbell, label: 'Log Workout', color: 'text-accent' },
    { id: 'sleep', icon: Moon, label: 'Log Sleep', color: 'text-[#7C4DFF]' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={() => setActiveModal(btn.id)}
            className="bg-white border-2 border-border hover:border-primary/40 rounded-[12px] p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <btn.icon size={24} className={btn.color} />
            <span className="text-sm font-semibold text-dark">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Water Modal */}
      <Modal isOpen={activeModal === 'water'} onClose={() => setActiveModal(null)} title="Log Water">
        <div className="flex flex-col items-center py-6">
          <Droplets size={48} className="text-[#29B6F6] mb-4" />
          <h3 className="text-xl font-bold text-dark mb-2">{today.waterGlasses} / 8 Glasses</h3>
          <p className="text-text-muted mb-6 text-center">Stay hydrated! You need {Math.max(0, 8 - today.waterGlasses)} more glasses today.</p>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors ${
                  i < today.waterGlasses ? 'bg-[#29B6F6]/20 border-[#29B6F6]' : 'border-border bg-surface'
                }`}
              >
                <Droplets size={24} className={i < today.waterGlasses ? 'text-[#29B6F6]' : 'text-border'} />
              </div>
            ))}
          </div>
          <button 
            onClick={handleWaterLog}
            disabled={today.waterGlasses >= 8}
            className="w-full bg-[#29B6F6] text-white py-3 rounded-full font-bold shadow-[0_4px_0_#0288D1] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +1 Glass
          </button>
        </div>
      </Modal>

      {/* Meal Modal */}
      <Modal isOpen={activeModal === 'meal'} onClose={() => setActiveModal(null)} title="Quick Log Meal">
        <form onSubmit={handleMealLog} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Meal Type</label>
            <select name="type" className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">What did you eat?</label>
            <input required name="food" type="text" placeholder="e.g., Oatmeal with berries" className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-full font-bold shadow-btn-primary active:shadow-none active:translate-y-1 transition-all mt-4">
            Save Meal
          </button>
        </form>
      </Modal>

      {/* Workout Modal */}
      <Modal isOpen={activeModal === 'workout'} onClose={() => setActiveModal(null)} title="Quick Log Workout">
        <form onSubmit={handleWorkoutLog} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Exercise Type</label>
            <select name="type" className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="Walking">Walking</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Yoga">Yoga</option>
              <option value="Weightlifting">Weightlifting</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Duration (minutes)</label>
            <input required name="duration" type="number" min="1" max="300" defaultValue="30" className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button type="submit" className="w-full bg-accent text-dark py-3 rounded-full font-bold shadow-btn-accent active:shadow-none active:translate-y-1 transition-all mt-4">
            Save Workout
          </button>
        </form>
      </Modal>

      {/* Sleep Modal */}
      <Modal isOpen={activeModal === 'sleep'} onClose={() => setActiveModal(null)} title="Quick Log Sleep">
        <form onSubmit={handleSleepLog} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Hours Slept</label>
            <input required name="hours" type="number" step="0.5" min="0" max="16" defaultValue="7.5" className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Quality (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="p-2 cursor-pointer text-border hover:text-accent transition-colors">
                  <Star size={32} className="fill-current" />
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-[#7C4DFF] text-white py-3 rounded-full font-bold shadow-[0_4px_0_#512DA8] active:shadow-none active:translate-y-1 transition-all mt-4">
            Save Sleep
          </button>
        </form>
      </Modal>
    </>
  );
}
