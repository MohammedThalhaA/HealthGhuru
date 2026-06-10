"use client";

import React from 'react';
import ProgressRing from '@/components/ui/ProgressRing';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function WellnessScoreRing() {
  const { today } = useDashboard();
  
  // Calculate mock sub-scores based on today's logs
  const nutritionScore = Math.min(100, Math.round((today.caloriesConsumed / 2000) * 100));
  const fitnessScore = Math.min(100, Math.round((today.workoutMinutes / 60) * 100));
  const sleepScore = Math.min(100, Math.round((today.sleepHours / 8) * 100));
  const moodScore = today.moodScore ? (today.moodScore / 5) * 100 : 0;
  
  // Overall score
  const overallScore = Math.round((nutritionScore + fitnessScore + sleepScore + moodScore) / 4);

  // Color logic
  let scoreColor = 'var(--status-danger)'; // < 40
  if (overallScore >= 71) scoreColor = 'var(--status-good)';
  else if (overallScore >= 41) scoreColor = 'var(--status-warning)';

  return (
    <div className="bg-white rounded-[16px] p-6 shadow-card border border-border flex flex-col items-center justify-center h-full">
      <ProgressRing 
        value={overallScore} 
        size={180} 
        strokeWidth={16} 
        color={scoreColor}
      >
        <span className="font-mono text-5xl font-bold text-dark" style={{ color: scoreColor }}>
          {overallScore}
        </span>
        <span className="text-xs font-medium text-text-muted mt-1 uppercase tracking-wider">
          Out of 100
        </span>
      </ProgressRing>
      
      <h3 className="font-heading font-bold text-center text-dark mt-4">
        Your Wellness Score Today
      </h3>
      
      <div className="w-full grid grid-cols-4 gap-2 mt-6">
        <div className="flex flex-col items-center">
          <ProgressRing value={nutritionScore} size={40} strokeWidth={4} color="var(--chart-nutrition)" />
          <span className="text-[10px] text-text-muted mt-1 font-medium">Nutrition</span>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing value={fitnessScore} size={40} strokeWidth={4} color="var(--chart-fitness)" />
          <span className="text-[10px] text-text-muted mt-1 font-medium">Fitness</span>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing value={sleepScore} size={40} strokeWidth={4} color="var(--chart-sleep)" />
          <span className="text-[10px] text-text-muted mt-1 font-medium">Sleep</span>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing value={moodScore} size={40} strokeWidth={4} color="var(--chart-mood)" />
          <span className="text-[10px] text-text-muted mt-1 font-medium">Mood</span>
        </div>
      </div>
    </div>
  );
}
