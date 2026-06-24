"use client";

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { RecordSearchBar } from '@/components/vault/records/RecordSearchBar';
import { RecordTypeFilter } from '@/components/vault/records/RecordTypeFilter';
import { RecordCard } from '@/components/vault/records/RecordCard';
import { RecordUploadModal } from '@/components/vault/records/RecordUploadModal';
import { LockedFeatureCard } from '@/components/ui/LockedFeatureCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FolderLock, Plus } from 'lucide-react';
import { RecordType, VaultRecord } from '@/lib/types';

export default function RecordsPage() {
  const { records, activeMemberId, userPlan, addRecord, isLoaded } = useVault();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RecordType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const memberRecords = records.filter(r => r.memberId === activeMemberId);
  const isFree = userPlan.tier === 'free';
  const hasReachedLimit = isFree && userPlan.recordsUsed >= userPlan.recordsLimit;

  const filteredRecords = memberRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.doctorOrFacility?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = activeFilter === 'all' || record.type === activeFilter;
    return matchesSearch && matchesType;
  });

  const handleUpload = (newRecordData: Omit<VaultRecord, 'id' | 'memberId' | 'createdAt'>) => {
    const record: VaultRecord = {
      ...newRecordData,
      id: `r_${Date.now()}`,
      memberId: activeMemberId,
      createdAt: new Date().toISOString()
    };
    addRecord(record);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <ScrollReveal>
          <SectionHeader 
            title="My Records" 
            eyebrow="Vault"
            subtitle="Securely store and organize all your health documents."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {hasReachedLimit ? (
            <LockedFeatureCard 
              message={`You've reached your ${userPlan.recordsLimit}-record limit on the Free plan.`}
              upgradeText="Upgrade for unlimited records &rarr;"
              onUpgrade={() => window.location.href = '/profile'}
              inline
              className="py-3 px-4 shadow-sm"
            />
          ) : (
            <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus size={18} /> Add Record
            </Button>
          )}
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2} className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-[0_4px_24px_rgba(46,125,50,0.08)]">
        <RecordTypeFilter activeType={activeFilter} onChange={setActiveFilter} />
        <RecordSearchBar value={searchQuery} onChange={setSearchQuery} />
      </ScrollReveal>

      {!isLoaded ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <ScrollReveal delay={0.3}>
          <EmptyState 
            icon={FolderLock}
            title={searchQuery ? "No matching records found" : "No records yet"}
            description={searchQuery ? "Try adjusting your search terms or filters." : "Upload your first lab report, prescription, or visit note to keep everything organized."}
            actionText={!searchQuery && !hasReachedLimit ? "Add Record" : undefined}
            onAction={() => setIsModalOpen(true)}
            className="mt-8"
          />
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecords.map((record, index) => (
            <ScrollReveal key={record.id} delay={0.1 * (index % 10)} className="h-full">
              <RecordCard record={record} />
            </ScrollReveal>
          ))}
        </div>
      )}

      {isModalOpen && !hasReachedLimit && (
        <RecordUploadModal 
          onClose={() => setIsModalOpen(false)} 
          onUpload={handleUpload} 
        />
      )}
    </div>
  );
}
