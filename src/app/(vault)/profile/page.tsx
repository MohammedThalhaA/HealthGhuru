'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AccountForm from '@/components/vault/profile/AccountForm';
import FamilyVaultManager from '@/components/vault/profile/FamilyVaultManager';
import SubscriptionPanel from '@/components/vault/profile/SubscriptionPanel';
import SecurityPanel from '@/components/vault/profile/SecurityPanel';
import { User, Users, Star, Shield } from 'lucide-react';

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'family', label: 'Family Vault', icon: Users },
  { id: 'subscription', label: 'Subscription', icon: Star },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || 'account');

  // Sync state with URL params
  useEffect(() => {
    if (tabParam && TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/profile?tab=${tabId}`);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Profile</h2>
        
        <nav className="space-y-1 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-surface-alt text-primary-dark' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:mt-14 pb-10">
        {activeTab === 'account' && <AccountForm />}
        {activeTab === 'family' && <FamilyVaultManager />}
        {activeTab === 'subscription' && <SubscriptionPanel />}
        {activeTab === 'security' && <SecurityPanel />}
      </div>
    </div>
  );
}
