"use client";

import React, { useMemo } from 'react';
import { subDays, format, startOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';
import { Calendar } from 'lucide-react';

export default function ActivityCalendar() {
  
  // Generate last 28 days (4 weeks)
  const days = useMemo(() => {
    const end = new Date();
    // Get the start of the week for 4 weeks ago
    const start = startOfWeek(subDays(end, 27), { weekStartsOn: 1 }); // week starts Monday
    
    return eachDayOfInterval({ start, end });
  }, []);

  // Mock activity data generator based on date
  const getActivityLevel = (date: Date) => {
    const day = date.getDay();
    // Make weekends more active, some random empty days
    if (day === 0 || day === 6) return Math.random() > 0.2 ? 3 : 1; // High activity
    if (Math.random() > 0.7) return 0; // No activity
    if (Math.random() > 0.4) return 1; // Light activity
    return 2; // Moderate
  };

  const activityColors = {
    0: 'bg-surface-alt border-border', // None
    1: 'bg-[#4CAF50]/30 border-[#4CAF50]/10', // Light
    2: 'bg-[#4CAF50]/70 border-[#4CAF50]/20', // Moderate
    3: 'bg-[#2E7D32] border-[#1B5E20]/30', // Intense
  };

  const getMonthLabels = () => {
    const labels: { label: string, col: number }[] = [];
    let currentMonth = -1;
    
    // Group days into columns of 7 (weeks)
    for (let w = 0; w < 4; w++) {
      const firstDayOfWeek = days[w * 7];
      if (firstDayOfWeek && firstDayOfWeek.getMonth() !== currentMonth) {
        labels.push({ label: format(firstDayOfWeek, 'MMM'), col: w + 1 });
        currentMonth = firstDayOfWeek.getMonth();
      }
    }
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-dark flex items-center gap-2">
          <Calendar size={18} className="text-accent" /> Activity Heatmap
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
          Less
          <div className="flex gap-1">
            <div className={`w-3 h-3 rounded-sm ${activityColors[0]}`} />
            <div className={`w-3 h-3 rounded-sm ${activityColors[1]}`} />
            <div className={`w-3 h-3 rounded-sm ${activityColors[2]}`} />
            <div className={`w-3 h-3 rounded-sm ${activityColors[3]}`} />
          </div>
          More
        </div>
      </div>

      <div className="flex">
        {/* Day Labels */}
        <div className="flex flex-col gap-[6px] text-[10px] font-medium text-text-muted mr-3 mt-5">
          <span className="h-4 flex items-center">Mon</span>
          <span className="h-4 flex items-center opacity-0">Tue</span>
          <span className="h-4 flex items-center">Wed</span>
          <span className="h-4 flex items-center opacity-0">Thu</span>
          <span className="h-4 flex items-center">Fri</span>
          <span className="h-4 flex items-center opacity-0">Sat</span>
          <span className="h-4 flex items-center">Sun</span>
        </div>

        {/* Heatmap Grid */}
        <div className="flex-1 overflow-x-auto hide-scrollbar pb-2">
          <div className="min-w-max relative pt-5">
            {/* Month Labels overlay */}
            {monthLabels.map((m, i) => (
              <span 
                key={i} 
                className="absolute top-0 text-[10px] font-bold text-text-muted uppercase"
                style={{ left: `${(m.col - 1) * 25}%` }}
              >
                {m.label}
              </span>
            ))}

            {/* Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-[6px]">
              {days.map((date, i) => {
                const level = getActivityLevel(date) as 0 | 1 | 2 | 3;
                return (
                  <div 
                    key={i}
                    title={`${format(date, 'MMM d, yyyy')}`}
                    className={`w-4 h-4 rounded-sm border ${activityColors[level]} transition-colors hover:ring-2 ring-dark/20 cursor-help`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
