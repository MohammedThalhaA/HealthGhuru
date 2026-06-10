"use client";

import React from 'react';
import { Droplets, Flame, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import { useDashboard } from '@/lib/context/DashboardContext';
import StatCard from '@/components/ui/StatCard';

import WelcomeBanner from '@/components/dashboard/DashboardHome/WelcomeBanner';
import WellnessScoreRing from '@/components/dashboard/DashboardHome/WellnessScoreRing';
import QuickLogBar from '@/components/dashboard/DashboardHome/QuickLogBar';
import TodayArticleCard from '@/components/dashboard/DashboardHome/TodayArticleCard';
import StreakCard from '@/components/dashboard/DashboardHome/StreakCard';
import WeeklyOverviewChart from '@/components/dashboard/DashboardHome/WeeklyOverviewChart';

export default function DashboardHome() {
  const { today } = useDashboard();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WelcomeBanner />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <QuickLogBar />
          </motion.div>
        </div>
        <div className="lg:col-span-1 h-[320px] lg:h-auto">
          <motion.div className="h-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <WellnessScoreRing />
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <StatCard 
            icon={<Droplets />} 
            value={`${today.waterGlasses} / 8`} 
            label="Glasses" 
            sublabel="today" 
            color="blue" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.40 }}>
          <StatCard 
            icon={<Flame />} 
            value={`${today.streak} Days`} 
            label="Streak" 
            sublabel="" 
            color="accent" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <StatCard 
            icon={<BookOpen />} 
            value="3 Articles" 
            label="Read Today" 
            sublabel="" 
            color="purple" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.50 }}>
          <StatCard 
            icon={<Clock />} 
            value={`${today.workoutMinutes} min`} 
            label="Active Today" 
            sublabel="" 
            color="primary" 
          />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }} className="h-full">
            <WeeklyOverviewChart />
          </motion.div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex-1">
            <TodayArticleCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }} className="flex-1">
            <StreakCard />
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}
