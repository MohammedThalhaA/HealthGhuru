"use client";

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { FileText, Pill, FileEdit } from 'lucide-react';
import { WelcomeCard } from '@/components/vault/home/WelcomeCard';
import { ActivityTimelineCard } from '@/components/vault/home/ActivityTimelineCard';
import { PinnedVitalsCard } from '@/components/vault/home/PinnedVitalsCard';
import { NudgeCard } from '@/components/vault/home/NudgeCard';
import { MilestoneUpgradeCard } from '@/components/vault/home/MilestoneUpgradeCard';
import { QuickAddMenu } from '@/components/vault/home/QuickAddMenu';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function VaultHomePage() {
  const { userPlan, welcomeSeen, milestoneSeen, records, goals, activeMemberId } = useVault();
  
  // Calculate if we should show the milestone card
  const accountAgeDays = Math.floor((Date.now() - new Date(userPlan.accountCreatedAt).getTime()) / (1000 * 60 * 60 * 24));
  const hasEnoughActivity = records.length >= 1 && goals.length >= 1;
  const isFree = userPlan.tier === 'free';
  const shouldShowMilestone = isFree && !milestoneSeen && accountAgeDays >= 7 && hasEnoughActivity;

  // Snapshot data
  const memberGoals = goals.filter(g => g.memberId === activeMemberId);
  const activeGoalsCount = memberGoals.filter(g => g.status === 'active').length;
  
  const memberRecords = records.filter(r => r.memberId === activeMemberId);
  const recentRecords = memberRecords.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {!welcomeSeen && (
        <ScrollReveal>
          <WelcomeCard />
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.1}>
        <SectionHeader 
          title="Overview" 
          eyebrow="My Vault"
        />
      </ScrollReveal>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
        
        {/* Large: Activity Timeline */}
        <div className="md:col-span-2 xl:col-span-2 row-span-2">
          <ScrollReveal delay={0.2} className="h-full">
            <ActivityTimelineCard />
          </ScrollReveal>
        </div>

        {/* Medium: Pinned Vitals */}
        <div className="md:col-span-1 xl:col-span-1">
          <ScrollReveal delay={0.3} className="h-full">
            <PinnedVitalsCard />
          </ScrollReveal>
        </div>

        {/* Medium: Nudge or Milestone */}
        <div className="md:col-span-1 xl:col-span-1">
          <ScrollReveal delay={0.4} className="h-full">
            {shouldShowMilestone ? <MilestoneUpgradeCard /> : <NudgeCard />}
          </ScrollReveal>
        </div>

        {/* Small: Goals Snapshot */}
        <div className="md:col-span-1 xl:col-span-1 bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] flex flex-col justify-between">
          <ScrollReveal delay={0.5} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-dark leading-tight">Goals</h3>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">{activeGoalsCount} Active</span>
            </div>
            
            {memberGoals.length > 0 ? (
              <div className="space-y-3 mb-4">
                <p className="text-sm text-text-primary font-medium truncate">{memberGoals[0].title}</p>
                <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[45%]"></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted mb-4">No active goals.</p>
            )}
            
            <a href="/goals" className="text-sm font-medium text-secondary hover:underline mt-auto">View All Goals &rarr;</a>
          </ScrollReveal>
        </div>

        {/* Small: Records Snapshot */}
        <div className="md:col-span-1 xl:col-span-1 bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] flex flex-col">
          <ScrollReveal delay={0.6} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-dark leading-tight">Records</h3>
              <span className="text-xs text-text-muted">{userPlan.recordsUsed}/{isFree ? userPlan.recordsLimit : '∞'} used</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              {recentRecords.map(record => (
                <div key={record.id} className="w-10 h-10 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-xs font-medium text-text-secondary" title={record.title}>
                  {record.type === 'lab_report' ? <FileText size={16} /> : record.type === 'prescription' ? <Pill size={16} /> : <FileEdit size={16} />}
                </div>
              ))}
              {recentRecords.length === 0 && <p className="text-sm text-text-muted">No records yet.</p>}
            </div>
            
            <a href="/records" className="text-sm font-medium text-secondary hover:underline mt-auto">Go to Records &rarr;</a>
          </ScrollReveal>
        </div>

        {/* Small: Quick Add */}
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <ScrollReveal delay={0.7} className="h-full">
            <QuickAddMenu />
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
