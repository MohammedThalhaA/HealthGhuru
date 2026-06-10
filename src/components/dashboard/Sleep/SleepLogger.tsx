"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Star } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';

export default function SleepLogger() {
  const { updateToday } = useDashboard();
  const { addToast } = useToast();

  const [bedtime, setBedtime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [quality, setQuality] = useState(4);
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState({ hours: 7, mins: 30 });

  // Calculate duration
  useEffect(() => {
    if (!bedtime || !wakeTime) return;

    const [bHours, bMins] = bedtime.split(':').map(Number);
    const [wHours, wMins] = wakeTime.split(':').map(Number);

    let dHours = wHours - bHours;
    let dMins = wMins - bMins;

    if (dMins < 0) {
      dMins += 60;
      dHours -= 1;
    }
    
    // Handle midnight crossover
    if (dHours < 0) {
      dHours += 24;
    }

    setDuration({ hours: dHours, mins: dMins });
  }, [bedtime, wakeTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalHours = duration.hours + (duration.mins / 60);
    
    updateToday({ sleepHours: totalHours });
    
    // Save to local storage for historical logs
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(`hg_sleep_${todayStr}`, JSON.stringify({
      date: todayStr,
      bedtime,
      wakeTime,
      duration: totalHours,
      quality,
      notes
    }));

    addToast('Sleep logged! 😴', 'success');
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-6 md:p-8 h-full flex flex-col justify-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#7C4DFF]/10 rounded-full flex items-center justify-center mb-4">
          <Moon size={32} className="text-[#7C4DFF]" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-dark">How did you sleep last night?</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto w-full">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-dark mb-2 block">Went to bed</label>
            <input 
              type="time" 
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full border border-[#7C4DFF]/30 rounded-lg p-3 text-dark font-medium bg-[#7C4DFF]/5 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 transition-shadow"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-2 block">Woke up</label>
            <input 
              type="time" 
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full border border-[#7C4DFF]/30 rounded-lg p-3 text-dark font-medium bg-[#7C4DFF]/5 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 transition-shadow"
            />
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 flex items-center justify-between border border-border">
          <span className="text-sm font-bold text-dark">Total Duration</span>
          <span className="font-mono text-xl font-bold text-[#7C4DFF]">
            {duration.hours} <span className="text-sm font-body font-medium text-text-muted">hrs</span> {duration.mins} <span className="text-sm font-body font-medium text-text-muted">min</span>
          </span>
        </div>

        <div>
          <label className="text-sm font-bold text-dark mb-2 block text-center">Sleep Quality</label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button 
                key={s} 
                type="button"
                onClick={() => setQuality(s)}
                className="p-2 transition-transform hover:scale-110 focus:outline-none"
              >
                <Star 
                  size={40} 
                  className={s <= quality ? "fill-accent text-accent" : "text-border hover:text-accent/50"} 
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-dark mb-2 block">Notes (Optional)</label>
          <textarea 
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Woke up once around 2am"
            className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 transition-shadow resize-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#7C4DFF] text-white py-4 rounded-full font-bold shadow-[0_4px_0_#512DA8] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all mt-2"
        >
          Save Sleep Log
        </button>

      </form>
    </div>
  );
}
