"use client";

import React from 'react';
import { Lightbulb, Clock, Activity, Coffee } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function SleepInsights() {
  const { today } = useDashboard();
  
  const hasEnoughSleep = today.sleepHours >= 7;

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border h-full flex flex-col overflow-hidden">
      <div className="bg-surface-alt px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
        <h3 className="font-heading font-bold text-dark flex items-center gap-2">
          <Lightbulb size={18} className="text-accent" /> AI Sleep Insights
        </h3>
      </div>

      <div className="p-5 flex flex-col gap-4">
        
        {/* Main Insight */}
        <div className={`p-4 rounded-xl border flex gap-3 ${hasEnoughSleep ? 'bg-[#4CAF50]/10 border-[#4CAF50]/20' : 'bg-status-warning/10 border-status-warning/20'}`}>
          <div className="shrink-0 mt-0.5">
            {hasEnoughSleep ? '🌟' : '⚠️'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-dark mb-1">
              {hasEnoughSleep ? "Great recovery last night!" : "Sleep Debt Warning"}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {hasEnoughSleep 
                ? `You logged ${today.sleepHours} hours of sleep. Your body should feel fully recovered today. This is an optimal day for a high-intensity workout.` 
                : `You only logged ${today.sleepHours} hours. Your cognitive function and recovery might be impaired today. Prioritize rest.`}
            </p>
          </div>
        </div>

        {/* Actionable Tips based on today's logs */}
        <h4 className="text-sm font-bold text-dark mt-2">Actionable Recommendations:</h4>
        
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-text-secondary">
            <Coffee size={16} className="text-[#FF6B6B] shrink-0 mt-0.5" />
            <span>Avoid caffeine after 2:00 PM today to ensure better sleep latency tonight.</span>
          </li>
          
          <li className="flex gap-3 text-sm text-text-secondary">
            <Activity size={16} className="text-primary shrink-0 mt-0.5" />
            <span>
              {hasEnoughSleep 
                ? "Your CNS is primed. Push hard in your workout today." 
                : "Consider switching today's workout to light yoga or active recovery."}
            </span>
          </li>

          <li className="flex gap-3 text-sm text-text-secondary">
            <Clock size={16} className="text-accent shrink-0 mt-0.5" />
            <span>Try to go to bed 15 minutes earlier tonight to build a consistent circadian rhythm.</span>
          </li>
        </ul>

      </div>
    </div>
  );
}
