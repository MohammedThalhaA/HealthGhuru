"use client";

import React from 'react';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { Button } from '@/components/ui/Button';

export function SubscriptionPanel() {
  const { userPlan, setUserPlan } = useVault();
  const isFree = userPlan.tier === 'free';

  const handleUpgradeToPro = () => {
    setUserPlan({
      ...userPlan,
      tier: 'pro',
      recordsLimit: 9999,
      activeGoalsLimit: 9999,
      familyMembersLimit: 5,
      ocrEnabled: true,
      dataExportEnabled: true,
      adsEnabled: false
    });
  };

  return (
    <div className="bg-white border border-border rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-heading font-bold text-xl text-dark">Subscription Plan</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your billing and tier upgrades.</p>
        </div>
        <div className="text-right">
          <span className="block text-sm text-text-muted mb-1">Current Plan</span>
          <span className="inline-block px-3 py-1 bg-surface-alt border border-border rounded-lg font-heading font-bold text-primary uppercase tracking-wider text-sm">
            {userPlan.tier}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Usage */}
        <div className="bg-surface p-6 rounded-[14px] border border-border">
          <h4 className="font-heading font-semibold text-dark mb-4">Plan Limits</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-text-primary font-medium">Vault Records</span>
                <span className="text-text-muted">{userPlan.recordsUsed} / {isFree ? userPlan.recordsLimit : '∞'}</span>
              </div>
              <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isFree && userPlan.recordsUsed >= (userPlan.recordsLimit || 10) ? 'bg-red-500' : 'bg-primary'}`} 
                  style={{ width: `${isFree ? (userPlan.recordsUsed / (userPlan.recordsLimit || 10)) * 100 : 10}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-text-primary font-medium">Active Goals</span>
                <span className="text-text-muted">1 / {isFree ? userPlan.activeGoalsLimit : '∞'}</span>
              </div>
              <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isFree ? 'bg-red-500' : 'bg-primary'}`} 
                  style={{ width: `${isFree ? 100 : 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-text-primary font-medium">Family Members</span>
                <span className="text-text-muted">1 / {isFree ? 1 : 5}</span>
              </div>
              <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isFree ? 'bg-red-500' : 'bg-primary'}`} 
                  style={{ width: `${isFree ? 100 : 20}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Pitch */}
        {isFree ? (
          <div className="bg-gradient-primary p-6 rounded-[14px] text-white flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-32 h-32 bg-white opacity-10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Zap size={20} className="text-[#F9A825]" />
              <h4 className="font-heading font-bold text-lg">HealthGhuru Pro</h4>
            </div>
            
            <ul className="space-y-3 mb-6 relative z-10">
              <li className="flex items-start gap-2 text-sm text-white/90">
                <Check size={16} className="text-[#F9A825] shrink-0 mt-0.5" />
                <span>Unlimited health records & goals</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/90">
                <Check size={16} className="text-[#F9A825] shrink-0 mt-0.5" />
                <span>Add up to 5 family members</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/90">
                <Check size={16} className="text-[#F9A825] shrink-0 mt-0.5" />
                <span>Smart OCR to make documents searchable</span>
              </li>
            </ul>
            
            <Button 
              variant="accent" 
              className="mt-auto relative z-10 w-full justify-center"
              onClick={handleUpgradeToPro}
            >
              Upgrade to Pro — $9.99/mo
            </Button>
          </div>
        ) : (
          <div className="bg-surface p-6 rounded-[14px] border border-border flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-heading font-bold text-dark mb-2">Pro Subscription Active</h4>
            <p className="text-sm text-text-secondary mb-6">Your next billing date is Oct 15, 2026. ($9.99/mo)</p>
            
            <div className="flex gap-3">
              <Button variant="ghost" size="sm">Billing History</Button>
              <Button variant="outline" size="sm" className="bg-white">Manage Plan</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
