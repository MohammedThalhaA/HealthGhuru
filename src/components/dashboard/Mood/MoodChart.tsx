"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Dot } from 'recharts';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function MoodChart() {
  const { weeklyData } = useDashboard();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      
      let moodText = 'Awesome';
      let color = 'text-primary';
      if (score === 1) { moodText = 'Awful'; color = 'text-status-danger'; }
      else if (score === 2) { moodText = 'Bad'; color = 'text-status-warning'; }
      else if (score === 3) { moodText = 'Okay'; color = 'text-accent'; }
      else if (score === 4) { moodText = 'Good'; color = 'text-[#4CAF50]'; }

      return (
        <div className="bg-white p-3 border border-border shadow-lg rounded-xl">
          <p className="font-bold text-dark mb-1">{label}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary">Mood:</span>
            <span className={`font-bold ${color}`}>{moodText}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot rendering to show face emojis or colors
  const CustomizedDot = (props: any) => {
    const { cx, cy, value } = props;
    if (value === null || value === undefined) return null;

    let fill = 'var(--color-primary)';
    if (value === 1) fill = 'var(--status-danger)';
    else if (value === 2) fill = 'var(--status-warning)';
    else if (value === 3) fill = '#f06d2f';
    else if (value === 4) fill = '#4CAF50';

    return (
      <circle cx={cx} cy={cy} r={6} fill={fill} stroke="white" strokeWidth={2} />
    );
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 md:p-6 h-[320px] flex flex-col">
      <h3 className="font-heading font-bold text-dark mb-6">Mood Trend</h3>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
            <YAxis 
              domain={[1, 5]} 
              ticks={[1, 2, 3, 4, 5]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border)', strokeWidth: 2, strokeDasharray: '5 5' }} />
            
            <Line 
              type="monotone" 
              dataKey="moodScore" 
              stroke="var(--color-border)" 
              strokeWidth={3} 
              dot={<CustomizedDot />}
              activeDot={{ r: 8, strokeWidth: 0 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
