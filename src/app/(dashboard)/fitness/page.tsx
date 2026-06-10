"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Clock, Target } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';

import ProgressBar from '@/components/ui/ProgressBar';
import WorkoutLogger from '@/components/dashboard/Fitness/WorkoutLogger';
import WorkoutHistory from '@/components/dashboard/Fitness/WorkoutHistory';
import ActivityCalendar from '@/components/dashboard/Fitness/ActivityCalendar';

export default function FitnessPage() {
  const { user, today } = useDashboard();

  // Mock progress calculations
  const stepsTarget = 50000;
  const stepsCurrent = 34000;
  const stepsProgress = Math.round((stepsCurrent / stepsTarget) * 100);

  const activeMinTarget = 300;
  const activeMinCurrent = 150 + today.workoutMinutes; // base mock + today's logged
  const activeMinProgress = Math.round((activeMinCurrent / activeMinTarget) * 100);

  const workoutsTarget = 5;
  const workoutsCurrent = 2; // base mock
  const workoutsProgress = Math.round((workoutsCurrent / workoutsTarget) * 100);

  const ProgressCard = ({ 
    icon: Icon, title, current, target, unit, progress, colorClass 
  }: any) => (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-surface ${colorClass.replace('bg-', 'text-')}`}>
          <Icon size={20} />
        </div>
        <h4 className="font-heading font-bold text-dark">{title}</h4>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <div className="font-mono text-xl font-bold text-dark">
          {current} <span className="text-sm font-body text-text-muted font-normal">/ {target} {unit}</span>
        </div>
        <span className="text-sm font-bold text-text-primary">{progress}%</span>
      </div>
      
      <ProgressBar progress={progress} height="h-2" colorClass={colorClass} />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Top: Goal Progress Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <ProgressCard 
            icon={Footprints} title="Weekly Steps" 
            current={stepsCurrent.toLocaleString()} target={stepsTarget.toLocaleString()} unit=""
            progress={stepsProgress} colorClass="bg-[#29B6F6]" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ProgressCard 
            icon={Clock} title="Active Minutes" 
            current={activeMinCurrent} target={activeMinTarget} unit="min"
            progress={Math.min(100, activeMinProgress)} colorClass="bg-accent" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <ProgressCard 
            icon={Target} title="Workouts Done" 
            current={workoutsCurrent} target={workoutsTarget} unit="sessions"
            progress={workoutsProgress} colorClass="bg-primary" 
          />
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Logger */}
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="h-full">
            <WorkoutLogger />
          </motion.div>
        </div>

        {/* Right: History */}
        <div className="lg:col-span-5 h-[400px] lg:h-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="h-full">
            <WorkoutHistory />
          </motion.div>
        </div>
      </div>

      {/* Bottom: Calendar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <ActivityCalendar />
      </motion.div>

    </motion.div>
  );
}
