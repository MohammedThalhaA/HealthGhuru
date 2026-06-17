"use client";

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function WeeklyOverviewChart() {
  const { weeklyData } = useDashboard();
  
  const [activeMetrics, setActiveMetrics] = useState({
    nutrition: true,
    sleep: true,
    activity: true,
    mood: true
  });

  const toggleMetric = (key: keyof typeof activeMetrics) => {
    setActiveMetrics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border shadow-lg rounded-xl">
          <p className="font-bold text-dark mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm font-medium mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="text-dark font-mono">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 md:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="font-heading font-bold text-dark">Weekly Overview</h3>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => toggleMetric('nutrition')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeMetrics.nutrition ? 'bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20' : 'bg-surface text-text-muted border border-border'}`}
          >
            Nutrition
          </button>
          <button 
            onClick={() => toggleMetric('sleep')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeMetrics.sleep ? 'bg-[#7C4DFF]/10 text-[#7C4DFF] border border-[#7C4DFF]/20' : 'bg-surface text-text-muted border border-border'}`}
          >
            Sleep
          </button>
          <button 
            onClick={() => toggleMetric('activity')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeMetrics.activity ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-surface text-text-muted border border-border'}`}
          >
            Activity
          </button>
          <button 
            onClick={() => toggleMetric('mood')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeMetrics.mood ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20' : 'bg-surface text-text-muted border border-border'}`}
          >
            Mood
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNutrition" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f06d2f" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f06d2f" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
            <Tooltip content={<CustomTooltip />} />
            
            {activeMetrics.nutrition && <Area type="monotone" name="Nutrition Score" dataKey="nutritionScore" stroke="#4CAF50" strokeWidth={3} fillOpacity={1} fill="url(#colorNutrition)" />}
            {activeMetrics.sleep && <Area type="monotone" name="Sleep Hours" dataKey="sleepHours" stroke="#7C4DFF" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />}
            {activeMetrics.activity && <Area type="monotone" name="Active Min" dataKey="activeMinutes" stroke="#f06d2f" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />}
            {activeMetrics.mood && <Area type="monotone" name="Mood Score" dataKey="moodScore" stroke="#FF6B6B" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
