"use client";

import React, { useState } from 'react';
import { AccountForm } from '@/components/vault/profile/AccountForm';
import { FamilyVaultManager } from '@/components/vault/profile/FamilyVaultManager';
import { SubscriptionPanel } from '@/components/vault/profile/SubscriptionPanel';
import { SecurityPanel } from '@/components/vault/profile/SecurityPanel';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'account' | 'family' | 'subscription' | 'security'>('account');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <ScrollReveal>
        <SectionHeader 
          title="Profile Settings" 
          eyebrow="My Vault"
          subtitle="Manage your personal details, family members, and subscription."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex overflow-x-auto pb-2 mb-6 border-b border-border hide-scrollbar">
          <div className="flex gap-8 px-1">
            <button 
              onClick={() => setActiveTab('account')}
              className={`pb-4 text-sm font-heading font-semibold whitespace-nowrap transition-all relative ${activeTab === 'account' ? 'text-primary' : 'text-text-secondary hover:text-dark'}`}
            >
              Personal Details
              {activeTab === 'account' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('family')}
              className={`pb-4 text-sm font-heading font-semibold whitespace-nowrap transition-all relative ${activeTab === 'family' ? 'text-primary' : 'text-text-secondary hover:text-dark'}`}
            >
              Family Vault
              {activeTab === 'family' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('subscription')}
              className={`pb-4 text-sm font-heading font-semibold whitespace-nowrap transition-all relative ${activeTab === 'subscription' ? 'text-primary' : 'text-text-secondary hover:text-dark'}`}
            >
              Subscription & Billing
              {activeTab === 'subscription' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`pb-4 text-sm font-heading font-semibold whitespace-nowrap transition-all relative ${activeTab === 'security' ? 'text-primary' : 'text-text-secondary hover:text-dark'}`}
            >
              Security & Privacy
              {activeTab === 'security' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="min-h-[500px]">
        {activeTab === 'account' && (
          <ScrollReveal delay={0.2}>
            <AccountForm />
          </ScrollReveal>
        )}
        
        {activeTab === 'family' && (
          <ScrollReveal delay={0.2}>
            <FamilyVaultManager />
          </ScrollReveal>
        )}
        
        {activeTab === 'subscription' && (
          <ScrollReveal delay={0.2}>
            <SubscriptionPanel />
          </ScrollReveal>
        )}
        
        {activeTab === 'security' && (
          <ScrollReveal delay={0.2}>
            <SecurityPanel />
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
