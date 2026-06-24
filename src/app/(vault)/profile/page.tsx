/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { AccountForm } from '@/components/vault/profile/AccountForm';
import { FamilyVaultManager } from '@/components/vault/profile/FamilyVaultManager';
import { SubscriptionPanel } from '@/components/vault/profile/SubscriptionPanel';
import { SecurityPanel } from '@/components/vault/profile/SecurityPanel';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const TABS = [
  { key: 'account', label: 'Personal' },
  { key: 'family', label: 'Family' },
  { key: 'subscription', label: 'Billing' },
  { key: 'security', label: 'Security' },
] as const;

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'account' | 'family' | 'subscription' | 'security'>('account');

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <ScrollReveal>
        <SectionHeader
          title="Profile"
          eyebrow="My Vault"
          subtitle="Manage your details, family, and subscription."
        />
      </ScrollReveal>

      {/* Tab bar — scrollable on mobile, with smaller text */}
      <ScrollReveal delay={0.1}>
        <div className="flex overflow-x-auto pb-1 mb-4 md:mb-6 border-b border-border hide-scrollbar -mx-3 px-3 md:mx-0 md:px-0">
          <div className="flex gap-1 md:gap-6">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-3 md:px-1 text-xs md:text-sm font-heading font-semibold whitespace-nowrap transition-all relative ${
                  activeTab === tab.key ? 'text-primary' : 'text-text-secondary hover:text-dark'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="min-h-[400px]">
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

      {/* Mobile Sign Out Button */}
      <ScrollReveal delay={0.3} className="pt-6 mt-8 border-t border-border flex justify-center md:hidden">
        <Link href="/" className="flex items-center gap-2 text-red-500 hover:text-red-600 font-heading font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          Sign Out
        </Link>
      </ScrollReveal>
    </div>
  );
}
