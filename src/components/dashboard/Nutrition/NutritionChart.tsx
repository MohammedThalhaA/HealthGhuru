"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function NutritionChart() {
  const { weeklyData, user } = useDashboard();
  
  // Transform data for chart to show Calories Consumed (derived mock) vs Target
  // We'll mock the actual calorie numbers since weeklyData currently has 'nutritionScore'
  // 100 score = exact target. So we derive calories from score.
  const chartData = weeklyData.map(d => {
    // Math: if score is 100, calories = target. 
    // Just a rough mock mapping for visuals:
    const mockCals = Math.round(user.calorieTarget * (d.nutritionScore / 100));
    return {
      day: d.day,
      consumed: mockCals,
      target: user.calorieTarget,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border shadow-lg rounded-xl">
          <p className="font-bold text-dark mb-2">{label}</p>
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-text-secondary">Consumed:</span>
            <span className="text-dark font-mono">{payload[0].value} kcal</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-border" />
            <span className="text-text-secondary">Target:</span>
            <span className="text-dark font-mono">{payload[1]?.value} kcal</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 md:p-6 h-[300px] flex flex-col">
      <h3 className="font-heading font-bold text-dark mb-4">Weekly Calorie Summary</h3>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
            <Tooltip content={<CustomTooltip />} />
            
            <Area 
              type="monotone" 
              name="Consumed" 
              dataKey="consumed" 
              stroke="#4CAF50" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorCals)" 
            />
            {/* Target line - dashed line via strokeDasharray */}
            <Area 
              type="step" 
              name="Target" 
              dataKey="target" 
              stroke="var(--color-text-muted)" 
              strokeDasharray="5 5"
              strokeWidth={2}
              fill="none" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
