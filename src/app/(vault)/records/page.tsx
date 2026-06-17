'use client';

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { Plus } from 'lucide-react';
import RecordCard from '@/components/vault/records/RecordCard';
import RecordTypeFilter from '@/components/vault/records/RecordTypeFilter';
import RecordUploadModal from '@/components/vault/records/RecordUploadModal';
import LockedFeatureCard from '@/components/ui/LockedFeatureCard';
import EmptyState from '@/components/ui/EmptyState';
import { FolderLock } from 'lucide-react';

export default function RecordsPage() {
  const { records, canAddRecord } = useVault();
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRecords = records.filter(rec => {
    if (selectedType === 'All') return true;
    const mappedType = selectedType.toLowerCase().replace(/ /g, '_').replace(/s$/, '');
    return rec.type === mappedType || rec.type + 's' === mappedType || rec.type.includes(mappedType);
  });

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Records</h2>
          <p className="text-gray-500 mt-2">All your health documents in one secure place.</p>
        </div>
        
        {canAddRecord ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Record
          </button>
        ) : (
          <LockedFeatureCard 
            title="Limit Reached" 
            description="You've reached your 10-record limit on the Free plan." 
            className="py-3 px-6 max-w-sm flex-row text-left !p-4"
          />
        )}
      </div>

      <div className="mb-6">
        <RecordTypeFilter selectedType={selectedType} onChange={setSelectedType} />
      </div>

      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map(record => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={FolderLock}
          title="No records found"
          description={records.length === 0 ? "You haven't uploaded any records yet." : "No records match the selected filter."}
          actionLabel={canAddRecord ? "Upload your first record" : undefined}
          onAction={() => setIsModalOpen(true)}
          className="mt-8"
        />
      )}

      {isModalOpen && <RecordUploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
