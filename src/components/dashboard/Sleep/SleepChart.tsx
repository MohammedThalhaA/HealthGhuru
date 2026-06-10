"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function SleepChart() {
  const { weeklyData } = useDashboard();

  // Highlight days where sleep was < 7 hours in red/orange, else purple
  const chartData = weeklyData.map(d => ({
    ...d,
    isGood: d.sleepHours >= 7
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-border shadow-lg rounded-xl">
          <p className="font-bold text-dark mb-1">{label}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary">Duration:</span>
            <span className={`font-mono font-bold ${data.isGood ? 'text-[#7C4DFF]' : 'text-status-warning'}`}>
              {payload[0].value} hrs
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 md:p-6 h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-dark">Sleep History</h3>
        <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7C4DFF]" /> 7+ hrs</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-status-warning" /> &lt; 7 hrs</div>
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface)' }} />
            
            <Bar dataKey="sleepHours" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isGood ? '#7C4DFF' : 'var(--status-warning)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
