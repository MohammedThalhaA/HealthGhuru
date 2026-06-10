"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/lib/context/DashboardContext';

import ProfileForm from '@/components/dashboard/Profile/ProfileForm';
import GoalSelector from '@/components/dashboard/Profile/GoalSelector';
import SubscriptionCard from '@/components/dashboard/Profile/SubscriptionCard';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ProfilePage() {
  const { user } = useDashboard();
  const { addToast } = useToast();
  
  const handleAvatarUpdate = () => {
    addToast('Avatar upload simulated successfully!', 'success');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6 max-w-5xl mx-auto w-full"
    >
      
      {/* Top Banner & Avatar Header */}
      <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-[#29B6F6]" />
        
        <div className="px-6 sm:px-8 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
          <div className="relative -mt-16 group">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-surface shadow-md overflow-hidden relative flex items-center justify-center">
              {user.avatar ? (
                <Image src={user.avatar} alt="Profile" fill className="object-cover" />
              ) : (
                <span className="text-4xl font-bold text-primary">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              )}
            </div>
            <button 
              onClick={handleAvatarUpdate}
              className="absolute bottom-0 right-0 w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Camera size={18} />
            </button>
          </div>
          
          <div className="flex-1 text-center sm:text-left mb-2">
            <h2 className="font-heading text-2xl font-bold text-dark">{user.name}</h2>
            <p className="text-text-secondary font-medium">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <ProfileForm />
          </motion.div>
        </div>

        {/* Right Column: Goals & Subscription */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-1">
            <GoalSelector />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex-1">
            <SubscriptionCard />
          </motion.div>
        </div>

      </div>

    </motion.div>
  );
}
