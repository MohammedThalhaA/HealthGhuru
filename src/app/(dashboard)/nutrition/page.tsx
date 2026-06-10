"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';

import MacroRings from '@/components/dashboard/Nutrition/MacroRings';
import MealLogger from '@/components/dashboard/Nutrition/MealLogger';
import WaterTracker from '@/components/dashboard/Nutrition/WaterTracker';
import NutritionChart from '@/components/dashboard/Nutrition/NutritionChart';

export default function NutritionPage() {
  const { user, today } = useDashboard();
  
  // Calculate mock macros based on calorie target
  // rough ratio: 30% protein (4 kcal/g), 40% carbs (4 kcal/g), 30% fat (9 kcal/g)
  const proteinTarget = Math.round((user.calorieTarget * 0.3) / 4);
  const carbsTarget = Math.round((user.calorieTarget * 0.4) / 4);
  const fatTarget = Math.round((user.calorieTarget * 0.3) / 9);

  // Derive mock consumed macros from total consumed for today
  // We use the actual logged calories from `today.caloriesConsumed` 
  // For the sake of the static demo, we scale targets based on how many cals are consumed
  const scale = Math.min(1, today.caloriesConsumed / user.calorieTarget);
  const proteinConsumed = Math.round(proteinTarget * scale);
  const carbsConsumed = Math.round(carbsTarget * scale);
  const fatConsumed = Math.round(fatTarget * scale);

  const diff = user.calorieTarget - today.caloriesConsumed;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Top: Macro Rings */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <MacroRings 
          calories={today.caloriesConsumed} caloriesTarget={user.calorieTarget}
          protein={proteinConsumed} proteinTarget={proteinTarget}
          carbs={carbsConsumed} carbsTarget={carbsTarget}
          fat={fatConsumed} fatTarget={fatTarget}
        />
      </motion.div>

      {/* Main Grid: Left Logger, Right Water & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Meal Logger */}
        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <MealLogger />
          </motion.div>
        </div>

        {/* Right Column: Water, Insights, Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <WaterTracker />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <NutritionChart />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-white rounded-[16px] shadow-sm border border-border p-5 flex items-start gap-4"
          >
            <div className={`p-3 rounded-full shrink-0 ${diff >= 0 ? 'bg-status-good/10 text-status-good' : 'bg-status-danger/10 text-status-danger'}`}>
              {diff >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            <div>
              <h4 className="font-heading font-bold text-dark mb-1">Nutrition Insight</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {diff >= 0 
                  ? `You're exactly on track! You have ${diff} kcal remaining for today. Focus on hitting your protein target for better recovery.`
                  : `You've exceeded your daily target by ${Math.abs(diff)} kcal. Try to stay active this evening to offset the surplus!`
                }
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
